import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import type MarkdownIt from 'markdown-it'
import { culturalCreativeCourses, buildChapterLink, getCourse } from '../garden/cultural-creative/_shared/culturalCreative'

const docsRoot = path.resolve(process.cwd(), 'docs')
const transcriptMarkerPattern = /==([^\[\]=\s]+)\[(\d{2}:\d{2}(?::\d{2})?)\]==/g

function readMarkdownTitle(filePath: string, fallback: string) {
  if (!fs.existsSync(filePath)) {
    return fallback
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const frontmatterTitle = content.match(/^title:\s+(.+)$/m)?.[1]?.trim()
  if (frontmatterTitle) {
    return frontmatterTitle
  }

  const headingTitle = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return headingTitle || fallback
}

function buildDocsSidebarSection(section: string) {
  const sectionDir = path.join(docsRoot, section)
  const indexLink = `/docs/${section}/`
  const sectionTitle = readMarkdownTitle(path.join(sectionDir, 'index.md'), section.toUpperCase())
  const articleFiles = fs.existsSync(sectionDir)
    ? fs.readdirSync(sectionDir)
        .filter((entry) => entry.endsWith('.md') && entry !== 'index.md')
        .sort((left, right) => right.localeCompare(left, 'zh-Hans-CN', { numeric: true }))
    : []

  return [
    {
      text: '当前分类',
      items: [
        { text: sectionTitle, link: indexLink },
        ...articleFiles.map((fileName) => ({
          text: readMarkdownTitle(path.join(sectionDir, fileName), fileName.replace(/\.md$/, '')),
          link: `/docs/${section}/${fileName.replace(/\.md$/, '')}`
        }))
      ]
    }
  ]
}

function buildCourseSidebar(slug: string) {
  const course = getCourse(slug)
  if (!course) {
    return []
  }

  return [
    {
      text: '课程页',
      items: [
        { text: '课程导览', link: `/garden/cultural-creative/_pages/${slug}` },
        { text: '全课重点', link: `/garden/cultural-creative/${slug}/full-summary` }
      ]
    },
    ...course.modules.map((module) => ({
      text: `${module.title} · ${module.range}`,
      link: `/garden/cultural-creative/_pages/${slug}#${module.id}`,
      collapsed: true,
      items: module.chapters.map((chapter) => ({
        text: `第 ${chapter.number} 章`,
        link: buildChapterLink(slug, chapter.number, 'summary')
      }))
    }))
  ]
}

function transcriptMarkerPlugin(md: MarkdownIt) {
  md.core.ruler.push('transcript-marker', (state) => {
    for (const blockToken of state.tokens) {
      if (blockToken.type !== 'inline' || !blockToken.children?.length) {
        continue
      }

      const transformedChildren = []

      for (const child of blockToken.children) {
        if (child.type !== 'text') {
          transformedChildren.push(child)
          continue
        }

        const text = child.content
        let lastIndex = 0
        let match: RegExpExecArray | null
        transcriptMarkerPattern.lastIndex = 0

        while ((match = transcriptMarkerPattern.exec(text))) {
          const [raw, icon, time] = match
          const startIndex = match.index

          if (startIndex > lastIndex) {
            const textToken = new state.Token('text', '', 0)
            textToken.content = text.slice(lastIndex, startIndex)
            transformedChildren.push(textToken)
          }

          const markerToken = new state.Token('html_inline', '', 0)
          markerToken.content = `<span class="transcript-marker"><span class="transcript-marker__icon">${md.utils.escapeHtml(icon)}</span><span class="transcript-marker__time">${md.utils.escapeHtml(time)}</span></span>`
          transformedChildren.push(markerToken)

          lastIndex = startIndex + raw.length
        }

        if (lastIndex < text.length) {
          const textToken = new state.Token('text', '', 0)
          textToken.content = text.slice(lastIndex)
          transformedChildren.push(textToken)
        }
      }

      blockToken.children = transformedChildren
    }
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '沐小慕的小星球',
  description: '欢迎来到沐小慕的小星球。前端同学一枚，想要构建一个自己的有趣世界。',
  lang: 'zh-CN',
  base: '/',
  markdown: {
    config(md) {
      md.use(transcriptMarkerPlugin)
    }
  },
  themeConfig: {
    logo: '/assets/img/favicons/android-chrome-512x512.png',
    nav: [
      { text: '传送点', link: '/' },
      { text: '螺丝厂', link: '/docs/' },
      { text: '一片实验田', link: '/projects/' },
      { text: '有个后花园', link: '/garden/' },
      { text: '关于这里', link: '/about' }
    ],

    sidebar: {
      '/docs/css/': buildDocsSidebarSection('css'),
      '/docs/javascript/': buildDocsSidebarSection('javascript'),
      '/docs/linux/': buildDocsSidebarSection('linux'),
      '/docs/git/': buildDocsSidebarSection('git'),
      '/docs/websocket/': buildDocsSidebarSection('websocket'),
      '/garden/cultural-creative/': [
        {
          text: '文创',
          items: [
            { text: '文创产品策划运营', link: '/garden/cultural-creative/' },
            ...culturalCreativeCourses.map((course) => ({
              text: `${course.title}导览`,
              link: course.overviewLink
            }))
          ]
        }
      ],
      '/garden/cultural-creative/beginners-guide/': buildCourseSidebar('beginners-guide'),
      '/garden/cultural-creative/live-course/': buildCourseSidebar('live-course')
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZX-Mu' }
    ],

    footer: {
      message: '❤️💛💜.',
      copyright: 'Copyright © 2025-present 沐小慕'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})

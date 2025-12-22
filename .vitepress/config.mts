import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "沐小慕的小星球",
  description: "欢迎来到沐小慕的小星球。前端同学一枚，想要构建一个自己的有趣世界。",
  lang: 'zh-CN',
  base: '/',
  themeConfig: {
    logo: '/assets/img/favicons/android-chrome-512x512.png',
    nav: [
      { text: '传送点', link: '/' },
      { text: '螺丝厂', link: '/docs/' },
      { text: '一片实验田', link: '/projects/' },
      { text: '关于这里', link: '/about' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: '拧螺丝指南',
          items: [
            { text: 'CSS', link: '/docs/css/' },
            { text: 'JavaScript', link: '/docs/javascript/' },
            { text: 'Linux', link: '/docs/linux/' },
            { text: 'Git', link: '/docs/git/' },
            { text: 'WebSocket', link: '/docs/websocket/' }
          ]
        }
      ],
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
    },

  }
})
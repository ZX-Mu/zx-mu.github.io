export type Chapter = {
  number: number
  title: string
}

export type CourseModule = {
  id: string
  title: string
  range: string
  summary: string
  chapters: Chapter[]
}

export type Course = {
  slug: 'beginners-guide' | 'live-course'
  title: string
  icon: string
  badge: string
  intro: string
  audience: string
  overviewLink: string
  summaryLink: string
  recommended: Array<{
    label: string
    chapter: number
    reason: string
  }>
  modules: CourseModule[]
}

export const culturalCreativeCourses: Course[] = [
  {
    slug: 'beginners-guide',
    title: '入门知识',
    icon: '🌱',
    badge: '32 章基础框架',
    intro: '知识点梳理。',
    audience: '入门用。',
    overviewLink: '/garden/cultural-creative/_pages/beginners-guide',
    summaryLink: '/garden/cultural-creative/beginners-guide/full-summary',
    recommended: [
      { label: '先搭框架', chapter: 1, reason: '先把行业认知和职业边界打稳。' },
      { label: '看设计方法', chapter: 5, reason: '从设计基础切入，进入方法层。' },
      { label: '看运营模块', chapter: 25, reason: '直接看定位、品牌和渠道。' }
    ],
    modules: [
      {
        id: 'professional-ethics',
        title: '职业道德与素养',
        range: '第一部分',
        summary: '先把行业价值观、职业边界和基本规范打稳。',
        chapters: [
          { number: 1, title: '职业道德概述与文创行业特点' },
          { number: 2, title: '职业道德基本原则与规范' },
          { number: 3, title: '职业道德风险识别与防范' },
          { number: 4, title: '职业道德建设与个人发展' }
        ]
      },
      {
        id: 'design-foundation',
        title: '文创产品设计基础',
        range: '第二部分',
        summary: '建立产品设计、调研、实现与推广的基础认识。',
        chapters: [
          { number: 5, title: '文创产品设计概述' },
          { number: 6, title: '文创产品的市场调研与用户分析' },
          { number: 7, title: '文创产品设计实现' },
          { number: 8, title: '文创产品的营销与推广' }
        ]
      },
      {
        id: 'culture-and-art',
        title: '文化元素与艺术应用',
        range: '第三部分',
        summary: '把传统与现代艺术资源转成可用的设计语言。',
        chapters: [
          { number: 9, title: '文化元素的认识与挖掘' },
          { number: 10, title: '传统艺术对文创设计的影响' },
          { number: 11, title: '现代艺术对文创设计的影响' },
          { number: 12, title: '可持续性在文创产品设计中的意义' }
        ]
      },
      {
        id: 'carrier-types',
        title: '设计载体与实现',
        range: '第四部分',
        summary: '区分实体、数字、混合载体，明确不同落地方式。',
        chapters: [
          { number: 13, title: '文创设计概述与载体分类' },
          { number: 14, title: '实体设计载体及其特点' },
          { number: 15, title: '数字设计载体及其特点' },
          { number: 16, title: '混合设计载体及其特点' }
        ]
      },
      {
        id: 'product-process',
        title: '产品设计流程',
        range: '第五部分',
        summary: '从概念设计到材料、打样和最终生产，覆盖完整制作链路。',
        chapters: [
          { number: 17, title: '文创产品设计概述与市场调研' },
          { number: 18, title: '概念设计与创意激发' },
          { number: 19, title: '文创产品设计原则与风格' },
          { number: 20, title: '设计方案的测试评估与优化' },
          { number: 21, title: '设计图优化与展示' },
          { number: 22, title: '原型制作与材料选择' },
          { number: 23, title: '文创产品打样制作' },
          { number: 24, title: '文创产品的最终生产' }
        ]
      },
      {
        id: 'operations',
        title: '市场运营与推广',
        range: '第六部分',
        summary: '聚焦定位、品牌、渠道和数据分析，补齐运营视角。',
        chapters: [
          { number: 25, title: '文创产品市场定位' },
          { number: 26, title: '文创产品的品牌建设与营销策略' },
          { number: 27, title: '文创产品的推广策略与渠道管理' },
          { number: 28, title: '文创产品运营数据分析与优化' }
        ]
      },
      {
        id: 'intellectual-property',
        title: '知识产权保护',
        range: '第七部分',
        summary: '把版权、商标、专利与合规经营单独拎出来看。',
        chapters: [
          { number: 29, title: '文创产品与知识产权概述' },
          { number: 30, title: '版权法在文创产品中的应用' },
          { number: 31, title: '商标法与专利法在文创产品中的应用' },
          { number: 32, title: '知识产权纠纷处理与合规经营' }
        ]
      }
    ]
  },
  {
    slug: 'live-course',
    title: '行业分享',
    icon: '🎙️',
    badge: '42 章经验拆解',
    intro: '行业经验与案例。',
    audience: '进阶用。',
    overviewLink: '/garden/cultural-creative/_pages/live-course',
    summaryLink: '/garden/cultural-creative/live-course/full-summary',
    recommended: [
      { label: '先看行业全景', chapter: 1, reason: '先建立趋势、用户和行业框架。' },
      { label: '先看成长路径', chapter: 15, reason: '适合想补从业者视角和调研思路。' },
      { label: '先看案例逻辑', chapter: 23, reason: '适合直接看 IP 和商业化打法。' }
    ],
    modules: [
      {
        id: 'industry-trends',
        title: '文创产业认知与趋势',
        range: '第一期',
        summary: '先看行业定义、核心特征和消费趋势。',
        chapters: [{ number: 1, title: '文创产品开发概述与趋势分析' }]
      },
      {
        id: 'design-methods',
        title: '设计思维与方法',
        range: '第二期',
        summary: '从八大设计路径到传统文化融合，建立文创方法底座。',
        chapters: [
          { number: 2, title: '文创产品设计思维与技能提升' },
          { number: 3, title: '文创产品开发与运营管理' },
          { number: 4, title: '文创产品市场分析与创新策略' },
          { number: 5, title: '以“大文创”理念构建文化新质生产力' },
          { number: 6, title: '传统文化与文创产品设计融合' }
        ]
      },
      {
        id: 'premium-cases',
        title: '高端文创案例',
        range: '第三期',
        summary: '围绕高端文创研发与营销，适合看产品质感与工艺打法。',
        chapters: [
          { number: 7, title: '高端文创产品的研发与市场营销' },
          { number: 8, title: '高端文创产品的研发与市场营销' },
          { number: 9, title: '高端文创产品的研发与市场营销' },
          { number: 10, title: '高端文创产品的研发与市场营销' }
        ]
      },
      {
        id: 'ai-creation',
        title: 'AI 创艺融合',
        range: '第四期',
        summary: '集中看 AI 图像、风格迁移和设计协作方式。',
        chapters: [
          { number: 11, title: 'AI创艺融合: 文创设计的新视野与新突破' },
          { number: 12, title: 'AI创艺融合: 文创设计的新视野与新突破' },
          { number: 13, title: 'AI创艺融合: 文创设计的新视野与新突破' },
          { number: 14, title: 'AI创艺融合: 文创设计的新视野与新突破' }
        ]
      },
      {
        id: 'career-path',
        title: '从业者成长路径',
        range: '第五期',
        summary: '把了解认知、文化溯源和职业路径拆开讲透。',
        chapters: [
          { number: 15, title: '文创从业者全流程发展指导' },
          { number: 16, title: '文创从业者全流程发展指导' },
          { number: 17, title: '文创从业者全流程发展指导' },
          { number: 18, title: '文创从业者全流程发展指导' }
        ]
      },
      {
        id: 'product-ops',
        title: '产品定位与运营',
        range: '第六期',
        summary: '适合看用户洞察、定位、运营与营销的衔接方式。',
        chapters: [
          { number: 19, title: '文创产品定位、运营、营销' },
          { number: 20, title: '文创产品定位、运营、营销' },
          { number: 21, title: '文创产品定位、运营、营销' },
          { number: 22, title: '文创产品定位、运营、营销' }
        ]
      },
      {
        id: 'blockbuster-products',
        title: '打造文创爆品',
        range: '第七期',
        summary: '重点看 IP 六化模式、爆款逻辑和产品组合。',
        chapters: [
          { number: 23, title: '如何打造文创爆品' },
          { number: 24, title: '如何打造文创爆品' },
          { number: 25, title: '如何打造文创爆品' },
          { number: 26, title: '如何打造文创爆品' }
        ]
      },
      {
        id: 'industry-entrepreneurship',
        title: '产业文创与创业',
        range: '第八期',
        summary: '更偏商业模型、老字号焕新和产业融合。',
        chapters: [
          { number: 27, title: '文创产业的创业新思路' },
          { number: 28, title: '文创产业的创业新思路' },
          { number: 29, title: '文创产业的创业新思路' },
          { number: 30, title: '文创产业的创业新思路' }
        ]
      },
      {
        id: 'commercial-closure',
        title: '变现闭环',
        range: '第九期',
        summary: '聚焦战略、爆款、技术壁垒和变现路径。',
        chapters: [
          { number: 31, title: '文创产品变现闭环' },
          { number: 32, title: '文创产品变现闭环' },
          { number: 33, title: '文创产品变现闭环' },
          { number: 34, title: '文创产品变现闭环' }
        ]
      },
      {
        id: 'brand-power',
        title: '品牌力量',
        range: '第十期',
        summary: '适合集中看品牌表达、消费者洞察和 4P 落地。',
        chapters: [
          { number: 35, title: '文创的品牌力量' },
          { number: 36, title: '文创的品牌力量' },
          { number: 37, title: '文创的品牌力量' },
          { number: 38, title: '文创的品牌力量' }
        ]
      },
      {
        id: 'growth',
        title: '破局与增长',
        range: '第十一期',
        summary: '收束到区域 IP、文化价值观和长期增长路径。',
        chapters: [
          { number: 39, title: '文创产业破局与增长路径' },
          { number: 40, title: '文创产业破局与增长路径' },
          { number: 41, title: '文创产业破局与增长路径' },
          { number: 42, title: '文创产业破局与增长路径' }
        ]
      }
    ]
  }
]

export function getCourse(slug: string) {
  return culturalCreativeCourses.find((course) => course.slug === slug)
}

export function buildChapterLink(slug: string, number: number, type: 'summary' | 'original') {
  return `/garden/cultural-creative/${slug}/chapter-${String(number).padStart(2, '0')}/${type}`
}

export function flattenCourseChapters(course: Course) {
  return course.modules.flatMap((module) =>
    module.chapters.map((chapter) => ({
      ...chapter,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleRange: module.range
    }))
  )
}

export function findChapterByPath(pathname: string) {
  const match = pathname.match(/^\/garden\/cultural-creative\/([^/]+)\/chapter-(\d+)\/(summary|original)(?:\.html)?$/)
  if (!match) {
    return null
  }

  const [, slug, rawNumber, pageType] = match
  const course = getCourse(slug)
  if (!course) {
    return null
  }

  const number = Number(rawNumber)
  const chapters = flattenCourseChapters(course)
  const currentIndex = chapters.findIndex((chapter) => chapter.number === number)
  if (currentIndex === -1) {
    return null
  }

  const current = chapters[currentIndex]
  const module = course.modules.find((item) => item.id === current.moduleId) || null
  const currentType = pageType as 'summary' | 'original'

  return {
    course,
    module,
    current,
    currentType,
    previous: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null
  }
}

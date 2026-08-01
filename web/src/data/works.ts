// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: '记录',
    closeLabel: '返回',
    openLabel: '展开记录',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问链接',
    detailPlaceholder: '这里将展示你的记录详情',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 条记录`,
    sections: [
      {
        id: 'life',
        no: '01',
        title: '日常生活',
        tagline: '日常 · 旅行 · 美食',
        items: [
          { name: '第一条生活记录', meta: '待补充', slug: 'life-1' },
          { name: '第二条生活记录', meta: '待补充', slug: 'life-2' },
        ],
      },
      {
        id: 'work',
        no: '02',
        title: '工作 · 车 BU',
        tagline: '软件开发的日常',
        items: [{ name: '第一条工作记录', meta: '待补充', slug: 'work-1' }],
      },
      {
        id: 'study',
        no: '03',
        title: '学习 · 技术',
        tagline: '技术笔记 · 读书',
        items: [{ name: '第一条学习记录', meta: '待补充', slug: 'study-1' }],
      },
      {
        id: 'logs',
        no: '04',
        title: '随笔',
        tagline: '想到什么写什么',
        items: [{ name: '第一篇随笔', meta: '待补充', slug: 'note-1' }],
      },
    ],
  },
  en: {
    title: 'Records',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit link',
    detailPlaceholder: 'Your post description goes here',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} posts`,
    sections: [
      {
        id: 'life',
        no: '01',
        title: 'Daily Life',
        tagline: 'Life · Travel · Food',
        items: [
          { name: 'First life post', meta: 'TBD', slug: 'life-1' },
          { name: 'Second life post', meta: 'TBD', slug: 'life-2' },
        ],
      },
      {
        id: 'work',
        no: '02',
        title: 'Work · Auto BU',
        tagline: 'Software development',
        items: [{ name: 'First work post', meta: 'TBD', slug: 'work-1' }],
      },
      {
        id: 'study',
        no: '03',
        title: 'Study · Tech',
        tagline: 'Tech notes · Books',
        items: [{ name: 'First study post', meta: 'TBD', slug: 'study-1' }],
      },
      {
        id: 'logs',
        no: '04',
        title: 'Notes',
        tagline: 'Anything on my mind',
        items: [{ name: 'First note', meta: 'TBD', slug: 'note-1' }],
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下，
// 并按 id 加到下面的映射里；缺图时左栏自动用大编号渐变占位。
export const SECTION_COVERS: Record<string, string> = {
  // life: `${import.meta.env.BASE_URL}works/covers/life.jpg`,
  // work: `${import.meta.env.BASE_URL}works/covers/work.jpg`,
  // study: `${import.meta.env.BASE_URL}works/covers/study.jpg`,
  // logs: `${import.meta.env.BASE_URL}works/covers/logs.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}

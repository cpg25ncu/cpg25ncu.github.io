export type Lang = 'en' | 'zh';

export const languages: Record<Lang, { label: string; htmlLang: string }> = {
  en: { label: 'EN', htmlLang: 'en' },
  zh: { label: '中文', htmlLang: 'zh-CN' },
};

/** Prefix a site path with the locale. `path` must start and end with "/". */
export function localePath(path: string, lang: Lang): string {
  return lang === 'en' ? path : `/zh${path}`;
}

/** The same page in the other language. */
export function alternatePath(pathname: string, lang: Lang): string {
  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (lang === 'zh') return clean.replace(/^\/zh(?=\/)/, '') || '/';
  return `/zh${clean}`;
}

export const ui = {
  en: {
    siteTitle: 'Tongyao Liu',
    siteDescription:
      'Tongyao Liu — computer vision, multimodal learning and full-stack systems. Master of Technology in Software Engineering, National University of Singapore.',
    nav: { projects: 'Projects', experience: 'Experience', cv: 'CV', menu: 'Menu', switchTo: 'Switch to Chinese' },
    hero: {
      kicker: 'Singapore · NUS',
      name: 'Tongyao Liu',
      glow: 'Machines that see and listen.',
      sub: 'I work on computer vision and multimodal learning, and build the software around it. Master of Technology in Software Engineering at the National University of Singapore.',
      ctaPrimary: 'View projects',
      ctaSecondary: 'Download CV',
      hudLeft: 'MediaPipe Hands · 21 landmarks',
      hudGesture: 'gesture',
    },
    statement: {
      lead: 'Computer vision, multimodal learning and full-stack systems.',
      dim: 'From MFCC features written from scratch to a production release through a gated CI pipeline — research ideas, built as real software.',
    },
    stats: {
      kicker: 'By the numbers',
      items: [
        { value: '77.7%', label: 'Audio recognition accuracy at 0 dB after multi-condition training, up from 30.5%' },
        { value: '93.8%', label: 'End-to-end test accuracy for real-time hand gesture recognition' },
        { value: '1st', label: 'First Class Honours, BSc Computing Science, UEA · GPA 4.0' },
        { value: '5', label: 'Internships at Sinopec and Jiance, from software testing to front-end development' },
      ],
    },
    projects: {
      kicker: 'Selected projects',
      lead: 'Selected projects.',
      dim: 'Multimodal speech recognition, real-time vision, game-playing AI and a team-built production system.',
      readMore: 'Read case study',
      moreKicker: 'More projects',
      moreLead: 'More projects.',
      moreDim: 'An AI gateway built as a team, a full-stack residence system and a Unity game.',
    },
    experience: {
      kicker: 'Experience',
      lead: 'Five internships.',
      dim: 'Testing, front-end development, IT audit, new-energy systems and IT operations across Sinopec and Jiance.',
      all: 'Full experience',
    },
    education: {
      kicker: 'Education',
    },
    contact: {
      title: 'Get in touch.',
      sub: 'Open to research and engineering roles in computer vision, multimodal learning and AI systems.',
      email: 'Email me',
    },
    project: {
      period: 'Period',
      stack: 'Stack',
      role: 'Role',
      repo: 'View on GitHub',
      demo: 'Open live demo',
      keyResult: 'Key result',
      next: 'Next project',
      back: 'All projects',
    },
    expPage: {
      title: 'Experience',
      intro: 'Education, internships, awards and skills — the full CV, online.',
      sections: {
        education: 'Education',
        internships: 'Internships',
        awards: 'Honours & awards',
        certs: 'Test scores & certifications',
        skills: 'Technical skills',
        activities: 'Leadership & activities',
      },
      modules: 'Key modules',
      downloadEn: 'CV (English, PDF)',
      downloadZh: 'CV (Chinese, PDF)',
    },
    footer: {
      built: 'Built with Astro, GSAP and Three.js.',
    },
    notFound: { title: 'Page not found.', back: 'Back to home' },
  },
  zh: {
    siteTitle: '刘童尧',
    siteDescription:
      '刘童尧 — 计算机视觉、多模态学习与全栈系统。新加坡国立大学 软件工程技术硕士。',
    nav: { projects: '项目', experience: '经历', cv: '简历', menu: '菜单', switchTo: 'Switch to English' },
    hero: {
      kicker: '新加坡 · 新加坡国立大学',
      name: '刘童尧',
      glow: '让机器看见，也听见。',
      sub: '专注计算机视觉与多模态学习，也做让模型落地的软件工程。新加坡国立大学 系统科学研究所 软件工程技术硕士。',
      ctaPrimary: '查看项目',
      ctaSecondary: '下载简历',
      hudLeft: 'MediaPipe Hands · 21 个关键点',
      hudGesture: '手势',
    },
    statement: {
      lead: '计算机视觉、多模态学习与全栈系统。',
      dim: '从自行实现 MFCC 特征提取，到通过安全门禁流水线发布上线——把研究想法做成真正可用的软件。',
    },
    stats: {
      kicker: '数据一览',
      items: [
        { value: '77.7%', label: '多条件训练后 0 dB 下的音频识别准确率，原为 30.5%' },
        { value: '93.8%', label: '实时手势识别系统的端到端测试准确率' },
        { value: '一等', label: '荣誉学位 · 东安格利亚大学 · GPA 4.0' },
        { value: '5', label: '段实习，覆盖中国石化与建测，从软件测试到前端开发' },
      ],
    },
    projects: {
      kicker: '项目经历',
      lead: '项目经历。',
      dim: '多模态语音识别、实时视觉、棋类博弈 AI，以及团队交付上线的生产系统。',
      readMore: '查看详情',
      moreKicker: '更多项目',
      moreLead: '更多项目。',
      moreDim: '团队开发的 AI 网关、全栈宿舍管理系统，以及一款 Unity 游戏。',
    },
    experience: {
      kicker: '实习经历',
      lead: '五段实习。',
      dim: '在中国石化与建测，经历软件测试、前端开发、信息化审计、新能源系统与信息系统运维。',
      all: '完整经历',
    },
    education: {
      kicker: '教育背景',
    },
    contact: {
      title: '保持联系。',
      sub: '欢迎计算机视觉、多模态学习与 AI 系统方向的科研与工程机会。',
      email: '发送邮件',
    },
    project: {
      period: '时间',
      stack: '技术栈',
      role: '角色',
      repo: '在 GitHub 查看',
      demo: '打开在线演示',
      keyResult: '关键结果',
      next: '下一个项目',
      back: '全部项目',
    },
    expPage: {
      title: '经历',
      intro: '教育背景、实习、奖项与技能——完整简历的网页版。',
      sections: {
        education: '教育背景',
        internships: '实习经历',
        awards: '荣誉奖项',
        certs: '语言成绩与证书',
        skills: '专业技能',
        activities: '校园活动',
      },
      modules: '主修课程',
      downloadEn: '英文简历（PDF）',
      downloadZh: '中文简历（PDF）',
    },
    footer: {
      built: '使用 Astro、GSAP 与 Three.js 构建。',
    },
    notFound: { title: '页面不存在。', back: '返回首页' },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

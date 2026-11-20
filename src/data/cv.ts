// CV content for the site. Source of truth: Curriculum_Vitae/存档/v4_20261121 (CV_English.md, 简历_中文.md).
// Phone numbers are deliberately left off the web pages.
import type { Lang } from '../i18n/ui';

export interface Education {
  school: string;
  short: string;
  degree: string;
  dept: string;
  location: string;
  period: string;
  lines: string[];
  modules: string;
}

export interface Internship {
  company: string;
  unit?: string;
  role: string;
  team?: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Activity {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface CV {
  name: string;
  location: string;
  email: string;
  github: string;
  githubLabel: string;
  interests: string[];
  education: Education[];
  internships: Internship[];
  awards: { title: string; date: string }[];
  certs: { title: string; detail: string; date?: string }[];
  skills: { group: string; items: string }[];
  activities: Activity[];
  cvFiles: { en: string; zh: string };
}

const shared = {
  email: 'tongyao.liu@u.nus.edu',
  github: 'https://github.com/cpg25ncu',
  githubLabel: 'github.com/cpg25ncu',
  cvFiles: { en: '/cv/Tongyao_Liu_CV_EN.pdf', zh: '/cv/Tongyao_Liu_CV_ZH.pdf' },
};

const en: CV = {
  ...shared,
  name: 'Tongyao Liu',
  location: 'Singapore',
  interests: [
    'Computer Vision',
    'Multimodal Deep Learning',
    'Audio-Visual Speech Recognition',
    'Vision-based Human-Computer Interaction',
  ],
  education: [
    {
      school: 'National University of Singapore',
      short: 'NUS',
      degree: 'Master of Technology in Software Engineering',
      dept: 'Institute of Systems Science',
      location: 'Singapore',
      period: 'Aug 2026 – Jul 2027',
      lines: ['Specialisations: Architecting AI Systems; Engineering Big Data'],
      modules:
        'Architecting Agentic AI Solutions; Explainable and Responsible AI; Deploying and Operating AI Solutions; Big Data Engineering for Analytics; Architecting Systems for Real-Time Data Processing; Software Design Patterns; Cloud Native Solution Design',
    },
    {
      school: 'University of East Anglia',
      short: 'UEA',
      degree: 'BSc (Hons) Computing Science with Software Development',
      dept: 'School of Computing Sciences',
      location: 'Norwich, United Kingdom',
      period: 'Sep 2023 – Jul 2026',
      lines: [
        'Programme: Articulation programme — Years 1–2 at Qingdao University of Technology, final year at UEA',
        'Classification: First Class Honours | GPA: 4.0 | QUT stage: average 90.48/100, rank 1/43',
      ],
      modules:
        'Artificial Intelligence; Audiovisual Processing; Ubiquitous Computing; Game and Mobile App Development; Systems Analysis; Systems Engineering; Mathematics for Computing; Data Structures; Object-Oriented Programming; Object-Oriented Analysis & Design; Relational Database Management Systems',
    },
  ],
  internships: [
    {
      company: 'East China Oil & Gas Branch, China Petroleum & Chemical Corporation (Sinopec)',
      unit: 'Information Management Center',
      role: 'Software Testing Intern',
      team: 'Data Application Department',
      location: 'Nanjing, China',
      period: 'Jun 2025 – Aug 2025',
      bullets: [
        'Conducted software testing and log analysis for the East China Oil & Gas Business System Integration Platform Construction Project, tracing interface latency, data-transfer errors and instability under peak load.',
        'Refined data-transmission logic and supported code optimisation, reducing error frequency during concurrent access.',
        'Documented deployment scenarios and mapped integration-risk patterns between legacy business modules and real-time monitoring systems.',
        'Assessed system performance indicators to improve the reliability of cross-department data synchronisation.',
      ],
    },
    {
      company: 'Jiance (Shandong) Information Technology Co., Ltd.',
      role: 'Front-End Development Engineer',
      team: 'Intelligent Detection Cloud Platform Project Team',
      location: 'Qingdao, China',
      period: 'Jan 2025 – Feb 2025',
      bullets: [
        'Built core front-end modules (user authentication, task management, data visualisation) with Vue.js and Element UI, completing page-structure design and component encapsulation.',
        'Collaborated with back-end engineers to debug and integrate RESTful APIs, resolving data-format compatibility and exception-handling issues.',
        'Developed reusable UI components and refactored legacy code to improve rendering efficiency and maintainability.',
        'Designed and executed functional test cases, helping locate and fix front-end defects to ensure release quality.',
        'Produced front-end development documentation, API usage guides and module user manuals.',
      ],
    },
    {
      company: 'Shengli Oilfield Branch, China Petroleum & Chemical Corporation (Sinopec)',
      unit: 'Audit Department',
      role: 'IT Audit Intern',
      location: 'Dongying, China',
      period: 'Jul 2024 – Aug 2024',
      bullets: [
        "Participated in the branch's IT audit project, assisting with internal-control environment testing and data collection.",
        'Audited system permissions and role-based access control (RBAC), identifying mismatches between authorisation levels and actual business scope.',
        'Traced cross-department data flows to reveal gaps in accountability and digital-audit traceability.',
        'Compiled evidence for internal governance review and improved digital audit trails through clearer log-classification and verification procedures.',
      ],
    },
    {
      company: 'Sinopec Shengli Petroleum Administration Bureau Co., Ltd.',
      unit: 'New Energy Development Center',
      role: 'New Energy Systems Intern',
      location: 'Dongying, China',
      period: 'Jun 2024 – Jul 2024',
      bullets: [
        'Supported control-system maintenance of the 106 MW photovoltaic power station at Gudong Oilfield, tracking inverter-output stability and data consistency.',
        'Assisted in grid-connection testing of the energy-storage system, analysing state-of-charge (SOC) fluctuations and charge–discharge curves.',
        "Consolidated multi-source data (irradiance, inverter output, SOC) for Shengli Oilfield's Source-Grid-Load-Storage intelligent control platform.",
        'Organised the data structures required by dispatch-forecasting and operational-control modules, improving data standardisation and usability.',
      ],
    },
    {
      company: 'Shengli Oilfield Branch, China Petroleum & Chemical Corporation (Sinopec)',
      unit: 'Offshore Oil Production Plant',
      role: 'IT Operations Intern',
      location: 'Dongying, China',
      period: 'Jan 2024 – Feb 2024',
      bullets: [
        'Supported operation and maintenance of the production-command information system, verifying real-time sensor alarms against equipment-status output.',
        'Identified recurring abnormal and duplicate alarms caused by calibration drift and signal noise.',
        'Helped refine equipment-maintenance workflows and alarm-classification rules.',
        'Documented SCADA data routing and fault-response logic.',
      ],
    },
  ],
  awards: [
    { title: 'International Undergraduate Merit Scholarship (£4,000), University of East Anglia', date: '2025' },
    { title: 'China Student Ambassador, University of East Anglia', date: '2025' },
    {
      title:
        'Third Prize, Java Software Development (University Group B), Shandong Division, 16th Lanqiao Cup National Software and IT Professional Talent Competition (co-organised by the MIIT Talent Exchange Center)',
      date: '2025',
    },
    { title: 'Excellent Graduate, Qingdao University of Technology', date: '2025' },
    { title: 'Outstanding Student, Qingdao University of Technology', date: '2023, 2024' },
  ],
  certs: [
    {
      title: 'GRE General Test: 335',
      detail: 'Verbal Reasoning 169, 99th percentile | Quantitative Reasoning 166',
      date: 'Dec 2025',
    },
    {
      title: 'Languages',
      detail:
        "English — full professional proficiency; all higher education taught entirely in English (undergraduate studies in China and the UK, master's in Singapore). Mandarin — native.",
    },
    {
      title: 'IITC Industrial & Information Technology Talent Job Capability Certificate',
      detail: 'Industrial Internet Platform Development Engineer (Ministry of Industry and Information Technology)',
      date: 'Jul 2025',
    },
  ],
  skills: [
    {
      group: 'Machine Learning & Vision',
      items:
        'TensorFlow/Keras, PyTorch, scikit-learn, OpenCV, MediaPipe, ONNX/TFLite; CNNs, MFCC/DCT/PCA feature extraction, multimodal fusion',
    },
    { group: 'Programming', items: 'Python, Java, C/C++, JavaScript/TypeScript, SQL, C#' },
    {
      group: 'Software Engineering',
      items: 'Spring Boot, React, Vue.js, Element UI, RESTful APIs; PostgreSQL, MySQL, Oracle',
    },
    { group: 'DevOps & Tools', items: 'Git, GitHub Actions, Docker, Unity, Microsoft Project' },
    { group: 'Methods', items: 'Agile/Scrum, UML modelling, software testing' },
  ],
  activities: [
    {
      title: 'China Student Ambassador',
      org: 'University of East Anglia',
      period: 'Sep 2025 – Jun 2026',
      bullets: [
        'Selected by the university to support student recruitment, advise prospective students and run China-focused outreach and exchange activities.',
      ],
    },
    {
      title: 'Assistant to the President',
      org: 'UEA Chinese Students and Scholars Association (CSSA)',
      period: 'Sep 2025 – Jun 2026',
      bullets: [
        'Assisted the president in planning cultural and academic events, coordinating logistics, communication and attendee management.',
        'Partnered with other student societies to strengthen community engagement and increase event participation.',
      ],
    },
  ],
};

const zh: CV = {
  ...shared,
  name: '刘童尧',
  location: '新加坡',
  interests: ['计算机视觉', '多模态深度学习', '视听语音识别', '基于视觉的人机交互'],
  education: [
    {
      school: '新加坡国立大学',
      short: 'NUS',
      degree: '软件工程 技术硕士',
      dept: '系统科学研究所',
      location: '新加坡',
      period: '2026.08 – 2027.07',
      lines: ['专业方向：AI 系统架构、大数据工程'],
      modules:
        '智能体 AI 解决方案架构、可解释与负责任的人工智能、AI 解决方案部署与运维、面向分析的大数据工程、实时数据处理系统架构、软件设计模式、云原生解决方案设计',
    },
    {
      school: '东安格利亚大学',
      short: 'UEA',
      degree: '计算机类（计算科学与软件开发） 荣誉理学学士',
      dept: '计算科学系',
      location: '英国诺里奇',
      period: '2023.09 – 2026.07',
      lines: [
        '中外合作项目（前两年就读于青岛理工大学）',
        '学位等级：一等荣誉学位｜GPA：4.0｜青岛理工大学阶段：平均成绩 90.48/100，专业排名 1/43',
      ],
      modules:
        '人工智能、音视频处理、泛在计算、游戏与移动应用开发、系统分析、系统工程、计算数学、数据结构、面向对象程序设计、面向对象分析与设计、关系数据库管理系统',
    },
  ],
  internships: [
    {
      company: '中国石油化工股份有限公司华东油气分公司',
      unit: '信息化管理中心',
      role: '软件测试实习生',
      team: '数据应用部',
      location: '江苏南京',
      period: '2025.06 – 2025.08',
      bullets: [
        '参与华东油气业务系统集成平台建设项目的软件测试及日志分析，排查接口延迟、数据传输异常及高负载场景下的系统稳定性问题；',
        '协助优化数据传输逻辑及相关代码，降低并发访问过程中的异常发生频率；',
        '梳理系统部署场景，分析既有业务模块与实时监控系统之间的集成风险；',
        '对系统性能指标进行分析，协助提升跨部门数据同步的稳定性和可靠性。',
      ],
    },
    {
      company: '建测（山东）信息技术有限公司',
      role: '前端开发工程师',
      team: '智能检测云平台项目组',
      location: '山东青岛',
      period: '2025.01 – 2025.02',
      bullets: [
        '基于 Vue.js + Element UI 参与平台核心前端模块开发，包括用户认证、任务管理及数据可视化等功能，完成页面结构设计与组件封装；',
        '与后端开发人员协作完成 RESTful API 接口调试与联调，解决数据对接中的格式兼容及异常处理问题；',
        '开发可复用 UI 组件，并通过重构部分既有代码提升页面渲染效率及代码可维护性；',
        '参与系统功能测试，设计并执行基础功能测试用例，协助定位和修复前端缺陷，保障系统上线质量；',
        '整理前端开发文档、接口使用说明及模块使用手册。',
      ],
    },
    {
      company: '中国石油化工股份有限公司胜利油田分公司',
      unit: '审计部',
      role: '信息化审计实习生',
      location: '山东东营',
      period: '2024.07 – 2024.08',
      bullets: [
        '参与分公司信息化审计项目，协助开展内部控制环境测试及数据收集工作；',
        '对系统权限及基于角色的访问控制（RBAC）进行检查，协助识别授权范围与实际业务权限之间的不一致问题；',
        '梳理跨部门数据流转过程，协助分析数字化审计中的责任追踪和数据可追溯性问题；',
        '协助整理内部治理及审计所需资料，通过日志分类及验证流程完善数字化审计记录。',
      ],
    },
    {
      company: '中国石化胜利石油管理局有限公司',
      unit: '新能源开发中心',
      role: '新能源系统实习生',
      location: '山东东营',
      period: '2024.06 – 2024.07',
      bullets: [
        '参与孤东油田 106MW 光伏电站控制系统的运行维护，关注逆变器输出稳定性及运行数据一致性；',
        '协助开展储能系统并网测试，对 SOC（荷电状态）变化及充放电曲线进行分析；',
        '整理光照强度、逆变器输出、SOC 等多源数据，为胜利油田“源网荷储”智能管控平台的数据应用提供支持；',
        '协助梳理调度预测及运行控制模块所需的数据结构，提高数据的规范性和可用性。',
      ],
    },
    {
      company: '中国石油化工股份有限公司胜利油田分公司',
      unit: '海洋采油厂',
      role: '信息系统运维实习生',
      location: '山东东营',
      period: '2024.01 – 2024.02',
      bullets: [
        '参与生产指挥信息系统运行维护，协助核对实时传感器告警与设备运行状态信息；',
        '协助分析因设备校准偏差及信号噪声等原因产生的异常或重复告警；',
        '参与设备维护流程及告警分类规则的整理和优化；',
        '协助整理 SCADA 数据流转及故障响应逻辑文档。',
      ],
    },
  ],
  awards: [
    { title: '东安格利亚大学国际本科生优异奖学金（4,000 英镑）', date: '2025.05' },
    { title: '东安格利亚大学中国学生大使', date: '2025.09' },
    { title: '第十六届蓝桥杯全国软件和信息技术专业人才大赛 山东赛区 Java 软件开发大学 B 组 三等奖', date: '2025.05' },
    { title: '青岛理工大学优秀毕业生', date: '2025' },
    { title: '青岛理工大学优秀学生', date: '2023、2024' },
  ],
  certs: [
    { title: 'GRE：335', detail: '言语推理 169，前 1%｜数量推理 166', date: '2025.12' },
    {
      title: '英语',
      detail:
        '全面专业工作能力，可熟练使用英语进行学术学习、技术写作与团队协作；高等教育阶段（青岛理工大学、东安格利亚大学、新加坡国立大学）均为全英文授课',
    },
    { title: 'IITC 工信人才岗位能力评价证书', detail: '工业互联网平台开发工程师（工业和信息化部）', date: '2025.07' },
  ],
  skills: [
    {
      group: '机器学习与视觉',
      items: 'TensorFlow/Keras、PyTorch、scikit-learn、OpenCV、MediaPipe、ONNX/TFLite；CNN、MFCC/DCT/PCA 特征提取、多模态融合',
    },
    { group: '编程语言', items: 'Python、Java、C/C++、JavaScript/TypeScript、SQL、C#' },
    { group: '软件工程', items: 'Spring Boot、React、Vue.js、Element UI、RESTful API；PostgreSQL、MySQL、Oracle' },
    { group: '开发运维与工具', items: 'Git、GitHub Actions、Docker、Unity、Microsoft Project' },
    { group: '方法', items: '敏捷开发/Scrum、UML 建模、软件测试' },
  ],
  activities: [
    {
      title: '中国学生大使',
      org: '东安格利亚大学',
      period: '2025.09 – 2026.06',
      bullets: ['经学校推选担任中国学生大使，协助开展招生宣传、意向学生咨询及面向中国的推广与交流活动。'],
    },
    {
      title: '主席助理',
      org: '东安格利亚大学中国学生学者联合会（CSSA）',
      period: '2025.09 – 2026.06',
      bullets: ['协助主席策划文化及学术活动，协调后勤保障、宣传沟通及参与者管理；', '联合其他学生组织开展活动，提升社群参与度与活动影响力。'],
    },
  ],
};

export const cv: Record<Lang, CV> = { en, zh };

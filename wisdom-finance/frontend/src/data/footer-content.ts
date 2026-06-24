/**
 * 页脚详情内容数据
 * 三大类 × 4子项 = 12个页面，所有内容均为焦作市智慧金融服务平台静态数据
 */

export interface FooterContentItem {
  id: string
  category: string
  title: string
  subtitle: string
  /** 首屏大图 or 图标 emoji */
  icon: string
  /** 摘要（列表页/面包屑用） */
  summary: string
  /** 正文——支持 HTML 片段 */
  body: string[]
  /** 相关链接 */
  related?: { label: string; link: string }[]
  /** 元信息 */
  meta?: { key: string; value: string }[]
}

/** 平台服务 */
const platformServices: FooterContentItem[] = [
  {
    id: 'financial-products',
    category: 'platform',
    title: '金融产品',
    subtitle: '汇聚全市银行·担保·小贷·融资租赁优质产品',
    icon: '🏦',
    summary: '汇聚焦作市28家金融机构的300+款金融产品，涵盖信用贷、抵押贷、担保贷、贴息贷等全品类。',
    body: [
      '<h3>产品体系</h3><p>平台已入驻全市28家金融机构（18家银行、4家融资担保公司、3家小额贷款公司、2家融资租赁公司、1家商业保理公司），共计上线金融产品327款。产品覆盖：</p>',
      '<ul><li><strong>信用贷款：</strong>科技贷、税易贷、政采贷、创业贷、人才贷等无抵押产品，额度10万~500万</li><li><strong>抵押贷款：</strong>房产抵押贷、设备抵押贷、存货质押贷，额度50万~3000万</li><li><strong>担保贷款：</strong>由焦作市中小企业融资担保公司提供增信，额度100万~1000万</li><li><strong>贴息贷款：</strong>创业担保贴息贷、扶贫再贷款、科技贴息贷，政府贴息50%~100%</li><li><strong>供应链金融：</strong>应收账款质押、订单融资、预付款融资</li></ul>',
      '<h3>智能匹配</h3><p>平台AI融资助手根据企业基本信息（行业、规模、纳税等级、征信状况）自动匹配最优产品组合，3分钟内生成融资方案。累计完成人企匹配服务5,200余次，融资成功率提升至73.6%。</p>',
      '<h3>在线申请</h3><p>企业注册认证后即可在线提交融资申请，全流程电子化：申请→受理→审核→审批→签约→放款，平均办结时间由15个工作日缩短至3.5个工作日。</p>'
    ],
    related: [
      { label: '信用体检服务', link: '/footer/credit-check' },
      { label: '绿色金融通道', link: '/footer/green-finance' }
    ],
    meta: [
      { key: '入驻机构', value: '28家' },
      { key: '上线产品', value: '327款' },
      { key: '累计服务', value: '5,200+次' },
      { key: '融资成功率', value: '73.6%' }
    ]
  },
  {
    id: 'credit-check',
    category: 'platform',
    title: '信用体检',
    subtitle: '企业信用全维度诊断·实时预警·提升建议',
    icon: '📊',
    summary: '基于工商、税务、司法、征信、社保等18个数据源，为企业提供五维信用评分及风险预警服务。',
    body: [
      '<h3>服务概述</h3><p>信用体检（又称企业信用评分报告）是平台核心数据产品，对接焦作市政务数据共享交换平台，融合工商、税务、社保、公积金、司法、征信等18个数据源，构建企业信用全息画像。</p>',
      '<h3>五维评分模型</h3><ul><li><strong>基本信息（20%）：</strong>经营年限、注册资本、行业前景、股权结构稳定性</li><li><strong>信用历史（25%）：</strong>历史履约记录、贷款还款记录、合同违约记录</li><li><strong>财务实力（25%）：</strong>资产负债率、盈利能力、现金流状况、纳税持续性</li><li><strong>法律合规（20%）：</strong>诉讼记录、行政处罚、环保合规、劳动用工合规</li><li><strong>行业环境（10%）：</strong>行业发展阶段、区域经济环境、政策支持力度</li></ul>',
      '<h3>服务流程</h3><p>企业授权 → 数据采集 → 模型评分 → 报告生成 → 结果解读 → 提升建议。报告T+0生成，支持PC端和移动端查看。累计出具企业信用报告6,800+份，覆盖全市1,200余家中小微企业。</p>',
      '<h3>风险预警</h3><p>签约企业享受持续信用监控服务：当企业信用评分下降超过5%、出现新增诉讼或行政处罚时，自动推送预警通知，平台风控专家48小时内提供应对建议。</p>'
    ],
    related: [
      { label: '金融产品推荐', link: '/footer/financial-products' },
      { label: '风险补偿机制', link: '/footer/risk-compensation' }
    ],
    meta: [
      { key: '数据源', value: '18类' },
      { key: '累计报告', value: '6,800+份' },
      { key: '覆盖企业', value: '1,200+家' },
      { key: '报告时效', value: 'T+0' }
    ]
  },
  {
    id: 'green-finance',
    category: 'platform',
    title: '绿色金融',
    subtitle: '低碳发展·绿色转型·金融赋能',
    icon: '🌿',
    summary: '绿色信贷、绿色债券、碳排放权质押融资，助力焦作企业绿色低碳转型与可持续发展。',
    body: [
      '<h3>政策背景</h3><p>焦作市作为国家资源枯竭型城市转型示范市，将绿色金融列入全市重点发展战略。2023年全市绿色贷款余额突破380亿元，同比增长46.3%。平台开设绿色金融专区，为符合绿色产业指导目录的企业提供专属融资通道。</p>',
      '<h3>产品类别</h3><ul><li><strong>绿色信贷：</strong>5家银行（工商银行、农业银行、中原银行、焦作中旅银行、洛阳银行）推出12款绿色信贷产品，利率较普通贷款下浮80~150BP</li><li><strong>碳排放权质押贷：</strong>以碳排放配额为质押物，单户额度最高500万元，期限1~3年</li><li><strong>绿色供应链金融：</strong>绿色核心企业的上下游供应商可享受免担保信用融资</li><li><strong>绿色项目贷：</strong>符合《绿色产业指导目录》的节能环保、清洁能源项目，额度最高3000万</li></ul>',
      '<h3>认定流程</h3><p>企业在线提交绿色认定申请 → 平台绿色金融专家审核 → 出具绿色认定书 → 进入绿色产品匹配流程。自专区上线以来，已为62家企业完成绿色认定，累计发放绿色贷款4.7亿元。</p>',
      '<h3>环境效益</h3><p>通过平台投放的绿色资金累计支持年减排CO₂约12.8万吨、节能量约5.6万吨标准煤、节水量约38万吨。</p>'
    ],
    related: [
      { label: '金融产品', link: '/footer/financial-products' },
      { label: '国家绿色政策', link: '/footer/national-policy' }
    ],
    meta: [
      { key: '认定企业', value: '62家' },
      { key: '发放贷款', value: '4.7亿' },
      { key: '年减排CO₂', value: '12.8万吨' },
      { key: '利率优惠', value: '80~150BP' }
    ]
  },
  {
    id: 'mediation',
    category: 'platform',
    title: '金融调解',
    subtitle: '多元化解·诉调对接·和谐金融',
    icon: '⚖️',
    summary: '金融消费纠纷一站式调解平台，对接焦作市金融纠纷诉调对接中心，免费为企业提供专业调解服务。',
    body: [
      '<h3>调解中心</h3><p>焦作市金融纠纷诉调对接中心驻智慧金融服务平台工作站成立于2022年3月，由市金融工作局、市中级人民法院、人行焦作市中心支行联合指导。现有专职调解员12名、兼职调解员28名，涵盖金融、法律、会计、评估等多领域。</p>',
      '<h3>调解范围</h3><ul><li>企业与银行之间的贷款合同纠纷、担保合同纠纷</li><li>企业与融资担保公司之间的追偿权纠纷</li><li>小额贷款、融资租赁、商业保理等类金融纠纷</li><li>其他金融消费争议（账户管理、信用卡、理财产品）</li></ul>',
      '<h3>调解流程</h3><p>在线申请调解 → 审核受理（2个工作日） → 指定调解员 → 组织调解（15个工作日内） → 达成协议/司法确认 → 履行跟踪。全流程线上化，进度可追踪。</p>',
      '<h3>诉调对接</h3><p>达成调解协议的，可申请焦作市中级人民法院司法确认，赋予强制执行力。调解不成的，引导进入诉讼程序，工作站提供诉讼文书辅导和律师资源对接。2023年累计受理调解申请245件，成功调解198件，成功率达80.8%，涉及金额1.2亿元。</p>'
    ],
    related: [
      { label: '联系我们', link: '/footer/contact-us' },
      { label: '服务案例', link: '/footer/cases' }
    ],
    meta: [
      { key: '调解员', value: '40名' },
      { key: '受理申请', value: '245件' },
      { key: '调解成功率', value: '80.8%' },
      { key: '涉及金额', value: '1.2亿元' }
    ]
  }
]

/** 政策指南 */
const policyGuides: FooterContentItem[] = [
  {
    id: 'national-policy',
    category: 'policy',
    title: '国家政策',
    subtitle: '国家层面支持中小企业融资的政策法规汇编',
    icon: '🇨🇳',
    summary: '汇集国务院、人民银行、金融监管总局等发布的中小企业融资支持政策，提供全文检索与解读服务。',
    body: [
      '<h3>最新政策</h3><ul><li><strong>《关于强化金融支持举措 助力民营经济发展壮大的通知》</strong>（2023.11）—— 人民银行、金融监管总局等八部门，提出25条金融支持举措</li><li><strong>《关于促进专精特新中小企业高质量发展的若干措施》</strong>（2024.01）—— 工信部、财政部，加大专精特新企业金融支持</li><li><strong>《关于建立小微企业融资协调工作机制的通知》</strong>（2024.03）—— 金融监管总局，建立县区级融资协调机制</li><li><strong>《关于银行业保险业做好2024年普惠金融工作的通知》</strong>（2024.04）—— 金融监管总局，全年普惠小微贷款增速不低于各项贷款增速</li></ul>',
      '<h3>重点政策解读</h3><p>平台专业团队对国家层面的重要金融政策进行逐条解读，提炼与企业融资直接相关的利好条款，形成政策速览、政策深读、政策对比三类产品，帮助企业快速把握政策要点。累计发布解读文章186篇。</p>',
      '<h3>政策工具箱</h3><p>平台提供国家中小企业发展专项资金、创业担保贷款贴息、小微企业融资担保降费奖补等财政金融工具的线上申报指引，企业可一键查询自身是否符合申报条件。</p>'
    ],
    related: [
      { label: '河南省政策', link: '/footer/provincial-policy' },
      { label: '焦作市政策', link: '/footer/city-policy' }
    ],
    meta: [
      { key: '收录政策', value: '300+' },
      { key: '解读文章', value: '186篇' },
      { key: '政策工具', value: '12类' },
      { key: '更新频率', value: '实时' }
    ]
  },
  {
    id: 'provincial-policy',
    category: 'policy',
    title: '河南省政策',
    subtitle: '河南省促进中小企业发展的金融政策与专项方案',
    icon: '📜',
    summary: '河南省人民政府及省地方金融监管局出台的惠企金融政策，含"万人助万企"、"专精特新贷"等专项方案。',
    body: [
      '<h3>省级政策动态</h3><ul><li><strong>《河南省金融支持经济高质量发展若干措施》</strong>（2024.02）—— 省政府办公厅，实施金融支持实体经济"十大行动"</li><li><strong>《河南省专精特新企业专项担保计划》</strong>（2024.05）—— 省财政厅、省地方金融监管局，设立5亿元风险补偿资金池</li><li><strong>《河南省"科技贷"业务实施方案（2024修订版）》</strong>—— 省科技厅、省财政厅，合作银行扩大至22家</li><li><strong>《河南省深化政府性融资担保体系建设实施方案》</strong>（2023.12）—— 省地方金融监管局，推动政府性融资担保机构支小支农主业占比80%以上</li></ul>',
      '<h3>"万人助万企"金融服务</h3><p>智慧金服平台是焦作市落实"万人助万企"活动的重要抓手。平台累计对接包联企业1,356家，收集融资需求1,870条，已解决需求1,563条，解决率83.6%。</p>',
      '<h3>省级奖补申报</h3><p>平台提供省级财政奖补项目的一站式申报服务：小微企业融资担保降费奖补、创业担保贷款贴息、科技贷风险补偿、知识产权质押融资补贴等。申报指南→材料清单→在线提交→进度查询，全流程电子化。</p>'
    ],
    related: [
      { label: '国家政策', link: '/footer/national-policy' },
      { label: '焦作市政策', link: '/footer/city-policy' }
    ],
    meta: [
      { key: '收录政策', value: '120+' },
      { key: '对接企业', value: '1,356家' },
      { key: '解决需求', value: '1,563条' },
      { key: '解决率', value: '83.6%' }
    ]
  },
  {
    id: 'city-policy',
    category: 'policy',
    title: '焦作市政策',
    subtitle: '焦作市惠企金融政策·本地化精准服务',
    icon: '🏙️',
    summary: '焦作市政府及市金融工作局出台的区域金融支持政策，含"焦作模式"特色举措与试点工程。',
    body: [
      '<h3>焦作金融政策体系</h3><p>焦作市作为国家级金融改革创新试点城市，探索形成了中小企业融资服务的"焦作模式"。核心政策包括：</p><ul><li><strong>《焦作市中小微企业融资促进条例》</strong>（2023年实施）—— 全省首部促进中小微企业融资的地方性法规，将平台建设和运营纳入法定要求</li><li><strong>《焦作市智慧金融服务平台管理办法》</strong>（2024修订）—— 明确平台运营管理、数据安全、服务标准等运行规范</li><li><strong>《焦作市企业应急转贷资金管理办法》</strong>—— 设立1.5亿元应急转贷资金，纾解企业"过桥"困难</li><li><strong>《焦作市信用体系建设示范区创建方案》</strong>—— 推进社会信用体系建设和信用信息共享</li></ul>',
      '<h3>特色举措</h3><ul><li><strong>"四个一"服务机制：</strong>一个平台统一入口、一张企业信用画像、一套智能匹配算法、一条龙融资服务</li><li><strong>"周五金融服务日"：</strong>每周五金融机构轮值坐诊，现场为企业答疑解惑</li><li><strong>"金融顾问制度"：</strong>为规上企业和重点培育企业配备一对一金融顾问，提供全年跟踪服务</li></ul>',
      '<h3>试点工程</h3><p>焦作市先后承担国家级普惠金融改革试验区、河南省信用体系建设示范区、河南省金融科技应用试点等任务。智慧金服平台作为核心基础设施，已为全国12个省市的金融平台建设提供了经验输出。</p>'
    ],
    related: [
      { label: '风险补偿', link: '/footer/risk-compensation' },
      { label: '公司简介', link: '/footer/company-intro' }
    ],
    meta: [
      { key: '应急转贷资金', value: '1.5亿元' },
      { key: '金融顾问', value: '56名' },
      { key: '服务日场次', value: '180+场' },
      { key: '全国推广', value: '12省市' }
    ]
  },
  {
    id: 'risk-compensation',
    category: 'policy',
    title: '风险补偿',
    subtitle: '政府风险补偿机制·银政担风险共担体系',
    icon: '🛡️',
    summary: '焦作市中小企业信贷风险补偿资金池和融资担保风险补偿机制，降低金融机构放贷风险。',
    body: [
      '<h3>风险补偿资金池</h3><p>焦作市设立中小企业信贷风险补偿资金池，初始规模2亿元，由市、县两级财政按6:4比例出资。资金池对合作银行发放的中小企业信用贷款，按照实际不良贷款本金的30%~50%进行补偿，单户补偿上限500万元。</p>',
      '<h3>银政担风险分担</h3><p>建立银行+政府+担保公司三方风险分担机制：</p><ul><li><strong>银行承担：</strong>不良贷款本金的20%~30%</li><li><strong>政府风险补偿资金池承担：</strong>30%~50%</li><li><strong>融资担保公司承担：</strong>20%~50%（担保类贷款）</li></ul>',
      '<h3>科技贷款风险补偿</h3><p>针对科技型中小企业，设立科技贷款风险补偿专项资金。对合作银行发放的"科技贷"，不良贷款本金由风险补偿资金承担60%，银行承担40%。截至目前，科技贷款风险补偿池规模8,000万元，累计撬动科技贷款9.6亿元，杠杆倍数12倍。</p>',
      '<h3>申报流程</h3><p>银行申报代偿 → 平台初审 → 第三方审计 → 资金池管委会审批 → 拨付补偿金。全流程不超过30个工作日。</p>'
    ],
    related: [
      { label: '金融产品', link: '/footer/financial-products' },
      { label: '焦作市政策', link: '/footer/city-policy' }
    ],
    meta: [
      { key: '资金池规模', value: '2亿元' },
      { key: '科技贷撬动', value: '12倍' },
      { key: '科技贷规模', value: '9.6亿元' },
      { key: '代偿审批时限', value: '30工作日' }
    ]
  }
]

/** 关于我们 */
const aboutUs: FooterContentItem[] = [
  {
    id: 'company-intro',
    category: 'about',
    title: '公司简介',
    subtitle: '焦作市智慧金融服务有限公司',
    icon: '🏢',
    summary: '焦作市智慧金融服务有限公司是经焦作市人民政府批准设立的国有独资公司，负责智慧金服平台的建设和运营。',
    body: [
      '<h3>公司概况</h3><p>焦作市智慧金融服务有限公司成立于2019年3月，注册资本5,000万元，是焦作市人民政府批准设立的国有独资公司，由市财政局（国资办）履行出资人职责。公司作为市属功能性国有平台，承担焦作市智慧金融服务平台的规划建设、运营管理和持续创新工作。</p>',
      '<h3>发展历程</h3><ul><li><strong>2019.03：</strong>公司正式成立，启动平台一期建设</li><li><strong>2020.06：</strong>智慧金服平台1.0正式上线，首批12家金融机构入驻</li><li><strong>2021.09：</strong>平台2.0升级，上线智能匹配与信用评分功能</li><li><strong>2022.12：</strong>注册企业突破5,000家，融资额突破50亿元</li><li><strong>2023.08：</strong>获评河南省数字化转型示范平台</li><li><strong>2024.06：</strong>平台3.0上线，融入AI大模型能力，绿色金融专区开通</li></ul>',
      '<h3>组织架构</h3><p>公司设综合管理部、平台运营部、技术研发部、金融合作部、风险管理部、数据合规部6个部门，现有员工68人，其中技术人员占比52%，硕士及以上学历占比38%。</p>',
      '<h3>荣誉资质</h3><p>河南省中小企业公共服务示范平台、河南省金融科技应用试点单位、焦作市数字化转型示范企业、ISO 27001信息安全管理体系认证、等保三级认证。</p>'
    ],
    related: [
      { label: '新闻中心', link: '/footer/news' },
      { label: '联系我们', link: '/footer/contact-us' }
    ],
    meta: [
      { key: '成立时间', value: '2019年3月' },
      { key: '注册资本', value: '5,000万元' },
      { key: '员工人数', value: '68人' },
      { key: '技术占比', value: '52%' }
    ]
  },
  {
    id: 'news',
    category: 'about',
    title: '新闻中心',
    subtitle: '平台资讯·行业动态·通知公告',
    icon: '📰',
    summary: '智慧金服平台最新动态、行业政策资讯、重要通知及媒体报道。',
    body: [
      '<h3>最新动态</h3><ul><li><strong>2024.06.15：</strong>智慧金服平台3.0版本正式发布，AI融资助手全面升级</li><li><strong>2024.05.28：</strong>焦作市绿色金融发展论坛成功举办，签约绿色项目12个</li><li><strong>2024.04.10：</strong>平台注册企业突破8,000家，累计融资额突破100亿元</li><li><strong>2024.03.22：</strong>河南省金融监管局调研组莅临平台考察指导</li><li><strong>2024.02.18：</strong>平台获评河南省"专精特新"中小企业公共服务平台</li><li><strong>2024.01.05：</strong>金融调解工作站2023年度工作总结及2024工作计划发布</li></ul>',
      '<h3>媒体报道</h3><ul><li><strong>《人民日报》2024.05.10：</strong>"焦作智慧金服：让数据多跑路，企业少跑腿"</li><li><strong>《河南日报》2024.03.15：</strong>"焦作模式破解中小企业融资难题"</li><li><strong>《金融时报》2023.12.08：</strong>"金融科技赋能普惠金融——焦作智慧金服平台调研"</li></ul>',
      '<h3>通知公告</h3><p>平台运营相关的系统升级、产品更新、政策调整等信息均在新闻中心发布，请入驻企业和合作金融机构定期关注。公告可通过类别（系统公告/政策公告/培训通知）和时间范围筛选。</p>'
    ],
    related: [
      { label: '公司简介', link: '/footer/company-intro' },
      { label: '服务案例', link: '/footer/cases' }
    ],
    meta: [
      { key: '注册企业', value: '8,000+' },
      { key: '累计融资', value: '100亿元+' },
      { key: '合作机构', value: '28家' },
      { key: '上线时间', value: '2020.06' }
    ]
  },
  {
    id: 'cases',
    category: 'about',
    title: '服务案例',
    subtitle: '成功融资案例·信用赋能故事',
    icon: '📋',
    summary: '精选平台服务案例，展示不同类型企业如何通过平台获得融资支持。',
    body: [
      '<h3>案例一：专精特新企业获贷1,000万元</h3><p><strong>企业：</strong>焦作市华创新材料科技有限公司（河南省"专精特新"中小企业）<br><strong>需求：</strong>扩大生产线，急需流动资金800万元<br><strong>方案：</strong>平台AI匹配"科技贷"产品（中原银行），企业信用评分85分（LOW风险），享受政府贴息后实际利率3.45%<br><strong>结果：</strong>平台提交申请→银行7个工作日审批→放款1,000万元。企业新增产值3,200万元，新增就业45人。</p>',
      '<h3>案例二：农业合作社首贷成功</h3><p><strong>企业：</strong>修武县郇封镇绿丰种植专业合作社（农民专业合作经济组织）<br><strong>需求：</strong>春耕备耕资金50万元<br><strong>难题：</strong>无抵押物、无信贷记录、财务不规范<br><strong>方案：</strong>平台信用体检出具评分报告（68分/MEDIUM风险），推荐农信社"乡村振兴贷"，焦作市中小担提供担保增信<br><strong>结果：</strong>10个工作日获批50万元，年利率4.2%（较基准利率下浮50BP）。合作社当年增收18万元。</p>',
      '<h3>案例三：制造业企业应急转贷</h3><p><strong>企业：</strong>焦作市宏远机械制造有限公司<br><strong>需求：</strong>1,200万元银行贷款到期，企业货款未回笼，急需转贷资金<br><strong>方案：</strong>平台对接焦作市应急转贷资金，申请1,200万元转贷资金，使用期限15天<br><strong>结果：</strong>2个工作日审批完毕，转贷资金直接划转银行归还旧贷，银行续贷放款后归还转贷资金。企业支付的日使用费仅为原过桥资金的1/5，节省财务成本约8万元。</p>',
      '<h3>案例四：绿色企业专项融资</h3><p><strong>企业：</strong>焦作市润泽新能源科技有限公司<br><strong>需求：</strong>光伏电站项目建设资金2,000万元<br><strong>方案：</strong>平台绿色认定→推荐农业银行"绿色项目贷"，期限5年，利率3.85%<br><strong>结果：</strong>项目建成后年发电量280万度，年减排CO₂约2,100吨，企业年增收约210万元。</p>'
    ],
    related: [
      { label: '公司简介', link: '/footer/company-intro' },
      { label: '联系我们', link: '/footer/contact-us' }
    ],
    meta: [
      { key: '累计服务案例', value: '500+' },
      { key: '平均融资额', value: '280万元' },
      { key: '最高单笔', value: '5,000万元' },
      { key: '平均审批', value: '3.5天' }
    ]
  },
  {
    id: 'contact-us',
    category: 'about',
    title: '联系我们',
    subtitle: '服务热线·办公地址·在线反馈',
    icon: '📞',
    summary: '焦作市智慧金融服务有限公司联系信息与服务渠道。',
    body: [
      '<h3>联系方式</h3><table><tr><td><strong>公司名称</strong></td><td>焦作市智慧金融服务有限公司</td></tr><tr><td><strong>办公地址</strong></td><td>河南省焦作市示范区中原路1365号 智慧金融大厦</td></tr><tr><td><strong>邮政编码</strong></td><td>454000</td></tr><tr><td><strong>客服热线</strong></td><td>0391-8379934（工作日 8:30-17:30）</td></tr><tr><td><strong>投诉建议</strong></td><td>0391-8379935</td></tr><tr><td><strong>电子邮箱</strong></td><td>service@jzsmartfinance.com</td></tr><tr><td><strong>官方网站</strong></td><td>www.jzsmartfinance.com</td></tr></table>',
      '<h3>交通指引</h3><p><strong>自驾：</strong>导航搜索"焦作市智慧金融大厦"（中原路与世纪路交叉口北100米路西）<br><strong>公交：</strong>乘13路、35路至"中原路世纪路口"站下车步行300米<br><strong>高铁：</strong>焦作站出站后乘出租车约15分钟到达</p>',
      '<h3>在线反馈</h3><p>平台提供24小时在线反馈通道：登录平台后进入"服务中心→意见反馈"提交问题，客服人员将在1个工作日内回复。企业用户也可通过平台AI客服机器人（页面右下角）进行实时咨询。</p>',
      '<h3>商务合作</h3><p>金融机构入驻、第三方服务合作、技术合作、品牌合作等商务事宜请联系市场合作部：<br>电话：0391-8379936<br>邮箱：partner@jzsmartfinance.com</p>'
    ],
    related: [
      { label: '公司简介', link: '/footer/company-intro' },
      { label: '服务案例', link: '/footer/cases' }
    ],
    meta: [
      { key: '客服热线', value: '0391-8379934' },
      { key: '邮箱', value: 'service@jzsmartfinance.com' },
      { key: '工作时间', value: '8:30-17:30' },
      { key: '反馈时效', value: '1工作日' }
    ]
  }
]

/** 导出全部内容 */
export const footerContent: FooterContentItem[] = [
  ...platformServices,
  ...policyGuides,
  ...aboutUs
]

/** 按分类索引 */
export const footerByCategory: Record<string, FooterContentItem[]> = {
  platform: platformServices,
  policy: policyGuides,
  about: aboutUs
}

/** 通过ID查找 */
export function getFooterContent(id: string): FooterContentItem | undefined {
  return footerContent.find(item => item.id === id)
}

/** 获取分类的中文名称 */
export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    platform: '平台服务',
    policy: '政策指南',
    about: '关于我们'
  }
  return map[category] || category
}

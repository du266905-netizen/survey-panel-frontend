/* Solution pages — copy library.

   2026-10-27: the six pages written this round used to carry their copy inside
   the component. It lives here now so the translation pass has one place to
   read and write.

   Languages: en-US, en-GB, zh-CN, zh-Hant are present. The fourteen others
   (de, fr, nl, da, es, fi, it, ja, ko, no, pt, ru, sv, tr) fall back to en-US
   until their rows are translated — same fallback the rest of the public site
   uses. Do not machine-fill them here; add a language only when it is read and
   approved.

   Market entry, qualitative, quantitative and the plans page keep their copy
   inline for now: their objects carry lucide icon components, which cannot be
   serialised into this file without a mapping. */

export const solutionPageCopy = {
  audience: {
  'en-US': {
    title: 'Who buys, why, and how they split.',
    lede: 'A target audience is a research condition, not a contact list.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
    schemeLabel: 'Audience plan',
    schemeTitle: 'Define whose voice matters first.',
    scheme: [
      'What decision should this research support?',
      'Whose perspective do you need?',
      'Market or region · Questionnaire language or local-expression needs',
      'Planned completed responses · Preferred timing',
      'Screening conditions, industry, or context to include',
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    title: 'Who buys, why, and how they split.',
    lede: 'A target audience is a research condition, not a contact list.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
    schemeLabel: 'Audience plan',
    schemeTitle: 'Define whose voice matters first.',
    scheme: [
      'What decision should this research support?',
      'Whose perspective do you need?',
      'Market or region · Questionnaire language or local-expression needs',
      'Planned completed responses · Preferred timing',
      'Screening conditions, industry, or context to include',
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    title: '谁在买、为什么、怎么分群。',
    lede: '目标受众是研究条件，不是联系人名单。',
    free: '免费开始',
    action: '联系销售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
    schemeLabel: '受众方案',
    schemeTitle: '先定义要听谁的声音。',
    scheme: [
      '这项研究要支持什么决策？',
      '你希望听到哪些人的看法？',
      '市场或地区 · 问卷语言或本地表达需求',
      '计划的有效样本数 · 希望的完成时间',
      '需要纳入的筛选条件、行业或背景',
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    title: '誰在買、為什麼、如何分群。',
    lede: '目標對象是一項研究條件，而非聯絡人名單。',
    free: '免費開始',
    action: '聯繫銷售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
    schemeLabel: '受眾方案',
    schemeTitle: '先界定誰的意見最重要。',
    scheme: [
      '這項研究應支持哪一項決策？',
      '你需要誰的觀點？',
      '市場或地區 · 問卷語言或在地用語需求',
      '預計完成回覆數 · 希望時程',
      '要納入的篩選條件、產業或背景資訊',
    ],
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
  productPricing: {
  'en-US': {
    sectionLabel: 'Three decisions',
    sections: [
      {
        n: '01',
        title: 'Concept',
        lines: [
          'The decision: whether the product is worth building.',
          'Monadic tests show each respondent one concept, so concepts do not affect each other’s scores.',
          'Purchase intent is asked before price, then price expectations; that gives a demand curve.',
          'Unique concepts tend to score lower on purchase intent. Read the two numbers together.',
        ],
      },
      {
        n: '02',
        title: 'Pack',
        lines: [
          'The decision: which design to run, and whether the information on the pack is understood.',
          'Test it on a shelf: what is seen first, whether the information is understood, how it handles in the hand.',
          'Virtual shelves, physical shelves and eye-tracking are the usual set-ups.',
        ],
      },
      {
        n: '03',
        title: 'Price',
        lines: [
          'The decision: where to set the price, and how wide the acceptable range is.',
          'PSM asks four prices - too expensive to consider, expensive but still worth it, a bargain, so cheap that quality is doubted - and gives the acceptable range and the optimal point.',
          'A Gabor-Granger ladder gives the demand curve.',
          'Conjoint weighs features and price together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sectionLabel: 'Three decisions',
    sections: [
      {
        n: '01',
        title: 'Concept',
        lines: [
          'The decision: whether the product is worth building.',
          'Monadic tests show each respondent one concept, so concepts do not affect each other’s scores.',
          'Purchase intent is asked before price, then price expectations; that gives a demand curve.',
          'Unique concepts tend to score lower on purchase intent. Read the two numbers together.',
        ],
      },
      {
        n: '02',
        title: 'Pack',
        lines: [
          'The decision: which design to run, and whether the information on the pack is understood.',
          'Test it on a shelf: what is seen first, whether the information is understood, how it handles in the hand.',
          'Virtual shelves, physical shelves and eye-tracking are the usual set-ups.',
        ],
      },
      {
        n: '03',
        title: 'Price',
        lines: [
          'The decision: where to set the price, and how wide the acceptable range is.',
          'PSM asks four prices - too expensive to consider, expensive but still worth it, a bargain, so cheap that quality is doubted - and gives the acceptable range and the optimal point.',
          'A Gabor-Granger ladder gives the demand curve.',
          'Conjoint weighs features and price together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sectionLabel: '三个决定',
    sections: [
      {
        n: '01',
        title: '概念',
        lines: [
          '定什么：这个产品值不值得做。',
          '单组测试，每人只看一个概念，概念之间不会互相拉分。',
          '先问购买意向，再问价格预期，才能得到需求曲线。',
          '独特性高的概念，购买意向偏低。两个数要一起看。',
        ],
      },
      {
        n: '02',
        title: '包装',
        lines: [
          '定什么：上哪一版设计，包装上的信息看不看得懂。',
          '放回货架环境里测：能不能被先看到，信息是否被理解，拿在手里好不好用。',
          '虚拟货架、实体货架、眼动，都是常用手段。',
        ],
      },
      {
        n: '03',
        title: '价格',
        lines: [
          '定什么：价格定在哪，可接受区间有多宽。',
          'PSM 问四个价：太贵不会考虑、贵但还值、划算、便宜到怀疑质量。由此得出可接受区间和最优价。',
          '要整条需求曲线，用 Gabor-Granger 的价格阶梯。',
          '要素和价格要一起权衡，用联合分析。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sectionLabel: '三個決定',
    sections: [
      {
        n: '01',
        title: '概念',
        lines: [
          '定什麼：這個產品值不值得做。',
          '單組測試，每人只看一個概念，概念之間不會互相拉分。',
          '先問購買意願，再問價格預期，才能得到需求曲線。',
          '獨特性高的概念，購買意願偏低。兩個數要一起看。',
        ],
      },
      {
        n: '02',
        title: '包裝',
        lines: [
          '定什麼：上哪一版設計，包裝上的訊息看不看得懂。',
          '放回貨架環境裡測：能不能被先看到，訊息是否被理解，拿在手裡好不好用。',
          '虛擬貨架、實體貨架、眼動，都是常用手段。',
        ],
      },
      {
        n: '03',
        title: '價格',
        lines: [
          '定什麼：價格定在哪，可接受區間有多寬。',
          'PSM 問四個價：太貴不會考慮、貴但還值、划算、便宜到懷疑品質。由此得出可接受區間和最優價。',
          '要整條需求曲線，用 Gabor-Granger 的價格階梯。',
          '要素和價格要一起權衡，用聯合分析。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
  brandComms: {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Brand health',
        lines: [
          'What it decides: whether the brand is gaining or losing ground, and where it stands against the brands it actually competes with.',
          'Tracking is a longitudinal study: the same metrics repeated wave by wave, read as change over time rather than as a single score.',
          'The usual metrics: unaided and aided awareness, consideration, usage, recommendation.',
        ],
      },
      {
        n: '02',
        title: 'Advertising and campaigns',
        lines: [
          'What it decides: whether this piece of work can run.',
          'Before launch, copy testing shows how the target audience responds to the text and the visuals, and whether the message is understood and remembered.',
          'After the campaign, the brand metrics are read against the pre-campaign wave.',
        ],
      },
      {
        n: '03',
        title: 'Running the tracker',
        lines: [
          'Continuous tracking reads the market before, during and after an event. Pulse waves suit moments you can predict, such as a launch.',
          'Keep the question wording and the sample stable. Changing the wording adds variance; changing the provider changes the sample.',
        ],
      },
      {
        n: '04',
        title: 'Our tracker',
        lines: [
          'Quarterly or biannual waves, a fixed question set, pre- and post-campaign comparison, and trends across waves.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sections: [
      {
        n: '01',
        title: 'Brand health',
        lines: [
          'What it decides: whether the brand is gaining or losing ground, and where it stands against the brands it actually competes with.',
          'Tracking is a longitudinal study: the same metrics repeated wave by wave, read as change over time rather than as a single score.',
          'The usual metrics: unaided and aided awareness, consideration, usage, recommendation.',
        ],
      },
      {
        n: '02',
        title: 'Advertising and campaigns',
        lines: [
          'What it decides: whether this piece of work can run.',
          'Before launch, copy testing shows how the target audience responds to the text and the visuals, and whether the message is understood and remembered.',
          'After the campaign, the brand metrics are read against the pre-campaign wave.',
        ],
      },
      {
        n: '03',
        title: 'Running the tracker',
        lines: [
          'Continuous tracking reads the market before, during and after an event. Pulse waves suit moments you can predict, such as a launch.',
          'Keep the question wording and the sample stable. Changing the wording adds variance; changing the provider changes the sample.',
        ],
      },
      {
        n: '04',
        title: 'Our tracker',
        lines: [
          'Quarterly or biannual waves, a fixed question set, pre- and post-campaign comparison, and trends across waves.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sections: [
      {
        n: '01',
        title: '品牌健康',
        lines: [
          '定什么：品牌在变强还是变弱，和真正竞争的那几个牌子比站在哪。',
          '追踪是纵向研究：同一套指标按波次重复，看的是变化，不是单次分数。',
          '常用指标：未提示与提示认知、考虑、使用、推荐。',
        ],
      },
      {
        n: '02',
        title: '广告与传播',
        lines: [
          '定什么：这一版能不能投。',
          '投放前测：目标人群对文案与画面的反应，信息是否被理解、被记住。',
          '投放后：品牌指标与投放前那一波对比。',
        ],
      },
      {
        n: '03',
        title: '追踪怎么跑',
        lines: [
          '连续追踪能读到事件之前、期间和之后；脉冲波次适合可预期的节点，比如上市。',
          '题目和样本要稳定。改题干会引入波动；换执行方会换掉样本。',
        ],
      },
      {
        n: '04',
        title: '我们的定量追踪',
        lines: [
          '按季度或半年一波，固定题组，投放前后对比，跨期可比。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sections: [
      {
        n: '01',
        title: '品牌健康',
        lines: [
          '定什麼：品牌在變強還是變弱，和真正競爭的那幾個牌子比站在哪。',
          '追蹤是縱向研究：同一套指標按波次重複，看的是變化，不是單次分數。',
          '常用指標：未提示與提示認知、考慮、使用、推薦。',
        ],
      },
      {
        n: '02',
        title: '廣告與傳播',
        lines: [
          '定什麼：這一版能不能投。',
          '投放前測：目標人群對文案與畫面的反應，訊息是否被理解、被記住。',
          '投放後：品牌指標與投放前那一波對比。',
        ],
      },
      {
        n: '03',
        title: '追蹤怎麼跑',
        lines: [
          '連續追蹤能讀到事件之前、期間和之後；脈衝波次適合可預期的節點，比如上市。',
          '題目和樣本要穩定。改題幹會引入波動；換執行方會換掉樣本。',
        ],
      },
      {
        n: '04',
        title: '我們的定量追蹤',
        lines: [
          '按季度或半年一波，固定題組，投放前後對比，跨期可比。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
  channelRetail: {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Distribution and availability',
        lines: [
          'What it decides: where the product is actually on sale, and where it is missing.',
          'A distribution check counts the stores that carry the listed products, and reads availability store by store rather than from the sales report.',
        ],
      },
      {
        n: '02',
        title: 'Shelf and price',
        lines: [
          'What it decides: whether the shelf position and the price hold up in the store.',
          'The same visit records facings, special displays and the price on the shelf, including the promoted price.',
        ],
      },
      {
        n: '03',
        title: 'Store execution',
        lines: [
          'What it decides: whether what was agreed is what happens at the counter.',
          'Mystery shopping sends a person in as an ordinary customer, against a fixed checklist: service, product knowledge, availability, the state of the store.',
          'Applied on a regular cycle, the same checklist shows whether a standard is holding across stores.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sections: [
      {
        n: '01',
        title: 'Distribution and availability',
        lines: [
          'What it decides: where the product is actually on sale, and where it is missing.',
          'A distribution check counts the stores that carry the listed products, and reads availability store by store rather than from the sales report.',
        ],
      },
      {
        n: '02',
        title: 'Shelf and price',
        lines: [
          'What it decides: whether the shelf position and the price hold up in the store.',
          'The same visit records facings, special displays and the price on the shelf, including the promoted price.',
        ],
      },
      {
        n: '03',
        title: 'Store execution',
        lines: [
          'What it decides: whether what was agreed is what happens at the counter.',
          'Mystery shopping sends a person in as an ordinary customer, against a fixed checklist: service, product knowledge, availability, the state of the store.',
          'Applied on a regular cycle, the same checklist shows whether a standard is holding across stores.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sections: [
      {
        n: '01',
        title: '铺货与可得性',
        lines: [
          '定什么：产品到底在哪些门店有售，哪里缺。',
          '铺货核查统计有多少门店在卖指定产品，逐店看有没有断货，而不是只看销售报表。',
        ],
      },
      {
        n: '02',
        title: '货架与价格',
        lines: [
          '定什么：排面位置和价格在店里站不站得住。',
          '同一次到店记录排面数、特殊陈列，以及货架上的价格，包括促销价。',
        ],
      },
      {
        n: '03',
        title: '门店执行',
        lines: [
          '定什么：谈好的东西，到了柜台是不是那样做。',
          '神秘顾客以普通顾客身份进店，按固定清单核查：服务、产品知识、是否有货、门店状态。',
          '按固定周期重复，同一张清单能看出标准在各店守不守得住。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sections: [
      {
        n: '01',
        title: '鋪貨與可得性',
        lines: [
          '定什麼：產品到底在哪些門市有售，哪裡缺。',
          '鋪貨核查統計有多少門市在賣指定產品，逐店看有沒有斷貨，而不是只看銷售報表。',
        ],
      },
      {
        n: '02',
        title: '貨架與價格',
        lines: [
          '定什麼：排面位置和價格在店裡站不站得住。',
          '同一次到店記錄排面數、特殊陳列，以及貨架上的價格，包括促銷價。',
        ],
      },
      {
        n: '03',
        title: '門市執行',
        lines: [
          '定什麼：談好的東西，到了櫃台是不是那樣做。',
          '神秘顧客以普通顧客身分進店，按固定清單核查：服務、產品知識、是否有貨、門市狀態。',
          '按固定週期重複，同一張清單能看出標準在各店守不守得住。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
  customerExperience: {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Satisfaction',
        lines: [
          'What it decides: which part of the experience is costing you customers.',
          'Ask for overall satisfaction and for satisfaction with each part of the product or service; the gap between the two says where the problem sits.',
        ],
      },
      {
        n: '02',
        title: 'Why customers leave',
        lines: [
          'What it decides: who is about to leave, and why.',
          'Churn analysis reads behaviour, transactions and survey feedback together, and asks the people who have already left what ended it.',
        ],
      },
      {
        n: '03',
        title: 'Where it breaks',
        lines: [
          'What it decides: the step where customers get stuck.',
          'Journey mapping lays the touchpoints, the interactions and the feelings out in order, and marks the friction and the drop-offs.',
          'Real journeys are rarely a straight line: they loop, they re-enter, they stop.',
        ],
      },
      {
        n: '04',
        title: 'What keeps them',
        lines: [
          'What it decides: whether retention is improving or just holding.',
          'Retention rate and customer lifetime value are the two numbers to keep on the page; everything else is a reason for these two.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sections: [
      {
        n: '01',
        title: 'Satisfaction',
        lines: [
          'What it decides: which part of the experience is costing you customers.',
          'Ask for overall satisfaction and for satisfaction with each part of the product or service; the gap between the two says where the problem sits.',
        ],
      },
      {
        n: '02',
        title: 'Why customers leave',
        lines: [
          'What it decides: who is about to leave, and why.',
          'Churn analysis reads behaviour, transactions and survey feedback together, and asks the people who have already left what ended it.',
        ],
      },
      {
        n: '03',
        title: 'Where it breaks',
        lines: [
          'What it decides: the step where customers get stuck.',
          'Journey mapping lays the touchpoints, the interactions and the feelings out in order, and marks the friction and the drop-offs.',
          'Real journeys are rarely a straight line: they loop, they re-enter, they stop.',
        ],
      },
      {
        n: '04',
        title: 'What keeps them',
        lines: [
          'What it decides: whether retention is improving or just holding.',
          'Retention rate and customer lifetime value are the two numbers to keep on the page; everything else is a reason for these two.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sections: [
      {
        n: '01',
        title: '满意度',
        lines: [
          '定什么：体验里哪一段在让你丢客户。',
          '整体满意度和分项满意度一起问：产品、服务各环节各打一分。两个数的落差说明问题在哪。',
        ],
      },
      {
        n: '02',
        title: '为什么走',
        lines: [
          '定什么：谁要走，为什么走。',
          '流失分析把行为、交易与问卷反馈放在一起看，并去问已经走掉的人：是什么让他们停下的。',
        ],
      },
      {
        n: '03',
        title: '在哪一步断',
        lines: [
          '定什么：客户卡在哪一步。',
          '旅程把触点、互动和情绪按顺序排出来，标出摩擦点和断点。',
          '真实旅程很少是一条直线：会回头，会重新进入，也会中途停下。',
        ],
      },
      {
        n: '04',
        title: '靠什么留下',
        lines: [
          '定什么：留存是在变好，还是只是没变差。',
          '留存率与客户终身价值是留在页面上的两个数，其余都是这两个数的原因。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sections: [
      {
        n: '01',
        title: '滿意度',
        lines: [
          '定什麼：體驗裡哪一段在讓你流失客戶。',
          '整體滿意度和分項滿意度一起問：產品、服務各環節各打一分。兩個數的落差說明問題在哪。',
        ],
      },
      {
        n: '02',
        title: '為什麼走',
        lines: [
          '定什麼：誰要走，為什麼走。',
          '流失分析把行為、交易與問卷回饋放在一起看，並去問已經走掉的人：是什麼讓他們停下的。',
        ],
      },
      {
        n: '03',
        title: '在哪一步斷',
        lines: [
          '定什麼：客戶卡在哪一步。',
          '旅程把觸點、互動和情緒按順序排出來，標出摩擦點和斷點。',
          '真實旅程很少是一條直線：會回頭，會重新進入，也會中途停下。',
        ],
      },
      {
        n: '04',
        title: '靠什麼留下',
        lines: [
          '定什麼：留存是在變好，還是只是沒變差。',
          '留存率與客戶終身價值是留在頁面上的兩個數，其餘都是這兩個數的原因。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
  mixedMethods: {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'When it is worth it',
        lines: [
          'What it decides: one question split in two, one half asking why, the other asking how many.',
          'Qualitative work alone cannot give you a share. Quantitative work alone cannot give you the reason.',
        ],
      },
      {
        n: '02',
        title: 'The seam',
        lines: [
          'The second stage draws its people from the first instead of recruiting again.',
          'Respondents who answered one way in the survey go on to the interview. The first stage decides who the second talks to.',
        ],
      },
      {
        n: '03',
        title: 'The order',
        lines: [
          'Qualitative first, then quantitative: find the hypotheses, then size them.',
          'Quantitative first, then qualitative: find the group that behaves unexpectedly, then ask why.',
          'Both at once: the second stage starts while the first is still fielding.',
        ],
      },
      {
        n: '04',
        title: 'Not by default',
        lines: [
          'The industry does not agree on what "mixed" means.',
          'There is one test: did the second stage use the sample or the findings of the first? If not, it is two projects stapled together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sections: [
      {
        n: '01',
        title: 'When it is worth it',
        lines: [
          'What it decides: one question split in two, one half asking why, the other asking how many.',
          'Qualitative work alone cannot give you a share. Quantitative work alone cannot give you the reason.',
        ],
      },
      {
        n: '02',
        title: 'The seam',
        lines: [
          'The second stage draws its people from the first instead of recruiting again.',
          'Respondents who answered one way in the survey go on to the interview. The first stage decides who the second talks to.',
        ],
      },
      {
        n: '03',
        title: 'The order',
        lines: [
          'Qualitative first, then quantitative: find the hypotheses, then size them.',
          'Quantitative first, then qualitative: find the group that behaves unexpectedly, then ask why.',
          'Both at once: the second stage starts while the first is still fielding.',
        ],
      },
      {
        n: '04',
        title: 'Not by default',
        lines: [
          'The industry does not agree on what "mixed" means.',
          'There is one test: did the second stage use the sample or the findings of the first? If not, it is two projects stapled together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sections: [
      {
        n: '01',
        title: '什么时候值得',
        lines: [
          '定什么：一个问题分成两半，一半问为什么，一半问有多大。',
          '只做定性，答不出比例；只做定量，答不出原因。',
        ],
      },
      {
        n: '02',
        title: '接缝',
        lines: [
          '后一段的人从前一段里挑，不重新招。',
          '问卷里回答是某一种的人，接着进访谈。前一段决定后一段去问谁。',
        ],
      },
      {
        n: '03',
        title: '顺序',
        lines: [
          '先定性后定量：先把假设挖出来，再验证范围。',
          '先定量后定性：先找出行为异常的那一群，再回头问为什么。',
          '两段同时跑：前一段还在收数据，后一段已经开始。',
        ],
      },
      {
        n: '04',
        title: '别默认混合',
        lines: [
          '行业里对「混合」的定义本身就不统一。',
          '判断只有一条：后一段有没有用上前一段的样本或发现。用不上，就是两个项目拼在一起。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sections: [
      {
        n: '01',
        title: '什麼時候值得',
        lines: [
          '定什麼：一個問題分成兩半，一半問為什麼，一半問有多大。',
          '只做定性，答不出比例；只做定量，答不出原因。',
        ],
      },
      {
        n: '02',
        title: '接縫',
        lines: [
          '後一段的人從前一段裡挑，不重新招。',
          '問卷裡回答是某一種的人，接著進訪談。前一段決定後一段去問誰。',
        ],
      },
      {
        n: '03',
        title: '順序',
        lines: [
          '先定性後定量：先把假設挖出來，再驗證範圍。',
          '先定量後定性：先找出行為異常的那一群，再回頭問為什麼。',
          '兩段同時跑：前一段還在收資料，後一段已經開始。',
        ],
      },
      {
        n: '04',
        title: '別預設混合',
        lines: [
          '行業裡對「混合」的定義本身就不統一。',
          '判斷只有一條：後一段有沒有用上前一段的樣本或發現。用不上，就是兩個專案拼在一起。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
},
};

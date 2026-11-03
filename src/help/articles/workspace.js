/* Start and projects: the workspace, the list of projects, the editor, the launch. */

const article = (slug, category, zh, en) => ({ slug, category, zh, en });

export const WORKSPACE = [
  article('overview', 'start', {
    title: '工作区总览',
    summary: '登录之后看到什么，六个入口各管一件事。',
    blocks: [
      { p: '工作区分两块：左边是固定的导航，右边是当前页面。余额、项目、问卷、结果都在左侧进入，页面本身不藏二级菜单。' },
      { h: '左侧的六个入口' },
      {
        steps: [
          '概览：当前状态与下一步。',
          'AI 研究引导：从一句需求开始起草研究。',
          '问卷编辑器：逐题编辑问卷。',
          '项目：全部项目与进度。',
          '问卷结果：已经回收的结果。',
          'Settings：账户、发票与账单、账户预算、帮助中心。',
        ],
      },
      { h: '右边是什么' },
      { p: '右边永远是单个页面，不叠加抽屉。切换入口等于换页面，浏览器后退键有效。' },
      { h: '余额在哪里看' },
      { p: '概览页顶部显示当前余额。余额不足时，发起项目会提示先充值。' },
      { h: '语言' },
      { p: '界面跟随账户语言设置，中英文各一套文案。切换语言不改变项目数据。' },
      { h: '找不到功能时' },
      {
        steps: [
          '先看左侧是否有对应入口。',
          '再看当前项目是否已经创建：编辑器与结果都要先有项目。',
          '仍找不到时，用右下角客服说明你要做的事。',
        ],
      },
      { note: '左侧入口的图标与文字一一对应，不会因为屏幕变窄而隐藏。' },
    ],
  }, {
    title: 'The workspace at a glance',
    summary: 'What you land on, and what each of the six entries is for.',
    blocks: [
      { p: 'The workspace has two parts: a fixed rail on the left and one page on the right. Balance, projects, questionnaires, and results all enter from the rail; pages do not hide a second menu.' },
      { h: 'The six entries' },
      {
        steps: [
          'Overview: where things stand and what to do next.',
          'AI research brief: start from one sentence of intent.',
          'Questionnaire editor: edit the questionnaire question by question.',
          'Projects: every project and its progress.',
          'Questionnaire results: collected results.',
          'Settings: account, billing and invoices, budgets, help centre.',
        ],
      },
      { h: 'The right-hand side' },
      { p: 'Always a single page, never a stack of drawers. Switching entries swaps the page, and the browser back button works.' },
      { h: 'Where the balance is' },
      { p: 'At the top of Overview. When it is short, starting a project asks for a top-up first.' },
      { h: 'Language' },
      { p: 'The interface follows the account language, with Chinese and English copy. Switching does not touch project data.' },
      { h: 'When something is missing' },
      {
        steps: [
          'Check the rail for the entry.',
          'Check whether the project exists: the editor and results need one first.',
          'If it is still missing, tell support what you were trying to do.',
        ],
      },
      { note: 'Every rail icon has a label; nothing is hidden when the window narrows.' },
    ],
  }),

  article('first-steps', 'start', {
    title: '第一个项目的前三步',
    summary: '从开通到能发问卷，最短的一条路。',
    blocks: [
      { p: '开通后不需要配置什么，三个动作就能发出第一份问卷：填账单信息、建项目、发问卷。' },
      { h: '第一步：账单信息' },
      { p: '在充值页或账户页填完六项。没有它不能充值，也就不能启动项目。详细字段见「填写账单信息」。' },
      { h: '第二步：建项目' },
      {
        steps: [
          '进入「项目」，点「新建项目」。',
          '填写项目名称与一句话目标。',
          '选择研究类型与目标市场。',
          '保存后进入项目详情。',
        ],
      },
      { h: '第三步：问卷与发布' },
      {
        steps: [
          '在项目里进入问卷编辑器。',
          '逐题确认或修改，AI 草稿可以直接用。',
          '检查逻辑与配额后发布。',
          '发布后把链接或样本需求交给招募环节。',
        ],
      },
      { h: '多少钱够' },
      { p: '单次充值最低 US$100。项目成本取决于样本量与题目长度，发布前页面会给出预估。' },
      { h: '多久能收数据' },
      { p: '发布并通过审核后开始收数据，速度取决于目标人群与配额。结果页会实时更新。' },
      { note: '先跑一个小样本，确认题目与逻辑，再放量。改题会作废已经回收的部分数据。' },
    ],
  }, {
    title: 'The first project, in three moves',
    summary: 'From an open account to a live questionnaire by the shortest route.',
    blocks: [
      { p: 'Nothing needs configuring after opening an account. Three moves get the first questionnaire out: billing details, a project, a launch.' },
      { h: 'One: billing details' },
      { p: 'Fill the six fields on the Add funds or Account page. Without them there is no top-up, and without a balance a project cannot start. The fields are in “Billing details”.' },
      { h: 'Two: the project' },
      {
        steps: [
          'Open Projects and select New project.',
          'Enter a name and a one-line objective.',
          'Choose the research type and the target market.',
          'Save; the project detail opens.',
        ],
      },
      { h: 'Three: questionnaire and launch' },
      {
        steps: [
          'Open the questionnaire editor from the project.',
          'Check or edit each question; the AI draft is usable as is.',
          'Review logic and quotas, then launch.',
          'Send the link or the sample request into recruiting.',
        ],
      },
      { h: 'How much to fund' },
      { p: 'The minimum top-up is US$100. Project cost follows sample size and questionnaire length, and the launch page shows an estimate first.' },
      { h: 'How soon data arrives' },
      { p: 'Collection starts after launch and review, at a pace set by the audience and quotas. Results update live.' },
      { note: 'Run a small sample first. Editing questions after launch voids the answers already collected.' },
    ],
  }),

  article('projects', 'projects', {
    title: '项目',
    summary: '新建、复制、归档，以及状态各自代表什么。',
    blocks: [
      { p: '项目是工作区里的工作单元：一个项目对应一份问卷、一批样本和一组结果。' },
      { h: '新建' },
      {
        steps: [
          '进入「项目」，点「新建项目」。',
          '填写名称、目标与目标市场。',
          '选择研究类型。',
          '保存。',
        ],
      },
      { h: '状态' },
      {
        steps: [
          '草稿：还能改问卷，不能收数据。',
          '进行中：已发布，正在收数据。',
          '已结束：停止收数据，结果只读。',
          '已归档：从列表收起，数据仍在。',
        ],
      },
      { h: '复制' },
      { p: '复制项目会带上问卷与配额，不带结果与付款记录。适合做同题目的下一轮。' },
      { h: '归档与删除' },
      { p: '归档只是从默认列表里收起，可以恢复。删除不可恢复，结果与导出一起消失。' },
      { h: '一个项目能改几次问卷' },
      { p: '发布前随意改。发布后改题会让已回收的部分数据失去对应关系，需要评估后再动。' },
      { note: '项目名称会出现在导出文件名里，起一个能检索的名字。' },
    ],
  }, {
    title: 'Projects',
    summary: 'Creating, duplicating, archiving, and what each status means.',
    blocks: [
      { p: 'A project is the unit of work: one questionnaire, one sample, one set of results.' },
      { h: 'Creating one' },
      {
        steps: [
          'Open Projects and select New project.',
          'Enter a name, an objective, and the target market.',
          'Choose the research type.',
          'Save.',
        ],
      },
      { h: 'Statuses' },
      {
        steps: [
          'Draft: editable, collecting nothing.',
          'Live: launched and collecting.',
          'Closed: collection stopped, results read-only.',
          'Archived: hidden from the list, data intact.',
        ],
      },
      { h: 'Duplicating' },
      { p: 'A copy carries the questionnaire and quotas, not the results or the payment records. Useful for another wave of the same study.' },
      { h: 'Archiving and deleting' },
      { p: 'Archiving only hides the project and is reversible. Deleting is not, and takes the results and exports with it.' },
      { h: 'How often the questionnaire can change' },
      { p: 'Freely before launch. After launch, an edit breaks the link to answers already collected, so weigh it first.' },
      { note: 'The project name becomes the export filename: make it searchable.' },
    ],
  }),

  article('questionnaire', 'projects', {
    title: '问卷编辑器',
    summary: '题目、逻辑、预估时长，以及 AI 草稿怎么用。',
    blocks: [
      { p: '编辑器一次处理一份问卷：左边题目列表，中间当前题目，右边题目设置。' },
      { h: '题型' },
      { p: '单选、多选、量表、开放题、排序与矩阵。量表默认五档，可以改成七档。' },
      { h: '用 AI 草稿' },
      {
        steps: [
          '在项目里点「生成草稿」。',
          '用一句话写清研究目标与目标人群。',
          '生成后逐题检查，不合适的直接改。',
          '保存为当前版本。',
        ],
      },
      { h: '逻辑' },
      { p: '题目可以设置显示条件：上一题的选项、配额是否已满、样本来源。逻辑改完后要在预览里走一遍每条分支。' },
      { h: '预估时长' },
      { p: '编辑器按题量与题型给出预估。超过 15 分钟的问卷，完成率会明显下降，通常建议拆成两份。' },
      { h: '翻译' },
      { p: '多语言问卷逐题填写各语言版本，缺语言的题目会在发布检查里报出来。' },
      { h: '发布前自检' },
      {
        steps: [
          '每条逻辑分支都走通。',
          '必填与选填符合预期。',
          '配额与目标人群一致。',
          '预览在手机上显示正常。',
        ],
      },
      { note: '发布后改题会让已回收数据对不上题目，必要时新建一轮。' },
    ],
  }, {
    title: 'The questionnaire editor',
    summary: 'Questions, logic, estimated length, and how to use the AI draft.',
    blocks: [
      { p: 'The editor works on one questionnaire at a time: question list on the left, the open question in the middle, its settings on the right.' },
      { h: 'Question types' },
      { p: 'Single choice, multiple choice, scale, open text, ranking, and matrix. Scales default to five points and can be set to seven.' },
      { h: 'Using the AI draft' },
      {
        steps: [
          'Select Generate draft inside the project.',
          'Describe the objective and the audience in one sentence.',
          'Review question by question and edit what does not fit.',
          'Save it as the current version.',
        ],
      },
      { h: 'Logic' },
      { p: 'A question can depend on an earlier answer, a full quota, or the sample source. After changing logic, walk every branch in preview.' },
      { h: 'Estimated length' },
      { p: 'Estimated from the count and types of questions. Past fifteen minutes completion falls sharply, so split the study instead.' },
      { h: 'Translations' },
      { p: 'Fill each language per question. A missing language is reported by the launch check.' },
      { h: 'Before launching' },
      {
        steps: [
          'Every logic branch resolves.',
          'Required and optional match the intent.',
          'Quotas match the audience.',
          'Preview renders on a phone.',
        ],
      },
      { note: 'Editing after launch desynchronises the answers already collected; start a new wave when needed.' },
    ],
  }),

  article('launch', 'projects', {
    title: '发布问卷',
    summary: '发布前检查什么、发布之后能改什么、怎么停。',
    blocks: [
      { p: '发布把草稿变成可收数据的问卷。发布前最后一次检查，比发布后补救便宜得多。' },
      { h: '发布检查' },
      {
        steps: [
          '题目是否都有各语言版本。',
          '逻辑分支是否都能走通。',
          '配额是否填了。',
          '余额是否够跑完这一轮。',
        ],
      },
      { h: '发布' },
      { p: '点「发布」后问卷进入进行中。链接开始有效，样本开始进入，结果页开始计数。' },
      { h: '发布后能改什么' },
      {
        steps: [
          '能改：标题、说明、结束语、配额上限。',
          '谨慎改：选项文案，会影响已回收数据的统计口径。',
          '不能改：删除题目，会让已有答案失去对应。',
        ],
      },
      { h: '暂停与结束' },
      { p: '暂停停止收新样本，已回收的数据保留。结束是终态，之后结果只读。' },
      { h: '发布失败' },
      { p: '常见原因是余额不足、配额为空、语言版本缺失。按提示补齐后重新发布，不会重复收数据。' },
      { note: '发布后先自己用手机填一遍，确认跳转与结束页，再开始放量。' },
    ],
  }, {
    title: 'Launching a questionnaire',
    summary: 'What the check looks for, what can change afterwards, and how to stop.',
    blocks: [
      { p: 'Launch turns a draft into something that collects. The last check before launch is cheaper than any repair after it.' },
      { h: 'The launch check' },
      {
        steps: [
          'Every question has each language.',
          'Every logic branch resolves.',
          'Quotas are filled in.',
          'The balance covers the wave.',
        ],
      },
      { h: 'Launch' },
      { p: 'Select Launch and the questionnaire goes live: links become valid, sample starts arriving, and results begin counting.' },
      { h: 'What can change afterwards' },
      {
        steps: [
          'Safe: title, description, closing text, quota caps.',
          'Careful: option wording, which shifts how collected answers are counted.',
          'Not safe: deleting a question, which orphans the answers to it.',
        ],
      },
      { h: 'Pausing and closing' },
      { p: 'Pause stops new sample and keeps the data. Closing is final; results become read-only.' },
      { h: 'A failed launch' },
      { p: 'Usually a short balance, an empty quota, or a missing language. Fix and relaunch; nothing is collected twice.' },
      { note: 'After launch, fill the questionnaire yourself on a phone and check the ending before scaling up.' },
    ],
  }),
];

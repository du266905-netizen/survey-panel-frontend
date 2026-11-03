/* Start: who we are, and the one place that records what changed. */

const article = (slug, category, zh, en) => ({ slug, category, zh, en });

export const START_EXTRAS = [
  article('about', 'start', {
    title: '我们是谁',
    summary: '关尼搜索做什么，按什么标准做研究，以及你可以期待什么。',
    blocks: [
      { p: '关尼搜索连接大中华区、亚太、中东、欧洲与北美的研究网络，把一手消费者声音转化为组织可以据以决策的证据。' },
      { h: '我们做什么' },
      { p: '我们为品牌、机构与研究团队提供从问题设计到样本收集、从数据清理到结论呈现的一整套研究服务。项目可以只是一次快速验证，也可以是需要连续追踪几个月的多轮研究。' },
      { p: '平台把这些工作放在同一个空间里：项目、问卷、样本、结果与账单各自对应一个入口，不需要在工具之间搬运数据。' },
      { h: '我们怎么工作' },
      { p: '研究按科学的样本设计与严谨的定性、定量方法推进。每一道题、每一次抽样、每一份报告，都要能说明它是怎么来的，这是我们对交付的基本要求。' },
      { p: '在方法上我们不做折中：样本量不足时说明它能支持什么结论、不能支持什么结论；配额没填满时标注清楚；开放题的编码口径随报告一起交付。' },
      { h: '我们遵守什么' },
      { p: '我们遵循国际通行的研究伦理与数据隐私标准：参与自愿、知情同意、匿名处理、数据最小化。受访者可以随时退出，退出不影响已获得的报酬。' },
      { p: '涉及个人信息的数据只在研究目的范围内使用，对外交付前做去标识化处理。客户数据不用于其他客户的项目，也不对外披露。' },
      { h: '你可以期待什么' },
      { p: '每个项目都有明确的时间、样本与口径说明，交付物可以直接引用。遇到问题时，客服会先核对记录再回答，不会让你重复描述同一件事。' },
      { p: '我们对结果的判断保持克制：数据能支持的结论我们写清楚，不能支持的我们不会替它下判断。' },
      { note: '想了解具体做法，从「如何写好问卷题目」开始，或在右下角直接找我们。' },
    ],
  }, {
    title: 'Who we are',
    summary: 'What guanyisearch does, the standards we work to, and what you can expect.',
    blocks: [
      { p: 'guanyisearch connects research networks across Greater China, Asia-Pacific, the Middle East, Europe and North America, turning first-hand consumer voices into evidence organisations can decide on.' },
      { h: 'What we do' },
      { p: 'We run research end to end for brands, institutions and research teams: from framing the question, through sample and collection, to cleaned data and a defensible set of conclusions. A project can be a single validation or a study tracked over months.' },
      { p: 'The platform keeps that work in one place. Projects, questionnaires, sample, results and billing each have an entry of their own, so nothing has to be carried between tools.' },
      { h: 'How we work' },
      { p: 'Studies follow scientific sample design and disciplined qualitative and quantitative method. Every question, every sample and every report has to be able to explain where it came from, and that is the baseline for delivery.' },
      { p: 'We do not compromise on method: when a sample is small we say what it can support and what it cannot; when a quota is not full we label it; when open answers are coded, the coding frame ships with the report.' },
      { h: 'What we hold to' },
      { p: 'We work to internationally recognised research ethics and data privacy standards: voluntary participation, informed consent, anonymity, and data minimisation. Respondents can leave at any point without losing what they have earned.' },
      { p: 'Personal data is used only within the purpose of the study and de-identified before it leaves the project. Client data is not used for another client and is not disclosed.' },
      { h: 'What you can expect' },
      { p: 'Every project carries a clear statement of timing, sample and definitions, so the deliverable can be quoted directly. When something goes wrong, support checks the record first rather than asking you to explain it again.' },
      { p: 'We stay measured about what the data says. Conclusions the data supports are stated plainly; conclusions it does not support are not written for it.' },
      { note: 'For the practical side, start with “Writing good survey questions”, or use the chat in the bottom-right corner.' },
    ],
  }),

  article('changelog', 'start', {
    title: '更新日志',
    summary: '我们持续发布新版本，这里记录每次更新带来的变化。',
    blocks: [
      { p: '我们每天都会看用户怎么使用这套工具：哪些步骤被反复询问、哪些页面停留最久、哪些反馈反复出现。产品更新是从这些观察里长出来的，而不是按一份排期清单做出来的。' },
      { p: '每一次发布都围绕三件事：让研究流程更短，让数据更可复核，让协作更省心。新功能、体验调整与问题修复会汇总在这一页，按批次记录，只写会影响你使用方式的部分，读得完、对得上。' },
      { p: '我们同样重视你的判断。如果某个流程与你习惯的做法不同，或者帮助中心的说明与实际页面不一致，把页面与操作时间发给右下角的客服。你的意见会进入下一轮排期，而不只是留在一条记录里。' },
      { p: '更新不会打断进行中的项目：已发布的问卷、已回收的数据与已开出的发票不受影响，变化只发生在你下次打开页面时。需要保留某一版的导出结果时，按导出时间另存即可。' },
    ],
  }, {
    title: 'What’s new',
    summary: 'We ship often. This page records what each release changed.',
    blocks: [
      { p: 'We watch how the product is actually used every day: which steps keep getting asked about, which pages hold people longest, which pieces of feedback keep returning. Releases grow out of those observations rather than a release calendar.' },
      { p: 'Each release works on three things: a shorter path through the research flow, data that can be checked, and less friction when several people work together. New capability, experience changes and fixes are recorded here in batches, limited to what changes the way you work.' },
      { p: 'Your judgement matters as much as our reading of the data. If a step differs from the way you would do it, or this help centre disagrees with the screen in front of you, send the page and the time to the chat in the bottom-right corner. What you send goes into the next round of work, not just into a record.' },
      { p: 'Updates do not interrupt a study in flight: published questionnaires, collected data and issued invoices are untouched, and a change only appears the next time you open the page. Keep an export if you need to hold a particular version.' },
    ],
  }),
];

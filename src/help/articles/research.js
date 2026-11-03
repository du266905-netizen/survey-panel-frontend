/* Results: reading them, and getting them out. */

const article = (slug, category, zh, en) => ({ slug, category, zh, en });

export const RESEARCH = [
  article('results', 'results', {
    title: '查看问卷结果',
    summary: '结果页怎么读，样本量与配额不够时意味着什么。',
    blocks: [
      { p: '结果页按问卷回收的数据实时统计，不需要手动刷新，也不会因为导出而锁定。' },
      { h: '页面结构' },
      {
        steps: [
          '顶部是样本量与完成率。',
          '中间按题目顺序给出分布。',
          '开放题按原文列出，可搜索。',
          '右侧可以切题目或跳到某一题。',
        ],
      },
      { h: '样本量先看这个' },
      { p: '任何分布都要先看样本量。几十份的差异不构成结论，尤其分组之后。分组样本低于 30 时只作参考。' },
      { h: '配额没满' },
      { p: '配额未满时分布会偏向先到的人群。等配额填满再读比例，或者只看已完成的部分。' },
      { h: '开放题' },
      { p: '开放题不做自动归类，按原文展示。要按关键词看，用搜索；要整体看，导出后处理。' },
      { h: '数据会变' },
      { p: '进行中的问卷，数字每收到一份就变。做判断前记下时间点，或等问卷结束后再引用。' },
      { h: '和导出的关系' },
      { p: '结果页是视图，导出是快照。两者在时间上不一致时，以导出文件的生成时间为准。' },
      { note: '结束后的问卷结果只读，不会再变，适合作为引用口径。' },
    ],
  }, {
    title: 'Reading questionnaire results',
    summary: 'How the results page reads, and what small samples and open quotas actually mean.',
    blocks: [
      { p: 'The results page counts what has been collected, live. Nothing needs refreshing, and exporting does not lock it.' },
      { h: 'What is on the page' },
      {
        steps: [
          'Sample size and completion at the top.',
          'A distribution per question in order.',
          'Open answers as written, searchable.',
          'A jump list on the right.',
        ],
      },
      { h: 'Read the base first' },
      { p: 'Every percentage needs its base. Differences across a few dozen responses are noise, especially once split into groups. Treat a subgroup under thirty as directional only.' },
      { h: 'Quotas not full' },
      { p: 'An unfilled quota skews towards whoever arrived first. Wait for the quota or read only the completed portion.' },
      { h: 'Open answers' },
      { p: 'They are not auto-coded and appear as written. Search to read by keyword; export to read as a whole.' },
      { h: 'The numbers move' },
      { p: 'While a questionnaire is live, every response changes them. Note the time before quoting, or wait until it closes.' },
      { h: 'Results versus exports' },
      { p: 'The page is a view, an export is a snapshot. When they disagree, the export’s generated time decides.' },
      { note: 'A closed questionnaire is read-only and stable: that is the version to cite.' },
    ],
  }),

  article('exports', 'results', {
    title: '导出数据',
    summary: '导出什么、什么格式、什么时候导，以及导出后怎么核对。',
    blocks: [
      { p: '导出把当前结果落成文件。文件是快照，之后回收的数据不会进到已经下载的文件里。' },
      { h: '导之前' },
      {
        steps: [
          '确认问卷状态：进行中还是已结束。',
          '确认样本量与配额是否达到预期。',
          '记下导出时间。',
        ],
      },
      { h: '导出内容' },
      { p: '按题目一行一列输出，附带作答时间、时长、语言与样本来源。开放题保留原文，不做清洗。' },
      { h: '格式' },
      { p: '表格文件用于分析，原始文件用于留档。两者行数应当一致，不一致说明导出中途数据有变化。' },
      { h: '导出后核对' },
      {
        steps: [
          '行数是否等于导出时页面上的样本量。',
          '配额分组是否与页面一致。',
          '开放题是否有空值，空值是未作答还是未展示。',
        ],
      },
      { h: '大样本' },
      { p: '样本量大时导出需要时间，期间不要重复点。重复导出会得到两份内容相近的文件，核对时容易混淆。' },
      { note: '对外交付前，去掉内部字段与可识别个人的自由文本。' },
    ],
  }, {
    title: 'Exporting data',
    summary: 'What comes out, in what shape, when to run it, and how to check it.',
    blocks: [
      { p: 'An export writes the current results to a file. It is a snapshot: responses collected afterwards are not in the file you already have.' },
      { h: 'Before exporting' },
      {
        steps: [
          'Check the questionnaire status: live or closed.',
          'Check the sample size and whether quotas are met.',
          'Note the time of the export.',
        ],
      },
      { h: 'What is in it' },
      { p: 'One row per response, one column per question, plus completion time, duration, language, and sample source. Open answers stay as written, uncleaned.' },
      { h: 'Formats' },
      { p: 'A spreadsheet for analysis, a raw file for the archive. The row counts must agree; if they do not, data moved during the export.' },
      { h: 'Checking it' },
      {
        steps: [
          'Rows equal the sample size shown at export time.',
          'Quota groups match the page.',
          'Empty open answers are genuinely unanswered, not unrendered.',
        ],
      },
      { h: 'Large samples' },
      { p: 'Big exports take time; do not click twice. Two near-identical files are hard to tell apart later.' },
      { note: 'Before delivering outside, drop internal fields and any free text that could identify a person.' },
    ],
  }),
];

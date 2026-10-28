/* First-run product tour copy.
 *
 * Sources: every sentence describes behaviour that already ships in the
 * workspace (rail groups, the six-step AI brief, seven question types,
 * quote → funding → recruitment, real-only results). Nothing here is a new
 * capability claim.
 *
 * Only zh-CN and en-US are authored. Every other locale falls back to en-US on
 * purpose: a Chinese fallback turned English pages Chinese before
 * (FE-2026-10-28-01). Add locales by copying the en-US shape, never by reusing
 * the zh-CN strings.
 */

export const businessTourCopy = {
  'zh-CN': {
    eyebrow: '欢迎使用 GUANYISEARCH',
    close: '关闭介绍',
    next: '下一个',
    finish: '开始第一份研究简报',
    progress: '{current}/{total}',
    steps: [
      {
        title: '研究工作区',
        body: '左侧分为总览、研究、交付三组。项目、问卷和结果都保存在同一工作区。',
      },
      {
        title: '从一个问题开始',
        body: '在顶部输入要研究的问题，AI 研究引导会逐步追问，并生成研究简报。',
      },
      {
        title: '余额与充值',
        body: '账户余额显示在右上角，可随时充值。',
      },
      {
        title: '新建研究',
        body: '可选择问卷设计或定制研究支持；创建后项目保存在工作区。',
      },
      {
        title: '六步生成研究简报',
        body: '按决定、路径、目标人群、市场、样本与时间六项逐步确认；完成后可保存草稿，或提交以获取报价。',
      },
      {
        title: '编辑问卷',
        body: '支持七种题型、分节与跳转逻辑；发布前可在预览中完成一次试答。',
      },
      {
        title: '从简报到报价',
        body: '提交后由团队评估研究范围并出具报价；可在此接受或拒绝，资金确认后启动招募。',
      },
      {
        title: '结果仅含真实回答',
        body: '问卷回收后，此处显示各题汇总与逐条回答，不含演示数据。',
      },
      {
        title: '账户与支持',
        body: '账户、发票和预算位于左下角；如需人工协助，请使用右下角的支持按钮。',
      },
    ],
  },
  'en-US': {
    eyebrow: 'WELCOME TO GUANYISEARCH',
    close: 'Close tour',
    next: 'Next',
    finish: 'Start your first research brief',
    progress: '{current}/{total}',
    steps: [
      {
        title: 'Research workspace',
        body: 'Overview, Research and Delivery are grouped on the left. Projects, questionnaires and results are kept in one workspace.',
      },
      {
        title: 'Start with a question',
        body: 'Enter the question you need to research at the top. The AI research guide follows up and drafts a research brief.',
      },
      {
        title: 'Balance and top-ups',
        body: 'Your account balance is shown at the top right and can be topped up at any time.',
      },
      {
        title: 'New research',
        body: 'Choose questionnaire design or managed research support; the project is saved in your workspace.',
      },
      {
        title: 'Six steps to a research brief',
        body: 'Confirm the decision, route, audience, market, sample and timing in six steps; then save a draft or submit it for a quote.',
      },
      {
        title: 'Edit the questionnaire',
        body: 'Seven question types, sections and skip logic. Test the questionnaire in preview before publishing.',
      },
      {
        title: 'From brief to quote',
        body: 'The team reviews the scope and issues a quote. Accept or decline here; recruitment begins once funding is confirmed.',
      },
      {
        title: 'Results from real responses only',
        body: 'Once responses are collected, question summaries and individual answers appear here. No demonstration data is used.',
      },
      {
        title: 'Account and support',
        body: 'Account, invoices and budget are at the bottom left; to reach our team, use the support button at the bottom right.',
      },
    ],
  },
};

export function getBusinessTourCopy(language) {
  return businessTourCopy[language] || businessTourCopy['en-US'];
}

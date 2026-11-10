/* One place that knows what a project status is called and which step it sits
   on. The detail sheet used to carry its own copy of both: it printed
   `CONTRACT_SENT` raw and, because that status was missing from its step list,
   showed a contract-waiting project as still being on step one. */

const LABELS = {
  'zh-CN': {
    DRAFT: '草稿',
    SUBMITTED_FOR_REVIEW: '待审核',
    QUOTE_REQUIRED: '待报价',
    QUOTE_SENT: '报价已发',
    CLIENT_ACCEPTED: '待付款',
    CONTRACT_SENT: '合同待签',
    CONTRACT_SIGNED: '合同已签',
    FUNDED: '已付款',
    QUESTIONNAIRE_REVIEW: '问卷待确认',
    QUESTIONNAIRE_APPROVED: '问卷已确认',
    RECRUITING: '招募中',
    LIVE: '进行中',
    COMPLETED: '已完成',
    DELIVERED: '已交付',
    ACCEPTED: '已验收',
    CANCELLED: '已取消',
  },
  'zh-Hant': {
    DRAFT: '草稿',
    SUBMITTED_FOR_REVIEW: '待審核',
    QUOTE_REQUIRED: '待報價',
    QUOTE_SENT: '報價已發',
    CLIENT_ACCEPTED: '待付款',
    CONTRACT_SENT: '合約待簽',
    CONTRACT_SIGNED: '合約已簽',
    FUNDED: '已付款',
    QUESTIONNAIRE_REVIEW: '問卷待確認',
    QUESTIONNAIRE_APPROVED: '問卷已確認',
    RECRUITING: '招募中',
    LIVE: '進行中',
    COMPLETED: '已完成',
    DELIVERED: '已交付',
    ACCEPTED: '已驗收',
    CANCELLED: '已取消',
  },
  en: {
    DRAFT: 'Draft',
    SUBMITTED_FOR_REVIEW: 'In review',
    QUOTE_REQUIRED: 'Quote needed',
    QUOTE_SENT: 'Quote sent',
    CLIENT_ACCEPTED: 'Awaiting payment',
    CONTRACT_SENT: 'Contract to sign',
    CONTRACT_SIGNED: 'Contract signed',
    FUNDED: 'Funded',
    QUESTIONNAIRE_REVIEW: 'Questionnaire to confirm',
    QUESTIONNAIRE_APPROVED: 'Questionnaire confirmed',
    RECRUITING: 'Recruiting',
    LIVE: 'Live',
    COMPLETED: 'Completed',
    DELIVERED: 'Delivered',
    ACCEPTED: 'Accepted',
    CANCELLED: 'Cancelled',
  },
};

const zh = (language) => String(language || '').toLowerCase().startsWith('zh');
export const isTraditional = (language) => /hant|tw|hk/i.test(String(language || ''));

/* Inline Chinese/English pairs treat zh-Hant as Simplified unless they pass the
   third argument. New copy should use this instead of a bare zh check. */
export const pick = (language, cn, en, hant) => {
  if (isTraditional(language)) return hant || cn;
  return zh(language) ? cn : en;
};

export function statusLabel(status, language) {
  const key = String(status || '').toUpperCase();
  const table = isTraditional(language) ? LABELS['zh-Hant'] : (zh(language) ? LABELS['zh-CN'] : LABELS.en);
  /* Never print the enum: an unknown status reads better as "In progress". */
  return table[key] || (zh(language) ? '进行中' : 'In progress');
}

/* The client's six-step view. Contract sits with payment because that is where
   it happens for the managed track; self-serve never enters it. */
export const CLIENT_STEPS = [
  { id: 'brief', zh: '需求', en: 'Brief', statuses: ['DRAFT', 'SUBMITTED_FOR_REVIEW'] },
  { id: 'quote', zh: '报价', en: 'Quote', statuses: ['QUOTE_REQUIRED', 'QUOTE_SENT'] },
  { id: 'pay', zh: '付款', en: 'Payment', statuses: ['CLIENT_ACCEPTED', 'CONTRACT_SENT', 'CONTRACT_SIGNED'] },
  { id: 'field', zh: '问卷准备', en: 'Preparation', statuses: ['FUNDED', 'QUESTIONNAIRE_REVIEW', 'QUESTIONNAIRE_APPROVED'] },
  { id: 'collect', zh: '回收', en: 'Collect', statuses: ['RECRUITING', 'LIVE'] },
  { id: 'deliver', zh: '交付', en: 'Delivery', statuses: ['COMPLETED', 'DELIVERED', 'ACCEPTED'] },
];

/* The report is visible when staff released it. SENT and APPROVED both mean
   released on the backend; five places tested only APPROVED, so a SENT report
   was readable at its URL but hidden from the list and the sheet. */
export const RELEASED_STATES = ['APPROVED', 'SENT'];

export function isReportReleased(project) {
  const status = project?.deliveryStatus || project?.delivery?.status;
  return RELEASED_STATES.includes(String(status || '').toUpperCase());
}

/* Paid projects are work in progress: they cannot be deleted from the client
   side. Anything that has not been funded yet (draft, submitted, quoted,
   accepted, contract) can. */
export const PAID_STATES = ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED', 'DELIVERED', 'ACCEPTED'];

export function canDeleteProject(project) {
  return !PAID_STATES.includes(String(project?.status || '').toUpperCase());
}

export function clientStepIndex(status) {
  const key = String(status || '').toUpperCase();
  const index = CLIENT_STEPS.findIndex((step) => step.statuses.includes(key));
  return index === -1 ? 0 : index;
}

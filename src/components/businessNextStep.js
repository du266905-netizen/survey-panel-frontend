import { acceptBusinessProject, approveBusinessQuestionnaire, signBusinessContract } from '../api/realApi';
import { isReportReleased, pick } from '../content/projectStatus';

/* One action per state, in the order the client hits them. The list card and
   the detail sheet both use this, so they can never disagree about "what is
   next" or show two different primary buttons for the same project. */
export function clientNextStep(project, language) {
  if (!project) return null;
  const status = String(project.status || 'DRAFT');
  const questionnaire = project.questionnaire || null;
  const released = isReportReleased(project);
  const t = (cn, en, hant) => pick(language, cn, en, hant);

  const selfServe = String(project.serviceCategory || '').toUpperCase() === 'SURVEY';
  const paid = ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(status);

  /* Self-serve never signs a questionnaire off: the client pays, publishes and
     that is it. Only the managed track confirms a questionnaire, and only after
     the money is in — a project that never paid used to offer the button. */
  if (!selfServe && paid && questionnaire?.status === 'PENDING_REVIEW') {
    return {
      kind: 'approve',
      label: t('确认问卷', 'Confirm questionnaire', '確認問卷'),
      hint: t('确认后我们开始回收。', 'Collection starts once you confirm.', '確認後我們開始回收。'),
    };
  }
  if (selfServe && paid && questionnaire && questionnaire.status !== 'PUBLISHED') {
    return {
      kind: 'publish',
      label: t('发布问卷', 'Publish questionnaire', '發布問卷'),
      hint: t('付款已确认，可以开始投放。', 'Payment is in; you can launch.', '付款已確認，可以開始投放。'),
    };
  }
  if (status === 'QUOTE_SENT' && project.latestQuote) {
    return {
      kind: 'quote',
      label: t('查看并确认报价', 'Review the quote', '查看並確認報價'),
      hint: t('确认报价后才能开始。', 'Accept the quote to move on.', '確認報價後才能開始。'),
    };
  }
  if (status === 'CONTRACT_SENT') {
    return {
      kind: 'sign',
      label: t('签署合同', 'Sign the contract', '簽署合約'),
      hint: t('签署后进入付款。', 'Payment follows the signature.', '簽署後進入付款。'),
    };
  }
  if (status === 'CLIENT_ACCEPTED') {
    return {
      kind: 'pay',
      label: t('去付款', 'Go to payment', '去付款'),
      hint: t('款项到账后开始招募。', 'Recruitment starts after payment.', '款項到帳後開始招募。'),
    };
  }
  if (['COMPLETED', 'DELIVERED'].includes(status) && released) {
    return {
      kind: 'accept',
      label: t('验收报告', 'Accept delivery', '驗收報告'),
      hint: t('验收后这个项目就结束了。', 'This closes the project.', '驗收後這個專案就結束了。'),
    };
  }
  return null;
}

/* The three client-side steps the backend has not opened yet: the call is the
   real one, so the day the endpoint ships nothing here has to change. */
export async function submitClientStep(project, kind) {
  if (kind === 'sign') return signBusinessContract(project.id);
  if (kind === 'approve') return approveBusinessQuestionnaire(project.id);
  if (kind === 'accept') return acceptBusinessProject(project.id);
  return null;
}

/* Signing and accepting are not undoable, so they ask once. The list card and
   the sheet both call this before the request. */
export function clientStepConfirm(kind, language) {
  const t = (cn, en, hant) => pick(language, cn, en, hant);
  if (kind === 'sign') return t('签署后即表示你方接受合同条款，下一步是付款。确认签署？', 'Signing accepts the contract terms; payment is next. Sign now?', '簽署後即表示你方接受合約條款，下一步是付款。確認簽署？');
  if (kind === 'approve') return t('确认后我们开始回收，问卷题目将不能再改。确认？', 'Confirming starts collection and locks the questions. Confirm?', '確認後我們開始回收，問卷題目將不能再改。確認？');
  if (kind === 'accept') return t('验收后项目结束，报告不再修改。确认验收？', 'Accepting closes the project and freezes the report. Accept delivery?', '驗收後專案結束，報告不再修改。確認驗收？');
  return '';
}

export function clientStepNote(kind, language, error) {
  const t = (cn, en, hant) => pick(language, cn, en, hant);
  if (error) {
    return error?.response?.status === 404
      ? t('这一步还没开通，我们会尽快接上。', 'This step is not available yet.', '這一步還沒開通，我們會盡快接上。')
      : t('操作没有完成，请重试。', 'The action did not complete. Try again.', '操作沒有完成，請重試。');
  }
  if (kind === 'sign') return t('合同已签署，下一步付款。', 'Contract signed. Payment is next.', '合約已簽署，下一步付款。');
  if (kind === 'approve') return t('问卷已确认，可以开始回收。', 'Questionnaire confirmed. Collection can start.', '問卷已確認，可以開始回收。');
  if (kind === 'accept') return t('交付已验收，谢谢。', 'Delivery accepted. Thank you.', '交付已驗收，謝謝。');
  return '';
}

import { useState } from 'react';
import { X } from 'lucide-react';
import { releaseBusinessProjectReport, requestQuestionnaireApproval, sendBusinessContract, sendBusinessReport } from '../api/realApi';
import { useLanguage } from './LanguageContext';
import './BusinessProjectActions.css';

/* Staff-side operations for one project. Every action is the document we send
   and the client accepts; the panel only offers the ones valid for the current
   state, so nobody can skip a step from the UI. */
const STEPS = [
  { key: 'brief', zh: '需求', en: 'Brief', statuses: ['DRAFT', 'SUBMITTED_FOR_REVIEW'] },
  { key: 'quote', zh: '报价', en: 'Quote', statuses: ['QUOTE_REQUIRED', 'QUOTE_SENT'] },
  { key: 'payment', zh: '付款', en: 'Payment', statuses: ['CLIENT_ACCEPTED'] },
  { key: 'contract', zh: '合同', en: 'Contract', statuses: ['CONTRACT_SENT', 'CONTRACT_SIGNED'] },
  { key: 'fieldwork', zh: '问卷与回收', en: 'Questionnaire & fieldwork', statuses: ['FUNDED', 'QUESTIONNAIRE_REVIEW', 'QUESTIONNAIRE_APPROVED', 'RECRUITING', 'LIVE'] },
  { key: 'delivery', zh: '交付', en: 'Delivery', statuses: ['COMPLETED', 'DELIVERED', 'ACCEPTED'] },
];

const stepIndex = (status) => {
  const index = STEPS.findIndex((step) => step.statuses.includes(status));
  return index === -1 ? 0 : index;
};

export default function BusinessProjectActions({ project, onClose, onDone }) {
  const { language } = useLanguage();
  const zh = String(language).startsWith('zh');
  const t = (cn, en) => (zh ? cn : en);
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState('');

  const status = String(project.status || 'DRAFT');
  const current = stepIndex(status);
  const released = (project.deliveryStatus || project.delivery?.status) === 'APPROVED';

  const run = async (kind, call, doneMessage) => {
    setBusy(kind);
    setNote('');
    try {
      await call(project.id);
      setNote(doneMessage);
      onDone?.();
    } catch (error) {
      setNote(error?.response?.status === 404
        ? t('这一步暂未开通。', 'This step is not available yet.')
        : t('操作没有完成，请重试。', 'The action did not complete. Try again.'));
    } finally {
      setBusy('');
    }
  };

  const actions = [];
  if (status === 'CLIENT_ACCEPTED') {
    actions.push({ key: 'contract', label: t('发送合同', 'Send contract'), hint: t('客户签署后进入付款。', 'The client signs, then payment follows.'), run: () => run('contract', sendBusinessContract, t('合同已发送。', 'Contract sent.')) });
  }
  if (['FUNDED'].includes(status) && project.questionnaire) {
    actions.push({ key: 'approval', label: t('请客户确认问卷', 'Send questionnaire for approval'), hint: t('客户确认后才能开始回收。', 'Collection starts after the client approves.'), run: () => run('approval', requestQuestionnaireApproval, t('已提交客户确认。', 'Sent for approval.')) });
  }
  if (status === 'COMPLETED') {
    actions.push({ key: 'report', label: t('发送报告', 'Send report'), hint: t('发送后客户可以查看结果。', 'The client can open the results once sent.'), run: () => run('report', sendBusinessReport, t('报告已发送。', 'Report sent.')) });
  }
  if (project.questionnaire?.status === 'PUBLISHED' && ['COMPLETED', 'DELIVERED', 'ACCEPTED'].includes(status)) {
    actions.push({
      key: 'release',
      label: released ? t('撤回报告', 'Withdraw report') : t('发布结果页', 'Publish results'),
      hint: released ? t('撤回后客户立即无法查看。', 'The client loses access immediately.') : t('不发送报告，仅让客户查看结果。', 'Give the client access without sending the report.'),
      run: () => run('release', (id) => releaseBusinessProjectReport(id, released ? 'REVOKED' : 'APPROVED'), released ? t('结果已撤回。', 'Results withdrawn.') : t('结果已发布。', 'Results published.')),
    });
  }

  return (
    <div className="bpa-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="bpa-panel" role="dialog" aria-modal="true" aria-labelledby="bpa-title">
        <header className="bpa-head">
          <div>
            <h1 id="bpa-title">{t('项目操作', 'Project actions')}</h1>
            <p>{project.title}</p>
          </div>
          <button type="button" className="bpa-close" onClick={onClose} aria-label={t('关闭', 'Close')}><X size={16} /></button>
        </header>

        <ol className="bpa-steps">
          {STEPS.map((step, index) => (
            <li key={step.key} className={index < current ? 'is-done' : index === current ? 'is-current' : ''}>
              <i aria-hidden="true" />
              <span>{zh ? step.zh : step.en}</span>
            </li>
          ))}
        </ol>

        <div className="bpa-actions">
          {actions.length === 0 && <p className="bpa-empty">{t('当前状态没有可执行的操作。', 'Nothing to do in this state.')}</p>}
          {actions.map((action) => (
            <button type="button" key={action.key} className="bpa-action" onClick={action.run} disabled={busy === action.key}>
              <strong>{action.label}</strong>
              <small>{action.hint}</small>
            </button>
          ))}
        </div>

        {note && <p className="bpa-note" role="status">{note}</p>}
      </section>
    </div>
  );
}

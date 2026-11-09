import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import './BusinessProjectOverview.css';

/* 项目展开。
 *
 * 客户提交之后最常问的一句是“现在到哪了”。这一页把流程摊开成一条竖线：
 * 提交 → 报价 → 付款 → 建卷质检 → 回收 → 交付。每个节点给状态、时间和下一步，
 * 结构照 Linear 的 issue 时间线与 Stripe 的付款时间线。
 */

const STATUS_TEXT = {
  DRAFT: '草稿',
  SUBMITTED_FOR_REVIEW: '待审核',
  QUOTE_REQUIRED: '待报价',
  QUOTE_SENT: '报价已发',
  CLIENT_ACCEPTED: '待付款',
  FUNDED: '已付款',
  RECRUITING: '招募中',
  LIVE: '进行中',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
};

const day = (value, language) => (value ? new Date(value).toLocaleDateString(language.startsWith('zh') ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '—');

export default function BusinessProjectOverview() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const zh = language.startsWith('zh');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    getBusinessProject(projectId)
      .then(({ data }) => { if (alive) setProject(data.project); })
      .catch(() => { if (alive) setError(zh ? '项目没能加载。' : 'Project could not be loaded.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId, zh]);

  const steps = useMemo(() => {
    if (!project) return [];
    const quote = project.latestQuote;
    const paid = project.latestPayment?.status === 'PAID' || ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(project.status);
    const questionnaire = project.questionnaire;

    const list = [
      { id: 'brief', title: zh ? '需求已提交' : 'Brief submitted', time: project.createdAt, done: true, note: project.researchGoal || '' },
    ];

    if (!quote) {
      list.push({ id: 'quote', title: zh ? '等我们出报价' : 'Waiting for our quote', note: zh ? '一般 1 个工作日内给出范围与价格。' : 'Usually within one working day.', current: true });
    } else if (quote.status === 'DECLINED') {
      list.push({ id: 'quote', title: zh ? '报价被拒绝，重新出价' : 'Quote declined', time: quote.declinedAt, note: quote.declineReason || '', current: true });
    } else {
      list.push({
        id: 'quote',
        title: zh ? `报价 v${quote.version} 已发出` : `Quote v${quote.version} sent`,
        time: quote.sentAt,
        done: quote.status === 'ACCEPTED',
        current: quote.status === 'SENT',
        note: quote.validUntil ? (zh ? `有效期至 ${day(quote.validUntil, language)}` : `Valid until ${day(quote.validUntil, language)}`) : '',
      });
    }

    list.push({
      id: 'payment',
      title: zh ? '付款' : 'Payment',
      time: project.latestPayment?.paidAt || null,
      done: paid,
      current: quote?.status === 'ACCEPTED' && !paid,
      note: paid ? '' : (zh ? '接受报价后在这里继续付款。' : 'Continue to payment after accepting the quote.'),
    });

    list.push({
      id: 'build',
      title: zh ? '问卷与质检' : 'Questionnaire and QC',
      done: Boolean(questionnaire && ['APPROVED', 'PUBLISHED'].includes(questionnaire.status)),
      current: paid && (!questionnaire || ['DRAFT', 'PENDING_REVIEW'].includes(questionnaire.status)),
      note: questionnaire
        ? (questionnaire.status === 'PENDING_REVIEW' ? (zh ? '正在质检，通过后即可投放。' : 'In review.') : '')
        : (zh ? '付款后我们开始建卷，定制问卷由我们撰写。' : 'We build it after payment.'),
    });

    list.push({
      id: 'collect',
      title: zh ? '回收答卷' : 'Collecting',
      done: project.status === 'COMPLETED',
      current: questionnaire?.status === 'PUBLISHED' && project.status !== 'COMPLETED',
      note: questionnaire?.responseCount != null
        ? (zh ? `已回收 ${questionnaire.responseCount} 份${project.targetParticipants ? ` / 目标 ${project.targetParticipants}` : ''}` : `${questionnaire.responseCount} responses`)
        : '',
    });

    list.push({ id: 'deliver', title: zh ? '交付报告' : 'Report delivered', done: project.status === 'COMPLETED', current: project.status === 'COMPLETED' });
    return list;
  }, [project, zh, language]);

  if (loading) return <BusinessPageLoader />;

  return (
    <main className="bpo-page">
      <Link className="bpo-back" to={withLanguage('/business/workspace?view=projects', language)}>
        <ArrowLeft size={15} /> {zh ? '返回项目' : 'Back to projects'}
      </Link>

      <header className="bpo-head">
        <div>
          <h1>{project?.title || (zh ? '项目' : 'Project')}</h1>
          <p>{project?.researchGoal || ''}</p>
        </div>
        {project ? <span className={`bpo-status status-${String(project.status).toLowerCase()}`}>{STATUS_TEXT[project.status] || project.status}</span> : null}
      </header>

      {error ? <p className="bpo-error">{error}</p> : null}

      <div className="bpo-grid">
        <ol className="bpo-timeline">
          {steps.map((step) => (
            <li key={step.id} className={`${step.done ? 'is-done' : ''}${step.current ? ' is-current' : ''}`}>
              <span className="bpo-dot">{step.done ? <Check size={12} /> : step.current ? <LoaderCircle size={12} /> : null}</span>
              <div>
                <strong>{step.title}</strong>
                <small>{step.time ? day(step.time, language) : step.current ? (zh ? '进行中' : 'In progress') : ''}</small>
                {step.note ? <p>{step.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        <aside className="bpo-side">
          <h2>{zh ? '项目信息' : 'Project'}</h2>
          <dl>
            <div><dt>{zh ? '形式' : 'Format'}</dt><dd>{project?.studyFormat || '—'}</dd></div>
            <div><dt>{zh ? '样本量' : 'Sample'}</dt><dd>{project?.targetParticipants || '—'}</dd></div>
            <div><dt>{zh ? '国家' : 'Countries'}</dt><dd>{project?.countries || '—'}</dd></div>
            <div><dt>{zh ? '时长' : 'Length'}</dt><dd>{project?.estimatedMinutes ? `${project.estimatedMinutes} ${zh ? '分钟' : 'min'}` : '—'}</dd></div>
            <div><dt>{zh ? '报价' : 'Quote'}</dt><dd>{project?.latestQuote ? `$${Number(project.latestQuote.amount).toLocaleString('en-US')}` : '—'}</dd></div>
          </dl>

          {project?.questionnaire?.status === 'PUBLISHED' ? (
            <Link className="bpo-action" to={withLanguage(`/business/projects/${project.id}/results`, language)}>
              {zh ? '看结果' : 'View results'} <ArrowRight size={14} />
            </Link>
          ) : null}
        </aside>
      </div>
    </main>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ClipboardList, FileText, Lock } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import './BusinessAccountShell.css';
import './BusinessProjectOverview.css';

/* 项目页。
 *
 * 客户提交之后打开的就是这一页：第一屏告诉他“现在到哪、下一步做什么”，
 * 下面按区块展开（进度 / 问卷 / 答卷与报告），不是一条干巴巴的状态列表。
 * 结构参照 Linear 的 project overview 和 Stripe 的 payment 页：
 * 状态条 + 主行动 + 分区块。
 */

const STATUS_EN = {
  DRAFT: 'Draft',
  SUBMITTED_FOR_REVIEW: 'In review',
  QUOTE_REQUIRED: 'Awaiting quote',
  QUOTE_SENT: 'Quote sent',
  CLIENT_ACCEPTED: 'Awaiting payment',
  FUNDED: 'Funded',
  RECRUITING: 'Recruiting',
  LIVE: 'Live',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  PENDING_REVIEW: 'In review',
  APPROVED: 'Approved',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
};

const STATUS = {
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
  PENDING_REVIEW: '待质检',
  APPROVED: '已通过',
  PUBLISHED: '已发布',
  ARCHIVED: '已归档',
};

const STAGES = [
  { id: 'brief', label: '需求' },
  { id: 'quote', label: '报价' },
  { id: 'pay', label: '付款' },
  { id: 'build', label: '建卷质检' },
  { id: 'collect', label: '回收' },
  { id: 'report', label: '报告' },
];

const day = (value, language) => (value ? new Date(value).toLocaleDateString(language.startsWith('zh') ? 'zh-CN' : 'en-GB', { month: 'short', day: 'numeric' }) : '—');

export default function BusinessProjectOverview() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const zh = language.startsWith('zh');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    if (id === 'projects') { navigate(withLanguage('/business/workspace?view=projects', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  useEffect(() => {
    let alive = true;
    getBusinessProject(projectId)
      .then(({ data }) => { if (alive) setProject(data.project); })
      .catch(() => { if (alive) setError(zh ? '项目没能加载。' : 'Project could not be loaded.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId, zh]);

  const stageIndex = useMemo(() => {
    if (!project) return 0;
    const quote = project.latestQuote;
    const paid = project.latestPayment?.status === 'PAID' || ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(project.status);
    if (project.status === 'COMPLETED') return 5;
    if (project.questionnaire?.status === 'PUBLISHED') return 4;
    if (quote?.status === 'ACCEPTED' && paid) return 3;
    if (quote?.status === 'ACCEPTED') return 2;
    if (quote) return 1;
    return 0;
  }, [project]);

  if (loading) return <BusinessPageLoader />;

  const quote = project?.latestQuote;
  const questionnaire = project?.questionnaire;
  const paid = project?.latestPayment?.status === 'PAID' || ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(project?.status || '');
  const responses = questionnaire?.responseCount || 0;
  const target = project?.targetParticipants || 0;

  const nextStep = (() => {
    if (!quote) return { label: zh ? '等我们出报价' : 'Waiting for a quote', note: zh ? '一般 1 个工作日内给出范围与价格。' : 'Usually within one working day.', action: null };
    if (quote.status === 'DECLINED') return { label: zh ? '报价被拒绝' : 'Quote declined', note: quote.declineReason || '', action: null };
    if (quote.status === 'SENT') return { label: zh ? `报价 v${quote.version} 等你确认` : `Quote v${quote.version} is waiting`, note: quote.validUntil ? (zh ? `有效期至 ${day(quote.validUntil, language)}` : `Valid until ${day(quote.validUntil, language)}`) : '', action: { label: zh ? '查看报价' : 'Review quote', to: `/business/workspace?view=projects` } };
    if (!paid) return { label: zh ? '接受后即可付款' : 'Continue to payment', note: zh ? '付款后我们开始建卷。' : 'We start building after payment.', action: { label: zh ? '去付款' : 'Pay', to: `/business/workspace?view=projects` } };
    if (!questionnaire || ['DRAFT', 'PENDING_REVIEW'].includes(questionnaire.status)) return { label: zh ? '我们在建卷质检' : 'Building and checking the questionnaire', note: zh ? '完成后会通知你，通过审核即可投放。' : '', action: null };
    if (questionnaire.status === 'PUBLISHED' && project.status !== 'COMPLETED') return { label: zh ? '正在回收答卷' : 'Collecting responses', note: zh ? `已回收 ${responses} 份${target ? ` / 目标 ${target}` : ''}` : `${responses} responses`, action: { label: zh ? '看结果' : 'View results', to: `/business/projects/${project.id}/results` } };
    return { label: zh ? '报告已可查看' : 'Report ready', note: '', action: { label: zh ? '看结果' : 'View results', to: `/business/projects/${project.id}/results` } };
  })();

  return (
    <main className="business-account-page">
      <BusinessRail activeId="projects" onSelect={handleRailSelect} />
      <div className="business-account-pane">
        <header><NotificationBell /></header>

        <section className="bpr-shell">
          <div className="bpr-top">
            <div>
              <Link className="bpr-back" to={withLanguage('/business/workspace?view=projects', language)} aria-label={zh ? '返回项目' : 'Back to projects'}>← {zh ? '项目' : 'Projects'}</Link>
              <h1>{project?.title || (zh ? '项目' : 'Project')}</h1>
              <p>{project?.researchGoal || ''}</p>
            </div>
            <span className="bpr-status">{(zh ? STATUS : STATUS_EN)[project?.status] || project?.status}</span>
          </div>

          <ol className="bpr-stages">
            {STAGES.map((stage, index) => (
              <li key={stage.id} className={index < stageIndex ? 'is-done' : index === stageIndex ? 'is-current' : ''}>
                <span>{index < stageIndex ? <Check size={11} /> : index + 1}</span>
                {stage.label}
              </li>
            ))}
          </ol>

          {error ? <p className="bpr-error">{error}</p> : null}

          <section className="bpr-next">
            <div>
              <strong>{nextStep.label}</strong>
              {nextStep.note ? <p>{nextStep.note}</p> : null}
            </div>
            {nextStep.action ? (
              <Link className="bpr-cta" to={withLanguage(nextStep.action.to, language)}>{nextStep.action.label} <ArrowRight size={14} /></Link>
            ) : null}
          </section>

          <div className="bpr-tiles">
            <div><span>{zh ? '样本目标' : 'Target'}</span><strong>{target || '—'}</strong></div>
            <div><span>{zh ? '已回收' : 'Collected'}</span><strong>{responses}</strong></div>
            <div><span>{zh ? '报价' : 'Quote'}</span><strong>{quote ? `$${Number(quote.amount).toLocaleString('en-US')}` : '—'}</strong></div>
            <div><span>{zh ? '预计时长' : 'Length'}</span><strong>{project?.estimatedMinutes ? `${project.estimatedMinutes}′` : '—'}</strong></div>
          </div>

          <div className="bpr-blocks">
            <article className="bpr-block">
              <header><FileText size={16} /><h2>{zh ? '需求' : 'Brief'}</h2></header>
              <dl>
                <div><dt>{zh ? '形式' : 'Format'}</dt><dd>{project?.studyFormat || '—'}</dd></div>
                <div><dt>{zh ? '国家' : 'Countries'}</dt><dd>{project?.countries || '—'}</dd></div>
                <div><dt>{zh ? '受众' : 'Audience'}</dt><dd>{project?.audienceDescription || '—'}</dd></div>
              </dl>
            </article>

            <article className="bpr-block">
              <header><ClipboardList size={16} /><h2>{zh ? '问卷' : 'Questionnaire'}</h2></header>
              {questionnaire ? (
                <>
                  <p className="bpr-block-title">{questionnaire.title || project?.title}</p>
                  <p className="bpr-block-note">{(zh ? STATUS : STATUS_EN)[questionnaire.status] || questionnaire.status}{questionnaire.isCollecting ? (zh ? ' · 回收中' : ' · collecting') : ''}</p>
                </>
              ) : (
                <>
                  <p className="bpr-block-title">{zh ? '还没开始建卷' : 'Not started'}</p>
                  <p className="bpr-block-note">{zh ? '付款后由我们撰写，定制问卷不需要你自己写。' : 'We build it after payment.'}</p>
                </>
              )}
            </article>

            <article className="bpr-block">
              <header><Lock size={16} /><h2>{zh ? '答卷与报告' : 'Data and report'}</h2></header>
              {questionnaire?.status === 'PUBLISHED' ? (
                <Link className="bpr-block-link" to={withLanguage(`/business/projects/${project.id}/results`, language)}>{zh ? '打开结果页' : 'Open results'} <ArrowRight size={13} /></Link>
              ) : (
                <p className="bpr-block-note">{zh ? '问卷发布并开始回收后开放。' : 'Opens once the questionnaire is live.'}</p>
              )}
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

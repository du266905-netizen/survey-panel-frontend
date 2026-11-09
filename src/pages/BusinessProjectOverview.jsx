import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import './BusinessProjectOverview.css';

/* 项目页。
 * 版式取自 Typeform 的表单详情页：标题 → 当前状态卡（一句话 + 一个按钮）
 * → 四个数字卡 → 进度与信息。卡片白底、1px 边框、12 圆角，页面浅灰底。 */

const STATUS = { DRAFT: '草稿', SUBMITTED_FOR_REVIEW: '待审核', QUOTE_REQUIRED: '待报价', QUOTE_SENT: '报价已发', CLIENT_ACCEPTED: '待付款', FUNDED: '已付款', RECRUITING: '招募中', LIVE: '进行中', COMPLETED: '已完成', CANCELLED: '已取消', PENDING_REVIEW: '待质检', APPROVED: '已通过', PUBLISHED: '已发布' };
const STATUS_EN = { DRAFT: 'Draft', SUBMITTED_FOR_REVIEW: 'In review', QUOTE_REQUIRED: 'Awaiting quote', QUOTE_SENT: 'Quote sent', CLIENT_ACCEPTED: 'Awaiting payment', FUNDED: 'Funded', RECRUITING: 'Recruiting', LIVE: 'Live', COMPLETED: 'Completed', CANCELLED: 'Cancelled', PENDING_REVIEW: 'In review', APPROVED: 'Approved', PUBLISHED: 'Published' };

const STAGES = [
  { id: 'brief', zh: '需求', en: 'Brief' },
  { id: 'quote', zh: '报价', en: 'Quote' },
  { id: 'pay', zh: '付款', en: 'Payment' },
  { id: 'build', zh: '建卷质检', en: 'Build' },
  { id: 'collect', zh: '回收', en: 'Fieldwork' },
  { id: 'report', zh: '报告', en: 'Report' },
];

const fmt = (value, language) => (value ? new Date(value).toLocaleDateString(language.startsWith('zh') ? 'zh-CN' : 'en-GB', { month: 'short', day: 'numeric' }) : '—');

export default function BusinessProjectOverview() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const zh = language.startsWith('zh');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getBusinessProject(projectId)
      .then(({ data }) => { if (alive) setProject(data.project); })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId]);

  const stage = useMemo(() => {
    if (!project) return 0;
    if (project.status === 'COMPLETED') return 5;
    if (project.questionnaire?.status === 'PUBLISHED') return 4;
    if (project.latestPayment?.status === 'PAID') return 3;
    if (project.latestQuote?.status === 'ACCEPTED') return 2;
    if (project.latestQuote) return 1;
    return 0;
  }, [project]);

  if (loading) return <BusinessPageLoader />;

  const quote = project?.latestQuote;
  const paid = project?.latestPayment?.status === 'PAID' || ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(project?.status || '');
  const responses = project?.questionnaire?.responseCount || 0;
  const target = project?.targetParticipants || 0;

  let next = { text: zh ? '等我们出报价' : 'Waiting for a quote', note: zh ? '一般 1 个工作日内给出。' : 'Usually within one working day.', action: null };
  if (quote?.status === 'SENT') next = { text: zh ? `报价 v${quote.version} 等你确认` : `Quote v${quote.version} is ready`, note: quote.validUntil ? (zh ? `有效期至 ${fmt(quote.validUntil, language)}` : `Valid until ${fmt(quote.validUntil, language)}`) : '', action: { label: zh ? '去确认' : 'Review', to: '/business/workspace?view=projects' } };
  else if (quote?.status === 'ACCEPTED' && !paid) next = { text: zh ? '报价已接受，待付款' : 'Quote accepted, awaiting payment', note: zh ? '付款后开始建卷。' : 'We start building after payment.', action: { label: zh ? '去付款' : 'Pay', to: '/business/workspace?view=projects' } };
  else if (paid && project?.questionnaire?.status !== 'PUBLISHED') next = { text: zh ? '我们在建卷并质检' : 'Building and checking', note: zh ? '完成后会通知你。' : 'We will let you know.', action: null };
  else if (project?.status === 'COMPLETED') next = { text: zh ? '报告可查看' : 'Report ready', note: '', action: { label: zh ? '看结果' : 'View results', to: `/business/projects/${project.id}/results` } };
  else if (project?.questionnaire?.status === 'PUBLISHED') next = { text: zh ? '正在回收答卷' : 'Collecting responses', note: zh ? `已回收 ${responses} 份${target ? ` / 目标 ${target}` : ''}` : `${responses} responses`, action: { label: zh ? '看结果' : 'View results', to: `/business/projects/${project.id}/results` } };

  return (
    <main className="bp-page">
      <div className="bp-wrap">
        <Link className="bp-back" to={withLanguage('/business/workspace?view=projects', language)}>{zh ? '← 项目' : '← Projects'}</Link>

        <header className="bp-head">
          <div>
            <h1>{project?.title || (zh ? '项目' : 'Project')}</h1>
            <p>{project?.researchGoal || ''}</p>
          </div>
          <span className="bp-status">{(zh ? STATUS : STATUS_EN)[project?.status] || project?.status}</span>
        </header>

        <section className="bp-next">
          <div>
            <strong>{next.text}</strong>
            {next.note ? <span>{next.note}</span> : null}
          </div>
          {next.action ? <Link className="bp-cta" to={withLanguage(next.action.to, language)}>{next.action.label} <ArrowRight size={14} /></Link> : null}
        </section>

        <div className="bp-kpis">
          <article><span>{zh ? '样本目标' : 'Target'}</span><strong>{target || '—'}</strong></article>
          <article><span>{zh ? '已回收' : 'Collected'}</span><strong>{responses}</strong></article>
          <article><span>{zh ? '报价' : 'Quote'}</span><strong>{quote ? `$${Number(quote.amount).toLocaleString('en-US')}` : '—'}</strong></article>
          <article><span>{zh ? '预计时长' : 'Length'}</span><strong>{project?.estimatedMinutes ? `${project.estimatedMinutes}′` : '—'}</strong></article>
        </div>

        <div className="bp-cols">
          <section className="bp-card">
            <h2>{zh ? '进度' : 'Progress'}</h2>
            <ol className="bp-steps">
              {STAGES.map((item, index) => (
                <li key={item.id} className={index < stage ? 'is-done' : index === stage ? 'is-current' : ''}>
                  <span className="bp-dot">{index < stage ? <Check size={11} /> : index + 1}</span>
                  <em>{zh ? item.zh : item.en}</em>
                </li>
              ))}
            </ol>
            <p className="bp-steps-note">{zh ? `第 ${stage + 1} 步，共 ${STAGES.length} 步` : `Step ${stage + 1} of ${STAGES.length}`}</p>
          </section>

          <section className="bp-card">
            <h2>{zh ? '项目信息' : 'Details'}</h2>
            <dl className="bp-info">
              <div><dt>{zh ? '形式' : 'Format'}</dt><dd>{project?.studyFormat || '—'}</dd></div>
              <div><dt>{zh ? '国家' : 'Countries'}</dt><dd>{project?.countries || '—'}</dd></div>
              <div><dt>{zh ? '受众' : 'Audience'}</dt><dd>{project?.audienceDescription || '—'}</dd></div>
              <div><dt>{zh ? '问卷' : 'Questionnaire'}</dt><dd>{project?.questionnaire ? ((zh ? STATUS : STATUS_EN)[project.questionnaire.status] || project.questionnaire.status) : (zh ? '未建卷' : 'Not built')}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}

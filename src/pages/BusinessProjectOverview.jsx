import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, LoaderCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessProjectOverview.css';

/* A project is read top-down: where it is, what happens next, how far along,
   the four numbers that decide everything else, then the two deliverables.
   The list row stays a row; this page is the object itself. */
const STEPS = [
  { id: 'brief', zh: '需求', en: 'Brief', statuses: ['DRAFT', 'SUBMITTED_FOR_REVIEW'] },
  { id: 'quote', zh: '报价', en: 'Quote', statuses: ['QUOTE_REQUIRED'] },
  { id: 'pay', zh: '付款', en: 'Payment', statuses: ['QUOTE_SENT', 'CLIENT_ACCEPTED'] },
  { id: 'field', zh: '建卷质检', en: 'Fieldwork', statuses: ['FUNDED'] },
  { id: 'collect', zh: '回收', en: 'Collect', statuses: ['RECRUITING', 'LIVE'] },
  { id: 'deliver', zh: '交付', en: 'Delivery', statuses: ['COMPLETED'] },
];

const stepIndex = (status) => {
  const index = STEPS.findIndex((step) => step.statuses.includes(status));
  return index === -1 ? 0 : index;
};

const money = (value, currency = 'USD') => {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
};

const date = (value, language) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return new Intl.DateTimeFormat(language.startsWith('zh') ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).format(parsed);
};

export default function BusinessProjectOverview({ preview }) {
  const { projectId } = useParams();
  const { language, publicCopy } = useLanguage();
  const zh = String(language).startsWith('zh');
  const t = (cn, en) => (zh ? cn : en);
  const copy = publicCopy.workspace.business.results.detail;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preview) {
      setProject(preview.project);
      setLoading(false);
      return undefined;
    }
    let active = true;
    getBusinessProject(projectId)
      .then((response) => { if (active) setProject(response.data.project); })
      .catch(() => { if (active) setError(copy.loadError); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [copy.loadError, preview, projectId]);

  if (loading) return <main className="bpo-loading"><LoaderCircle className="animate-spin" size={18} /> {copy.loading}</main>;
  if (error || !project) return <main className="bpo-loading"><strong>{error || copy.loadError}</strong><Link to={withLanguage('/business/workspace', language)}>{copy.backToProjects}</Link></main>;

  const status = String(project.status || 'DRAFT');
  const current = stepIndex(status);
  const quote = project.latestQuote || null;
  const questionnaire = project.questionnaire || null;
  const responseCount = Number(questionnaire?.responseCount || 0);
  const target = Number(project.targetParticipants || 0);
  const released = (project.deliveryStatus || project.delivery?.status) === 'APPROVED';
  const questionnaireLabel = !questionnaire ? t('还没建', 'Not created') : ({
    DRAFT: t('草稿', 'Draft'),
    PUBLISHED: t('已发布', 'Published'),
    ARCHIVED: t('已归档', 'Archived'),
  }[questionnaire.status] || questionnaire.status);

  const nextLine = {
    DRAFT: t('简报还没提交。下一步：提交后我们来报价。', 'The brief is not submitted yet. Next: we prepare a quote.'),
    SUBMITTED_FOR_REVIEW: t('我们在审你的简报，下一步出报价。', 'We are reviewing the brief; the next step is a quote.'),
    QUOTE_REQUIRED: t('我们在准备报价，通常两个工作日内。', 'We are preparing the quote, usually within two working days.'),
    QUOTE_SENT: t('报价已发出，等你确认。', 'The quote is out; it is waiting for your decision.'),
    CLIENT_ACCEPTED: t('报价已确认，等你付款。', 'Quote accepted; waiting for payment.'),
    FUNDED: t('款项已到，我们开始建卷和质检。', 'Funded. We are building and checking the questionnaire.'),
    RECRUITING: t('正在招募参与者。', 'Recruiting participants now.'),
    LIVE: t('问卷在收，样本还在回收。', 'The questionnaire is live and collecting.'),
    COMPLETED: released ? t('已完成，报告已放行。', 'Completed; the report has been released.') : t('已完成，报告待放行。', 'Completed; the report is waiting for release.'),
    CANCELLED: t('这个项目已取消。', 'This project was cancelled.'),
  }[status] || '';

  const events = [
    { at: project.createdAt, label: t('项目创建', 'Project created') },
    quote?.sentAt && { at: quote.sentAt, label: t('报价发出', 'Quote sent') },
    quote?.acceptedAt && { at: quote.acceptedAt, label: t('报价确认', 'Quote accepted') },
    project.latestPayment?.status === 'PAID' && { at: project.latestPayment.paidAt || project.latestPayment.updatedAt, label: t('付款完成', 'Payment received') },
    questionnaire?.publishedAt && { at: questionnaire.publishedAt, label: t('问卷发布', 'Questionnaire published') },
    project.delivery?.approvedAt && { at: project.delivery.approvedAt, label: t('报告放行', 'Report released') },
  ].filter(Boolean).sort((a, b) => new Date(b.at) - new Date(a.at));

  return (
    <main className="bpo-page">
      <header className="bpo-topbar">
        <Link className="bpo-back" to={withLanguage('/business/workspace?view=projects', language)}>
          <ArrowLeft size={16} aria-hidden="true" /> {copy.projects}
        </Link>
        <div className="bpo-actions">
          {questionnaire?.status === 'PUBLISHED' && (
            <Link className="bpo-button bpo-button--ghost" to={withLanguage(`/business/projects/${project.id}/results`, language)}>
              {t('查看结果', 'View results')} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
          {questionnaire && (
            <Link className="bpo-button" to={withLanguage(`/business/projects/${project.id}`, language)}>
              {t('打开问卷', 'Open questionnaire')} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </header>

      <div className="bpo-shell">
        <h1 className="bpo-title">{project.title}</h1>
        <p className="bpo-meta">
          <span className="bpo-status">{publicCopy.workspace.business.projects.statuses[status] || status}</span>
          <span>{project.studyFormat === 'SURVEY' ? t('问卷调研', 'Online survey') : t('定制研究', 'Managed research')}</span>
          {project.createdAt && <span>{date(project.createdAt, language)}</span>}
        </p>

        <p className="bpo-next">{nextLine}</p>

        <ol className="bpo-steps">
          {STEPS.map((step, index) => (
            <li key={step.id} className={index < current ? 'is-done' : index === current ? 'is-current' : ''}>
              <i aria-hidden="true" />
              <span>{zh ? step.zh : step.en}</span>
            </li>
          ))}
        </ol>

        <section className="bpo-figures">
          <div><span>{t('样本目标', 'Target')}</span><strong>{target || '—'}</strong></div>
          <div><span>{t('已回收', 'Collected')}</span><strong>{responseCount}</strong></div>
          <div><span>{t('报价', 'Quote')}</span><strong>{money(quote?.amount)}</strong></div>
          <div><span>{t('交付', 'Delivery')}</span><strong>{released ? t('已放行', 'Released') : t('未放行', 'Not yet')}</strong></div>
        </section>

        <section className="bpo-block">
          <h2>{t('交付物', 'Deliverables')}</h2>
          <div className="bpo-rows">
            <div>
              <span>{t('问卷', 'Questionnaire')}</span>
              <b>{questionnaireLabel}</b>
              <small>{questionnaire ? `${responseCount} / ${target || '—'}` : ''}</small>
            </div>
            <div>
              <span>{t('报告', 'Report')}</span>
              <b>{released ? t('已放行，客户可见', 'Released') : t('未放行，客户不可见', 'Not released')}</b>
              <small>{project.delivery?.approvedAt ? date(project.delivery.approvedAt, language) : ''}</small>
            </div>
          </div>
        </section>

        <section className="bpo-block">
          <h2>{t('记录', 'History')}</h2>
          <ul className="bpo-timeline">
            {events.map((event) => (
              <li key={event.label}><time>{date(event.at, language)}</time><span>{event.label}</span></li>
            ))}
            {!events.length && <li><span>{t('还没有记录。', 'Nothing recorded yet.')}</span></li>}
          </ul>
        </section>
      </div>
    </main>
  );
}

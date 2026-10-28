import { useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import './BusinessWorkspaceTheme.css';
import './BusinessResearchType.css';

const emptyPlan = { title: '', researchGoal: '', audienceDescription: '' };

export default function BusinessAudiencePlan() {
  const { language, publicCopy } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [plan, setPlan] = useState(() => ({ ...emptyPlan, ...(location.state?.preparedPlan || {}) }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const plans = publicCopy?.workspace?.business?.audiencePlan || {};
  const c = plans[language] || plans['en-US'] || {};
  const update = (event) => setPlan((current) => ({ ...current, [event.target.name]: event.target.value }));
  const valid = plan.title.trim().length >= 3 && plan.researchGoal.trim().length >= 20 && plan.audienceDescription.trim().length >= 10;
  const go = (target) => navigate(withLanguage(target, language));
  const modalTitle = c.modalTitle || (language === 'zh-Hant' ? '建立問卷' : language === 'zh-CN' ? '创建问卷' : 'Create questionnaire');
  const cancelLabel = c.cancel || (language === 'zh-Hant' || language === 'zh-CN' ? '取消' : 'Cancel');

  const create = async (event) => {
    event.preventDefault();
    if (!valid || saving) {
      if (!valid) setError(c.invalid);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const response = await createBusinessProject({
        title: plan.title,
        researchGoal: plan.researchGoal,
        audienceDescription: plan.audienceDescription,
        studyFormat: 'SURVEY',
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: true,
      });
      go(`/business/projects/${response.data.project.id}`);
    } catch {
      setError(c.failed);
    } finally {
      setSaving(false);
    }
  };

  const field = (label, name, hint, textarea = false) => (
    <label>
      {label}
      {textarea
        ? <textarea name={name} value={plan[name]} onChange={update} placeholder={hint} />
        : <input name={name} value={plan[name]} onChange={update} placeholder={hint} autoFocus />}
    </label>
  );

  return (
    <main className="business-questionnaire-create">
      <div className="business-questionnaire-create-bg" aria-hidden="true">
        <header>
          <span className="business-create-bg-mark" />
          <span className="business-create-bg-search" />
          <span className="business-create-bg-actions" />
        </header>
        <div className="business-create-bg-body">
          <aside>
            <span /><span /><span /><span /><span />
          </aside>
          <section>
            <span className="business-create-bg-kicker" />
            <span className="business-create-bg-title" />
            <span className="business-create-bg-line" />
            <div className="business-create-bg-card"><span /><span /><span /></div>
            <div className="business-create-bg-card"><span /><span /><span /></div>
          </section>
        </div>
      </div>
      <div className="business-questionnaire-create-scrim" aria-hidden="true" />
      <section className="business-questionnaire-create-modal" role="dialog" aria-modal="true" aria-labelledby="create-questionnaire-title">
        <h1 id="create-questionnaire-title">{modalTitle}</h1>
        <form onSubmit={create}>
          {field(c.fields[0], 'title', c.hints[0])}
          {field(c.fields[1], 'researchGoal', c.hints[1], true)}
          {field(c.fields[2], 'audienceDescription', c.hints[2], true)}
          {error && <p className="business-questionnaire-create-error" role="alert">{error}</p>}
          <footer>
            <button type="button" className="business-questionnaire-create-cancel" onClick={() => go('/business/workspace')}>{cancelLabel}</button>
            <button type="submit" className="business-button" disabled={saving}>
              {saving ? <LoaderCircle className="animate-spin" size={16} /> : modalTitle} {!saving && <ArrowRight size={16} />}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}

import { useEffect, useState } from 'react';
import { ChevronDown, ClipboardList, LoaderCircle, Plus, RefreshCw, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import {
  createAdminResearchOpportunity,
  getAdminResearchApplications,
  getAdminResearchOpportunities,
  updateAdminResearchApplication,
  updateAdminResearchOpportunity,
} from '../api/realApi';
import { languageOptions, participationFormatOptions, researchTopicOptions } from '../constants/panelProfileOptions';

const opportunityStatuses = ['DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED'];
const applicationStatuses = ['APPLIED', 'SELECTED', 'NOT_SELECTED', 'COMPLETED'];
const initialForm = {
  title: '',
  summary: '',
  format: 'Online survey',
  topic: '',
  targetCountries: '',
  targetLanguages: ['en'],
  targetTopics: [],
  targetFormats: ['online_survey'],
  estimatedMinutes: '',
  rewardDescription: '',
  requirements: '',
  capacity: '',
  deadline: '',
  status: 'DRAFT',
};

function splitCountries(value) {
  return [...new Set(String(value || '').split(',').map((entry) => entry.trim().toUpperCase()).filter(Boolean))];
}

function formatDate(value) {
  if (!value) return 'No deadline';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No deadline';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function MultiSelect({ label, values, options, onChange }) {
  return (
    <label className="admin-research-field">
      <span>{label}</span>
      <select multiple value={values} onChange={(event) => onChange([...event.target.selectedOptions].map((option) => option.value))}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export default function AdminResearchOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');

  const loadOpportunities = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAdminResearchOpportunities();
      setOpportunities(response.data.opportunities || []);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load research opportunities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOpportunities(); }, []);

  const updateForm = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const submitOpportunity = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await createAdminResearchOpportunity({
        ...form,
        targetCountries: splitCountries(form.targetCountries),
        estimatedMinutes: form.estimatedMinutes ? Number(form.estimatedMinutes) : null,
        capacity: form.capacity ? Number(form.capacity) : null,
        deadline: form.deadline || null,
      });
      setOpportunities((current) => [response.data.opportunity, ...current]);
      setForm(initialForm);
      setShowForm(false);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to create this opportunity.');
    } finally {
      setSaving(false);
    }
  };

  const changeOpportunityStatus = async (opportunityId, status) => {
    setUpdatingId(opportunityId);
    setError('');
    try {
      const response = await updateAdminResearchOpportunity({ opportunityId, status });
      setOpportunities((current) => current.map((opportunity) => (opportunity.id === opportunityId ? response.data.opportunity : opportunity)));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update this opportunity.');
    } finally {
      setUpdatingId('');
    }
  };

  const toggleApplications = async (opportunityId) => {
    if (selectedOpportunityId === opportunityId) {
      setSelectedOpportunityId('');
      setApplications([]);
      return;
    }
    setSelectedOpportunityId(opportunityId);
    setApplications([]);
    setError('');
    try {
      const response = await getAdminResearchApplications(opportunityId);
      setApplications(response.data.applications || []);
    } catch (caughtError) {
      setSelectedOpportunityId('');
      setError(caughtError.response?.data?.message || 'Unable to load applications.');
    }
  };

  const changeApplicationStatus = async (applicationId, status) => {
    if (!selectedOpportunityId) return;
    setUpdatingId(applicationId);
    setError('');
    try {
      const response = await updateAdminResearchApplication({ opportunityId: selectedOpportunityId, applicationId, status });
      setApplications((current) => current.map((application) => (application.id === applicationId ? { ...application, ...response.data.application } : application)));
      setOpportunities((current) => current.map((opportunity) => (
        opportunity.id === selectedOpportunityId ? { ...opportunity, applicationCount: Math.max(opportunity.applicationCount, 1) } : opportunity
      )));
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update this application.');
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <section className="admin-research-page">
      <PageHeader
        title="Research opportunities"
        description="Create real studies, match them using existing profile preferences, and manually review applications."
        action={<button className="action-injection" type="button" onClick={() => setShowForm((current) => !current)}><Plus size={16} /> {showForm ? 'Close form' : 'Create opportunity'}</button>}
      />

      {showForm && (
        <form className="admin-research-create card" onSubmit={submitOpportunity}>
          <div className="admin-research-create-heading"><ClipboardList size={19} /><div><h2>New research opportunity</h2><p>Only publish a project after its format, reward, eligibility and deadline are confirmed.</p></div></div>
          <div className="admin-research-form-grid">
            <label className="admin-research-field admin-research-field-wide"><span>Title</span><input required value={form.title} onChange={(event) => updateForm('title', event.target.value)} maxLength="180" /></label>
            <label className="admin-research-field"><span>Display format</span><input required value={form.format} onChange={(event) => updateForm('format', event.target.value)} maxLength="80" /></label>
            <label className="admin-research-field"><span>Topic label</span><input value={form.topic} onChange={(event) => updateForm('topic', event.target.value)} maxLength="120" /></label>
            <label className="admin-research-field admin-research-field-wide"><span>Summary</span><textarea required value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} maxLength="2200" rows="3" /></label>
            <label className="admin-research-field"><span>Reward description</span><input required value={form.rewardDescription} onChange={(event) => updateForm('rewardDescription', event.target.value)} maxLength="240" /></label>
            <label className="admin-research-field"><span>Deadline</span><input type="date" value={form.deadline} onChange={(event) => updateForm('deadline', event.target.value)} /></label>
            <label className="admin-research-field"><span>Estimated minutes</span><input type="number" min="1" max="1440" value={form.estimatedMinutes} onChange={(event) => updateForm('estimatedMinutes', event.target.value)} /></label>
            <label className="admin-research-field"><span>Capacity</span><input type="number" min="1" value={form.capacity} onChange={(event) => updateForm('capacity', event.target.value)} /></label>
            <label className="admin-research-field"><span>Initial status</span><select value={form.status} onChange={(event) => updateForm('status', event.target.value)}>{opportunityStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
            <label className="admin-research-field admin-research-field-wide"><span>Target countries</span><input value={form.targetCountries} onChange={(event) => updateForm('targetCountries', event.target.value)} placeholder="US, CA, GB — leave empty for all countries" /></label>
            <label className="admin-research-field admin-research-field-wide"><span>Participation requirements</span><textarea value={form.requirements} onChange={(event) => updateForm('requirements', event.target.value)} maxLength="800" rows="2" placeholder="Only include conditions confirmed for this project." /></label>
            <MultiSelect label="Target languages" values={form.targetLanguages} options={languageOptions} onChange={(value) => updateForm('targetLanguages', value)} />
            <MultiSelect label="Target topics" values={form.targetTopics} options={researchTopicOptions} onChange={(value) => updateForm('targetTopics', value)} />
            <MultiSelect label="Target participation formats" values={form.targetFormats} options={participationFormatOptions} onChange={(value) => updateForm('targetFormats', value)} />
          </div>
          <div className="admin-research-create-actions"><span>Leave a matching field empty to avoid filtering on it.</span><button className="action-injection" disabled={saving} type="submit">{saving ? <LoaderCircle className="animate-spin" size={16} /> : <Plus size={16} />} Create opportunity</button></div>
        </form>
      )}

      <section className="admin-research-list" aria-labelledby="admin-research-list-title">
        <div className="admin-research-list-heading"><div><p>Manual operations</p><h2 id="admin-research-list-title">Current opportunities</h2></div><button className="admin-research-refresh" type="button" onClick={loadOpportunities} disabled={loading}><RefreshCw className={loading ? 'animate-spin' : ''} size={16} /> Refresh</button></div>
        {loading ? <div className="card p-7 text-sm font-semibold text-slate-500">Loading opportunities…</div> : opportunities.length ? (
          <div className="admin-research-table-wrap card">
            <table className="admin-research-table"><thead><tr><th>Opportunity</th><th>Deadline</th><th>Applications</th><th>Status</th><th /></tr></thead><tbody>
              {opportunities.map((opportunity) => <tr key={opportunity.id}>
                <td><strong>{opportunity.title}</strong><span>{opportunity.format} · {opportunity.rewardDescription}</span></td>
                <td>{formatDate(opportunity.deadline)}</td>
                <td>{opportunity.applicationCount}</td>
                <td><select value={opportunity.status} disabled={updatingId === opportunity.id} onChange={(event) => changeOpportunityStatus(opportunity.id, event.target.value)}>{opportunityStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                <td><button className="admin-research-applications-button" type="button" onClick={() => toggleApplications(opportunity.id)}><Users size={15} /> {selectedOpportunityId === opportunity.id ? 'Hide' : 'Applications'}</button></td>
              </tr>)}
            </tbody></table>
          </div>
        ) : <div className="card p-7 text-sm font-semibold text-slate-500">No research opportunities have been created yet.</div>}
        {selectedOpportunityId && (
          <div className="admin-research-applications card"><div className="admin-research-applications-heading"><Users size={18} /><h2>Applications</h2></div>
            {applications.length ? applications.map((application) => <div className="admin-research-application" key={application.id}><div><strong>{application.user.displayName}</strong><span>{application.user.email} · Applied {formatDate(application.appliedAt)}</span>{application.memberNote && <p>{application.memberNote}</p>}</div><label><span>Status</span><select value={application.status} disabled={updatingId === application.id} onChange={(event) => changeApplicationStatus(application.id, event.target.value)}>{applicationStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div>) : <p className="text-sm font-semibold text-slate-500">No applications yet.</p>}
          </div>
        )}
      </section>
      {error && <p className="admin-research-error" role="alert">{error}</p>}
    </section>
  );
}

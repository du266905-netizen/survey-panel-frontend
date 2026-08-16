import { useEffect, useState } from 'react';
import { Check, LoaderCircle, ShieldCheck, X } from 'lucide-react';
import { getAdminBusinessQuestionnaires, reviewAdminBusinessQuestionnaire } from '../api/realApi';
import PageHeader from '../components/PageHeader';

export default function AdminBusinessQuestionnaires() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState('');
  const [error, setError] = useState('');
  const load = () => {
    setLoading(true); setError('');
    getAdminBusinessQuestionnaires().then((response) => setQuestionnaires(response.data.questionnaires || [])).catch((caughtError) => setError(caughtError.response?.data?.message || 'We could not load the publication queue.')).finally(() => setLoading(false));
  };
  useEffect(load, []);
  const review = async (id, status) => {
    setWorkingId(id); setError('');
    try { await reviewAdminBusinessQuestionnaire(id, status); setQuestionnaires((current) => current.filter((item) => item.id !== id)); } catch (caughtError) { setError(caughtError.response?.data?.message || 'We could not update this questionnaire.'); } finally { setWorkingId(''); }
  };
  return <><PageHeader title="Questionnaire publication" description="Review public questionnaires before their collection link becomes available." />{error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}{loading ? <div className="card grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-emerald-700" /></div> : <div className="grid gap-4">{questionnaires.map((item) => <article className="card p-5" key={item.id}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{item.client}</p><h2 className="mt-1 text-xl font-bold text-slate-950">{item.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{item.coverDescription}</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{item.questionCount} questions</span></div><div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">{item.questions.map((question, index) => <div key={question.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm"><strong>{index + 1}. {question.prompt}</strong><span className="ml-2 text-xs text-slate-500">{question.type}{question.required ? ' · Required' : ''}</span></div>)}</div><div className="mt-5 flex flex-wrap justify-end gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700" disabled={workingId === item.id} onClick={() => review(item.id, 'ARCHIVED')}><X size={16} /> Do not publish</button><button type="button" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-bold text-white" disabled={workingId === item.id} onClick={() => review(item.id, 'PUBLISHED')}>{workingId === item.id ? <LoaderCircle className="animate-spin" size={16} /> : <Check size={16} />} Approve and publish</button></div></article>)}{!questionnaires.length && <div className="card grid min-h-64 place-items-center text-center"><div><ShieldCheck className="mx-auto text-emerald-700" size={28} /><h2 className="mt-3 text-lg font-bold text-slate-950">Nothing waiting for publication</h2><p className="mt-1 text-sm text-slate-500">New questionnaire requests will appear here.</p></div></div>}</div>}</>;
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness } from 'lucide-react';
import PublicAuthPanel from '../components/PublicAuthPanel';
import './Business.css';

export default function BusinessAccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname.endsWith('/login') ? 'login' : 'register';
  const setMode = (nextMode) => navigate(nextMode === 'login' ? '/business/login' : '/business/access', { replace: true });
  return (
    <main className="business-access-page">
      <Link className="business-access-brand" to="/business"><ArrowLeft size={16} /> Business research</Link>
      <div className="business-access-layout">
        <section className="business-access-intro"><span><BriefcaseBusiness size={25} /></span><p className="business-eyebrow">YOUR BUSINESS WORKSPACE</p><h1>Move from a question to a real project.</h1><p>Create a separate business account to submit project briefs, receive proposals, and follow each approved project.</p><ul><li>Your contact details are used to manage your project.</li><li>Participants only see the information relevant to taking part.</li><li>Client identity stays private unless you choose to disclose it.</li></ul></section>
        <div className="business-access-panel"><PublicAuthPanel mode={mode} onModeChange={setMode} accountType="BUSINESS" /></div>
      </div>
    </main>
  );
}

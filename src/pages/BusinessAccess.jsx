import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PublicAuthPanel from '../components/PublicAuthPanel';
import { VerificationLineArt } from '../components/ResearchLineArt';
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
        <section className="business-access-intro"><VerificationLineArt /><p className="business-eyebrow">RESEARCH WORKSPACE</p><h1>A clear place to start a study.</h1><p>Create a workspace to request a custom questionnaire or a tailored research study, then track each approved project in one place.</p><ul><li>Your business profile uses only your name, email, organization type, and region; a password protects access.</li><li>Project details stay within your workspace until a study is agreed.</li></ul></section>
        <div className="business-access-panel"><PublicAuthPanel mode={mode} onModeChange={setMode} accountType="BUSINESS" /></div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BusinessRail from '../components/BusinessRail';
import BusinessTopBar from '../components/BusinessTopBar';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessSettingsLayout.css';

/* Settings were six pages that each mounted the rail and their own reduced
   header. One layout for all of them: the rail is built once, only the content
   swaps, and the chrome matches the workspace. */
function activeIdFor(pathname) {
  if (pathname.startsWith('/business/team')) return 'team';
  if (pathname.startsWith('/business/billing')) return 'billing';
  if (pathname.startsWith('/business/budget')) return 'budget';
  if (pathname.startsWith('/business/help')) return 'help';
  return 'personal';
}

export default function BusinessSettingsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  const submit = (event) => {
    event.preventDefault();
    const question = query.trim();
    if (!question) return;
    navigate(withLanguage(`/business/workspace?ask=${encodeURIComponent(question)}`, language));
  };

  return (
    <main className="business-account-page business-settings-frame">
      <BusinessRail activeId={activeIdFor(pathname)} onSelect={handleRailSelect} />
      <div className="business-account-pane">
        <BusinessTopBar query={query} onQueryChange={setQuery} onSubmit={submit} />
        <Outlet />
      </div>
    </main>
  );
}

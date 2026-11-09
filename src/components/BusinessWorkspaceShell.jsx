import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import BusinessRail from './BusinessRail';
import BusinessBalanceChip from './BusinessBalanceChip';
import NotificationBell from './NotificationBell';

/* 研究端的内壳。
 *
 * 左轨、顶栏（搜索 / 余额 / 铃铛）在研究端每个页面都必须一样，
 * 所以项目页和结果页也走这一层，而不是各自搭一套页面骨架。
 */

export default function BusinessWorkspaceShell({ activeView = 'projects', children }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(withLanguage(`/business/workspace?view=projects&q=${encodeURIComponent(query.trim())}`, language));
  };

  return (
    <main className="business-workspace">
      <div className="business-workspace-body business-workspace-body--rail">
        <BusinessRail activeId={activeView} onSelect={handleRailSelect} />

        <header className="business-workspace-topbar">
          <form className="business-workspace-searchbar" role="search" aria-label="ask a question in guanyisearch" onSubmit={submit}>
            <Search size={17} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ask a question in guanyisearch" aria-label="ask a question in guanyisearch" />
            <kbd aria-hidden="true">⌘K</kbd>
          </form>
          <BusinessBalanceChip />
          <NotificationBell className="business-workspace-notification" />
        </header>

        <section className="business-projects">{children}</section>
      </div>
    </main>
  );
}

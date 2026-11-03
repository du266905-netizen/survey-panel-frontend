import { Link, useNavigate } from 'react-router-dom';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { ARTICLES } from '../help/content';
import './BusinessHelp.css';

/* Help, inside the workspace.
 *
 * The landing does the same job as the support portal at the top of an admin
 * product: a centred title, one sentence, one way in, and four short blocks
 * that say what is covered. The articles themselves live in the public help
 * centre, which is the only place they need to be maintained.
 */

export default function BusinessHelp() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const zh = language.startsWith('zh');

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  return (
    <main className="business-account-page">
      <BusinessRail activeId="help" onSelect={handleRailSelect} />
      <div className="business-account-pane">
        <header>
          <NotificationBell />
        </header>

        <section className="business-help-shell">
          <div className="business-help-hero">
            <h1>{zh ? '帮助中心' : 'Help centre'}</h1>
            <p>
              {zh
                ? '付款、账单与账户问题的说明，按主题归档。'
                : 'Straight answers on payments, billing, and your account.'}
            </p>
            <Link className="business-help-cta" to={`/help/${ARTICLES[0].slug}`}>
              {zh ? '浏览帮助文章' : 'Browse the articles'}
            </Link>
          </div>

        </section>
      </div>
    </main>
  );
}

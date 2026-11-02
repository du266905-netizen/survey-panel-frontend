import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, FolderOpen, BarChart3, UserRound } from 'lucide-react';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessHelp.css';

/* Help, inside the workspace.
 *
 * The landing does the same job as the support portal at the top of an admin
 * product: a centred title, one sentence, one way in, and four short blocks
 * that say what is covered. The articles themselves live in the public help
 * centre, which is the only place they need to be maintained.
 */

const TILES = [
  {
    icon: CreditCard,
    zh: { title: '充值与账单', body: '充值金额、三种付款方式、付款链接、账单信息与发票。' },
    en: { title: 'Payments and billing', body: 'Top-ups, the three payment methods, payment links, billing details and invoices.' },
    ready: true,
  },
  {
    icon: UserRound,
    zh: { title: '账户与安全', body: '登录、找回密码，以及账户资料的相关说明。' },
    en: { title: 'Account and security', body: 'Signing in, resetting a password, and your account details.' },
    ready: true,
  },
  {
    icon: FolderOpen,
    zh: { title: '项目与问卷', body: '新建项目、问卷编辑器与提交审核。' },
    en: { title: 'Projects and questionnaires', body: 'Starting a project, the editor, and submitting for review.' },
    ready: false,
  },
  {
    icon: BarChart3,
    zh: { title: '结果与报告', body: '查看结果、导出数据与交付报告。' },
    en: { title: 'Results', body: 'Reading results, exporting data, and delivery reports.' },
    ready: false,
  },
];

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
            <Link className="business-help-cta" to="/help">
              {zh ? '浏览帮助文章' : 'Browse the articles'}
            </Link>
          </div>

          <div className="business-help-tiles">
            {TILES.map((tile) => {
              const Icon = tile.icon;
              const copy = zh ? tile.zh : tile.en;
              return (
                <article key={copy.title}>
                  <Icon size={20} aria-hidden="true" />
                  <h2>{copy.title}</h2>
                  <p>{copy.body}</p>
                  {tile.ready ? (
                    <Link to="/help">{zh ? '查看' : 'Open'}</Link>
                  ) : (
                    <span>{zh ? '整理中' : 'In progress'}</span>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

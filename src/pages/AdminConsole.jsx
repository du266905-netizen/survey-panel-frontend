import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import {
  Activity, BriefcaseBusiness, ClipboardCheck, Compass, FileText, Gauge, Inbox,
  LayoutGrid, ListFilter, Mail, ReceiptText, RefreshCcw, Search, Settings, Users, WalletCards,
} from 'lucide-react';
import { getAdminDashboard } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import './AdminConsole.css';

/* 运营工作台。
 *
 * 两个环境，两套导航：参与端（panel）和研究端（research）。切换只在顶栏发生，
 * 左侧导航跟着换——和 PayPal 开发者后台的 sandbox / live 是同一个结构。
 * 数字全部来自已有的 /api/admin/* 接口；没有接口的地方写“待接入”，不编。
 */

const ENVS = {
  panel: {
    label: '参与端',
    caption: '参与者、任务与回收',
    groups: [
      {
        title: '概览',
        items: [
          { to: '/admin', label: '总览', icon: Gauge, end: true },
          { to: '/admin/panelists', label: '参与者', icon: ListFilter },
          { to: '/admin/research-opportunities', label: '任务与问卷', icon: Compass },
        ],
      },
      {
        title: '运营',
        items: [
          { to: '/admin/partners', label: '问卷来源', icon: Users },
          { to: '/admin/support', label: '服务与工单', icon: Inbox },
          { to: '/admin/marketing-assets', label: '消息与邮件', icon: Mail },
        ],
      },
    ],
  },
  research: {
    label: '研究端',
    caption: '客户、项目与交付',
    groups: [
      {
        title: '概览',
        items: [
          { to: '/admin/business-projects', label: '客户与项目', icon: BriefcaseBusiness },
          { to: '/admin/business-questionnaires', label: '问卷审核', icon: ClipboardCheck },
        ],
      },
      {
        title: '交付',
        items: [
          { to: '/admin/delivery-centre', label: '交付中心', icon: FileText },
          { to: '/admin/billing', label: '报价与收款', icon: ReceiptText, pending: true },
          { to: '/team', label: '团队与账号', icon: Users },
        ],
      },
    ],
  },
};

/* 参与端的四个数字来自 /api/admin/stats，路径沿用现有字段；
   研究端还没有对应的聚合接口，先显示“待接入”，不编数字。 */
const CARDS = {
  panel: [
    ['记录总数', (d) => d?.stats?.totalResponses, true],
    ['已完成', (d) => d?.stats?.completedResponses, true],
    ['待处理', (d) => d?.stats?.pendingResponses, true],
    ['活跃用户', (d) => d?.stats?.activeUsers, true],
  ],
  research: [
    ['客户项目', null, false],
    ['待审核问卷', null, false],
    ['本月交付', null, false],
    ['待收款', null, false],
  ],
};

function value(card, data) {
  if (!card[1]) return '待接入';
  try {
    const v = card[1](data);
    return v === undefined || v === null ? '—' : v;
  } catch {
    return '—';
  }
}

export default function AdminConsole() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const env = params.get('env') === 'research' ? 'research' : 'panel';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAdminDashboard()
      .then((payload) => setData(payload?.data ?? payload))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const config = ENVS[env];
  const cards = useMemo(() => CARDS[env], [env]);

  const switchEnv = (next) => {
    setParams(next === 'panel' ? {} : { env: next }, { replace: true });
  };

  return (
    <div className="con">
      <aside className="con-rail">
        <Link className="con-brand" to="/admin">
          guanyisearch<span>运营工作台</span>
        </Link>

        <div className="con-envs" role="tablist" aria-label="环境">
          {Object.entries(ENVS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={env === key}
              className={env === key ? 'is-active' : ''}
              onClick={() => switchEnv(key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="con-caption">{config.caption}</p>

        <nav className="con-nav">
          {config.groups.map((group) => (
            <div className="con-group" key={group.title}>
              <p>{group.title}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `${isActive ? 'is-active' : ''}${item.pending ? ' is-pending' : ''}`}
                >
                  <item.icon size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.pending ? <em>待接入</em> : null}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="con-rail-foot">
          <span className="con-dot" aria-hidden="true" />
          {user?.displayName || user?.name || '管理员'}
        </div>
      </aside>

      <main className="con-main">
        <header className="con-top">
          <div className="con-search">
            <Search size={15} aria-hidden="true" />
            <input placeholder="搜索项目、参与者、工单" aria-label="搜索" />
          </div>
          <div className="con-top-right">
            <button type="button" className="con-icon" onClick={load} aria-label="刷新">
              <RefreshCcw size={16} className={loading ? 'is-spinning' : ''} />
            </button>
            <Link className="con-icon" to="/" aria-label="返回站点">
              <LayoutGrid size={16} />
            </Link>
          </div>
        </header>

        <div className="con-body">
          <div className="con-head">
            <div>
              <h1>{config.label}总览</h1>
              <p>{config.caption}</p>
            </div>
            <span className="con-stamp">{location.pathname === '/admin' ? '实时' : config.label}</span>
          </div>

          <div className="con-cards">
            {cards.map((card) => (
              <article key={card[0]} className="con-card">
                <p>{card[0]}</p>
                <strong className={card[2] ? undefined : 'is-text'}>{loading ? '·' : value(card, data)}</strong>
              </article>
            ))}
          </div>

          <div className="con-grid">
            <section className="con-panel">
              <header>
                <h2>最近进行</h2>
                <Link to={env === 'panel' ? '/admin/panelists' : '/admin/business-projects'}>查看全部</Link>
              </header>
              <div className="con-empty">
                <Activity size={18} aria-hidden="true" />
                <p>列表接口接入后，这里显示最近的 10 条。</p>
              </div>
            </section>

            <section className="con-panel">
              <header>
                <h2>待处理</h2>
                <Settings size={15} aria-hidden="true" />
              </header>
              <ul className="con-tasks">
                <li><ClipboardCheck size={15} aria-hidden="true" /> 问卷审核<em>待接入</em></li>
                <li><WalletCards size={15} aria-hidden="true" /> 收款与对账<em>待接入</em></li>
                <li><Mail size={15} aria-hidden="true" /> 消息与邮件<em>待接入</em></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

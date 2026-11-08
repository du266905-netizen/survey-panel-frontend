import { useMemo } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import {
  BriefcaseBusiness, ClipboardCheck, Compass, Database, FileText, Gauge, History, Inbox,
  ListFilter, Mail, ReceiptText, Send, Settings, Users,
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { hasUnseenChangelog } from '../utils/changelogSeen';
import './AdminRail.css';

/* 运营工作台的左轨：两个环境，导航随环境换。
   所有 /admin/* 页面共用这一条轨道——换页不换壳。 */

/* 研究端的路由清单：直接打开某一页时，环境要跟着路由走。 */
export const RESEARCH_PATHS = ['/admin/customers', '/admin/business-projects', '/admin/business-questionnaires', '/admin/billing', '/admin/reviews', '/admin/delivery', '/admin/approvals', '/admin/roles', '/admin/system', '/admin/messages', '/admin/changelog', '/admin/broadcast'];

export const isResearchPath = (pathname) => RESEARCH_PATHS.some((path) => pathname.startsWith(path));

export const ADMIN_ENVS = {
  panel: {
    label: '参与端',
    caption: '参与者、任务与回收',
    groups: [
      {
        title: '运营',
        items: [
          { to: '/admin', label: '总览', icon: Gauge, end: true },
          { to: '/admin/panelists', label: '参与者', icon: ListFilter },
          { to: '/admin/research-opportunities', label: '任务与问卷', icon: Compass },
          { to: '/admin/partners', label: '问卷来源', icon: Users },
          { to: '/admin/support', label: '服务与工单', icon: Inbox },
        ],
      },
      {
        title: '内容与消息',
        items: [
          { to: '/admin/content', label: '内容库', icon: FileText },
          { to: '/admin/approvals', label: '审核', icon: ClipboardCheck },
          { to: '/admin/messages', label: '消息与邮件', icon: Mail },
        ],
      },
      {
        title: '系统',
        items: [
          { to: '/admin/roles', label: '权限与设置', icon: Settings },
        ],
      },
    ],
  },
  research: {
    label: '研究端',
    caption: '客户、项目与交付',
    /* 研究端不再分组：条目顺着排下来，不加「业务 / 交付 / 系统」这些小标题。 */
    groups: [
      {
        items: [
          { to: '/admin', label: '总览', icon: Gauge, end: true },
          { to: '/admin/customers', label: '客户', icon: Users },
          { to: '/admin/business-projects', label: '项目与订单', icon: BriefcaseBusiness },
          { to: '/admin/billing', label: '财务', icon: ReceiptText },
          { to: '/admin/reviews', label: '问卷审核', icon: ClipboardCheck },
          { to: '/admin/delivery', label: '交付中心', icon: FileText },
          { to: '/admin/approvals', label: '报价与退款审批', icon: Inbox },
          { to: '/admin/changelog', label: '更新日志', icon: History },
          { to: '/admin/broadcast', label: '群发消息', icon: Send },
          { to: '/admin/roles', label: '权限与审计', icon: Settings },
          { to: '/admin/system', label: '系统与导出', icon: Database },
          { to: '/admin/messages', label: '消息与模板', icon: Mail },
        ],
      },
    ],
  },
};

export default function AdminRail() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const { pathname } = useLocation();
  /* 直接打开研究端某一页时，环境要跟着路由走，不能停在参与端。 */
  const fromRoute = isResearchPath(pathname) ? 'research' : 'panel';
  const env = params.get('env') === 'research' ? 'research' : params.get('env') === 'panel' ? 'panel' : fromRoute;
  const config = ADMIN_ENVS[env];
  /* 每次换页重算一次：看完更新日志回到别的页，小红点要自己灭掉。 */
  const unseen = useMemo(() => pathname !== '/admin/changelog' && hasUnseenChangelog(), [pathname]);

  const switchEnv = (next) => setParams(next === 'panel' ? {} : { env: next }, { replace: true });

  return (
    <div className="arail">
      <div className="arail-envs" role="tablist" aria-label="环境">
        {Object.entries(ADMIN_ENVS).map(([key, item]) => (
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
      <nav className="arail-nav">
        {config.groups.map((group, index) => (
          <div className="arail-group" key={group.title || `group-${index}`}>
            {group.title ? <p>{group.title}</p> : null}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to === '/admin' && env === 'research' ? '/admin?env=research' : item.to}
                end={item.end}
                className={({ isActive }) => `${isActive ? 'is-active' : ''}${item.pending ? ' is-pending' : ''}`}
              >
                <item.icon size={16} aria-hidden="true" />
                <span>{item.label}</span>
                {item.to === '/admin/changelog' && unseen ? <span className="arail-unseen" aria-label="有新更新" /> : null}
                {item.pending ? <em>待接入</em> : null}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="arail-foot">
        <span className="arail-dot" aria-hidden="true" />
        {user?.displayName || user?.name || '管理员'}
      </div>
    </div>
  );
}

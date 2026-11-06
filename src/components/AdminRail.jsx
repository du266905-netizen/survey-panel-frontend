import { Link, NavLink, useSearchParams } from 'react-router-dom';
import {
  BriefcaseBusiness, ClipboardCheck, Compass, FileText, Gauge, Inbox,
  ListFilter, Mail, ReceiptText, Settings, Users,
} from 'lucide-react';
import { useAuth } from './AuthContext';
import './AdminRail.css';

/* 运营工作台的左轨：两个环境，导航随环境换。
   所有 /admin/* 页面共用这一条轨道——换页不换壳。 */

export const ADMIN_ENVS = {
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
          { to: '/admin', label: '总览', icon: Gauge, end: true },
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
          { to: '/admin/sandbox', label: '沙盒与发布', icon: Settings },
        ],
      },
    ],
  },
};

export default function AdminRail() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const env = params.get('env') === 'research' ? 'research' : 'panel';
  const config = ADMIN_ENVS[env];

  const switchEnv = (next) => setParams(next === 'panel' ? {} : { env: next }, { replace: true });

  return (
    <div className="arail">
      {/* 站点 logo 在顶栏已经有了，这里只放工作台的名字，避免一行出现两次。 */}
      <Link className="arail-brand" to="/admin">
        运营工作台
      </Link>

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
      <p className="arail-caption">{config.caption}</p>

      <nav className="arail-nav">
        {config.groups.map((group) => (
          <div className="arail-group" key={group.title}>
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

      <div className="arail-foot">
        <span className="arail-dot" aria-hidden="true" />
        {user?.displayName || user?.name || '管理员'}
      </div>
    </div>
  );
}

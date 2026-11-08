import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { getAdminBusinessProjects } from '../api/realApi';
import { isResearchPath } from '../components/AdminRail';
import AdminDetail from './admin/AdminDetail';
import { STATUS_LABEL } from '../utils/businessStatus';
import './AdminCustomers.css';

/* 客户。
 *
 * 排法照 Stripe 的 Customers 和 Intercom 的 Contacts：上面搜索和分段，中间一张表，
 * 点一行从右边出详情，不换页。详情里给这个客户的项目，因为运营看客户时想知道的
 * 就是“他手上有什么、走到哪一步了”。
 *
 * 现在的数据来自项目表按客户聚合——账号余额、注册时间这些还没有管理员接口，
 * 先不显示，也不编。
 */

const money = (cents) => (cents == null ? '—' : `$${(cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`);

const TABS = [
  { id: 'all', label: '全部' },
  { id: 'running', label: '有进行中' },
  { id: 'owed', label: '待收款' },
  { id: 'done', label: '已交付' },
];

export default function AdminCustomers() {
  const [params] = useSearchParams();
  const backTo = (params.get('env') === 'research' || isResearchPath(window.location.pathname)) ? '/admin?env=research' : '/admin';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAdminBusinessProjects('ALL')
      .then(({ data }) => setProjects(data?.projects || data?.items || []))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const customers = useMemo(() => {
    const map = new Map();
    projects.forEach((project) => {
      const email = project.client?.email || project.client?.name || '—';
      const entry = map.get(email) || { email, org: project.client?.organizationName || '—', projects: [], totalCents: 0, running: 0, owed: 0, done: 0, updatedAt: null };
      entry.projects.push(project);
      entry.totalCents += project.latestQuote?.totalCents || 0;
      if (['FUNDED', 'RECRUITING', 'LIVE'].includes(project.status)) entry.running += 1;
      if (['CLIENT_ACCEPTED', 'QUOTE_SENT'].includes(project.status)) entry.owed += 1;
      if (project.status === 'COMPLETED') entry.done += 1;
      const stamp = project.updatedAt ? new Date(project.updatedAt).getTime() : 0;
      if (!entry.updatedAt || stamp > entry.updatedAt) entry.updatedAt = stamp;
      map.set(email, entry);
    });
    return [...map.values()].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [projects]);

  const visible = customers.filter((customer) => {
    if (tab === 'running' && !customer.running) return false;
    if (tab === 'owed' && !customer.owed) return false;
    if (tab === 'done' && !customer.done) return false;
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return customer.email.toLowerCase().includes(needle) || String(customer.org).toLowerCase().includes(needle);
  });

  const detail = selected && customers.find((customer) => customer.email === selected);

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <Link className="con-back" to={backTo}><ArrowLeft size={12} /> 总览</Link>
          <h1>客户</h1>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {TABS.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className={tab === item.id ? 'is-active' : ''} onClick={() => setTab(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="con-toolbar">
        <div className="con-toolbar-search">
          <Search size={14} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜邮箱或组织" aria-label="搜索客户" />
        </div>
      </div>

      <div className="con-table cu-table">
        <table>
          <thead>
            <tr><th>客户</th><th>组织</th><th className="is-right">项目</th><th className="is-right">进行中</th><th className="is-right">累计金额</th><th className="is-right">最近</th></tr>
          </thead>
          <tbody>
            {visible.length ? visible.map((customer) => (
              <tr key={customer.email} className="is-clickable" onClick={() => setSelected(customer.email)}>
                <td>{customer.email}</td>
                <td>{customer.org}</td>
                <td className="is-right">{customer.projects.length}</td>
                <td className="is-right">{customer.running}</td>
                <td className="is-right">{money(customer.totalCents)}</td>
                <td className="is-right">{customer.updatedAt ? new Date(customer.updatedAt).toISOString().slice(0, 10) : '—'}</td>
              </tr>
            )) : (
              <tr className="is-empty">
                <td colSpan={6}>
                  {loading ? '读取中…' : failed ? '项目接口没回来，客户列表暂时空着。' : customers.length ? '没有符合条件的客户。' : '还没有客户来过。'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="cu-note">
        列表按项目表聚合：一个客户有项目才会出现在这里。账号余额、注册时间要等管理员账号接口，不编数字。
      </p>

      <AdminDetail
        open={Boolean(detail)}
        title={detail?.email || ''}
        status={detail ? `${detail.projects.length} 个项目` : ''}
        onClose={() => setSelected(null)}
        fields={detail ? [
          { label: '组织', value: detail.org },
          { label: '累计金额', value: money(detail.totalCents) },
          { label: '进行中', value: detail.running },
          { label: '待收款', value: detail.owed },
          { label: '已完成', value: detail.done },
        ] : []}
      >
        {detail ? (
          <div className="cu-projects">
            <h3>他的项目</h3>
            {detail.projects.map((project) => (
              <div className="cu-project" key={project.id}>
                <span>{project.title || '未命名项目'}</span>
                <em>{STATUS_LABEL[project.status] || project.status}</em>
                <small>{money(project.latestQuote?.totalCents)}</small>
              </div>
            ))}
          </div>
        ) : null}
      </AdminDetail>
    </div>
  );
}

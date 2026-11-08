import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getAdminBusinessProjects } from '../api/realApi';
import './AdminCustomers.css';

/* 客户列表。
 *
 * 排法照 Stripe 的 Customers 页：分段 + 搜索 + 一张表，点一行进详情页。
 * 数据只有项目接口给的那点东西：client 是组织名或邮箱，contactEmail 是联系人邮箱，
 * 所以一个“客户”按 contactEmail 归并——没有联系人邮箱时退回 client 那个字符串。
 */

const money = (cents) => (cents == null ? '—' : `$${(cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`);

const TABS = [
  { id: 'all', label: '全部' },
  { id: 'running', label: '有进行中' },
  { id: 'owed', label: '待收款' },
  { id: 'done', label: '已交付' },
];

export const customerKey = (project) => project.contactEmail || (typeof project.client === 'string' ? project.client : project.client?.email) || '—';

export default function AdminCustomers() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const envPrefix = params.get('env') === 'research' ? '?env=research' : '';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAdminBusinessProjects('ALL')
      .then(({ data }) => setProjects(data?.projects || data?.items || []))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const customers = useMemo(() => {
    const map = new Map();
    projects.forEach((project) => {
      const key = customerKey(project);
      const org = typeof project.client === 'string' && !project.client.includes('@') ? project.client : '—';
      const entry = map.get(key) || { key, email: key, org, projects: [], totalCents: 0, running: 0, owed: 0, done: 0, updatedAt: 0 };
      entry.projects.push(project);
      entry.totalCents += project.latestQuote?.totalCents || 0;
      if (['FUNDED', 'RECRUITING', 'LIVE'].includes(project.status)) entry.running += 1;
      if (['CLIENT_ACCEPTED', 'QUOTE_SENT'].includes(project.status)) entry.owed += 1;
      if (project.status === 'COMPLETED') entry.done += 1;
      if (org !== '—') entry.org = org;
      const stamp = project.updatedAt ? new Date(project.updatedAt).getTime() : 0;
      if (stamp > entry.updatedAt) entry.updatedAt = stamp;
      map.set(key, entry);
    });
    return [...map.values()].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [projects]);

  const visible = customers.filter((customer) => {
    if (tab === 'running' && !customer.running) return false;
    if (tab === 'owed' && !customer.owed) return false;
    if (tab === 'done' && !customer.done) return false;
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return customer.email.toLowerCase().includes(needle) || customer.org.toLowerCase().includes(needle);
  });

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
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
              <tr key={customer.key} className="is-clickable" onClick={() => navigate(`/admin/customers/${encodeURIComponent(customer.key)}${envPrefix}`)}>
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
        一个客户按联系邮箱归并；有项目才会出现。余额、注册时间要等管理员账号接口，不编数字。
      </p>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAdminBusinessProjects } from '../api/realApi';
import { STATUS_LABEL } from '../utils/businessStatus';
import { customerKey } from './AdminCustomers';
import { dollars } from '../utils/money';
import './AdminCustomers.css';

/* 客户详情。
 *
 * 排法照 Stripe 的客户页：回列表的路在上面，第一屏是这个人是谁 + 四个数，
 * 往下是他手上的项目，再往下是最近发生的动作。不换 tab，一页看完。
 */

const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '—');

export default function AdminCustomerDetail() {
  const { key } = useParams();
  const [params] = useSearchParams();
  const envPrefix = params.get('env') === 'research' ? '?env=research' : '';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getAdminBusinessProjects('ALL')
      .then(({ data }) => setProjects(data?.projects || data?.items || []))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const mine = useMemo(
    () => projects.filter((project) => customerKey(project) === decodeURIComponent(key || '')),
    [projects, key],
  );

  const stats = useMemo(() => {
    const total = mine.reduce((sum, project) => sum + Number(project.latestQuote?.amount || 0), 0);
    return {
      count: mine.length,
      running: mine.filter((project) => ['FUNDED', 'RECRUITING', 'LIVE'].includes(project.status)).length,
      owed: mine.filter((project) => ['CLIENT_ACCEPTED', 'QUOTE_SENT'].includes(project.status)).length,
      done: mine.filter((project) => project.status === 'COMPLETED').length,
      total,
    };
  }, [mine]);

  const org = mine.map((project) => (typeof project.client === 'string' && !project.client.includes('@') ? project.client : '')).find(Boolean) || '—';
  const sorted = [...mine].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  return (
    <div className="con-body">
      <Link className="con-back" to={`/admin/customers${envPrefix}`}><ArrowLeft size={12} /> 客户</Link>

      <header className="cu-head">
        <div>
          <h1>{decodeURIComponent(key || '')}</h1>
          <p>{org}</p>
        </div>
      </header>

      <div className="con-figures cu-figures">
        <div className="con-figure"><span>项目</span><strong>{loading ? '·' : stats.count}</strong></div>
        <div className="con-figure"><span>进行中</span><strong>{loading ? '·' : stats.running}</strong></div>
        <div className="con-figure"><span>待收款</span><strong>{loading ? '·' : stats.owed}</strong></div>
        <div className="con-figure"><span>累计金额</span><strong>{loading ? '·' : dollars(stats.total)}</strong></div>
      </div>

      <section className="cu-section">
        <h2>他的项目</h2>
        <div className="con-table">
          <table>
            <thead>
              <tr><th>项目</th><th>阶段</th><th className="is-right">金额</th><th className="is-right">创建</th><th className="is-right">更新</th></tr>
            </thead>
            <tbody>
              {sorted.length ? sorted.map((project) => (
                <tr key={project.id}>
                  <td>{project.title || '未命名项目'}</td>
                  <td><span className="rv-stage">{STATUS_LABEL[project.status] || project.status}</span></td>
                  <td className="is-right">{dollars(project.latestQuote?.amount)}</td>
                  <td className="is-right">{day(project.createdAt)}</td>
                  <td className="is-right">{day(project.updatedAt)}</td>
                </tr>
              )) : (
                <tr className="is-empty"><td colSpan={5}>{loading ? '读取中…' : failed ? '项目接口没回来。' : '这个客户还没有项目。'}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {sorted.length ? (
        <section className="cu-section">
          <h2>最近动态</h2>
          <ul className="cu-timeline">
            {sorted.slice(0, 6).map((project) => (
              <li key={project.id}>
                <time>{day(project.updatedAt)}</time>
                <span>「{project.title || '未命名项目'}」{STATUS_LABEL[project.status] || project.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="cu-note">
        这里只有项目侧的数据。账号余额、注册时间、发票明细要等管理员账号接口，接口有了再加，不先摆空字段。
      </p>
    </div>
  );
}

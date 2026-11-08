import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import { getAdminBusinessProjects } from '../api/realApi';
import { STATUS_LABEL } from '../utils/businessStatus';
import { dollars } from '../utils/money';
import './AdminResearchOverview.css';

/* 研究端总览。
 *
 * 排法照运营台的常见顺序：先「今天要处理什么」，再「大盘怎么样」，最后「最近的事」。
 * 数字全部从 /api/admin/business-projects 现算，不另开聚合接口，也不填假数据；
 * 接口没回来就显示“—”，列表空就直说空。
 */

const TODO = [
  { id: 'review', label: '待审核问卷', statuses: ['SUBMITTED_FOR_REVIEW'], hint: '客户提交了，等我们看' },
  { id: 'quote', label: '待发报价', statuses: ['QUOTE_REQUIRED'], hint: '还没出价' },
  { id: 'accept', label: '待客户确认', statuses: ['QUOTE_SENT'], hint: '报价已发，等回话' },
  { id: 'pay', label: '待收款', statuses: ['CLIENT_ACCEPTED'], hint: '已接受，等钱到账' },
];

const startOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
};

export default function AdminResearchOverview() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = () => {
    setLoading(true);
    getAdminBusinessProjects('ALL')
      .then(({ data }) => {
        setProjects(data?.projects || data?.items || []);
        setFailed(false);
      })
      .catch(() => {
        setProjects(null);
        setFailed(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const counts = useMemo(() => {
    const list = projects || [];
    const by = (statuses) => list.filter((item) => statuses.includes(item.status)).length;
    return {
      review: by(['SUBMITTED_FOR_REVIEW']),
      quote: by(['QUOTE_REQUIRED']),
      accept: by(['QUOTE_SENT']),
      pay: by(['CLIENT_ACCEPTED']),
      running: by(['FUNDED', 'RECRUITING', 'LIVE']),
      done: by(['COMPLETED']),
      newThisMonth: list.filter((item) => new Date(item.createdAt).getTime() >= startOfMonth()).length,
      waitingAmount: list
        .filter((item) => ['CLIENT_ACCEPTED', 'QUOTE_SENT'].includes(item.status))
        .reduce((sum, item) => sum + Number(item.latestQuote?.amount || 0), 0),
    };
  }, [projects]);

  const recent = useMemo(() => [...(projects || [])]
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .slice(0, 6), [projects]);

  const show = (value) => (loading ? '·' : value);

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>研究端总览</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
          <button type="button" className="con-btn is-primary" onClick={() => navigate('/admin/business-projects?env=research')}>全部项目</button>
        </div>
      </header>

      <section className="rv-section">
        <div className="rv-head">
          <h2>需要你处理</h2>
          {failed ? <span>项目接口没回来，下面这些数字暂时空着。</span> : null}
        </div>
        <div className="rv-todos">
          {TODO.map((item) => {
            const value = counts[item.id];
            return (
              <button
                key={item.id}
                type="button"
                className={`rv-todo${!loading && value === 0 ? ' is-clear' : ''}`}
                onClick={() => navigate('/admin/business-projects?env=research')}
              >
                <strong>{show(value)}</strong>
                <span>{item.label}</span>
                <small>{value === 0 && !loading ? '都清空了' : item.hint}</small>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      <div className="con-figures rv-figures">
        <div className="con-figure"><span>进行中的项目</span><strong>{show(counts.running)}</strong></div>
        <div className="con-figure"><span>本月新进项目</span><strong>{show(counts.newThisMonth)}</strong></div>
        <div className="con-figure"><span>待收金额</span><strong>{loading ? '·' : dollars(counts.waitingAmount)}</strong></div>
        <div className="con-figure"><span>已完成</span><strong>{show(counts.done)}</strong></div>
      </div>

      <section className="rv-section rv-recent">
        <div className="rv-head">
          <h2>最近动的项目</h2>
          <button type="button" className="rv-link" onClick={() => navigate('/admin/business-projects?env=research')}>看全部</button>
        </div>
        <div className="con-table">
          <table>
            <thead>
              <tr><th>项目</th><th>客户</th><th>阶段</th><th className="is-right">金额</th><th className="is-right">更新</th></tr>
            </thead>
            <tbody>
              {recent.length ? recent.map((project) => (
                <tr key={project.id}>
                  <td>{project.title || '未命名项目'}</td>
                  <td>{project.client?.email || project.client?.name || '—'}</td>
                  <td><span className="rv-stage">{STATUS_LABEL[project.status] || project.status}</span></td>
                  <td className="is-right">{dollars(project.latestQuote?.amount)}</td>
                  <td className="is-right">{project.updatedAt ? String(project.updatedAt).slice(0, 10) : '—'}</td>
                </tr>
              )) : (
                <tr className="is-empty">
                  <td colSpan={5}>
                    {loading ? '读取中…' : failed ? '接口没回来。点右上角刷新再试。' : '还没有项目。客户建了第一个项目之后，这里会列出来。'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

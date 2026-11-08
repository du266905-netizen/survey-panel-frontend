import { useEffect, useMemo, useState } from 'react';
import { Download, RefreshCcw } from 'lucide-react';
import { getAdminBusinessProjects } from '../api/realApi';
import { STATUS_LABEL } from '../utils/businessStatus';
import './AdminFinance.css';

/* 财务。
 *
 * 结构照 Stripe 的 Payments 页：上面一排汇总，中间状态页签，下面一张表，
 * 行点开看详情，右上角导出。页签顺序照“钱走到哪一步”：应收 → 已收 → 发票 → 对账。
 *
 * 数字只取项目与报价，**不是银行流水**：实收明细和发票要等管理员财务接口，
 * 这两块先空着并写明，不拿项目金额冒充回款。
 */

const money = (cents) => `$${((cents || 0) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '—');

const TABS = [
  { id: 'owed', label: '应收' },
  { id: 'received', label: '已收' },
  { id: 'invoices', label: '发票' },
  { id: 'reconcile', label: '对账' },
];

export default function AdminFinance() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('owed');

  const load = () => {
    setLoading(true);
    getAdminBusinessProjects('ALL')
      .then(({ data }) => { setProjects(data?.projects || data?.items || []); setFailed(false); })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const rows = useMemo(() => projects.map((project) => ({
    id: project.id,
    title: project.title || '未命名项目',
    client: project.contactEmail || project.client || '—',
    status: project.status,
    amountCents: project.latestQuote?.totalCents || 0,
    updatedAt: project.updatedAt,
    createdAt: project.createdAt,
  })), [projects]);

  const owed = rows.filter((row) => row.status === 'CLIENT_ACCEPTED');
  const received = rows.filter((row) => ['FUNDED', 'RECRUITING', 'LIVE', 'COMPLETED'].includes(row.status));
  const receivedMonth = received.filter((row) => row.updatedAt && new Date(row.updatedAt).getMonth() === new Date().getMonth());

  const sum = (list) => list.reduce((total, row) => total + row.amountCents, 0);
  const listed = tab === 'owed' ? owed : tab === 'received' ? received : [];

  const empty = failed
    ? '项目接口没回来，先刷新。'
    : '这一块还没有接口：发票明细与到账匹配要等管理员财务接口。';

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>财务</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
          <button type="button" className="con-btn"><Download size={14} /> 导出</button>
        </div>
      </header>

      <div className="con-figures">
        <div className="con-figure"><span>应收</span><strong>{loading ? '·' : money(sum(owed))}</strong></div>
        <div className="con-figure"><span>本月已收</span><strong>{loading ? '·' : money(sum(receivedMonth))}</strong></div>
        <div className="con-figure"><span>累计已收</span><strong>{loading ? '·' : money(sum(received))}</strong></div>
        <div className="con-figure"><span>退款</span><strong>—</strong></div>
      </div>

      <div className="con-tabs" role="tablist">
        {TABS.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className={tab === item.id ? 'is-active' : ''} onClick={() => setTab(item.id)}>
            {item.label}
            {item.id === 'owed' ? ` · ${owed.length}` : item.id === 'received' ? ` · ${received.length}` : ''}
          </button>
        ))}
      </div>

      <div className="con-table">
        <table>
          <thead>
            <tr><th>项目</th><th>客户</th><th>状态</th><th className="is-right">金额</th><th className="is-right">更新</th></tr>
          </thead>
          <tbody>
            {listed.length ? listed.map((row) => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.client}</td>
                <td><span className="fin-stage">{STATUS_LABEL[row.status] || row.status}</span></td>
                <td className="is-right">{row.amountCents ? money(row.amountCents) : '—'}</td>
                <td className="is-right">{day(row.updatedAt)}</td>
              </tr>
            )) : (
              <tr className="is-empty">
                <td colSpan={5}>
                  {loading ? '读取中…' : tab === 'owed' ? '没有待收款的项目。' : tab === 'received' ? '还没有已收款的项目。' : empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="fin-note">
        金额取自项目报价，不是银行流水；实收以到账记录为准，发票明细待接口。做完之前不在一处凑两套数。
      </p>
    </div>
  );
}

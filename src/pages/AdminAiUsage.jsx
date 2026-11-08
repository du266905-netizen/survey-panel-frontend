import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { listAdminResource } from '../api/realApi';
import './AdminFinance.css';

/* AI 用量。
 *
 * 结构照 OpenAI 的 Usage 页和 LiteLLM 的 spend 面板：上面四个数（额度、输入、输出、
 * 成本），下面按用户和按项目两张表，最后是逐日。
 *
 * 数据在库里（AiUsage / AiCreditLedger），但还没有管理员接口，所以现在四个数是“—”，
 * 表格空着。这一页先把口径写死：一个 credit 记一次动作，成本按 tokensIn/Out 折算。
 */

const RANGES = [
  { id: 'month', label: '本月' },
  { id: 'last', label: '上月' },
  { id: 'all', label: '全部' },
];

export default function AdminAiUsage() {
  const [range, setRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [byDay, setByDay] = useState([]);
  const [byUser, setByUser] = useState([]);
  const [byProject, setByProject] = useState([]);

  const load = () => {
    setLoading(true);
    Promise.all([
      listAdminResource('ai-usage', { groupBy: 'day', limit: 100 }),
      listAdminResource('ai-usage', { groupBy: 'user', limit: 100 }),
      listAdminResource('ai-usage', { groupBy: 'project', limit: 100 }),
    ]).then(([day, user, project]) => {
      setByDay(day.data?.items || []);
      setByUser(user.data?.items || []);
      setByProject(project.data?.items || []);
    }).catch(() => { setByDay([]); setByUser([]); setByProject([]); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const totals = useMemo(() => byDay.reduce((acc, row) => ({
    credits: acc.credits + (row.credits || 0),
    tokensIn: acc.tokensIn + (row.tokensIn || 0),
    tokensOut: acc.tokensOut + (row.tokensOut || 0),
  }), { credits: 0, tokensIn: 0, tokensOut: 0 }), [byDay]);

  const figures = useMemo(() => ([
    ['消耗额度', loading ? '·' : totals.credits.toLocaleString('en-US')],
    ['输入 tokens', loading ? '·' : totals.tokensIn.toLocaleString('en-US')],
    ['输出 tokens', loading ? '·' : totals.tokensOut.toLocaleString('en-US')],
    ['估算成本', '—'],
  ]), [loading, totals]);

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>AI 用量</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {RANGES.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={range === item.id} className={range === item.id ? 'is-active' : ''} onClick={() => setRange(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="con-figures">
        {figures.map(([label, value]) => (
          <div className="con-figure" key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>

      <section className="ai-section">
        <h2>按用户</h2>
        <div className="con-table">
          <table>
            <thead><tr><th>用户</th><th className="is-right">额度</th><th className="is-right">输入</th><th className="is-right">输出</th><th className="is-right">最近</th></tr></thead>
            <tbody>
              {byUser.length ? byUser.map((row) => (
                <tr key={row.id}>
                  <td>{row.user || '—'}</td>
                  <td className="is-right">{row.credits}</td>
                  <td className="is-right">{row.tokensIn}</td>
                  <td className="is-right">{row.tokensOut}</td>
                  <td className="is-right">{row.at ? new Date(row.at).toISOString().slice(0, 10) : '—'}</td>
                </tr>
              )) : <tr className="is-empty"><td colSpan={5}>{loading ? '读取中…' : '还没有 AI 用量。'}</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ai-section">
        <h2>按项目</h2>
        <div className="con-table">
          <table>
            <thead><tr><th>项目</th><th>客户</th><th className="is-right">额度</th><th className="is-right">成本</th></tr></thead>
            <tbody>
              {byProject.length ? byProject.map((row) => (
                <tr key={row.id}>
                  <td>{row.project || '未挂项目'}</td>
                  <td>—</td>
                  <td className="is-right">{row.credits}</td>
                  <td className="is-right">—</td>
                </tr>
              )) : <tr className="is-empty"><td colSpan={4}>{loading ? '读取中…' : '还没有按项目的用量。'}</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <p className="fin-note">
        口径：一次 AI 动作记 1 个 credit（整卷生成另算），成本按 tokensIn / tokensOut 折算；退额度走 AiCreditLedger，不删用量记录。
      </p>
    </div>
  );
}

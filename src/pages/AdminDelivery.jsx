import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { listAdminResource } from '../api/realApi';
import AdminDetail from './admin/AdminDetail';
import './AdminDelivery.css';

/* 交付中心。
 *
 * 数据来自统一只读接口 /api/admin/deliveries：项目已完成、按更新时间倒序。
 * 交付物、交付人、交付时间目前没有持久化来源，接口诚实返回空，页面也如实标“未记录”，
 * 不拿“已完成”冒充“已交付”。
 */

const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '—');

export default function AdminDelivery() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    listAdminResource('deliveries', { limit: 50 })
      .then(({ data }) => { setRows(data?.items || []); setFailed(false); })
      .catch(() => { setRows([]); setFailed(true); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const counts = useMemo(() => ({
    total: rows.length,
    delivered: rows.filter((row) => row.deliveredAt).length,
  }), [rows]);

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>交付中心</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
        </div>
      </header>

      <div className="con-figures">
        <div className="con-figure"><span>已完成待交付</span><strong>{loading ? '·' : counts.total - counts.delivered}</strong></div>
        <div className="con-figure"><span>已记录交付</span><strong>{loading ? '·' : counts.delivered}</strong></div>
      </div>

      <div className="con-table">
        <table>
          <thead>
            <tr><th>项目</th><th>客户</th><th>交付物</th><th>交付时间</th><th className="is-right">更新</th></tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row) => (
              <tr key={row.id} className="is-clickable" onClick={() => setSelected(row)}>
                <td>{row.project || '未命名项目'}</td>
                <td>{row.client || '—'}</td>
                <td>{(row.artifacts || []).length ? `${row.artifacts.length} 项` : '未记录'}</td>
                <td>{row.deliveredAt ? day(row.deliveredAt) : '未记录'}</td>
                <td className="is-right">—</td>
              </tr>
            )) : (
              <tr className="is-empty"><td colSpan={5}>{loading ? '读取中…' : failed ? '接口没回来。' : '没有已完成的项目。'}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="dl-note">
        判定口径：项目状态已完成。交付物、交付人、交付时间还没有持久化来源，所以“未记录”是真的没记，不是没交。
      </p>

      <AdminDetail
        open={Boolean(selected)}
        title={selected?.project || ''}
        status={selected?.deliveredAt ? '已交付' : '未记录'}
        onClose={() => setSelected(null)}
        fields={selected ? [
          { label: '客户', value: selected.client },
          { label: '交付物', value: (selected.artifacts || []).join('、') || '未记录' },
          { label: '交付人', value: selected.deliveredBy || '未记录' },
          { label: '交付时间', value: day(selected.deliveredAt) },
        ] : []}
      />
    </div>
  );
}

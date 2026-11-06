import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Download, Filter, Plus, RefreshCcw, Search,
} from 'lucide-react';
import { getAdminDashboard } from '../api/realApi';
import './AdminConsole.css';

/* 总览。
 *
 * 结构照 Conceptzilla 那一页：一行指标 → 一排页签 → 一条工具条 → 一张表。
 * 数字读 /api/admin/stats；没有聚合接口的列显示“待接入”，不填假数据。
 */

const ENV_TITLE = { panel: '参与端', research: '研究端' };

const COLUMNS = {
  panel: ['参与者', '来源', '状态', '任务', '最近活跃'],
  research: ['客户', '项目', '阶段', '负责人', '金额'],
};

export default function AdminConsole() {
  const [params] = useSearchParams();
  const env = params.get('env') === 'research' ? 'research' : 'panel';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  const load = () => {
    setLoading(true);
    getAdminDashboard()
      .then((payload) => setData(payload?.data ?? payload))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const figures = useMemo(() => ([
    ['记录总数', data?.stats?.totalResponses],
    ['已完成', data?.stats?.completedResponses],
    ['待处理', data?.stats?.pendingResponses],
    ['活跃用户', data?.stats?.activeUsers],
  ]), [data]);

  const columns = COLUMNS[env];

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>{ENV_TITLE[env]}总览</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
          <button type="button" className="con-btn is-primary">
            <Plus size={14} /> {env === 'panel' ? '新建任务' : '新建项目'}
          </button>
        </div>
      </header>

      <div className="con-figures">
        {figures.map(([label, value]) => (
          <div key={label} className="con-figure">
            <span>{label}</span>
            <strong>{loading ? '·' : (value ?? '—')}</strong>
          </div>
        ))}
      </div>

      <div className="con-tabs" role="tablist">
        {[['all', '全部'], ['pending', '待处理'], ['today', '今天']].map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'is-active' : ''}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="con-toolbar">
        <div className="con-toolbar-search">
          <Search size={14} aria-hidden="true" />
          <input placeholder={env === 'panel' ? '搜索参与者' : '搜索客户或项目'} aria-label="搜索" />
        </div>
        <div className="con-toolbar-actions">
          <button type="button" className="con-btn"><Filter size={14} /> 筛选</button>
          <button type="button" className="con-btn"><Download size={14} /> 导出</button>
        </div>
      </div>

      <div className="con-table">
        <table>
          <thead>
            <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            <tr className="is-empty">
              <td colSpan={columns.length}>
                列表接口接入后，这里显示最近 50 条；“待接入”的列不会用假数据填。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

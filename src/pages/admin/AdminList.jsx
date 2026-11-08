import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AdminDetail from './AdminDetail';
import { isResearchPath } from '../../components/AdminRail';
import { ArrowLeft, Download, Filter, Plus, Search } from 'lucide-react';
import '../AdminConsole.css';

/* 通用列表页。
 *
 * 十个模块共用这一套：标题 → 页签 → 工具条 → 表 → 分页。
 * rows 为空时显示表头 + 一句说明，不造假数据；接后端时只换传进来的 rows。
 */

export default function AdminList({ config, rows: givenRows, emptyNote }) {
  const [params] = useSearchParams();
  const backTo = (params.get('env') === 'research' || isResearchPath(window.location.pathname)) ? '/admin?env=research' : '/admin';
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [loading, setLoading] = useState(Boolean(config.load));

  /* 模块带 load 就自己去取；不带就显示空表，不编数据。 */
  useEffect(() => {
    if (!config.load) return;
    let alive = true;
    setLoading(true);
    config.load()
      .then((items) => { if (alive) setLoaded(items.map(config.toRow)); })
      .catch(() => { if (alive) setLoaded(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [config]);

  const rows = givenRows ?? loaded ?? [];

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <Link className="con-back" to={backTo}><ArrowLeft size={12} /> 总览</Link>
          <h1>{config.title}</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn"><Download size={14} /> 导出</button>
          <button type="button" className="con-btn is-primary"><Plus size={14} /> {config.primary}</button>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {config.tabs.map((label, index) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={tab === index}
            className={tab === index ? 'is-active' : ''}
            onClick={() => setTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="con-toolbar">
        <div className="con-toolbar-search">
          <Search size={14} aria-hidden="true" />
          <input placeholder={`搜索${config.title}`} aria-label="搜索" />
        </div>
        <div className="con-toolbar-actions">
          <button type="button" className="con-btn"><Filter size={14} /> 筛选</button>
        </div>
      </div>

      <div className="con-table">
        <table>
          <thead>
            <tr>
              {config.columns.map((column) => (
                <th key={column.key} style={column.width ? { width: column.width } : undefined}>
                  {column.label}
                </th>
              ))}
              <th aria-label="操作" />
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)} className="is-clickable">
                {config.columns.map((column) => (
                  <td key={column.key} style={column.align === 'right' ? { textAlign: 'right' } : undefined}>
                    {column.type === 'badge'
                      ? <span className="con-badge">{row[column.key]}</span>
                      : row[column.key]}
                  </td>
                ))}
                <td className="con-row-action" aria-hidden="true">···</td>
              </tr>
            )) : (
              <tr className="is-empty">
                <td colSpan={config.columns.length + 1}>
                  {loading ? '加载中…' : (emptyNote || '列表接口接入后，这里显示最近的记录；列的“待接入”不会用假数据填。')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="con-foot">
        <span>{rows.length} 条</span>
        <span>每页 50</span>
      </div>

      <AdminDetail
        open={Boolean(selected)}
        title={config.title}
        status={selected ? String(selected[config.columns[0].key] ?? '') : ''}
        fields={selected ? config.columns.map((column) => ({ label: column.label, value: selected[column.key] })) : []}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

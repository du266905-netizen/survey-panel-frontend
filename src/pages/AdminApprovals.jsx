import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { getAdminBusinessProjects, listAdminResource } from '../api/realApi';
import { STATUS_LABEL } from '../utils/businessStatus';
import { dollars } from '../utils/money';
import AdminDetail from './admin/AdminDetail';
import './AdminFinance.css';

/* 报价与退款审批。
 *
 * 报价这一半照 Chargebee 的 Quotes：按“草稿/已发/已接受/已拒绝”分段，一行一个项目，
 * 点开看这一版报价的金额、有效期、条款，以及客户拒绝时写的理由。
 * 退款这一半还没有后端——Stripe 的退款是直接执行，带审批流的是 Netsuite 那种
 * 大系统；我们规模用不到审批链，等真有退款单再说，先空着。
 */

const STAGES = [
  { id: 'quote', label: '待报价', statuses: ['QUOTE_REQUIRED'], hint: '还没出价', excludeDeclined: true },
  { id: 'sent', label: '等客户回复', statuses: ['QUOTE_SENT'], hint: '已发，等接受或拒绝' },
  { id: 'declined', label: '被拒绝', statuses: ['QUOTE_REQUIRED', 'QUOTE_SENT'], hint: '客户拒了，要重新出价', onlyDeclined: true },
  { id: 'accepted', label: '已接受', statuses: ['CLIENT_ACCEPTED'], hint: '等款到账' },
];

const day = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '—');

export default function AdminApprovals() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('quote');
  const [selected, setSelected] = useState(null);
  const [refunds, setRefunds] = useState([]);
  const [refundLoading, setRefundLoading] = useState(true);

  useEffect(() => {
    if (tab !== 'refund') return;
    setRefundLoading(true);
    listAdminResource('refunds', { limit: 50 })
      .then(({ data }) => setRefunds(data?.items || []))
      .catch(() => setRefunds([]))
      .finally(() => setRefundLoading(false));
  }, [tab]);

  const load = () => {
    setLoading(true);
    getAdminBusinessProjects('ALL')
      .then(({ data }) => { setProjects(data?.projects || data?.items || []); setFailed(false); })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const groups = useMemo(() => STAGES.map((stage) => ({
    ...stage,
    rows: projects.filter((project) => {
      if (!stage.statuses.includes(project.status)) return false;
      const declined = project.latestQuote?.status === 'DECLINED';
      if (stage.onlyDeclined) return declined;
      if (stage.excludeDeclined) return !declined;
      return true;
    }),
  })), [projects]);

  const detail = selected;

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>报价与退款审批</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={load}>
            <RefreshCcw size={14} className={loading ? 'is-spinning' : ''} /> 刷新
          </button>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {[['quote', '报价'], ['refund', '退款']].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'quote' ? (
        <>
          {groups.map((group) => (
            <section className="ap-group" key={group.id}>
              <div className="ap-group-head">
                <h2>{group.label}<em>{loading ? '·' : group.rows.length}</em></h2>
                <span>{group.hint}</span>
              </div>
              <div className="con-table">
                <table>
                  <thead>
                    <tr><th>项目</th><th>客户</th><th className="is-right">报价</th><th className="is-right">版本</th><th className="is-right">有效期</th><th className="is-right">更新</th></tr>
                  </thead>
                  <tbody>
                    {group.rows.length ? group.rows.map((project) => (
                      <tr key={project.id} className="is-clickable" onClick={() => setSelected(project)}>
                        <td>{project.title || '未命名项目'}</td>
                        <td>{project.contactEmail || project.client || '—'}</td>
                        <td className="is-right">{dollars(project.latestQuote?.amount)}</td>
                        <td className="is-right">{project.latestQuote?.version ? `v${project.latestQuote.version}` : '—'}</td>
                        <td className="is-right">{day(project.latestQuote?.validUntil)}</td>
                        <td className="is-right">{day(project.updatedAt)}</td>
                      </tr>
                    )) : (
                      <tr className="is-empty"><td colSpan={6}>{loading ? '读取中…' : failed ? '项目接口没回来。' : '这一档没有项目。'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
          <p className="fin-note">
            报价的生成与发送还在项目详情里（后端 `POST /api/admin/business-projects/:id/quotes` 已存在）；这一页先按阶段把待办收拢，写新价的下拉再补。
          </p>
        </>
      ) : (
        <div className="con-table">
          <table>
            <thead><tr><th>退款单</th><th>客户</th><th className="is-right">金额</th><th>状态</th><th className="is-right">申请时间</th></tr></thead>
            <tbody>
              {refunds.length ? refunds.map((row) => (
                <tr key={row.id}>
                  <td>{row.id.slice(0, 10)}</td>
                  <td>{row.client || '—'}</td>
                  <td className="is-right">{dollars((row.amountCents || 0) / 100)}</td>
                  <td><span className="fin-stage">{row.status}</span></td>
                  <td className="is-right">{day(row.requestedAt)}</td>
                </tr>
              )) : (
                <tr className="is-empty">
                  <td colSpan={5}>
                    {refundLoading ? '读取中…' : '还没有退款记录。目前只能列出已完成的退款；申请中/已批准/已拒绝要等独立的退款表。'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <AdminDetail
        open={Boolean(detail)}
        title={detail?.title || ''}
        status={detail ? STATUS_LABEL[detail.status] || detail.status : ''}
        onClose={() => setSelected(null)}
        fields={detail ? [
          { label: '客户', value: detail.contactEmail || detail.client },
          { label: '报价', value: dollars(detail.latestQuote?.amount) },
          { label: '版本', value: detail.latestQuote?.version ? `v${detail.latestQuote.version}` : '—' },
          { label: '有效期', value: day(detail.latestQuote?.validUntil) },
          { label: '发送', value: day(detail.latestQuote?.sentAt) },
          { label: '接受', value: day(detail.latestQuote?.acceptedAt) },
          { label: '拒绝', value: day(detail.latestQuote?.declinedAt) },
          { label: '拒绝理由', value: detail.latestQuote?.declineReason },
        ] : []}
      >
        {detail?.latestQuote?.scope ? (
          <div className="ap-scope">
            <h3>范围</h3>
            <p>{detail.latestQuote.scope}</p>
          </div>
        ) : null}
      </AdminDetail>
    </div>
  );
}

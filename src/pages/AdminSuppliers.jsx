import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import './AdminFinance.css';

/* 供应商。
 *
 * 看的是“我们买样本的那几家”（MarketMirror / Asif 这种），不是 CPX 那类流量渠道——
 * 后者在「问卷来源」页。排法照采购台：供应商列表 + 报价（每份成本）+ 接口与对账状态。
 *
 * 现在没有管理员供应商接口：Partner 表里只有 API 凭据与启用状态，费率与对账在
 * 供应商合同和外部系统里，所以这一页先立结构，数字等接口。
 */

const STEPS = [
  ['签约', '确认国家、配额、单价、结算周期与币种'],
  ['开接口', '发 API key，配 IP 白名单，走沙箱跑通签名与字段'],
  ['交付', '按项目批量交付（M1）；逐条回传只作为进度，不作为结算依据'],
  ['对账', '数量差异按原因码逐条核对；只有验收通过的部分进付款'],
];

export default function AdminSuppliers() {
  const [tab, setTab] = useState('list');

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>供应商</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={() => window.location.reload()}>
            <RefreshCcw size={14} /> 刷新
          </button>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {[['list', '供应商'], ['steps', '接入流程']].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'list' ? (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>供应商</th><th>市场</th><th className="is-right">单价</th><th>接口</th><th className="is-right">本月交付</th><th>对账</th></tr></thead>
              <tbody>
                <tr className="is-empty">
                  <td colSpan={6}>接口未接：还没有读出供应商与费率的接口。合同与单价在文档里，系统里没有表。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fin-note">
            要看的是三样：这家每份多少钱、这个月交了多少、对账差多少。三样都要后端建供应商表与费率表，再挂到项目上。
          </p>
        </>
      ) : (
        <ol className="sup-steps">
          {STEPS.map(([title, note], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{note}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

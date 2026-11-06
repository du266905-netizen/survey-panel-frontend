import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/* 右侧详情抽屉。
 *
 * 列表里点一行，从右边滑出来，背景压暗；详情不换页，关掉就回到原来的列表位置。
 * 这是 Linear 的 issue 面板、Stripe 的支付详情用的同一套交互。
 */

export default function AdminDetail({ open, title, status, fields = [], onClose, children }) {
  if (!open) return null;

  return createPortal(
    <div className="con-drawer-layer" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="con-drawer-scrim" onClick={onClose} aria-label="关闭" />
      <aside className="con-drawer">
        <header>
          <div>
            <h2>{title}</h2>
            {status ? <span className="con-badge">{status}</span> : null}
          </div>
          <button type="button" className="con-btn" onClick={onClose} aria-label="关闭">
            <X size={14} />
          </button>
        </header>

        <dl className="con-drawer-fields">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || '—'}</dd>
            </div>
          ))}
        </dl>

        {children}

        <footer>
          <button type="button" className="con-btn">编辑</button>
          <button type="button" className="con-btn is-primary">保存</button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}

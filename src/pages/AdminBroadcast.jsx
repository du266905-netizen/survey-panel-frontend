import { useState } from 'react';
import { Bell, Megaphone, Send, Users } from 'lucide-react';
import './AdminBroadcast.css';

/* 人工发一条通知。
 *
 * 只做前端：字段、校验、预览按真页面走，发送按钮现在不会真的发——后端没有
 * 广播接口，也没有 ANNOUNCEMENT 类型。等接口到位，把最后那一步换成 POST 即可。
 *
 * 抄的是常见做法：左边写、右边实时预览；类型只有两种（公告=弹窗，通知=铃铛），
 * 因为这两样在用户那边的落点是不同的，不能混在一个开关里。
 */

const AUDIENCES = [
  { id: 'all', label: '全部客户', note: '所有研究端账号' },
  { id: 'active', label: '有进行中项目的客户', note: '项目处于已付款到进行中' },
  { id: 'picked', label: '指定客户', note: '按邮箱或公司名挑' },
];

export default function AdminBroadcast() {
  const [kind, setKind] = useState('notice');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaHref, setCtaHref] = useState('');
  const [audience, setAudience] = useState('all');
  const [picked, setPicked] = useState('');
  const [when, setWhen] = useState('now');

  const ready = title.trim().length > 0 && body.trim().length > 0;

  return (
    <div className="con-body br">
      <header className="con-head">
        <div>
          <h1>发通知</h1>
          <p>人工写一条，推到对方工作台的铃铛里；公告会在他下次登录时弹一次。</p>
        </div>
        <span className="con-stamp">草稿</span>
      </header>

      <div className="br-grid">
        <form className="br-form" onSubmit={(event) => event.preventDefault()}>
          <section className="br-block">
            <h2>形式</h2>
            <div className="br-seg" role="tablist">
              <button type="button" role="tab" aria-selected={kind === 'notice'} className={kind === 'notice' ? 'is-active' : ''} onClick={() => setKind('notice')}>
                <Bell size={15} /> 通知
              </button>
              <button type="button" role="tab" aria-selected={kind === 'announcement'} className={kind === 'announcement' ? 'is-active' : ''} onClick={() => setKind('announcement')}>
                <Megaphone size={15} /> 公告
              </button>
            </div>
            <p className="br-hint">
              {kind === 'notice'
                ? '进铃铛，不弹窗。适合“有进展、要你知道”的事。'
                : '登录时弹一次，每条只弹一次。适合产品改版这类必须说明的事。'}
            </p>
          </section>

          <section className="br-block">
            <h2>内容</h2>
            <label className="br-field">
              <span>标题</span>
              <input value={title} maxLength={40} onChange={(event) => setTitle(event.target.value)} placeholder="例如：发票已开具" />
              <em>{title.length}/40</em>
            </label>
            <label className="br-field">
              <span>正文</span>
              <textarea value={body} maxLength={200} rows={4} onChange={(event) => setBody(event.target.value)} placeholder="一到两句。写他看到之后该做什么。" />
              <em>{body.length}/200</em>
            </label>
            <div className="br-row">
              <label className="br-field">
                <span>按钮文案（可选）</span>
                <input value={ctaLabel} maxLength={16} onChange={(event) => setCtaLabel(event.target.value)} placeholder="查看发票" />
              </label>
              <label className="br-field">
                <span>点进去的地址（可选）</span>
                <input value={ctaHref} onChange={(event) => setCtaHref(event.target.value)} placeholder="/business/billing" />
              </label>
            </div>
          </section>

          <section className="br-block">
            <h2>发给谁</h2>
            <div className="br-audiences">
              {AUDIENCES.map((item) => (
                <label key={item.id} className={`br-audience${audience === item.id ? ' is-active' : ''}`}>
                  <input type="radio" name="audience" checked={audience === item.id} onChange={() => setAudience(item.id)} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                  </span>
                </label>
              ))}
            </div>
            {audience === 'picked' && (
              <label className="br-field">
                <span>邮箱或公司名</span>
                <input value={picked} onChange={(event) => setPicked(event.target.value)} placeholder="client@example.com，多个用逗号分开" />
              </label>
            )}
          </section>

          <section className="br-block">
            <h2>什么时候发</h2>
            <div className="br-seg br-seg-wide" role="tablist">
              <button type="button" role="tab" aria-selected={when === 'now'} className={when === 'now' ? 'is-active' : ''} onClick={() => setWhen('now')}>立即</button>
              <button type="button" role="tab" aria-selected={when === 'later'} className={when === 'later' ? 'is-active' : ''} onClick={() => setWhen('later')}>定时</button>
            </div>
            {when === 'later' && <input className="br-datetime" type="datetime-local" defaultValue="2026-11-10T09:00" />}
          </section>

          <footer className="br-actions">
            <button type="button" className="con-btn">存草稿</button>
            <button type="button" className="con-btn is-primary" disabled={!ready}>
              <Send size={14} /> 发送
            </button>
            <span className="br-note">发送接口未接，现在点了也不会真发。</span>
          </footer>
        </form>

        <aside className="br-preview">
          <h2>预览</h2>
          {kind === 'notice' ? (
            <div className="br-bell">
              <header><strong>通知</strong><small>1 条未读</small></header>
              <div className="br-bell-card">
                <span className="br-bell-head">
                  <i />
                  <span>{title || '通知标题'}</span>
                  <em>刚刚</em>
                </span>
                <p>{body || '正文写在这里，一到两句，写清他看到之后该做什么。'}</p>
              </div>
              <p className="br-bell-more"><Users size={13} /> {AUDIENCES.find((item) => item.id === audience).label}</p>
            </div>
          ) : (
            <div className="br-modal">
              <span className="br-modal-kind">公告</span>
              <h3>{title || '公告标题'}</h3>
              <p>{body || '正文写在这里。公告会在登录时弹一次，看完不再出现。'}</p>
              {ctaLabel ? <span className="br-modal-cta">{ctaLabel}</span> : null}
              <small>每条公告只弹一次</small>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

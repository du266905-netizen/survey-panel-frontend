import { useEffect, useMemo, useState } from 'react';
import { Bell, Megaphone, Send } from 'lucide-react';
import { sendBroadcast } from '../api/realApi';
import './AdminBroadcast.css';

/* 群发消息。
 *
 * 一页写完：内容、受众、发送设置都在同一页，右边跟着变；点发送弹一次确认，
 * 列出这次会发给谁、什么时候发。命名与流程照大公司的做法（Intercom 的 New
 * message、Customer.io 的 Broadcast 都是单页 + 发送前 review）。
 *
 * 草稿存在这台机器的 localStorage 里：存了就还在，下次打开自动带回来。
 * 发送走 POST /api/admin/notifications/broadcast；公告类型 ANNOUNCEMENT，指定人群要传 userIds。
 */

const DRAFT_KEY = 'guanyi.broadcast.draft';

const AUDIENCES = [
  { id: 'all', label: '全部研究端账号', note: '含还未开通项目的账号', count: 128 },
  { id: 'active', label: '有进行中项目的客户', note: '项目处于已付款到进行中', count: 42 },
  { id: 'picked', label: '指定客户', note: '按邮箱或公司名挑', count: 0 },
];

const readDraft = () => {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default function AdminBroadcast() {
  const [draft] = useState(readDraft);
  const [kind, setKind] = useState(draft?.kind || 'notice');
  const [title, setTitle] = useState(draft?.title || '');
  const [body, setBody] = useState(draft?.body || '');
  const [ctaLabel, setCtaLabel] = useState(draft?.ctaLabel || '');
  const [ctaHref, setCtaHref] = useState(draft?.ctaHref || '');
  const [audience, setAudience] = useState(draft?.audience || 'all');
  const [picked, setPicked] = useState(draft?.picked || '');
  const [when, setWhen] = useState(draft?.when || 'now');
  const [scheduleAt, setScheduleAt] = useState(draft?.scheduleAt || '2026-11-10T09:00');
  const [testEmail, setTestEmail] = useState('');
  const [mailCopy, setMailCopy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(draft ? '已带回上次的草稿。' : '');

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const pickedCount = useMemo(() => picked.split(/[,，\s]+/).filter(Boolean).length, [picked]);
  const audienceCount = audience === 'picked' ? pickedCount : AUDIENCES.find((item) => item.id === audience).count;

  const contentReady = title.trim().length > 0 && body.trim().length > 0;
  const audienceReady = audience !== 'picked' || pickedCount > 0;
  const ready = contentReady && audienceReady;

  const saveDraft = () => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ kind, title, body, ctaLabel, ctaHref, audience, picked, when, scheduleAt }));
      setNotice('草稿已存，下次打开会带回来。');
    } catch {
      setNotice('这台机器不让存草稿（隐私模式）。');
    }
  };

  const clearDraft = () => {
    try { window.localStorage.removeItem(DRAFT_KEY); } catch { /* 隐私模式 */ }
    setNotice('草稿已清掉。');
  };

  return (
    <div className="con-body br">
      <header className="con-head">
        <div>
          <h1>群发消息</h1>
        </div>
        <div className="con-head-actions">
          <button type="button" className="con-btn" onClick={saveDraft}>存草稿</button>
          <button type="button" className="con-btn is-primary" disabled={!ready} onClick={() => setConfirming(true)}><Send size={14} /> 发送</button>
        </div>
      </header>

      <div className="br-grid">
        <div className="br-form">
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
              {kind === 'notice' ? '进对方工作台的铃铛，不打断他正在做的事。' : '对方下次登录时弹一次，每条只弹一次。'}
            </p>
            <label className="br-clear">
              <input type="checkbox" checked={mailCopy} onChange={(event) => setMailCopy(event.target.checked)} />
              同时发一封邮件给对方
            </label>
          </section>

          <section className="br-block">
            <h2>内容</h2>
            <label className="br-field">
              <span>标题<em>{title.length}/40</em></span>
              <input value={title} maxLength={40} onChange={(event) => setTitle(event.target.value)} placeholder="例如：发票已开具" />
            </label>
            <label className="br-field">
              <span>正文<em>{body.length}/200</em></span>
              <textarea value={body} maxLength={200} rows={4} onChange={(event) => setBody(event.target.value)} placeholder="一到两句。写他看到之后该做什么。" />
            </label>
            <div className="br-row">
              <label className="br-field">
                <span>按钮文案</span>
                <input value={ctaLabel} maxLength={16} onChange={(event) => setCtaLabel(event.target.value)} placeholder="查看发票" />
              </label>
              <label className="br-field">
                <span>跳到哪一页</span>
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
                  <em>{item.id === 'picked' ? (pickedCount || '—') : item.count} 人</em>
                </label>
              ))}
            </div>
            {audience === 'picked' && (
              <label className="br-field br-field-gap">
                <span>邮箱或公司名</span>
                <textarea rows={3} value={picked} onChange={(event) => setPicked(event.target.value)} placeholder="client@example.com，多个用逗号或换行分开" />
              </label>
            )}
            <p className="br-hint">退订、没有邮箱、邮件硬退的人自动排除，不计入人数。</p>
          </section>

          <section className="br-block">
            <h2>什么时候发</h2>
            <div className="br-seg br-seg-wide" role="tablist">
              <button type="button" role="tab" aria-selected={when === 'now'} className={when === 'now' ? 'is-active' : ''} onClick={() => setWhen('now')}>立即</button>
              <button type="button" role="tab" aria-selected={when === 'later'} className={when === 'later' ? 'is-active' : ''} onClick={() => setWhen('later')}>定时</button>
            </div>
            {when === 'later' && (
              <input className="br-datetime" type="datetime-local" value={scheduleAt} onChange={(event) => setScheduleAt(event.target.value)} />
            )}
            <div className="br-test">
              <input value={testEmail} onChange={(event) => setTestEmail(event.target.value)} placeholder="先发给自己：填邮箱" />
              <button type="button" className="con-btn" disabled={!testEmail.trim()}>发送测试</button>
            </div>
          </section>

          <p className="br-note">{ready ? '接口未接，点发送不会真的发出。' : '标题、正文、受众填完才能发；接口未接，点发送也不会真的发出。'}</p>
        </div>

        <aside className="br-preview">
          <div className="br-preview-head">
            <h2>预览</h2>
            <span>预计送达 {audienceCount} 人</span>
          </div>

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

      <section className="br-history">
        <h2>最近发送</h2>
        <table>
          <thead>
            <tr><th>标题</th><th>形式</th><th>受众</th><th>状态</th><th className="is-right">时间</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={5} className="br-history-empty">还没有发过。发出第一条之后，这里显示状态与已读。</td></tr>
          </tbody>
        </table>
      </section>

      {confirming && (
        <div className="br-confirm" role="dialog" aria-modal="true" aria-label="确认发送">
          <div className="br-confirm-card">
            <h3>确认发送？</h3>
            <p>
              {kind === 'notice' ? '通知' : '公告'}「{title}」将发给{AUDIENCES.find((item) => item.id === audience).label}，
              预计 {audienceCount} 人，{when === 'now' ? '立即发出' : `${scheduleAt.replace('T', ' ')} 发出`}。发出后不能撤回。
            </p>
            <div className="br-confirm-actions">
              <button type="button" className="con-btn" onClick={() => setConfirming(false)}>返回修改</button>
              <button
                type="button"
                className="con-btn is-primary"
                disabled={sending}
                onClick={async () => {
                  if (audience !== 'all') {
                    setConfirming(false);
                    setError('接口目前只支持“全部客户”；指定人群要等 userIds 对接。');
                    return;
                  }
                  setSending(true);
                  setError('');
                  try {
                    await sendBroadcast({ title, body, audience: audience === 'all' ? 'ALL' : 'SPECIFIED', userIds: [] });
                    setConfirming(false);
                    setNotice('已发出。对方下次登录会看到这条公告，只弹一次。');
                  } catch (err) {
                    setError(err?.response?.data?.message || '发送失败。');
                    setConfirming(false);
                  } finally {
                    setSending(false);
                  }
                }}
              >
                {sending ? '发送中…' : '确认发送'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error ? <p className="br-error">{error}</p> : null}
      {notice && (
        <div className="br-banner">
          {notice}
          <button type="button" onClick={() => setNotice('')}>知道了</button>
          {draft ? <button type="button" onClick={clearDraft}>清掉草稿</button> : null}
        </div>
      )}
    </div>
  );
}

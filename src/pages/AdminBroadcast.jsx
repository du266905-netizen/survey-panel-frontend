import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, Check, Megaphone, Send, Users } from 'lucide-react';
import './AdminBroadcast.css';

/* 人工发一条通知。
 *
 * 三步：写内容 → 选人 → 定时间，最后过一遍复核再发。顺序照 Intercom 的 outbound
 * 控制台（先定受众、发送前有 review）和 Firebase 控制台（compose → audience →
 * schedule → review）。
 *
 * 只做前端：最后一步点「确认发送」不会真发——后端没有广播接口，也没有
 * ANNOUNCEMENT 类型。
 */

const STEPS = [
  { id: 1, label: '内容' },
  { id: 2, label: '受众' },
  { id: 3, label: '发送' },
];

const AUDIENCES = [
  { id: 'all', label: '全部研究端账号', note: '含还未开通项目的账号', count: 128 },
  { id: 'active', label: '有进行中项目的客户', note: '项目处于已付款到进行中', count: 42 },
  { id: 'picked', label: '指定客户', note: '按邮箱或公司名挑', count: 0 },
];

export default function AdminBroadcast() {
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState('notice');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaHref, setCtaHref] = useState('');
  const [audience, setAudience] = useState('all');
  const [picked, setPicked] = useState('');
  const [when, setWhen] = useState('now');
  const [scheduleAt, setScheduleAt] = useState('2026-11-10T09:00');
  const [testEmail, setTestEmail] = useState('');
  const [previewTab, setPreviewTab] = useState('bell');
  const [confirming, setConfirming] = useState(false);
  const [notSent, setNotSent] = useState(false);

  const pickedCount = useMemo(() => picked.split(/[,，\s]+/).filter(Boolean).length, [picked]);
  const audienceCount = audience === 'picked' ? pickedCount : AUDIENCES.find((item) => item.id === audience).count;

  const contentReady = title.trim().length > 0 && body.trim().length > 0;
  const audienceReady = audience !== 'picked' || pickedCount > 0;
  const canContinue = step === 1 ? contentReady : step === 2 ? audienceReady : true;

  const goNext = () => { if (canContinue && step < 3) setStep(step + 1); };

  return (
    <div className="con-body br">
      <header className="con-head">
        <div>
          <h1>发通知</h1>
          <p>人工写一条，推到对方工作台。通知进铃铛，公告在下次登录时弹一次。</p>
        </div>
        <span className="con-stamp">草稿</span>
      </header>

      <ol className="br-steps">
        {STEPS.map((item) => (
          <li key={item.id} className={`${step === item.id ? 'is-current' : ''}${step > item.id ? ' is-done' : ''}`}>
            <span>{step > item.id ? <Check size={12} /> : item.id}</span>
            {item.label}
          </li>
        ))}
      </ol>

      <div className="br-grid">
        <div className="br-form">
          {step === 1 && (
            <section className="br-block">
              <h2>形式</h2>
              <div className="br-seg" role="tablist">
                <button type="button" role="tab" aria-selected={kind === 'notice'} className={kind === 'notice' ? 'is-active' : ''} onClick={() => { setKind('notice'); setPreviewTab('bell'); }}>
                  <Bell size={15} /> 通知
                </button>
                <button type="button" role="tab" aria-selected={kind === 'announcement'} className={kind === 'announcement' ? 'is-active' : ''} onClick={() => { setKind('announcement'); setPreviewTab('modal'); }}>
                  <Megaphone size={15} /> 公告
                </button>
              </div>
              <p className="br-hint">
                {kind === 'notice'
                  ? '进铃铛，不弹窗。适合“有进展、要你知道”的事。'
                  : '登录时弹一次，每条只弹一次。适合必须说明、不能错过的事。'}
              </p>

              <h2 className="br-sub">内容</h2>
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
                  <span>按钮文案（可选）</span>
                  <input value={ctaLabel} maxLength={16} onChange={(event) => setCtaLabel(event.target.value)} placeholder="查看发票" />
                </label>
                <label className="br-field">
                  <span>跳到哪一页（可选）</span>
                  <input value={ctaHref} onChange={(event) => setCtaHref(event.target.value)} placeholder="/business/billing" />
                </label>
              </div>
            </section>
          )}

          {step === 2 && (
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
              <p className="br-hint">已退订、没有邮箱、邮件硬退的客户会被自动排除，不计入上面的数字。</p>
            </section>
          )}

          {step === 3 && (
            <>
              <section className="br-block">
                <h2>什么时候发</h2>
                <div className="br-seg br-seg-wide" role="tablist">
                  <button type="button" role="tab" aria-selected={when === 'now'} className={when === 'now' ? 'is-active' : ''} onClick={() => setWhen('now')}>立即</button>
                  <button type="button" role="tab" aria-selected={when === 'later'} className={when === 'later' ? 'is-active' : ''} onClick={() => setWhen('later')}>定时</button>
                </div>
                {when === 'later' && (
                  <input className="br-datetime" type="datetime-local" value={scheduleAt} onChange={(event) => setScheduleAt(event.target.value)} />
                )}
              </section>

              <section className="br-block">
                <h2>先发给自己</h2>
                <div className="br-test">
                  <input value={testEmail} onChange={(event) => setTestEmail(event.target.value)} placeholder="你的邮箱，多个用逗号分开" />
                  <button type="button" className="con-btn" disabled={!testEmail.trim()}>发送测试</button>
                </div>
                <p className="br-hint">测试只出现在你自己的铃铛里，不计入受众，客户看不到。</p>
              </section>

              <section className="br-block">
                <h2>过一遍</h2>
                <dl className="br-review">
                  <div><dt>形式</dt><dd>{kind === 'notice' ? '通知（进铃铛）' : '公告（登录弹一次）'}</dd></div>
                  <div><dt>标题</dt><dd>{title || '—'}</dd></div>
                  <div><dt>正文</dt><dd>{body || '—'}</dd></div>
                  <div><dt>受众</dt><dd>{AUDIENCES.find((item) => item.id === audience).label} · 预计送达 {audienceCount} 人</dd></div>
                  <div><dt>时间</dt><dd>{when === 'now' ? '立即发送' : scheduleAt.replace('T', ' ')}</dd></div>
                </dl>
              </section>
            </>
          )}

          <footer className="br-actions">
            {step > 1 && <button type="button" className="con-btn" onClick={() => setStep(step - 1)}><ArrowLeft size={14} /> 上一步</button>}
            {step < 3 && <button type="button" className="con-btn is-primary" disabled={!canContinue} onClick={goNext}>下一步 <ArrowRight size={14} /></button>}
            {step === 3 && <button type="button" className="con-btn is-primary" disabled={!contentReady || !audienceReady} onClick={() => setConfirming(true)}><Send size={14} /> 发送</button>}
            <button type="button" className="con-btn">存草稿</button>
            <span className="br-note">接口未接，最后一步不会真的发出。</span>
          </footer>
        </div>

        <aside className="br-preview">
          <div className="br-preview-head">
            <h2>预览</h2>
            <div className="br-preview-tabs">
              <button type="button" className={previewTab === 'bell' ? 'is-active' : ''} onClick={() => setPreviewTab('bell')}>铃铛</button>
              <button type="button" className={previewTab === 'modal' ? 'is-active' : ''} onClick={() => setPreviewTab('modal')}>公告弹窗</button>
            </div>
          </div>

          {previewTab === 'bell' ? (
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
              <p className="br-bell-more"><Users size={13} /> 预计送达 {audienceCount} 人</p>
            </div>
          ) : (
            <div className="br-modal">
              <span className="br-modal-kind">公告</span>
              <h3>{title || '公告标题'}</h3>
              <p>{body || '正文写在这里。公告会在登录时弹一次，看完不再出现。'}</p>
              {ctaLabel ? <span className="br-modal-cta">{ctaLabel}</span> : null}
              <small>每条公告只弹一次 · 预计送达 {audienceCount} 人</small>
            </div>
          )}

          <p className="br-preview-note">铃铛里的样子，和工作台右上角那个面板一致。</p>
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
              <button type="button" className="con-btn is-primary" onClick={() => { setConfirming(false); setNotSent(true); }}>确认发送</button>
            </div>
          </div>
        </div>
      )}

      {notSent && (
        <div className="br-banner">
          这是前端演示：广播接口还没接，没有真的发出去。
          <button type="button" onClick={() => setNotSent(false)}>知道了</button>
        </div>
      )}
    </div>
  );
}

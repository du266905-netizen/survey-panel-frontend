import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Send } from 'lucide-react';
import { EMAIL_TEMPLATES, RESEND_TEMPLATES_URL } from '../content/emailTemplates';
import { getMarketingDeliveries, previewMarketingCampaign, sendMarketingCampaign } from '../api/realApi';
import './AdminMessages.css';

/* 营销与模板。
 *
 * 三块：
 *   营销邮件 —— 从 guanyi-media.com 发，走独立凭据，不碰交易邮件；带预览、同意确认、投递记录；
 *   模板     —— 十二个模板的目录，正文在 Resend 改；
 *   交易邮件 —— 从 guanyisearch.com 发（验证码、收据、转账通知），人工要确认的那些排队在这里。
 *
 * 营销这块的规矩照 Mailchimp / MailerLite：先预览再发、收件人显式确认同意、
 * 每封都有投递记录，服务端还会再核一次同意状态（没同意直接跳过，不静默发出去）。
 */

const MODE_LABEL = { auto: '自动', manual: '需人工', planned: '预留' };

const CAMPAIGN_TEMPLATES = [
  { id: 'organization-market-research', label: '机构 · 市场研究服务' },
  { id: 'participant-community', label: '参与端 · 社群招募' },
];

const LOCALES = [
  { id: 'en', label: 'English' },
  { id: 'zh', label: '中文' },
];

export default function AdminMessages() {
  const [tab, setTab] = useState('campaign');
  const [template, setTemplate] = useState('organization-market-research');
  const [locale, setLocale] = useState('en');
  const [recipients, setRecipients] = useState('');
  const [consent, setConsent] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [deliveries, setDeliveries] = useState([]);

  const count = useMemo(() => recipients.split(/[\s,;]+/).filter(Boolean).length, [recipients]);

  useEffect(() => {
    if (tab !== 'campaign') return;
    getMarketingDeliveries({ limit: 20 })
      .then(({ data }) => setDeliveries(data?.deliveries || []))
      .catch(() => setDeliveries([]));
  }, [tab]);

  const runPreview = async () => {
    setPreviewing(true);
    setError('');
    try {
      const { data } = await previewMarketingCampaign({ template, locale });
      setPreview(data);
    } catch {
      setError('预览没回来，检查一下接口与选择。');
    } finally {
      setPreviewing(false);
    }
  };

  const send = async () => {
    setSending(true);
    setError('');
    setResult('');
    try {
      const { data } = await sendMarketingCampaign({ template, locale, recipientText: recipients, confirmMarketingConsent: consent });
      setResult(`已排队 ${data.queued || 0} 封，失败 ${data.failed || 0} 封（共 ${data.requested || 0} 个地址）。`);
    } catch (err) {
      const code = err?.response?.data?.code;
      setError(code === 'MARKETING_CONSENT_REQUIRED' ? '要勾选“这些人都同意接收”，这是硬条件。' : (err?.response?.data?.message || '发送失败。'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>营销与模板</h1>
        </div>
        <div className="con-head-actions">
          <a className="con-btn" href={RESEND_TEMPLATES_URL} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> 在 Resend 打开模板
          </a>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {[['campaign', '营销邮件'], ['templates', '模板'], ['transactional', '交易邮件']].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'campaign' && (
        <div className="msg-campaign">
          <section className="msg-form">
            <div className="msg-row">
              <label className="msg-field">
                <span>模板</span>
                <select value={template} onChange={(event) => setTemplate(event.target.value)}>
                  {CAMPAIGN_TEMPLATES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <label className="msg-field">
                <span>语言</span>
                <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                  {LOCALES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
            </div>

            <label className="msg-field">
              <span>收件人<em>{count}/100</em></span>
              <textarea rows={4} value={recipients} onChange={(event) => setRecipients(event.target.value)} placeholder="一行一个邮箱，或用逗号分开。上限 100 个。" />
            </label>

            <label className="msg-consent">
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
              这些人都已同意接收营销邮件（服务端还会再核一次，没同意的会被跳过）
            </label>

            <div className="msg-actions">
              <button type="button" className="con-btn" onClick={runPreview} disabled={previewing}>{previewing ? '生成中…' : '预览'}</button>
              <button type="button" className="con-btn is-primary" onClick={send} disabled={sending || !consent || !count}>
                <Send size={14} /> {sending ? '发送中…' : '发送'}
              </button>
              <span className="msg-from">发件域名 guanyi-media.com · 营销独立凭据</span>
            </div>

            {result ? <p className="msg-ok">{result}</p> : null}
            {error ? <p className="msg-error">{error}</p> : null}
          </section>

          <section className="msg-preview">
            <div className="msg-preview-head">
              <span>预览</span>
              {preview ? <em>{preview.subject}</em> : null}
            </div>
            {preview ? (
              <iframe title="邮件预览" className="msg-frame" srcDoc={preview.html} sandbox="" />
            ) : (
              <div className="msg-preview-empty">点“预览”看这封邮件长什么样。发送前必须看过。</div>
            )}
          </section>

          <section className="msg-deliveries">
            <h2>最近投递</h2>
            <div className="con-table">
              <table>
                <thead><tr><th>收件人</th><th>模板</th><th>状态</th><th className="is-right">时间</th></tr></thead>
                <tbody>
                  {deliveries.length ? deliveries.map((item) => (
                    <tr key={item.id}>
                      <td>{item.recipient}</td>
                      <td>{item.template}</td>
                      <td><span className="msg-mode">{item.status}</span></td>
                      <td className="is-right">{item.createdAt ? new Date(item.createdAt).toISOString().slice(0, 16).replace('T', ' ') : '—'}</td>
                    </tr>
                  )) : (
                    <tr className="is-empty"><td colSpan={4}>还没有投递记录。</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {tab === 'templates' && (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>模板</th><th>什么时候发</th><th>方式</th><th>变量</th><th /></tr></thead>
              <tbody>
                {EMAIL_TEMPLATES.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.when}</td>
                    <td><span className={`msg-mode is-${item.mode}`}>{MODE_LABEL[item.mode]}</span></td>
                    <td className="msg-vars">{item.vars}</td>
                    <td className="is-right">
                      <a className="msg-link" href={RESEND_TEMPLATES_URL} target="_blank" rel="noreferrer">打开 <ExternalLink size={12} /></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="msg-note">正文在 Resend 改，改完不用发版；这张表只管“叫什么、什么时候发、用哪些变量”。</p>
        </>
      )}

      {tab === 'transactional' && (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>收件人</th><th>模板</th><th className="is-right">金额</th><th>状态</th><th className="is-right">时间</th></tr></thead>
              <tbody>
                <tr className="is-empty">
                  <td colSpan={5}>
                    还没有发件箱。从 guanyisearch.com 发出、需要人确认的邮件（银行转账到账后的收据、核对失败提醒）会排在这里。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="msg-note">
            交易邮件走 guanyisearch.com 的独立凭据，和营销邮件互不影响。要让人工确认生效，需要后端加一张 <code>EmailOutbox</code>（收件人、模板、变量、状态、操作人）和发送接口。
          </p>
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ExternalLink, Mail, RefreshCcw } from 'lucide-react';
import { EMAIL_TEMPLATES, RESEND_TEMPLATES_URL } from '../content/emailTemplates';
import './AdminMessages.css';

/* 消息与模板。
 *
 * 三块，各管各的：
 *   待发送 —— 需要人点头才发的邮件（比如银行转账到账后的收据），一个发件箱；
 *   模板   —— 十二个模板的目录：叫什么、什么时候发、用哪些变量。改正文去 Resend，
 *             这里不复制一份编辑器，免得两边不一致；
 *   发送记录 —— 发出去之后的结果（送达、退信、投诉）。
 *
 * 结构照 Postmark / Resend 的管理台：模板目录 + 发送日志 + 抑制名单三件套。
 * 现在只有模板目录是有数据的，另外两块等后端。
 */

const MODE_LABEL = { auto: '自动', manual: '需人工', planned: '预留' };

export default function AdminMessages() {
  const [tab, setTab] = useState('templates');

  return (
    <div className="con-body">
      <header className="con-head">
        <div>
          <h1>消息与模板</h1>
        </div>
        <div className="con-head-actions">
          <a className="con-btn" href={RESEND_TEMPLATES_URL} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> 在 Resend 打开模板
          </a>
        </div>
      </header>

      <div className="con-tabs" role="tablist">
        {[['outbox', '待发送'], ['templates', '模板'], ['log', '发送记录']].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'outbox' && (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>收件人</th><th>模板</th><th className="is-right">金额</th><th>状态</th><th className="is-right">时间</th><th /></tr></thead>
              <tbody>
                <tr className="is-empty">
                  <td colSpan={6}>
                    还没有发件箱。需要人工确认的邮件（银行转账到账后的收据、核对失败的提醒）会排在这里，确认后才发。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="msg-note">
            这块要有后端：一张 <code>EmailOutbox</code> 表（收件人、模板、变量、状态、操作人）+ 发送接口。现在人工邮件只能靠人记得去发。
          </p>
        </>
      )}

      {tab === 'templates' && (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>模板</th><th>什么时候发</th><th>方式</th><th>变量</th><th /></tr></thead>
              <tbody>
                {EMAIL_TEMPLATES.map((template) => (
                  <tr key={template.id}>
                    <td>{template.name}</td>
                    <td>{template.when}</td>
                    <td><span className={`msg-mode is-${template.mode}`}>{MODE_LABEL[template.mode]}</span></td>
                    <td className="msg-vars">{template.vars}</td>
                    <td className="is-right">
                      <a className="msg-link" href={RESEND_TEMPLATES_URL} target="_blank" rel="noreferrer">
                        打开 <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="msg-note">
            正文在 Resend 改，改完不用发版；这张表只管“叫什么、什么时候发、用哪些变量”。新增模板或改触发点时才更新这里。
          </p>
        </>
      )}

      {tab === 'log' && (
        <>
          <div className="con-table">
            <table>
              <thead><tr><th>收件人</th><th>模板</th><th>结果</th><th className="is-right">时间</th></tr></thead>
              <tbody>
                <tr className="is-empty">
                  <td colSpan={4}>
                    还没有发送记录。要先把发送日志写进库（谁、哪个模板、送达/退信/投诉），才能在这里查。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="msg-note">
            退信和投诉要能查、能封，否则群发一次就把域名信誉打没了。日志表与 Resend 的 webhook 一起做。
          </p>
        </>
      )}
    </div>
  );
}

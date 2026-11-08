/* 邮件模板目录。
 *
 * 模板本体在 Resend 里改（改完不用发版），这里只保留三件事：叫什么、什么时候发、
 * 用哪些变量。改模板先去 Resend；这里只在“新增一个模板”或“触发点变了”时更新。
 */

export const EMAIL_TEMPLATES = [
  { id: '1259c04a-3a5b-4561-b715-532c6c8dbd1e', name: 'Email Verification', when: '注册验证码', mode: 'auto', vars: 'CODE' },
  { id: '1a5e5a36-199e-462c-afad-997d159f94c8', name: 'Password Reset', when: '找回密码', mode: 'auto', vars: 'URL' },
  { id: '35d24070-a0f7-4b13-a57d-89ad6ec4e16d', name: 'Business Welcome', when: '研究端注册成功', mode: 'auto', vars: 'NAME' },
  { id: 'acba5d81-5c52-4cc8-a9dd-fdec3892ddd6', name: 'Participant Welcome', when: '参与端注册成功', mode: 'auto', vars: 'NAME' },
  { id: '17b6acfe-c393-4eed-83b4-857e3335f6bb', name: 'Team Invitation', when: '邀请成员', mode: 'auto', vars: 'NAME · URL · ORGANIZATION' },
  { id: '74999b0b-2b03-4e79-9b11-a7bd1adff0b9', name: 'Brief Received', when: '提交研究需求', mode: 'auto', vars: 'NAME · PROJECT' },
  { id: '229b5037-38e2-4d0c-a455-9bd573a9c797', name: 'Organization Marketing', when: '机构群发（英文）', mode: 'manual', vars: 'NAME · DESCRIPTION · UNSUBSCRIBE_URL' },
  { id: 'c13abc48-2b94-4686-9341-b68202492693', name: 'Participant Marketing', when: '参与端群发', mode: 'manual', vars: 'NAME · DESCRIPTION · UNSUBSCRIBE_URL' },
  { id: '4590108f-b5fd-4153-a9cd-bd21758b232d', name: 'Transfer Notice', when: '提交银行转账申报', mode: 'auto', vars: 'AMOUNT · REFERENCE · DATE' },
  { id: '426b86d2-7c8c-46b1-8b04-43ca7bc2a747', name: 'Payment Received', when: '到账（直接付款自动，转账人工发）', mode: 'manual', vars: 'AMOUNT · INVOICE_ID · INVOICE_URL' },
  { id: '2848ab8f-74d8-4941-a6de-6aea25571610', name: 'Transfer Unmatched', when: '转账核对失败', mode: 'auto', vars: 'AMOUNT · REFERENCE' },
  { id: '83ba6b6d-58b5-4a58-9e3e-eace23787de5', name: 'AI Subscription', when: '套餐开通（预留，订阅未做）', mode: 'planned', vars: 'PLAN · CREDITS · RENEWS_ON' },
];

export const RESEND_TEMPLATES_URL = 'https://resend.com/templates';

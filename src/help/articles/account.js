/* Account and support: getting in, staying in, and reaching a human. */

const article = (slug, category, zh, en) => ({ slug, category, zh, en });

export const ACCOUNT = [
  article('sign-in', 'account', {
    title: '登录与找回密码',
    summary: '用邮箱登录、重设密码、收不到邮件时怎么办。',
    blocks: [
      { p: '使用注册时的邮箱和密码登录。企业账户用管理员给你的邮箱登录，不要用私人邮箱另开一个。' },
      { h: '登录' },
      {
        steps: [
          '打开登录页，输入邮箱与密码。',
          '首次登录会进入工作区概览。',
          '切到其他页面后，会话在一段时间内保持有效。',
        ],
      },
      { h: '忘记密码' },
      {
        steps: [
          '在登录页点「忘记密码」。',
          '输入注册邮箱，提交。',
          '打开邮件里的链接，设置新密码。',
          '用新密码重新登录。',
        ],
      },
      { h: '收不到邮件' },
      { p: '先看垃圾邮件与「所有邮件」，再确认邮箱地址拼写。企业邮箱的网关有时会拦下自动邮件，把我们的域名加入白名单即可。' },
      { h: '链接过期' },
      { p: '重设链接有时效，过期后重新申请一次。旧链接失效，不会与新链接同时可用。' },
      { h: '不要重复注册' },
      { p: '同一个邮箱重复注册会失败，也可能让原账户的访问变得混乱。登不进去时先找回密码，再联系客服。' },
      { h: '多处登录' },
      { p: '同一个账户可以在多台设备登录。发现陌生设备的会话，立即改密码并通知客服。' },
      { note: '客服不会向你索要密码或验证码。任何索要这些信息的人都不是我们。' },
    ],
  }, {
    title: 'Signing in and resetting a password',
    summary: 'Email sign-in, password reset, and what to do when the email does not arrive.',
    blocks: [
      { p: 'Sign in with the email and password used at registration. On a company account, use the address your administrator set up rather than opening a second one.' },
      { h: 'Signing in' },
      {
        steps: [
          'Open the sign-in page and enter the email and password.',
          'The first sign-in lands on the workspace overview.',
          'The session stays valid for a while as you move between pages.',
        ],
      },
      { h: 'Forgot the password' },
      {
        steps: [
          'Select Forgot password on the sign-in page.',
          'Enter the registered email and submit.',
          'Open the link in the email and set a new password.',
          'Sign in with the new password.',
        ],
      },
      { h: 'No email' },
      { p: 'Check spam and “all mail”, then the spelling of the address. Corporate gateways sometimes hold automated mail; allowlist our domain.' },
      { h: 'The link expired' },
      { p: 'Reset links expire. Request a new one; the old link stops working and does not run alongside the new one.' },
      { h: 'Do not register twice' },
      { p: 'Registering the same address again fails, and it can muddle access to the original account. Reset the password first, then contact support.' },
      { h: 'Several sessions' },
      { p: 'One account can be signed in on several devices. If a session looks unfamiliar, change the password and tell support.' },
      { note: 'Support never asks for your password or a code. Anyone who does is not us.' },
    ],
  }),

  article('security', 'account', {
    title: '账户安全',
    summary: '密码、会话、付款安全的做法，以及发现异常时的顺序。',
    blocks: [
      { p: '账户里能看到的只有你自己的余额、项目与账单，但这仍然值得按财务系统的标准来保护。' },
      { h: '密码' },
      { p: '至少 12 位，混用大小写、数字与符号，不复用其他系统的密码。用密码管理器生成与保存，不要写在便签或聊天记录里。' },
      { h: '谁能登录' },
      { p: '一个账户对应一个登录邮箱。把邮箱交给谁，等于把余额与付款能力交给谁，因此优先用财务或采购的公共邮箱并控制访问。' },
      { h: '会话' },
      { p: '在公用电脑上用完要退出登录，不要只关标签页。手机与平板上的会话同样有效，丢失设备后先改密码。' },
      { h: '付款安全' },
      {
        steps: [
          '只从站内进入充值页，不要点邮件或聊天里的付款链接。',
          '付款前核对金额与收款方。',
          '付款链接只发给确切的付款人，不要发到群里。',
        ],
      },
      { h: '发现异常时' },
      {
        steps: [
          '立即改密码。',
          '核对最近的充值、付款与账单信息。',
          '把时间点和看到的异常发给客服。',
          '不要自行删除记录，核对需要它们。',
        ],
      },
      { h: '钓鱼' },
      { p: '我们不会用短信或社交软件索要密码、验证码或卡号，也不会要求你远程操作电脑。收到这类消息直接忽略并告知客服。' },
      { note: '安全问题的处理顺序永远是：先改密码，再核对，再联系。' },
    ],
  }, {
    title: 'Account security',
    summary: 'Passwords, sessions, payment habits, and the order to act in when something looks wrong.',
    blocks: [
      { p: 'An account exposes only your balance, projects, and billing, but it still deserves the care you give a finance system.' },
      { h: 'Passwords' },
      { p: 'Twelve characters or more, mixed case, digits, and symbols, never reused. Generate and store them in a password manager rather than a note or a chat thread.' },
      { h: 'Who can sign in' },
      { p: 'One account, one sign-in address. Whoever holds that mailbox holds the balance and the ability to pay, so prefer a finance or procurement mailbox with controlled access.' },
      { h: 'Sessions' },
      { p: 'Sign out on shared machines; closing the tab is not enough. Sessions on phones and tablets count too, so change the password if a device goes missing.' },
      { h: 'Paying safely' },
      {
        steps: [
          'Always start from the site, never from a payment link in an email or chat.',
          'Check the amount and the payee before confirming.',
          'Send a payment link to the exact payer, never to a group.',
        ],
      },
      { h: 'When something looks wrong' },
      {
        steps: [
          'Change the password first.',
          'Review recent top-ups, payments, and billing details.',
          'Send support the times and what looked off.',
          'Do not delete records: matching needs them.',
        ],
      },
      { h: 'Phishing' },
      { p: 'We never ask for passwords, codes, or card numbers by SMS or social apps, and never ask to drive your machine remotely. Ignore such messages and tell support.' },
      { note: 'The order is always: password, review, then contact.' },
    ],
  }),

  article('account-settings', 'account', {
    title: '账户资料与设置',
    summary: '账户页里有什么、能改什么、改了会影响什么。',
    blocks: [
      { p: '工作区左下角的 Settings 里有账户、发票与账单、账户预算三块。这里只讲账户本身。' },
      { h: '账户页' },
      { p: '账户页显示登录邮箱、显示名称与账户状态，也提供进入账单信息与预算的入口。' },
      { h: '显示名称' },
      { p: '显示名称只影响界面上的称呼，不影响发票抬头，也不影响登录邮箱。改它不需要通知财务。' },
      { h: '登录邮箱' },
      { p: '登录邮箱决定谁能进入账户。需要更换时联系客服，由我们核对身份后修改，不要自己新开账户。' },
      { h: '所属主体' },
      { p: '账户主体在开通时确定，个人与企业的付款通道、发票与权限不同。需要从个人转企业时联系客服。' },
      { h: '要一起改的' },
      {
        steps: [
          '换邮箱时，同时更新账单信息里的收票邮箱。',
          '换主体时，确认既有发票抬头是否需要重开。',
          '有进行中的付款时，先等它结束再改。',
        ],
      },
      { note: '账户资料与账单信息是两套字段：改错地方不会生效。' },
    ],
  }, {
    title: 'Account and settings',
    summary: 'What the account page holds, what can be changed, and what a change touches.',
    blocks: [
      { p: 'Settings, at the bottom of the workspace rail, holds Account, Billing and invoices, and Budgets. This page covers the account itself.' },
      { h: 'The account page' },
      { p: 'It shows the sign-in address, the display name, and the account state, and links into billing details and budgets.' },
      { h: 'Display name' },
      { p: 'Cosmetic. It changes how the interface addresses you, not the invoice header and not the sign-in address.' },
      { h: 'Sign-in address' },
      { p: 'It decides who can get in. To change it, contact support so we verify you first; do not open a second account.' },
      { h: 'Account entity' },
      { p: 'Set when the account is opened. Individual and company accounts differ in payment channels, invoicing, and permissions. Ask support to switch.' },
      { h: 'Change these together' },
      {
        steps: [
          'When changing the address, update the invoice mailbox in billing details.',
          'When changing the entity, decide whether existing invoices must be reissued.',
          'With a payment in flight, wait for it to settle first.',
        ],
      },
      { note: 'Account fields and billing fields are separate: editing the wrong one changes nothing.' },
    ],
  }),

  article('support', 'account', {
    title: '联系客服',
    summary: '在哪里找到我们、一次说清什么、多久回复。',
    blocks: [
      { p: '右下角的对话窗口是最快的通道。付款问题请从站内发起，附上订单信息，不要另开邮件线程。' },
      { h: '一次说清' },
      {
        steps: [
          '账户邮箱。',
          '涉及的页面与时间（精确到小时）。',
          '金额与币种。',
          '页面上的状态，或报错原文。',
          '已经试过什么。',
        ],
      },
      { h: '付款类问题额外给' },
      { p: '付款方式、交易号或交易哈希、银行附言。有凭证就附上，没有也先说明。' },
      { h: '不要发的东西' },
      { p: '卡号、安全码、密码、验证码。我们从不需要这些，拿到了也不会用来处理问题。' },
      { h: '回复时间' },
      { p: '工作时间内通常几小时内回复。账单与对账类问题需要核对记录，可能跨一个工作日。' },
      { h: '跟进' },
      { p: '同一个问题继续在原对话里回复，不要每封都开新线程：上下文断了要重新查一遍。' },
      { note: '紧急且涉及资金安全时，在第一条消息里写明「资金安全」，会优先处理。' },
    ],
  }, {
    title: 'Contacting support',
    summary: 'Where to find us, what to include in one message, and how fast we answer.',
    blocks: [
      { p: 'The chat in the bottom-right corner is the fastest route. For payment issues, start it from the site and include the order details rather than opening a separate email thread.' },
      { h: 'In one message' },
      {
        steps: [
          'The account email.',
          'The page and the time, to the hour.',
          'The amount and currency.',
          'The status shown, or the error text as written.',
          'What you have already tried.',
        ],
      },
      { h: 'Add these for payment issues' },
      { p: 'The channel, the transaction id or hash, the bank reference. Attach evidence if you have it, and say so if you do not.' },
      { h: 'Never send' },
      { p: 'Card numbers, security codes, passwords, or one-time codes. We never need them, and having them does not speed anything up.' },
      { h: 'Response time' },
      { p: 'Usually within hours during business hours. Billing and reconciliation questions need records checked and may take a business day.' },
      { h: 'Following up' },
      { p: 'Reply in the same thread. A new thread loses the context and starts the check over.' },
      { note: 'If money is at risk, put “funds at risk” in the first line; those are picked up first.' },
    ],
  }),
];

/* Help centre content.
 *
 * Structure follows the researcher help centres of comparable products
 * (Prolific, SurveyMonkey): categories follow the customer journey —
 * start, projects, recruiting, results, money — and every article opens with
 * the outcome, then the steps, then one note. No background, no theory.
 *
 * Blocks stay small on purpose: p, h, steps, note. Anything richer belongs in
 * a screenshot, not in markup.
 */

export const CATEGORIES = [
  {
    id: 'start',
    zh: '开始使用',
    en: 'Getting started',
    zhNote: '账号、登录与工作区的基本操作。',
    enNote: 'Account, sign-in, and finding your way around.',
  },
  {
    id: 'projects',
    zh: '项目与问卷',
    en: 'Projects and questionnaires',
    zhNote: '从新建项目到问卷上线。',
    enNote: 'From a new project to a live questionnaire.',
  },
  {
    id: 'recruiting',
    zh: '招募与样本',
    en: 'Recruiting',
    zhNote: '样本、配额与参与者质量。',
    enNote: 'Samples, quotas, and participant quality.',
  },
  {
    id: 'results',
    zh: '结果与报告',
    en: 'Results',
    zhNote: '查看结果、导出数据、交付报告。',
    enNote: 'Reading results, exporting data, delivering reports.',
  },
  {
    id: 'payments',
    zh: '充值与账单',
    en: 'Payments and billing',
    zhNote: '充值、付款方式、付款链接、账单与发票。',
    enNote: 'Top-ups, payment methods, links, billing, and invoices.',
  },
  {
    id: 'account',
    zh: '账户与安全',
    en: 'Account and security',
    zhNote: '资料、密码与通知设置。',
    enNote: 'Profile, password, and notifications.',
  },
];

export const ARTICLES = [
  {
    slug: 'top-up',
    category: 'payments',
    zh: {
      title: '如何给账户充值',
      summary: '充值金额、最低额度，以及付款前需要准备什么。',
      blocks: [
        { p: '充值是把金额加到账户余额，用于支付研究项目。单次最低 US$100。' },
        {
          steps: [
            '进入「充值余额」页面。',
            '输入金额，或点选 US$100 / 250 / 500 / 1000 四个预设。',
            '选择付款方式：信用卡、加密货币或银行转账。',
            '按所选通道完成付款。',
          ],
        },
        { h: '付款前需要准备' },
        {
          p: '首次充值前需要填完账单信息：公司名称、国家 / 地区、地址、城市、邮编、邮箱。档案不完整时，付款入口不会放行。',
        },
        { note: '金额在创建后不可修改。需要改金额时，直接发起一笔新的充值。' },
      ],
    },
    en: {
      title: 'How to top up your balance',
      summary: 'Amounts, the minimum, and what to have ready before paying.',
      blocks: [
        { p: 'A top-up adds money to your account balance, which pays for research projects. The minimum for one top-up is US$100.' },
        {
          steps: [
            'Open the Add funds page.',
            'Type an amount, or pick one of the presets: US$100, 250, 500, 1000.',
            'Choose a payment method: card, cryptocurrency, or bank transfer.',
            'Complete the payment in that channel.',
          ],
        },
        { h: 'Before you pay' },
        {
          p: 'The billing details must be complete first: company name, country, address, city, postal code, and email. The payment options stay closed until they are.',
        },
        { note: 'The amount is fixed once created. To change it, start a new top-up.' },
      ],
    },
  },
  {
    slug: 'card',
    category: 'payments',
    zh: {
      title: '用信用卡或借记卡付款',
      summary: '支持哪些卡、卡信息填在哪里，以及被拒时怎么办。',
      blocks: [
        { p: '支持 Visa、Mastercard、American Express、JCB 等主流卡种，可付美元。' },
        {
          steps: [
            '在付款方式里选择「信用卡 / 借记卡」。',
            '填写卡号、有效期与安全码。',
            '核对金额后提交。',
            '等待页面返回结果，成功时余额在几秒内更新。',
          ],
        },
        {
          p: '卡信息在 PayPal 的加密字段中输入，不经过本网站服务器，我们也不保存卡号。',
        },
        { note: '被发卡行拒绝时不会产生扣款，可以换一张卡重试。' },
      ],
    },
    en: {
      title: 'Paying by credit or debit card',
      summary: 'Which cards work, where the details go, and what a decline means.',
      blocks: [
        { p: 'Visa, Mastercard, American Express, and JCB are supported, charged in US dollars.' },
        {
          steps: [
            'Choose Credit or debit card.',
            'Enter the card number, expiry, and security code.',
            'Check the amount and submit.',
            'Wait for the result; the balance updates within seconds on success.',
          ],
        },
        {
          p: 'Card details are entered in PayPal’s encrypted fields. They never reach our servers, and we do not store card numbers.',
        },
        { note: 'A declined card is not charged. Try another card.' },
      ],
    },
  },
  {
    slug: 'crypto',
    category: 'payments',
    zh: {
      title: '用加密货币付款',
      summary: '跳转到收款页之后怎么做，以及到账时间。',
      blocks: [
        { p: '加密货币由托管收款页完成收款，支持主流币种与网络。' },
        {
          steps: [
            '在付款方式里选择「加密货币」。',
            '点「继续」，页面会跳转到收款页。',
            '按收款页给出的地址、币种和网络完成转账。',
            '转账后回到本站查看状态。',
          ],
        },
        {
          p: '到账以链上确认为准，时间取决于网络拥堵。本站显示的状态以服务端确认为准，不以页面提示为准。',
        },
        { note: '请务必使用收款页给出的网络。选错网络或地址，资金无法找回。' },
      ],
    },
    en: {
      title: 'Paying with cryptocurrency',
      summary: 'What happens after the redirect, and how long confirmation takes.',
      blocks: [
        { p: 'Crypto payments settle through a hosted checkout page that supports the major coins and networks.' },
        {
          steps: [
            'Choose Cryptocurrency.',
            'Select Continue; the page redirects to the checkout.',
            'Send the transfer using the address, coin, and network shown there.',
            'Return to this site to check the status.',
          ],
        },
        {
          p: 'Confirmation comes from the chain and depends on network load. The status on this site follows the server, not the page message.',
        },
        { note: 'Use the network shown on the checkout page. Funds sent on the wrong network cannot be recovered.' },
      ],
    },
  },
  {
    slug: 'bank-transfer',
    category: 'payments',
    zh: {
      title: '银行转账与转账申报',
      summary: '怎么汇、怎么申报，以及多久入账。',
      blocks: [
        { p: '银行转账适合大额或对公付款，到账需要银行处理时间。' },
        {
          steps: [
            '在付款方式里选择「银行转账」。',
            '按页面提供的收款信息完成汇款。',
            '回到页面点「我已转账」。',
            '填写付款账户名称与转账日期，可选填交易号。',
          ],
        },
        { p: '银行到账通常需要 2–5 个工作日。到账后我们核对并入账，入账前余额不会变化。' },
        { note: '同一笔申报重复提交不会重复入账。' },
      ],
    },
    en: {
      title: 'Bank transfer and filing a claim',
      summary: 'How to send, how to declare it, and when it is credited.',
      blocks: [
        { p: 'Bank transfer suits larger or corporate payments. Settlement depends on the banks involved.' },
        {
          steps: [
            'Choose Bank transfer.',
            'Send the payment using the receiving details on the page.',
            'Come back and select “I have sent the transfer”.',
            'Enter the sending account name and transfer date; a reference is optional.',
          ],
        },
        { p: 'Arrival usually takes 2–5 business days. We match it and credit the balance; until then the balance does not change.' },
        { note: 'Filing the same claim twice does not credit it twice.' },
      ],
    },
  },
  {
    slug: 'payment-link',
    category: 'payments',
    zh: {
      title: '创建并使用付款链接',
      summary: '把一笔充值交给别人支付：创建、发送、有效期。',
      blocks: [
        { p: '付款链接用于把一笔充值交给其他人支付，例如由客户或同事代付。' },
        {
          steps: [
            '在充值页选择「Payment link」。',
            '确认账单信息完整。',
            '点「Create link」，弹窗中会出现链接。',
            '复制链接，发送给付款人。',
          ],
        },
        {
          p: '链接金额固定，有效期 24 小时。付款人打开后可以选择信用卡、加密货币或银行转账，付款前会看到金额与用途。',
        },
        { note: '过期或已撤销的链接无法付款，需要重新生成。' },
      ],
    },
    en: {
      title: 'Creating and sharing a payment link',
      summary: 'Hand a top-up to someone else: create, send, and the 24-hour lifetime.',
      blocks: [
        { p: 'A payment link lets someone else pay a top-up, for example a client or a colleague.' },
        {
          steps: [
            'On the Add funds page, choose Payment link.',
            'Make sure the billing details are complete.',
            'Select Create link; the link appears in a dialog.',
            'Copy the link and send it to the payer.',
          ],
        },
        {
          p: 'The amount is fixed and the link lives for 24 hours. The payer can choose card, crypto, or bank transfer, and sees the amount before paying.',
        },
        { note: 'Expired or revoked links cannot be paid. Create a new one.' },
      ],
    },
  },
  {
    slug: 'payment-failed',
    category: 'payments',
    zh: {
      title: '付款没有完成怎么办',
      summary: '付款失败、取消、一直显示确认中，分别怎么处理。',
      blocks: [
        { p: '付款结束时页面会给出结果。按结果处理，不要重复点击。' },
        { h: '付款未完成' },
        { p: '本次没有扣款。可以重新发起；如果连续失败，换一张卡或联系发卡行。' },
        { h: '一直显示确认中' },
        {
          p: '确认结果由支付服务商返回，通常几秒。超过 15 秒可以关闭页面，结果会通过邮件通知你。',
        },
        { h: '付款成功' },
        { p: '余额不会立刻出现在页面上时，刷新一次即可。' },
        { note: '同一笔充值可以重新发起，不会重复扣款。仍未解决时，使用页面右下角的客服。' },
      ],
    },
    en: {
      title: 'When a payment does not go through',
      summary: 'Declined, cancelled, or stuck on confirming — what each one means.',
      blocks: [
        { p: 'The page reports the outcome when the attempt ends. Act on that, and do not click repeatedly.' },
        { h: 'Payment not completed' },
        { p: 'Nothing was charged. Try again; if it keeps failing, use another card or contact the issuing bank.' },
        { h: 'Stuck on confirming' },
        {
          p: 'The provider confirms within seconds. After 15 seconds you may close the page; the result arrives by email.',
        },
        { h: 'Payment successful' },
        { p: 'If the balance does not show at once, refresh once.' },
        { note: 'A new attempt on the same top-up does not charge twice. If it still fails, use the chat in the bottom-right corner.' },
      ],
    },
  },
  {
    slug: 'billing-details',
    category: 'payments',
    zh: {
      title: '填写账单信息',
      summary: '必填项、自动保存，以及它为什么影响付款。',
      blocks: [
        { p: '账单信息决定发票抬头，也是充值和创建付款链接的前置条件。' },
        { p: '必填六项：公司名称、国家 / 地区、地址、城市、邮编、邮箱。税号选填，填写时需要同时选类型。' },
        {
          steps: [
            '在充值页或账户页打开「账单信息」。',
            '填完六项必填内容。',
            '等待自动保存，页面显示「已保存」。',
          ],
        },
        { note: '修改账单信息不会改变已经开出的发票抬头。' },
      ],
    },
    en: {
      title: 'Billing details',
      summary: 'What is required, how saving works, and why it gates payments.',
      blocks: [
        { p: 'Billing details set the invoice header and are required before a top-up or a payment link.' },
        { p: 'Six fields are required: company name, country, address, city, postal code, and email. A tax number is optional, and needs a type alongside it.' },
        {
          steps: [
            'Open Billing details from the Add funds or Account page.',
            'Fill in the six required fields.',
            'Wait for the automatic save; the panel shows “Saved”.',
          ],
        },
        { note: 'Editing these details does not change invoices already issued.' },
      ],
    },
  },
  {
    slug: 'invoices',
    category: 'payments',
    zh: {
      title: '发票',
      summary: '发票什么时候开、抬头怎么定、怎么拿到。',
      blocks: [
        { p: '每笔入账的付款对应一张发票，抬头取付款当时的账单信息。' },
        {
          steps: [
            '进入「账单 / 发票」。',
            '按月份查看已开出的发票。',
            '选择发票下载 PDF。',
          ],
        },
        { note: '发票下载功能正在开通中。当前需要发票时，请联系客服并提供付款时间、金额与抬头。' },
      ],
    },
    en: {
      title: 'Invoices',
      summary: 'When they are issued, whose name they carry, and how to get one.',
      blocks: [
        { p: 'Each credited payment has one invoice, issued under the billing details that were current at the time.' },
        {
          steps: [
            'Open Billing / Invoices.',
            'Browse issued invoices by month.',
            'Download the PDF for the one you need.',
          ],
        },
        { note: 'Self-service downloads are still being enabled. For an invoice now, contact support with the payment date, amount, and header.' },
      ],
    },
  },
  {
    slug: 'budget',
    category: 'payments',
    zh: {
      title: '设置预算',
      summary: '给一段时间的花费设上限，以及它不会做什么。',
      blocks: [
        { p: '预算用于给一段时间内的支出设一个上限，便于控制节奏。' },
        {
          steps: [
            '进入「预算」。',
            '点「新建预算」。',
            '填写名称、金额与起止日期。',
            '保存后可在列表中查看用量。',
          ],
        },
        { note: '预算不会拦截付款，只用于查看。用量统计仍在接通中，当前不代表实时余额变化。' },
      ],
    },
    en: {
      title: 'Budgets',
      summary: 'Set a cap for a period, and what the cap does not do.',
      blocks: [
        { p: 'A budget puts a limit on spending for a period so the pace is visible.' },
        {
          steps: [
            'Open Budgets.',
            'Select New budget.',
            'Enter a name, an amount, and the start and end dates.',
            'Save; usage appears in the list.',
          ],
        },
        { note: 'A budget does not block payments; it is for visibility. Usage figures are still being connected and do not yet track live balance changes.' },
      ],
    },
  },
  {
    slug: 'sign-in',
    category: 'account',
    zh: {
      title: '登录与找回密码',
      summary: '用邮箱登录、重设密码，收不到邮件时怎么办。',
      blocks: [
        { p: '使用注册时的邮箱和密码登录。' },
        {
          steps: [
            '打开登录页，输入邮箱与密码。',
            '忘记密码时点「忘记密码」，按邮件中的链接重设。',
            '重设后使用新密码登录。',
          ],
        },
        { note: '收不到邮件时先检查垃圾邮件与邮箱地址拼写；仍未收到时联系客服，不要重复注册。' },
      ],
    },
    en: {
      title: 'Signing in and resetting a password',
      summary: 'Email sign-in, password reset, and missing emails.',
      blocks: [
        { p: 'Sign in with the email address and password used at registration.' },
        {
          steps: [
            'Open the sign-in page and enter the email and password.',
            'If the password is lost, select Forgot password and follow the link in the email.',
            'Sign in with the new password.',
          ],
        },
        { note: 'If the email does not arrive, check spam and the spelling of the address. Contact support rather than registering again.' },
      ],
    },
  },
];

export const findArticle = (slug) => ARTICLES.find((article) => article.slug === slug);

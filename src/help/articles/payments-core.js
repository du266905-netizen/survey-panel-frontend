/* Payments, part one: the money coming in.
 *
 * One article per surface the customer actually touches, each with its own
 * section headings so the "On this page" rail has something to say.
 */

const article = (slug, zh, en) => ({ slug, category: 'payments', zh, en });

export const PAYMENTS_CORE = [
  article(
    'top-up',
    {
      title: '如何给账户充值',
      summary: '充值金额、最低额度、付款方式，以及付款前需要准备什么。',
      blocks: [
        { p: '充值是把金额加到账户余额，余额用于支付研究项目。所有金额以美元结算，单次最低 US$100。' },
        { h: '发起一笔充值' },
        {
          steps: [
            '进入「充值余额」页面。',
            '在金额框里输入数字，或点选 US$100 / 250 / 500 / 1000 四个预设。',
            '选择付款方式：信用卡、加密货币或银行转账。',
            '按所选通道完成付款。',
          ],
        },
        { h: '付款前需要准备' },
        { p: '首次充值前需要填完账单信息：公司名称、国家 / 地区、地址、城市、邮编、邮箱。档案不完整时，付款入口不会放行。' },
        { p: '账单信息可以在充值页右侧展开，也可以在「账户 → 账单信息」里填。填完六项后会自动保存，不需要点保存按钮。' },
        { h: '三种付款方式的差别' },
        {
          steps: [
            '信用卡：最快，通常几秒到账，适合中小额。',
            '加密货币：跳转到托管收款页，到账以链上确认为准。',
            '银行转账：适合大额或对公付款，需要 2–5 个工作日。',
          ],
        },
        { h: '金额可以改吗' },
        { p: '不可以。金额在创建后固定，需要改金额时直接发起一笔新的充值。未完成的那笔不会扣款。' },
        { h: '多久到账' },
        { p: '卡与加密货币在服务商确认后立即入账；银行转账与付款链接需要人工核对，入账前余额不变。' },
        { note: '重复点击提交不会重复扣款：每一笔充值都有独立的幂等键。' },
      ],
    },
    {
      title: 'How to top up your balance',
      summary: 'Amounts, the minimum, the three channels, and what to have ready.',
      blocks: [
        { p: 'A top-up adds money to your account balance, which pays for research projects. Everything settles in US dollars, and the minimum for one top-up is US$100.' },
        { h: 'Start a top-up' },
        {
          steps: [
            'Open the Add funds page.',
            'Type an amount, or pick one of the presets: US$100, 250, 500, 1000.',
            'Choose a payment method: card, cryptocurrency, or bank transfer.',
            'Complete the payment in that channel.',
          ],
        },
        { h: 'Before you pay' },
        { p: 'The billing details must be complete first: company name, country, address, city, postal code, and email. The payment options stay closed until they are.' },
        { p: 'You can open the billing panel on the Add funds page or fill it under Account → Billing details. Six fields save automatically; there is no save button.' },
        { h: 'How the three channels differ' },
        {
          steps: [
            'Card: fastest, usually seconds, best for smaller amounts.',
            'Crypto: a hosted checkout, credited when the chain confirms.',
            'Bank transfer: for larger or corporate payments, 2–5 business days.',
          ],
        },
        { h: 'Can the amount change' },
        { p: 'No. The amount is fixed once created. To change it, start a new top-up; the abandoned one is never charged.' },
        { h: 'When it lands' },
        { p: 'Cards and crypto credit as soon as the provider confirms. Bank transfers and payment links are matched by hand, so the balance does not move until then.' },
        { note: 'Clicking submit twice does not charge twice: every top-up carries its own idempotency key.' },
      ],
    },
  ),

  article(
    'card',
    {
      title: '用信用卡或借记卡付款',
      summary: '支持哪些卡、卡信息去哪里了、被拒时怎么办。',
      blocks: [
        { p: '卡付款适合中小额，到账最快。支持 Visa、Mastercard、American Express、JCB，统一按美元扣款。' },
        { h: '付款流程' },
        {
          steps: [
            '在付款方式里选择「信用卡 / 借记卡」。',
            '在页面内嵌的表单里填写卡号、有效期与安全码。',
            '核对金额与币种后提交。',
            '等待页面返回结果，成功时余额在几秒内更新。',
          ],
        },
        { h: '卡信息去了哪里' },
        { p: '卡信息在 PayPal 的加密字段中输入，不经过本网站服务器，我们也不保存卡号。页面上不会回显卡号，刷新后需要重新填写。' },
        { h: '为什么会被拒' },
        { p: '常见原因是发卡行风控、额度不足、账单地址与卡登记地址不一致、境外交易未开通。被拒时不产生扣款。' },
        { h: '被拒之后' },
        {
          steps: [
            '换一张卡重试，或联系发卡行解除境外交易限制。',
            '确认账单地址与卡登记地址一致。',
            '仍不成功时改用银行转账，或联系右下角客服。',
          ],
        },
        { h: '币种与手续费' },
        { p: '扣款币种为美元。发卡行若收取货币转换费，由发卡行在你这边计收，不在本站页面体现。' },
        { note: '同一张卡短时间内连续失败会被风控拦截，隔一段时间再试。' },
      ],
    },
    {
      title: 'Paying by credit or debit card',
      summary: 'Which cards work, where the details go, and what a decline means.',
      blocks: [
        { p: 'Cards are the fastest channel and suit smaller amounts. Visa, Mastercard, American Express, and JCB are supported, charged in US dollars.' },
        { h: 'The flow' },
        {
          steps: [
            'Choose Credit or debit card.',
            'Fill in the number, expiry, and security code in the embedded form.',
            'Check the amount and currency, then submit.',
            'Wait for the result; the balance updates within seconds on success.',
          ],
        },
        { h: 'Where the card details go' },
        { p: 'They are entered in PayPal’s encrypted fields. They never reach our servers, and we do not store card numbers. The page never shows the number back; a refresh means typing it again.' },
        { h: 'Why a card is declined' },
        { p: 'Usually issuer risk rules, insufficient limit, a billing address that differs from the one on file, or cross-border payments being off. A decline is not charged.' },
        { h: 'After a decline' },
        {
          steps: [
            'Try another card, or ask the issuer to allow the cross-border charge.',
            'Make sure the billing address matches the card’s registered address.',
            'If it still fails, use bank transfer or the chat in the bottom-right corner.',
          ],
        },
        { h: 'Currency and fees' },
        { p: 'The charge is in US dollars. Any currency-conversion fee is applied by the issuing bank on your statement, not on this page.' },
        { note: 'Repeated failures on the same card trip risk rules. Wait before trying again.' },
      ],
    },
  ),

  article(
    'crypto',
    {
      title: '用加密货币付款',
      summary: '跳转到收款页之后怎么做，以及什么时候算到账。',
      blocks: [
        { p: '加密货币适合不方便走银行或卡通道的付款。收款由托管收款页完成，支持主流币种与网络。' },
        { h: '付款流程' },
        {
          steps: [
            '在付款方式里选择「加密货币」。',
            '点「继续」，页面会跳转到收款页。',
            '按收款页给出的地址、币种、网络和金额完成转账。',
            '转账后回到本站，在充值记录里查看状态。',
          ],
        },
        { h: '什么时候算到账' },
        { p: '以链上确认为准，通常需要几分钟，网络拥堵时更久。本站显示的状态取自服务端的确认结果，不以收款页的提示为准。' },
        { h: '金额不对怎么办' },
        { p: '少付会导致整笔挂起，需要在客服协助下补齐或退回；多付的部分不会自动入账，同样需要人工处理。' },
        { h: '网络与地址' },
        { p: '必须使用收款页给出的网络。选错网络、填错地址，资金无法找回，也无法由我们退回。' },
        { h: '记录与凭证' },
        { p: '保存交易哈希。核对时我们以哈希、金额与时间为准，截图不作为凭证。' },
        { note: '不要把币直接转到我们公开过的任何地址：每笔收款页的地址是单独生成的。' },
      ],
    },
    {
      title: 'Paying with cryptocurrency',
      summary: 'What happens after the redirect, and when it counts as paid.',
      blocks: [
        { p: 'Crypto suits payments that cannot go through a bank or card. Settlement runs through a hosted checkout that supports the major coins and networks.' },
        { h: 'The flow' },
        {
          steps: [
            'Choose Cryptocurrency.',
            'Select Continue; the page redirects to the checkout.',
            'Send the exact amount using the address, coin, and network shown there.',
            'Return to this site and check the status in your top-up history.',
          ],
        },
        { h: 'When it counts as paid' },
        { p: 'On chain confirmation, usually minutes, longer when the network is busy. The status here comes from the server’s confirmation, not from the message on the checkout page.' },
        { h: 'Wrong amount' },
        { p: 'An underpayment leaves the whole transfer pending and needs support to top up or return it. An overpayment is not credited automatically either.' },
        { h: 'Network and address' },
        { p: 'Use the network shown on the checkout. The wrong network or address cannot be recovered, by us or by anyone else.' },
        { h: 'Evidence' },
        { p: 'Keep the transaction hash. Reconciliation uses the hash, the amount, and the time; screenshots are not accepted as proof.' },
        { note: 'Never send to an address seen anywhere else: each checkout generates its own.' },
      ],
    },
  ),

  article(
    'bank-transfer',
    {
      title: '银行转账与转账申报',
      summary: '怎么汇、怎么申报、多久入账，以及汇错了怎么处理。',
      blocks: [
        { p: '银行转账适合大额或对公付款。汇款走银行系统，到账需要银行处理时间，入账前余额不变。' },
        { h: '汇款' },
        {
          steps: [
            '在付款方式里选择「银行转账」。',
            '按页面提供的收款人、账号、银行与附言完成汇款。',
            '附言里保留页面给出的参考号。',
          ],
        },
        { h: '申报' },
        {
          steps: [
            '回到充值页，点「我已转账」。',
            '填写付款账户名称与转账日期。',
            '交易号选填，有就填，能加快核对。',
            '提交后状态变为待核对。',
          ],
        },
        { h: '多久入账' },
        { p: '银行到账通常需要 2–5 个工作日，跨境或中间行参与时更久。我们核对到账后入账，并把状态改成已入账。' },
        { h: '汇错了怎么办' },
        { p: '金额少汇：补一笔差额并单独申报。金额多汇：多余部分留在余额里，不会自动退回。汇错账户：联系银行发起退回，同时告诉我们。' },
        { h: '重复申报' },
        { p: '同一笔申报重复提交不会重复入账：申报带幂等键，服务端按付款记录去重。' },
        { h: '手续费' },
        { p: '中间行可能扣手续费，实际入账金额以到账金额为准。需要足额入账时，请在汇款时选择由付款方承担手续费。' },
        { note: '没有申报的汇款会在对账时挂起，直到有人认领。' },
      ],
    },
    {
      title: 'Bank transfer and filing a claim',
      summary: 'How to send, how to declare it, when it is credited, and what goes wrong.',
      blocks: [
        { p: 'Bank transfer suits larger or corporate payments. Settlement goes through the banking system, and the balance does not move until it is matched.' },
        { h: 'Sending' },
        {
          steps: [
            'Choose Bank transfer.',
            'Send the payment using the beneficiary, account, bank, and reference shown on the page.',
            'Keep the reference in the payment description.',
          ],
        },
        { h: 'Declaring it' },
        {
          steps: [
            'Come back to Add funds and select “I have sent the transfer”.',
            'Enter the sending account name and the transfer date.',
            'Add the bank reference if you have one; it speeds up matching.',
            'Submit; the status becomes pending review.',
          ],
        },
        { h: 'When it is credited' },
        { p: 'Arrival usually takes 2–5 business days, longer across borders or through intermediary banks. We match it, credit the balance, and flip the status.' },
        { h: 'When the transfer is wrong' },
        { p: 'Underpaid: send the difference and declare it separately. Overpaid: the excess stays on the balance; it is not returned automatically. Wrong account: ask your bank to recall it and tell us.' },
        { h: 'Declaring twice' },
        { p: 'A repeated claim does not credit twice. Claims carry an idempotency key and the server de-duplicates per payment record.' },
        { h: 'Fees' },
        { p: 'Intermediary banks may deduct a fee, and the credited amount follows what arrives. If the full amount must land, choose the sender-pays option at your bank.' },
        { note: 'A transfer nobody declares stays unmatched until someone claims it.' },
      ],
    },
  ),

  article(
    'payment-link',
    {
      title: '创建并使用付款链接',
      summary: '把一笔充值交给别人付：创建、发送、有效期与撤销。',
      blocks: [
        { p: '付款链接用于把一笔充值交给其他人支付，例如由客户、采购或同事代付。链接本身不含任何账户信息。' },
        { h: '创建' },
        {
          steps: [
            '在充值页选择「Payment link」。',
            '确认账单信息完整；缺项时创建会被拦下。',
            '点「Create link」，弹窗中出现链接。',
            '复制链接或直接发送。',
          ],
        },
        { h: '付款人看到什么' },
        { p: '付款人打开后看到金额、用途与三个通道，看不到你的余额、历史付款或账户信息。付款前会再次确认金额。' },
        { h: '有效期' },
        { p: '链接金额固定，有效期 24 小时。过期后页面显示链接无效，需要重新生成。' },
        { h: '撤销与重发' },
        { p: '未支付的链接可以在充值页撤销。撤销后旧链接立即失效；已经支付成功的链接不能再撤销。' },
        { h: '到账' },
        { p: '付款人用卡或加密货币付款时，到账后余额立即更新；用银行转账时按转账流程核对后入账。' },
        { h: '常见问题' },
        {
          steps: [
            '链接打不开：检查是否已过期或被撤销。',
            '付款人看不到付款按钮：链接状态必须为 active。',
            '同一链接付了两次：第二笔会被拒绝，或由客服退回。',
          ],
        },
        { note: '不要把链接发到公开渠道：任何拿到有效链接的人都能付款，付款后不可撤回。' },
      ],
    },
    {
      title: 'Creating and sharing a payment link',
      summary: 'Hand a top-up to someone else: create, send, the 24-hour lifetime, revoking.',
      blocks: [
        { p: 'A payment link lets someone else pay a top-up: a client, a procurement team, a colleague. The link carries no account information.' },
        { h: 'Create one' },
        {
          steps: [
            'On the Add funds page, choose Payment link.',
            'Make sure the billing details are complete; creation is blocked otherwise.',
            'Select Create link; the link appears in a dialog.',
            'Copy it or send it straight from there.',
          ],
        },
        { h: 'What the payer sees' },
        { p: 'The amount, what it is for, and the three channels. Not your balance, your history, or your account details. The amount is confirmed again before paying.' },
        { h: 'Lifetime' },
        { p: 'The amount is fixed and the link lives for 24 hours. After that the page reports an invalid link and a new one has to be created.' },
        { h: 'Revoking and reissuing' },
        { p: 'An unpaid link can be revoked from the Add funds page, and the old URL stops working at once. A paid link cannot be revoked.' },
        { h: 'When it is credited' },
        { p: 'Card and crypto payments update the balance on confirmation. Bank transfers follow the matching flow.' },
        { h: 'Common cases' },
        {
          steps: [
            'The link does not open: it expired or was revoked.',
            'The payer sees no payment button: the link must be active.',
            'The same link was paid twice: the second attempt is refused or returned by support.',
          ],
        },
        { note: 'Do not post a link publicly: anyone holding a valid one can pay, and a completed payment cannot be undone.' },
      ],
    },
  ),
];

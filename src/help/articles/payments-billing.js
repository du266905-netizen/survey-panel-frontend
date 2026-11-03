/* Payments, part two: what happens after the money is in — billing details,
 * invoices, budgets, matching, and the failures people write in about.
 */

const article = (slug, zh, en) => ({ slug, category: 'payments', zh, en });

export const PAYMENTS_BILLING = [
  article(
    'payment-failed',
    {
      title: '付款没有完成怎么办',
      summary: '付款失败、取消、一直显示确认中，分别怎么处理。',
      blocks: [
        { p: '付款结束时页面会给出结果。按结果处理，不要重复点击，也不要同时开两个标签页付款。' },
        { h: '付款未完成' },
        { p: '本次没有扣款。可以重新发起；如果连续失败，换一张卡或联系发卡行，而不是反复提交。' },
        { h: '一直显示确认中' },
        { p: '确认结果由支付服务商返回，通常几秒。超过 15 秒可以关闭页面，结果会通过邮件通知你，余额以服务端为准。' },
        { h: '付款成功但余额没变' },
        {
          steps: [
            '刷新一次页面。',
            '打开充值记录，确认这笔的状态是否为已入账。',
            '仍是待确认时，等 5 分钟再看一次。',
            '超过 30 分钟没有入账，带付款时间与金额联系客服。',
          ],
        },
        { h: '页面报错、白屏或断网' },
        { p: '先不要重新付款。回到充值记录查看这笔的状态：已入账就不用再付，仍在待确认就先等，状态不存在才说明没提交成功。' },
        { h: '付款被取消' },
        { p: '在收款页或弹窗里关闭都会取消本次付款，不产生扣款。重新发起即可，金额与通道可以换。' },
        { h: '重复扣款' },
        { p: '同一笔充值重复提交不会扣两次：每笔带幂等键，服务端只认第一次。真的出现两笔入账时，把两笔的时间和金额一起发给客服。' },
        { note: '任何情况下都不要把卡号、验证码或密码发给客服。' },
      ],
    },
    {
      title: 'When a payment does not go through',
      summary: 'Declined, cancelled, stuck on confirming — what each one means and what to do.',
      blocks: [
        { p: 'The page reports the outcome when an attempt ends. Act on that, and avoid repeat clicks or two tabs paying at once.' },
        { h: 'Payment not completed' },
        { p: 'Nothing was charged. Start again; if it keeps failing, use another card or call the issuer instead of resubmitting.' },
        { h: 'Stuck on confirming' },
        { p: 'The provider confirms within seconds. After 15 seconds you may close the page; the result arrives by email and the server is the source of truth for the balance.' },
        { h: 'Paid, but the balance did not move' },
        {
          steps: [
            'Refresh once.',
            'Open your top-up history and check whether the entry is credited.',
            'If it is still pending, look again after five minutes.',
            'If nothing after thirty minutes, contact support with the time and amount.',
          ],
        },
        { h: 'The page errored, blanked, or the network dropped' },
        { p: 'Do not pay again straight away. Check the entry in your history: credited means you are done, pending means wait, and a missing entry means it never went through.' },
        { h: 'Cancelled' },
        { p: 'Closing the checkout or the dialog cancels the attempt with no charge. Start over, with a different amount or channel if needed.' },
        { h: 'Charged twice' },
        { p: 'A repeated submit on the same top-up does not charge twice; the idempotency key makes the server keep the first. If two credits really appear, send both timestamps and amounts to support.' },
        { note: 'Never send card numbers, security codes, or passwords to support.' },
      ],
    },
  ),

  article(
    'billing-details',
    {
      title: '填写账单信息',
      summary: '必填项、自动保存、税号规则，以及它为什么卡住付款。',
      blocks: [
        { p: '账单信息决定发票抬头，也是充值和创建付款链接的前置条件。六项不齐时，付款入口不会放行。' },
        { h: '必填六项' },
        { p: '公司名称、国家 / 地区、地址、城市、邮编、邮箱。地址填注册地址或主要经营地址，两者一致即可。' },
        { h: '税号' },
        { p: '税号选填。填写时必须同时选择类型，只填号码不选类型不会通过校验。没有税号就留空，不影响付款。' },
        { h: '保存方式' },
        {
          steps: [
            '在充值页或「账户」页打开账单信息。',
            '填完六项必填内容。',
            '停止输入约 1 秒，页面自动保存。',
            '看到「已保存」再离开页面。',
          ],
        },
        { h: '改信息会怎样' },
        { p: '修改只影响之后的付款与发票，已经开出的发票抬头不变。需要重开发票时联系客服，说明原发票号与新抬头。' },
        { h: '多主体与多币种' },
        { p: '一个账户对应一套账单信息。需要在发票上出现不同主体时，用不同账户分别付款，不要在同一账户里来回改。' },
        { note: '账单信息里的邮箱用于接收发票与付款通知，建议用财务邮箱而不是个人邮箱。' },
      ],
    },
    {
      title: 'Billing details',
      summary: 'The six required fields, autosave, tax numbers, and why they gate payments.',
      blocks: [
        { p: 'Billing details set the invoice header and are required before a top-up or a payment link. Until the six fields are complete, the payment options stay closed.' },
        { h: 'The six required fields' },
        { p: 'Company name, country, address, city, postal code, and email. Use the registered or principal business address; either is fine as long as it is consistent.' },
        { h: 'Tax numbers' },
        { p: 'Optional. If you fill one in, choose a type as well; a number without a type does not pass validation. Leave both blank if you have none.' },
        { h: 'How saving works' },
        {
          steps: [
            'Open Billing details from Add funds or from Account.',
            'Fill in the six required fields.',
            'Stop typing for about a second and the panel saves itself.',
            'Wait for “Saved” before leaving the page.',
          ],
        },
        { h: 'What editing changes' },
        { p: 'Only future payments and invoices. An invoice already issued keeps its header. To have one reissued, contact support with the invoice number and the new header.' },
        { h: 'Several entities' },
        { p: 'One account carries one set of billing details. If invoices must show different entities, use separate accounts rather than editing back and forth.' },
        { note: 'The email here receives invoices and payment notices; a finance mailbox beats a personal one.' },
      ],
    },
  ),

  article(
    'invoices',
    {
      title: '发票与付款凭证',
      summary: '发票什么时候开、抬头怎么定、怎么拿到，以及拿不到时怎么办。',
      blocks: [
        { p: '每笔入账的付款对应一张发票，抬头取付款当时的账单信息。未入账的付款不开发票。' },
        { h: '什么时候开' },
        { p: '付款入账后按顺序开具，通常在入账当天。银行转账要等核对完成，因此会比卡付款晚几天。' },
        { h: '抬头与内容' },
        { p: '抬头、地址、税号全部取付款当时的账单信息。品名是服务费，币种为美元，金额等于实际入账金额。' },
        { h: '怎么拿到' },
        {
          steps: [
            '进入「账单 / 发票」。',
            '按月份筛选。',
            '选择需要的那张，下载 PDF。',
          ],
        },
        { h: '自助下载还没开通时' },
        { p: '下载入口在逐步开放。暂时拿不到时，把付款时间、金额、抬头与收件邮箱发给客服，我们人工出具。' },
        { h: '发票开错了' },
        { p: '抬头写错、金额不符、重复开具，都可以申请重开。原发票会作废，新发票的编号不同，报账时以新编号为准。' },
        { h: '付款凭证' },
        { p: '银行转账请保留汇款回单，卡付款保留发卡行的扣款记录。核对时我们以服务端的付款记录为准，凭证用于交叉验证。' },
        { note: '发票金额按实际入账金额开具，中间行扣掉的手续费不会计入发票。' },
      ],
    },
    {
      title: 'Invoices and payment records',
      summary: 'When an invoice is issued, whose name it carries, how to get it, and how to fix one.',
      blocks: [
        { p: 'Every credited payment has one invoice, issued under the billing details that were current at the time. Pending payments have none.' },
        { h: 'When it is issued' },
        { p: 'In order, once the payment is credited — usually the same day. Bank transfers wait for matching, so they lag card payments by a few days.' },
        { h: 'What it says' },
        { p: 'The header, address, and tax number as they stood at payment time. The line item is services, the currency is US dollars, and the amount matches what was credited.' },
        { h: 'Getting it' },
        {
          steps: [
            'Open Billing / Invoices.',
            'Filter by month.',
            'Pick the invoice and download the PDF.',
          ],
        },
        { h: 'When self-service is not available yet' },
        { p: 'Downloads are being switched on gradually. Until then, send support the payment date, amount, header, and the address to bill to, and we issue it by hand.' },
        { h: 'A wrong invoice' },
        { p: 'A wrong header, a wrong amount, or a duplicate can all be reissued. The old one is voided, the new one carries a different number, and the new number is the one to file.' },
        { h: 'Payment records' },
        { p: 'Keep the bank receipt for transfers and the issuer’s statement line for cards. Matching runs on our payment records; your documents cross-check them.' },
        { note: 'Invoices follow the credited amount. Intermediary-bank fees are not part of the invoice.' },
      ],
    },
  ),

  article(
    'budget',
    {
      title: '设置预算',
      summary: '给一段时间的花费设上限，以及预算不会做的事。',
      blocks: [
        { p: '预算用于给一段时间内的支出设一个上限，便于控制节奏，也方便向内部解释花费。' },
        { h: '新建' },
        {
          steps: [
            '进入「预算」。',
            '点「新建预算」。',
            '填写名称、金额与起止日期。',
            '保存后在列表中查看。',
          ],
        },
        { h: '一个账户可以有几个预算' },
        { p: '可以并存多个，按期间或用途区分。同一天结束时，各预算各自统计，不互相抵扣。' },
        { h: '预算不会做的事' },
        {
          steps: [
            '不会拦截付款：超过上限仍然可以付款。',
            '不会冻结账户或暂停项目。',
            '不会自动从余额划走金额。',
          ],
        },
        { h: '用量怎么算' },
        { p: '用量按已入账的支出统计，未入账的付款、退款与人工调整都不计入。统计仍在接通中，当前数字以账单页为准。' },
        { h: '改与删' },
        { p: '名称、金额、起止日期都可以改；改金额会影响后续统计口径，不改历史记录。删除后无法恢复，历史用量也不再展示。' },
        { h: '和账单的关系' },
        { p: '预算是内部管理工具，与发票、账单信息无关。发票按实际付款开具，不受预算上限影响。' },
        { note: '需要硬性停付时，用余额控制：把余额保持在需要的额度，而不是依赖预算。' },
      ],
    },
    {
      title: 'Budgets',
      summary: 'A cap for a period, and the things a budget deliberately does not do.',
      blocks: [
        { p: 'A budget puts a limit on spending for a period, so the pace is visible and easy to explain internally.' },
        { h: 'Create one' },
        {
          steps: [
            'Open Budgets.',
            'Select New budget.',
            'Enter a name, an amount, and the start and end dates.',
            'Save; it appears in the list.',
          ],
        },
        { h: 'Several at once' },
        { p: 'Yes. Split them by period or purpose. Each counts on its own; they do not offset each other.' },
        { h: 'What a budget does not do' },
        {
          steps: [
            'It does not block payments; spending past the cap still goes through.',
            'It does not freeze the account or pause projects.',
            'It does not move money off the balance.',
          ],
        },
        { h: 'How usage is counted' },
        { p: 'From credited spending only. Pending payments, refunds, and manual adjustments are excluded. The figures are still being connected; treat Billing as the authority for now.' },
        { h: 'Editing and deleting' },
        { p: 'Name, amount, and dates are all editable. Changing the amount changes future counting, not history. Deleting is permanent and removes the usage view.' },
        { h: 'How it relates to billing' },
        { p: 'Budgets are an internal control. Invoices follow actual payments and ignore budget caps.' },
        { note: 'To stop spending outright, control the balance instead of relying on a budget.' },
      ],
    },
  ),

  article(
    'reconciliation',
    {
      title: '对账与入账核对',
      summary: '钱到了但余额没变、申报挂起、金额对不上时，我们怎么核对。',
      blocks: [
        { p: '入账以服务端的付款记录为准。页面状态、邮件通知、银行短信都只是提示，最终以记录为准。' },
        { h: '核对顺序' },
        {
          steps: [
            '先看充值记录里这笔的状态。',
            '再看金额、币种与通道是否与申报一致。',
            '银行转账再比对付款账户名称与日期。',
            '一致就入账，不一致进入人工核对。',
          ],
        },
        { h: '常见的对不上' },
        {
          steps: [
            '申报金额与到账金额不同：按到账金额入账，差额留在余额。',
            '付款人不是账户持有人：需要补充说明，必要时退回。',
            '附言缺失：按金额与时间匹配，匹配不到就挂起。',
            '同一笔申报两次：按幂等键去重，只入账一次。',
          ],
        },
        { h: '多久会有结果' },
        { p: '卡与加密货币在确认后即时入账。银行转账在到账后 1 个工作日内核对完成，跨境可能更久。' },
        { h: '需要我们提供什么' },
        { p: '付款时间、金额、通道、账户名称，以及能证明这笔付款的凭证。银行转账再附上附言或参考号。' },
        { h: '对账报表' },
        { p: '当前没有自助对账报表。需要按期间核对时，联系客服导出付款与入账记录。' },
        { note: '不要为了“让它对上”而重复付款：先核对，再补差额。' },
      ],
    },
    {
      title: 'Reconciliation',
      summary: 'Money left, the balance did not move: how matching works and what we need.',
      blocks: [
        { p: 'Crediting follows the server’s payment record. Page states, emails, and bank alerts are hints; the record decides.' },
        { h: 'The order we match in' },
        {
          steps: [
            'Read the status of the entry in top-up history.',
            'Check the amount, currency, and channel against the claim.',
            'For bank transfers, compare the sending account name and date.',
            'A match credits; a mismatch goes to manual review.',
          ],
        },
        { h: 'The usual mismatches' },
        {
          steps: [
            'Claimed amount differs from what arrived: credit what arrived, leave the rest.',
            'Payer is not the account holder: needs an explanation, sometimes a return.',
            'No reference: match on amount and time, or park it.',
            'The same claim twice: de-duplicated by its idempotency key.',
          ],
        },
        { h: 'How long it takes' },
        { p: 'Cards and crypto credit on confirmation. Bank transfers are matched within one business day of arrival, longer across borders.' },
        { h: 'What we need from you' },
        { p: 'Payment time, amount, channel, account name, and a document that proves the payment. For transfers, the reference as well.' },
        { h: 'Reports' },
        { p: 'There is no self-service reconciliation report yet. For a period close, ask support to export the payment and credit records.' },
        { note: 'Do not pay again to “make it match”. Check first, then send the difference.' },
      ],
    },
  ),
];

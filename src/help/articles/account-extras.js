/* Account, continued: notifications and email.
 *
 * Which events send mail, which address receives it, and what to do when a
 * message does not arrive.
 */

const article = (slug, category, zh, en) => ({ slug, category, zh, en });

export const ACCOUNT_EXTRAS = [
  article('notifications', 'account', {
    title: '通知与邮件',
    summary: '哪些事情会发邮件、收不到时先查什么、收票地址怎么设、共用邮箱的风险，以及退订与重新订阅。',
    blocks: [
      { p: '通知邮件不多，但每一封都对应一件已经发生的事。付款有了结果、发票已经开出、密码被重设，各有一封对应的邮件。' },
      { p: '弄清哪些事情会发信、发到哪个地址、收不到时先查什么，可以省掉很多来回确认。下面逐条展开，最后说退订与留档。' },
      { h: '哪些邮件会发出' },
      { p: '账户相关的邮件有三类：付款结果、发票，以及密码重设。付款有结果时发一封付款结果，发票开出之后发一封发票，申请重设密码时发一封重设邮件。' },
      { p: '每一封都对应一件已经发生的事，因此可以用它来确认操作是否完成。没有收到不等于没有发生，先到页面上看状态，再查邮件。' },
      { p: '密码重设属于账户邮件，只发到登录邮箱；付款结果与发票属于财务邮件，可以发到另外设置的收票地址。两类邮件的收件人不同，排查时先分清少的是哪一类。' },
      { h: '收件地址怎么设' },
      { p: '账户邮件的地址来自登录邮箱，在账户页可以看到。发票的收件地址在账单信息里单独设置，不会覆盖登录邮箱。' },
      { p: '付款结果的收件地址跟随账单信息里填写的邮箱，改过之后按新地址发送。发票通常要交给财务归档，把收票地址设成财务或采购的公共邮箱，比设成某个人的邮箱更稳；正式付款之前，先让财务确认能收到一封测试邮件。' },
      { p: '一张发票只发到一个收票地址，不会同时抄送多人；需要多人看到时，用邮件组或公共邮箱，而不是在设置里填多个地址。收票地址改过之后，之前开出的发票不会自动重发到新地址。' },
      { h: '收不到时先查什么' },
      { p: '先看垃圾邮件与「所有邮件」，再核对页面上的地址有没有拼错。企业邮箱的过滤规则可能把自动邮件拦下，需要管理员把发件域名加入允许列表。' },
      { p: '等几分钟仍没有，重新触发一次，不要连续点击。密码重设的链接有有效期，反复申请会让先到的链接失效，最后收到的那封才可用。' },
      { p: '分不清缺的是哪一类时，先看登录邮箱，再看收票地址；两处都确认过，再去找过滤规则。把页面上显示地址的时间也记下来，之后核对时能说明改过没有。' },
      {
        steps: [
          '查看垃圾邮件与「所有邮件」。',
          '核对账户页或账单信息里的地址。',
          '请管理员确认没有拦截发件域名。',
          '仍未收到时，重新触发一次。',
        ],
      },
      { h: '共用邮箱的风险' },
      { p: '共用邮箱解决了「谁都能看到发票」的问题，也带来另一个问题。能读这个邮箱的人，同样能收到密码重设邮件。' },
      { p: '登录邮箱与收票邮箱分开设置，就是为了让看发票的人不必拥有进入账户的能力。共用邮箱要有明确的管理人，人员变动时及时改密码。' },
      { p: '重设邮件里的链接可以直接改掉账户密码，谁打开谁就能改，而且链接会过期。这类邮件只应发到有明确负责人的登录邮箱，不要转发，也不要贴进群聊。' },
      { h: '退订与重新订阅' },
      { p: '付款结果、发票与密码重设属于交易类邮件，是完成一件事所必需的记录，会照常发送。可以退订的是那些额外的提醒。' },
      { p: '退订之后账户照常使用，只是不再收到这类消息。想恢复时，重新打开对应的通知即可，不需要重新注册。' },
      { p: '改地址比退订更彻底：旧地址不再收到，新地址从下一次发送开始生效。两者都影响后续邮件，操作之前先确认要改的是哪一类。' },
      { h: '留下核对记录' },
      { p: '付款结果与发票建议保留，它们是核对金额与时间的凭据。收到之后另存一份到财务归档的位置，不要只留在收件箱里。' },
      { p: '地址变更与退订也记一笔：什么时候改的、改成了什么、由谁确认。之后收不到邮件时，先看这条记录，比从头排查快。' },
      { p: '对账时用邮件里的时间、金额与币种，比事后回忆可靠。金额对不上时，把邮件与账单页、发票放在一起看，先确认币种与入账金额，再谈差额。' },
      {
        steps: [
          '付款结果的邮件。',
          '发票及其附件。',
          '收票地址的变更记录。',
          '退订与重新订阅的时间。',
        ],
      },
      { note: '收不到邮件时，先确认是哪一类邮件、发到哪个地址，再去查过滤规则。这两步能解决大部分情况。' },
    ],
  }, {
    title: 'Notifications and email',
    summary: 'Which events send mail, what to check when it does not arrive, setting an invoice address, the risk in a shared mailbox, and unsubscribing.',
    blocks: [
      { p: 'There are only a few notification emails, and each one follows something that has already happened. A payment has a result, an invoice has been issued, or a password has been reset.' },
      { p: 'Knowing which events send mail, which address they go to, and what to check when one does not arrive saves a lot of back and forth. What follows takes them in turn, then unsubscribing and keeping a record.' },
      { h: 'Which mail goes out' },
      { p: 'Three kinds of account email go out: payment results, invoices, and password resets. Each follows the event it records: a payment reaching an outcome, an invoice being issued, and a request to reset a password.' },
      { p: 'Each one confirms that something has already happened, so it can be used to check that an action completed. Not receiving it does not mean it did not happen; look at the page first, then the mailbox.' },
      { p: 'A password reset is account mail and goes only to the sign-in address, while payment results and invoices are billing mail and can go to a separate invoice address. The two have different recipients, so establish which kind is missing first.' },
      { h: 'Where each message is sent' },
      { p: 'Account mail uses the sign-in address, which the account page shows. The invoice address is set separately in billing details and does not override the sign-in address.' },
      { p: 'Payment results follow the mailbox recorded in billing details, so a change there takes effect from the next message. Invoices usually end up with finance, so a finance or procurement mailbox is a steadier invoice address than one person’s inbox; before the first payment, have finance confirm that a test message arrives.' },
      { p: 'An invoice goes to one invoice address and is not copied to several at once. Where more people need to see it, use a group or a shared mailbox rather than entering several addresses. Changing the invoice address does not resend invoices that were already issued.' },
      { h: 'When nothing arrives' },
      { p: 'Look in spam and all mail first, then check the address on the page for a typo. A corporate filter can hold automated mail, in which case an administrator has to allow the sending domain.' },
      { p: 'If a few minutes pass with nothing, trigger the message once more rather than clicking repeatedly. Reset links expire, and asking again makes the earlier one stop working, so only the latest message is useful.' },
      { p: 'When you cannot tell which kind is missing, check the sign-in address first and the invoice address second, and only then the filters. Note the time you read the address on the page, so a later review can say whether it has changed since.' },
      {
        steps: [
          'Check spam and all mail.',
          'Check the address shown on the account page or in billing details.',
          'Ask an administrator to confirm the sending domain is not blocked.',
          'If nothing arrives, trigger the message once more.',
        ],
      },
      { h: 'The risk in a shared mailbox' },
      { p: 'A shared mailbox solves the problem of several people needing the invoice, and creates another. Whoever can read that mailbox can also receive a password reset.' },
      { p: 'Setting the sign-in address apart from the invoice address is what lets people see invoices without gaining the ability to enter the account. Give the shared mailbox a named owner, and change the password when the people with access change.' },
      { p: 'A reset link can change the account password, and whoever opens it can make the change; the link also expires. Mail of that kind belongs in a sign-in mailbox with a named owner, not forwarded and not pasted into a group chat.' },
      { h: 'Unsubscribing and resubscribing' },
      { p: 'Payment results, invoices, and password resets are transactional and accompany the action they record. What can be turned off is the extra reminders.' },
      { p: 'The account keeps working after you turn one off; it simply stops sending that kind of message. To restore it, switch the notice back on, and there is no need to register again.' },
      { p: 'Changing the address goes further: the old one stops receiving and the new one applies from the next message. Both affect later mail, so confirm which kind you are changing before you act.' },
      { h: 'Keeping the record' },
      { p: 'Keep payment results and invoices, since they are the evidence for checking an amount against a date. Save a copy wherever finance archives its records rather than leaving them in an inbox.' },
      { p: 'Note address changes and unsubscribes too: when it happened, what changed, and who confirmed it. When mail goes missing later, that record answers the first question faster than a search through the mailbox.' },
      { p: 'For a reconciliation, the time, amount, and currency in the message are more reliable than memory. When an amount does not match, put the message beside the billing page and the invoice, agree on the currency and the credited amount first, then discuss the difference.' },
      {
        steps: [
          'Payment result emails.',
          'Invoices and their attachments.',
          'A record of invoice address changes.',
          'When notices were turned off and on.',
        ],
      },
      { note: 'When a message does not arrive, confirm which kind it is and which address it went to before checking the filters. Those two steps settle most cases.' },
    ],
  }),
];

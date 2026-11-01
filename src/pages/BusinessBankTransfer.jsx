import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { BANK_TRANSFER_ACCOUNT } from '../constants/bankTransferAccount';
import './BusinessBankTransfer.css';

/* Bank transfer is the manual channel: the customer sends the money through
 * their own bank, then tells us about it here. Nothing on this page decides that
 * a payment happened — the balance only moves after finance matches the claim
 * against a statement. Keep it that way: no "paid" state, no optimistic credit.
 *
 * Submission is not wired yet. Until the claim endpoint exists the button shows
 * an honest preview notice instead of pretending the claim was filed. */

const copyByLanguage = {
  'zh-CN': {
    back: '返回充值',
    title: '银行转账付款',
    intro: '请用公司账户完成转账，然后在下方填写这笔付款。我们人工核对后入账，通常下个工作日到账。',
    sendTo: '收款信息',
    accountName: '账户名称',
    iban: 'IBAN',
    swift: 'SWIFT / BIC',
    bank: '开户行',
    correspondent: '中间行',
    currency: '币种',
    currencyValue: '仅收美元——其他币种汇入会先被换算',
    hint: '部分银行会索取上面的中间行，不填会导致美元汇款退回。请让银行以美元国际汇款发出，并在附言中写上贵公司名称。',
    copy: '复制',
    copied: '已复制',
    formTitle: '填写这笔转账',
    formIntro: '我们用这些信息在银行流水中找到你的付款。',
    amount: '转账金额',
    payer: '付款账户名称',
    payerPlaceholder: '例如：某某研究院有限公司',
    date: '转账日期',
    last4: '账号后四位',
    optional: '选填',
    last4Placeholder: '4417',
    note: '附言',
    notePlaceholder: '你在转账时写的那句话',
    submit: '我已转账',
    errAmount: '请填写转账金额。',
    errPayer: '请填写付款账户名称。',
    errDate: '请选择转账日期。',
    foot: '与银行流水核对上之前不会入账，余额按实际到账金额增加——银行手续费与换汇成本会在到账前扣除。若 2 个工作日内仍未匹配，我们会发邮件联系你。',
    preview: '预览版：提交还没接线，点了不会真的发出。',
  },
};

const en = {
  back: 'Back to add funds',
  title: 'Pay by bank transfer',
  intro: 'Send the transfer from your business account, then tell us about it below. We match it by hand and top up your balance — usually the next business day.',
  sendTo: 'Send to',
  accountName: 'Account name',
  iban: 'IBAN',
  swift: 'SWIFT / BIC',
  bank: 'Bank',
  correspondent: 'Correspondent',
  currency: 'Currency',
  currencyValue: 'US dollars only — a transfer in another currency is converted on arrival',
  hint: 'Your bank may ask for the correspondent bank above; without it a dollar transfer can bounce. Ask them to send it as a USD international transfer and to pass on your company name as the reference.',
  copy: 'Copy',
  copied: 'Copied',
  formTitle: 'Tell us about the transfer',
  formIntro: 'We use these details to find your payment in the bank statement.',
  amount: 'Amount you sent',
  payer: 'Name on the sending account',
  payerPlaceholder: 'Northwind Research Ltd',
  date: 'Transfer date',
  last4: 'Last 4 digits',
  optional: 'optional',
  last4Placeholder: '4417',
  note: 'Reference',
  notePlaceholder: 'What you wrote in the transfer note',
  submit: "I've sent the transfer",
  errAmount: 'Enter the amount you sent.',
  errPayer: 'Enter the name on the sending account.',
  errDate: 'Choose the transfer date.',
  foot: 'Nothing is credited until we match the payment to a bank statement, so the balance goes up by the amount that actually arrives — bank and conversion fees are taken before it reaches us. If we cannot find it within 2 business days, we will email you.',
  preview: 'Preview: nothing is sent yet — this form has no endpoint behind it.',
};

/* The clipboard wants the raw value, not what the eye reads. */
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function BusinessBankTransfer() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || en;
  const account = BANK_TRANSFER_ACCOUNT;

  const [amount, setAmount] = useState(() => new URLSearchParams(window.location.search).get('amount') || '');
  const [payer, setPayer] = useState('');
  const [date, setDate] = useState('');
  const [last4, setLast4] = useState('');
  const [note, setNote] = useState('');
  const [copiedKey, setCopiedKey] = useState('');
  const [error, setError] = useState('');
  const [previewing, setPreviewing] = useState(false);

  const rows = useMemo(() => ([
    { key: 'accountName', label: copy.accountName, value: account.accountName, copyValue: account.accountName },
    { key: 'iban', label: copy.iban, value: account.ibanDisplay, copyValue: account.iban },
    { key: 'swift', label: copy.swift, value: account.swift, copyValue: account.swift },
    { key: 'bank', label: copy.bank, value: account.bankName },
    { key: 'correspondent', label: copy.correspondent, value: `${account.correspondentName} · ${account.correspondentSwift}`, copyValue: account.correspondentSwift },
    { key: 'currency', label: copy.currency, value: copy.currencyValue },
  ]), [copy, account]);

  const handleCopy = async (key, value) => {
    if (!(await copyText(value))) return;
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? '' : current)), 1600);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!amount.trim() || Number(String(amount).replace(/,/g, '')) <= 0) { setError(copy.errAmount); return; }
    if (!payer.trim()) { setError(copy.errPayer); return; }
    if (!date) { setError(copy.errDate); return; }
    setError('');
    setPreviewing(true);
  };

  return (
    <main className="bank-transfer-page">
      <header className="bank-transfer-top">
        <div className="bank-transfer-top-inner">
          <Logo size="sm" />
          <button type="button" className="bank-transfer-back" onClick={() => navigate(withLanguage('/business/add-funds', language))}>
            <ArrowLeft size={16} /> {copy.back}
          </button>
        </div>
      </header>

      <div className="bank-transfer-head">
        <h1>{copy.title}</h1>
        <p className="bank-transfer-intro">{copy.intro}</p>
      </div>

      <div className="bank-transfer-grid">
        <div className="bank-transfer-main">

        <form className="bank-transfer-card bank-transfer-form" onSubmit={submit} noValidate>
          <h2>{copy.formTitle}</h2>
          <p className="bank-transfer-form-intro">{copy.formIntro}</p>

          <label className="bank-transfer-field" htmlFor="bank-transfer-amount">
            {copy.amount}
            <span className="bank-transfer-input">
              <span aria-hidden="true">US$</span>
              <input
                id="bank-transfer-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                autoComplete="off"
              />
            </span>
          </label>

          <label className="bank-transfer-field" htmlFor="bank-transfer-payer">
            {copy.payer}
            <span className="bank-transfer-input">
              <input
                id="bank-transfer-payer"
                value={payer}
                placeholder={copy.payerPlaceholder}
                onChange={(event) => setPayer(event.target.value)}
                autoComplete="off"
              />
            </span>
          </label>

          <div className="bank-transfer-pair">
            <label className="bank-transfer-field" htmlFor="bank-transfer-date">
              {copy.date}
              <span className="bank-transfer-input">
                <input
                  id="bank-transfer-date"
                  type="date"
                  value={date}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => setDate(event.target.value)}
                />
              </span>
            </label>

            <label className="bank-transfer-field" htmlFor="bank-transfer-last4">
              {copy.last4} <span className="is-optional">{copy.optional}</span>
              <span className="bank-transfer-input">
                <input
                  id="bank-transfer-last4"
                  value={last4}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={copy.last4Placeholder}
                  onChange={(event) => setLast4(event.target.value.replace(/\D/g, '').slice(0, 4))}
                  autoComplete="off"
                />
              </span>
            </label>
          </div>

          <label className="bank-transfer-field" htmlFor="bank-transfer-note">
            {copy.note} <span className="is-optional">{copy.optional}</span>
            <span className="bank-transfer-input">
              <input
                id="bank-transfer-note"
                value={note}
                placeholder={copy.notePlaceholder}
                onChange={(event) => setNote(event.target.value)}
                autoComplete="off"
              />
            </span>
          </label>

          {error ? <p className="bank-transfer-error" role="alert">{error}</p> : null}
          {previewing ? <p className="bank-transfer-preview" role="status">{copy.preview}</p> : null}

          <button className="bank-transfer-submit" type="submit">{copy.submit}</button>

          <p className="bank-transfer-foot">{copy.foot}</p>
        </form>
        </div>

        <aside className="bank-transfer-rail">
        <section className="bank-transfer-card">
                  <div className="bank-transfer-card-head">
                    <span>{copy.sendTo}</span>
                    <span className="bank-transfer-chip">{account.currency}</span>
                  </div>

                  <dl className="bank-transfer-rows">
                    {rows.map((row) => (
                      <div className="bank-transfer-row" key={row.key}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                        <div className="bank-transfer-row-action">
                          {row.copyValue ? (
                            <button type="button" onClick={() => handleCopy(row.key, row.copyValue)}>
                              {copiedKey === row.key ? copy.copied : copy.copy}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </dl>

                  <p className="bank-transfer-hint">{copy.hint}</p>
                </section>
        </aside>
      </div>
    </main>
  );
}

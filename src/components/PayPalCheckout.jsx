import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  capturePaypalAdvancedOrder,
  createPaypalAdvancedOrder,
  getPaypalAdvancedConfig,
  newIdempotencyKey,
} from '../api/paypalAdvanced';

/**
 * PayPal 官方结账组件：Buttons + CardFields。
 *
 * 冻结契约（2026-11-01 / 11-02）：
 *   - 只加载官方 SDK；卡号、有效期、CVV 由 PayPal 托管字段渲染，平台不接触、不读取、不校验；
 *   - 建单时用 `fundingSource` 声明用的是哪个组件（`paypal` / `card`），
 *     不带任何 3DS 参数或服务商 payload；
 *   - 批准后只把 SDK 的 `orderID` 交给服务端 capture；
 *   - 卡字段的提交用平台自己的普通按钮调 `cardFields.submit()`，
 *     官方 v5 没有 `SubmitButton()`；
 *   - CardFields 不可用时只留 PayPal 按钮或“暂不可用”，绝不回退到自建卡输入框。
 *
 * 生命周期：SDK 组件只挂载一次；金额变化只换幂等键，不重建 iframe。
 */

const SDK_ID = 'paypal-advanced-sdk';

let sdkPromise = null;

const loadSdk = ({ clientId, currency, intent }) => {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      'client-id': clientId,
      currency: currency || 'USD',
      intent: intent || 'capture',
      components: 'buttons,card-fields',
    });
    document.getElementById(SDK_ID)?.remove();
    const script = document.createElement('script');
    script.id = SDK_ID;
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error('PayPal SDK missing')));
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error('PayPal SDK failed to load'));
    };
    document.head.appendChild(script);
  });

  return sdkPromise;
};

/* The three calls are injectable: the same component serves a signed-in
 * top-up and a public payment link, and the only difference is which endpoint
 * each step hits. */
export default function PayPalCheckout({ amountUsd, disabled, onPaid, onError, onProcessing, onApiError, copy, endpoints }) {
  const api = endpoints || {
    getConfig: getPaypalAdvancedConfig,
    createOrder: createPaypalAdvancedOrder,
    capture: capturePaypalAdvancedOrder,
  };
  const [config, setConfig] = useState(null);
  const [ready, setReady] = useState(false);
  const [cardEligible, setCardEligible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState('');

  /* 四个托管字段各有自己的宿主节点。 */
  const buttonsRef = useRef(null);
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);

  const mountedRef = useRef(false);
  const cardFieldsRef = useRef(null);
  const cardRenderedRef = useRef(false);

  /* 钱包和卡各一把幂等键：同一笔金额重试复用，换金额才整体换新。 */
  const keysRef = useRef({ paypal: newIdempotencyKey(), card: newIdempotencyKey() });
  const amountRef = useRef(amountUsd);

  const paidRef = useRef(onPaid);
  const errorRef = useRef(onError);
  const processingRef = useRef(onProcessing);
  const apiErrorRef = useRef(onApiError);
  const copyRef = useRef(copy);
  paidRef.current = onPaid;
  errorRef.current = onError;
  processingRef.current = onProcessing;
  apiErrorRef.current = onApiError;
  copyRef.current = copy;

  useEffect(() => {
    amountRef.current = amountUsd;
    keysRef.current = { paypal: newIdempotencyKey(), card: newIdempotencyKey() };
  }, [amountUsd]);

  const createOrderFor = useCallback((fundingSource) => async () => {
    processingRef.current?.();
    try {
      const payment = await api.createOrder({
        amountUsd: amountRef.current,
        fundingSource,
        idempotencyKey: keysRef.current[fundingSource],
      });
      if (!payment?.paypalOrderId) throw new Error('no paypal order id');
      return payment.paypalOrderId;
    } catch (failure) {
      /* The page shows what actually happened; the SDK would only say "startFailed". */
      apiErrorRef.current?.(failure);
      keysRef.current[fundingSource] = newIdempotencyKey();
      throw failure;
    }
  }, []);

  const onApprove = useCallback(async (data) => {
    processingRef.current?.();
    try {
      const payment = await api.capture(data.orderID);
      keysRef.current = { paypal: newIdempotencyKey(), card: newIdempotencyKey() };
      paidRef.current?.(payment);
    } catch {
      rotateKeys();
      errorRef.current?.(copyRef.current.captureFailed);
    }
  }, []);

  /* A finished attempt rotates the idempotency keys: a retry of the same click
     keeps its key, but the next deliberate click must be a new attempt. */
  const rotateKeys = useCallback(() => {
    keysRef.current = { paypal: newIdempotencyKey(), card: newIdempotencyKey() };
  }, []);

  const onSdkError = useCallback(() => {
    rotateKeys();
    errorRef.current?.(copyRef.current.startFailed);
  }, [rotateKeys]);

  const onCancel = useCallback(() => {
    rotateKeys();
    errorRef.current?.(copyRef.current.cancelled);
  }, [rotateKeys]);

  const buttonHandlers = useMemo(() => ({
    createOrder: createOrderFor('paypal'),
    onApprove,
    onError: onSdkError,
    onCancel,
  }), [createOrderFor, onApprove, onSdkError, onCancel]);

  const cardHandlers = useMemo(() => ({
    createOrder: createOrderFor('card'),
    onApprove,
    onError: onSdkError,
    onCancel,
  }), [createOrderFor, onApprove, onSdkError, onCancel]);

  useEffect(() => {
    let alive = true;
    api.getConfig()
      .then((next) => {
        if (!alive) return;
        if (!next?.clientId) {
          setUnavailable(copyRef.current.unavailable);
          return;
        }
        setConfig(next);
      })
      .catch((error) => {
        if (!alive) return;
        /* 三种失败原因分开说，并留一行可查的线索（不含任何凭据）。 */
        const status = error?.paypalStatus ?? 0;
        const reason = error?.paypalCode === 'CLIENT_ID_MISSING'
          ? copyRef.current.notConfigured
          : status === 401 || status === 403
          ? copyRef.current.sessionExpired
          : status === 404
            ? copyRef.current.notConfigured
            : copyRef.current.unavailable;
        setUnavailable(reason);
      });
    return () => { alive = false; };
  }, []);

  /* 第一段：建实例、判断资格，让宿主节点先进 DOM。 */
  useEffect(() => {
    if (!config || mountedRef.current) return undefined;
    let alive = true;

    loadSdk(config)
      .then((paypal) => {
        if (!alive || mountedRef.current) return;

        if (buttonsRef.current && !buttonsRef.current.childElementCount) {
          paypal.Buttons({
            style: { layout: 'vertical', shape: 'rect', label: 'paypal', height: 44 },
            ...buttonHandlers,
          }).render(buttonsRef.current);
        }

        /* Hosted fields: PayPal owns what is inside the iframes, but the SDK
         * still accepts a style block for the inputs. Only size and colour are
         * passed — enough to stop the block towering, nothing that pretends we
         * control their form. */
        const cardFields = paypal.CardFields?.({
          ...cardHandlers,
          style: {
            input: { 'font-size': '14px', 'color': '#141a17' },
            '.invalid': { color: '#b42318' },
          },
        });
        if (cardFields?.isEligible?.()) {
          cardFieldsRef.current = cardFields;
          setCardEligible(true);
        }

        mountedRef.current = true;
        setReady(true);
      })
      .catch((error) => {
        if (!alive) return;
        /* 三种失败原因分开说，并留一行可查的线索（不含任何凭据）。 */
        const status = error?.paypalStatus ?? 0;
        const reason = error?.paypalCode === 'CLIENT_ID_MISSING'
          ? copyRef.current.notConfigured
          : status === 401 || status === 403
          ? copyRef.current.sessionExpired
          : status === 404
            ? copyRef.current.notConfigured
            : copyRef.current.unavailable;
        setUnavailable(reason);
      });

    return () => { alive = false; };
  }, [config, buttonHandlers, cardHandlers]);

  /* 第二段：宿主节点已在 DOM 里，再渲染四个托管字段，只做一次。 */
  useEffect(() => {
    if (!cardEligible || cardRenderedRef.current) return;
    const cardFields = cardFieldsRef.current;
    const hosts = [nameRef.current, numberRef.current, expiryRef.current, cvvRef.current];
    if (!cardFields || hosts.some((node) => !node)) return;

    cardFields.NameField().render(hosts[0]);
    cardFields.NumberField().render(hosts[1]);
    cardFields.ExpiryField().render(hosts[2]);
    cardFields.CVVField().render(hosts[3]);
    cardRenderedRef.current = true;
  }, [cardEligible]);

  /* 提交由平台自己的按钮发起；这里不读、不校验任何卡数据。 */
  const submitCard = async () => {
    const cardFields = cardFieldsRef.current;
    if (!cardFields?.submit || busy) return;
    setBusy(true);
    errorRef.current?.('');
    try {
      await cardFields.submit();
    } catch {
      errorRef.current?.(copyRef.current.cardFailed);
    } finally {
      setBusy(false);
    }
  };

  if (unavailable) return <p className="business-funds-note">{unavailable}</p>;

  return (
    <div className="business-funds-paypal">
      {!ready && <p className="business-funds-note">{copy.loading}</p>}

      <div ref={buttonsRef} className={disabled ? 'is-disabled' : ''} />

      {ready && cardEligible && (
        <>
          <div ref={nameRef} />
          <div ref={numberRef} />
          <div className="business-funds-card-row">
            <div ref={expiryRef} />
            <div ref={cvvRef} />
          </div>
          <button
            type="button"
            className="business-funds-card-submit"
            onClick={submitCard}
            disabled={disabled || busy}
          >
            {busy ? copy.paying : copy.payWithCard}
          </button>
        </>
      )}

      {ready && !cardEligible && <p className="business-funds-note">{copy.cardUnavailable}</p>}

      {/* PayPal 要求卡字段附近有隐私告知 */}
      <p className="business-funds-note business-funds-privacy">
        {copy.privacy}{' '}
        <a href="https://www.paypal.com/privacy" target="_blank" rel="noreferrer noopener">
          {copy.privacyLink}
        </a>
      </p>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  capturePaypalAdvancedOrder,
  createPaypalAdvancedOrder,
  getPaypalAdvancedConfig,
  newIdempotencyKey,
} from '../api/paypalAdvanced';

/**
 * PayPal 的官方结账组件：Buttons + CardFields。
 *
 * 规矩（2026-11-01 冻结契约）：
 *   - 只加载官方 SDK，卡号/CVV 由 PayPal 托管字段渲染，平台不接触；
 *   - 创建订单用应用生成的幂等键，返回的 paypalOrderId 直接交给 SDK；
 *   - onApprove 只回传 order id，捕获动作在服务端完成；
 *   - CardFields 不可用时不降级成自建卡输入框，明确说“暂不可用”。
 */

const SDK_ID = 'paypal-advanced-sdk';

let sdkPromise = null;

const loadSdk = ({ clientId, currency, intent }) => {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SDK_ID);
    if (existing) existing.remove();
    const script = document.createElement('script');
    const params = new URLSearchParams({
      'client-id': clientId,
      currency: currency || 'USD',
      intent: intent || 'capture',
      components: 'buttons,card-fields',
    });
    script.id = SDK_ID;
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error('PayPal SDK missing')));
    script.onerror = () => reject(new Error('PayPal SDK failed to load'));
    document.head.appendChild(script);
  });

  return sdkPromise;
};

export default function PayPalCheckout({ amountUsd, disabled, onPaid, onError, copy }) {
  const [config, setConfig] = useState(null);
  const [ready, setReady] = useState(false);
  const [cardEligible, setCardEligible] = useState(false);
  const [unavailable, setUnavailable] = useState('');
  const buttonsRef = useRef(null);
  const cardRefs = useRef({ name: null, number: null, expiry: null, cvv: null, submit: null });
  const keyRef = useRef(null);
  const amountRef = useRef(amountUsd);

  amountRef.current = amountUsd;

  /* 一次尝试一把幂等键；金额变了就换新的，否则重试会撞上旧订单。 */
  useEffect(() => {
    keyRef.current = newIdempotencyKey();
  }, [amountUsd]);

  useEffect(() => {
    let alive = true;
    getPaypalAdvancedConfig()
      .then((next) => {
        if (!alive) return;
        if (!next?.clientId) {
          setUnavailable(copy.unavailable);
          return;
        }
        setConfig(next);
      })
      .catch(() => { if (alive) setUnavailable(copy.unavailable); });
    return () => { alive = false; };
  }, [copy.unavailable]);

  const handlers = useMemo(() => ({
    createOrder: async () => {
      const payment = await createPaypalAdvancedOrder({
        amountUsd: amountRef.current,
        idempotencyKey: keyRef.current,
      });
      if (!payment?.paypalOrderId) throw new Error('no paypal order id');
      return payment.paypalOrderId;
    },
    onApprove: async (data) => {
      try {
        const payment = await capturePaypalAdvancedOrder(data.orderID);
        keyRef.current = newIdempotencyKey();
        onPaid?.(payment);
      } catch (error) {
        onError?.(copy.captureFailed);
      }
    },
    onError: () => onError?.(copy.startFailed),
    onCancel: () => onError?.(copy.cancelled),
  }), [copy, onError, onPaid]);

  useEffect(() => {
    if (!config) return undefined;
    let alive = true;

    loadSdk(config)
      .then((paypal) => {
        if (!alive) return;
        setReady(true);

        if (buttonsRef.current && !buttonsRef.current.dataset.mounted) {
          paypal.Buttons({
            style: { layout: 'vertical', shape: 'rect', label: 'paypal', height: 44 },
            ...handlers,
          }).render(buttonsRef.current);
          buttonsRef.current.dataset.mounted = '1';
        }

        const cardFields = paypal.CardFields?.({ ...handlers });
        if (!cardFields?.isEligible?.()) return;
        setCardEligible(true);
        const refs = cardRefs.current;
        cardFields.NameField().render(refs.name);
        cardFields.NumberField().render(refs.number);
        cardFields.ExpiryField().render(refs.expiry);
        cardFields.CVVField().render(refs.cvv);
        cardFields.SubmitButton().render(refs.submit);
      })
      .catch(() => { if (alive) setUnavailable(copy.unavailable); });

    return () => { alive = false; };
  }, [config, handlers, copy.unavailable]);

  if (unavailable) return <p className="business-funds-note">{unavailable}</p>;

  return (
    <div className="business-funds-paypal">
      {!ready && <p className="business-funds-note">{copy.loading}</p>}

      <div ref={buttonsRef} className={disabled ? 'is-disabled' : ''} />

      <div ref={cardRefs.current.name} />
      <div ref={cardRefs.current.number} />
      <div className="business-funds-card-row">
        <div ref={cardRefs.current.expiry} />
        <div ref={cardRefs.current.cvv} />
      </div>
      <div ref={cardRefs.current.submit} />

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

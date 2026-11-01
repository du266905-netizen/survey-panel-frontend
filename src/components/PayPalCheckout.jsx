import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
 *
 * 生命周期：SDK 组件**只挂载一次**。金额变化只换幂等键，不重建 Buttons /
 * CardFields —— 重建会把已经输入一半的卡字段清掉，也会留下旧实例。
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

export default function PayPalCheckout({ amountUsd, disabled, onPaid, onError, copy }) {
  const [config, setConfig] = useState(null);
  const [ready, setReady] = useState(false);
  const [cardEligible, setCardEligible] = useState(false);
  const [unavailable, setUnavailable] = useState('');

  /* 各字段独立的 ref —— 之前把它们塞在一个对象里当 ref 传，节点永远拿不到。 */
  const buttonsRef = useRef(null);
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const submitRef = useRef(null);

  const mountedRef = useRef(false);
  /* CardFields 实例先建、后渲染：容器要等 cardEligible 为真才进 DOM，
     所以实例存在 ref 里，由下一个 effect 负责 render。 */
  const cardFieldsRef = useRef(null);
  const cardRenderedRef = useRef(false);
  const keyRef = useRef(newIdempotencyKey());
  const amountRef = useRef(amountUsd);

  /* 回调放 ref 里：SDK 只挂载一次，但仍然要调用最新的 handler。 */
  const paidRef = useRef(onPaid);
  const errorRef = useRef(onError);
  const copyRef = useRef(copy);
  paidRef.current = onPaid;
  errorRef.current = onError;
  copyRef.current = copy;

  /* 金额变了只换幂等键：同一笔金额重试复用同一把键，换金额就是新订单。 */
  useEffect(() => {
    amountRef.current = amountUsd;
    keyRef.current = newIdempotencyKey();
  }, [amountUsd]);

  const createOrder = useCallback(async () => {
    const payment = await createPaypalAdvancedOrder({
      amountUsd: amountRef.current,
      idempotencyKey: keyRef.current,
    });
    if (!payment?.paypalOrderId) throw new Error('no paypal order id');
    return payment.paypalOrderId;
  }, []);

  const onApprove = useCallback(async (data) => {
    try {
      const payment = await capturePaypalAdvancedOrder(data.orderID);
      keyRef.current = newIdempotencyKey();
      paidRef.current?.(payment);
    } catch {
      errorRef.current?.(copyRef.current.captureFailed);
    }
  }, []);

  const handlers = useMemo(() => ({
    createOrder,
    onApprove,
    onError: () => errorRef.current?.(copyRef.current.startFailed),
    onCancel: () => errorRef.current?.(copyRef.current.cancelled),
  }), [createOrder, onApprove]);

  useEffect(() => {
    let alive = true;
    getPaypalAdvancedConfig()
      .then((next) => {
        if (!alive) return;
        if (!next?.clientId) {
          setUnavailable(copyRef.current.unavailable);
          return;
        }
        setConfig(next);
      })
      .catch(() => { if (alive) setUnavailable(copyRef.current.unavailable); });
    return () => { alive = false; };
  }, []);

  /* 只初始化一次：config 到手之后挂载，之后无论父组件怎么重渲染都不重建。 */
  useEffect(() => {
    if (!config || mountedRef.current) return undefined;
    let alive = true;

    loadSdk(config)
      .then((paypal) => {
        if (!alive || mountedRef.current) return;

        if (buttonsRef.current && !buttonsRef.current.childElementCount) {
          paypal.Buttons({
            style: { layout: 'vertical', shape: 'rect', label: 'paypal', height: 44 },
            ...handlers,
          }).render(buttonsRef.current);
        }

        const cardFields = paypal.CardFields?.({ ...handlers });
        if (cardFields?.isEligible?.()) {
          /* 只判断资格并保存实例；容器还没进 DOM，这里 render 会拿到 null。 */
          cardFieldsRef.current = cardFields;
          setCardEligible(true);
        }

        mountedRef.current = true;
        setReady(true);
      })
      .catch(() => { if (alive) setUnavailable(copyRef.current.unavailable); });

    return () => { alive = false; };
  }, [config, handlers]);

  /* 第二个 effect：cardEligible 已经让五个容器进入 DOM，ref 有值了再渲染。
     只执行一次，之后任何重渲染都不再碰它。 */
  useEffect(() => {
    if (!cardEligible || cardRenderedRef.current) return;
    const cardFields = cardFieldsRef.current;
    const hosts = [nameRef.current, numberRef.current, expiryRef.current, cvvRef.current, submitRef.current];
    if (!cardFields || hosts.some((node) => !node)) return;

    cardFields.NameField().render(hosts[0]);
    cardFields.NumberField().render(hosts[1]);
    cardFields.ExpiryField().render(hosts[2]);
    cardFields.CVVField().render(hosts[3]);
    cardFields.SubmitButton().render(hosts[4]);
    cardRenderedRef.current = true;
  }, [cardEligible]);

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
          <div ref={submitRef} />
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

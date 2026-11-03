import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import './CookieNotice.css';

/**
 * 只使用必要 Cookie，所以这里是一条通知，不是同意管理。
 *
 * 背景：Cookiebot 停用后不再续费；站点没有接任何分析或广告脚本，
 * 第三方 Cookie 只出现在支付通道（PayPal / 加密收款页），属于完成交易必需。
 * 因此不需要"接受/拒绝"的分流，只需要如实告知并留一个隐私政策入口。
 *
 * 一旦接入分析或广告脚本，这里必须升级成带分类的选择（Klaro 或同类），
 * 不能继续用这条通知顶着。
 */
const STORAGE_KEY = 'guanyisearch-cookie-notice-v1';

export default function CookieNotice() {
  const { language } = useLanguage();
  const lang = String(language || '').startsWith('zh') ? 'zh' : 'en';
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked: leave the notice hidden rather than nagging on every page */
    }
  }, []);

  if (!visible) return null;
  // The legal pages already explain this in full; do not cover them with it.
  if (location.pathname === '/privacy' || location.pathname === '/terms') return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <aside className="cookie-notice" role="status" aria-live="polite">
      <p>
        {lang === 'zh'
          ? '我们只使用必要的 Cookie：保持登录状态、完成支付。没有广告追踪。'
          : 'We use only the cookies we need: to keep you signed in and to complete payments. No advertising trackers.'}
      </p>
      <div className="cookie-notice-actions">
        <Link to="/privacy" onClick={dismiss}>
          {lang === 'zh' ? '隐私政策' : 'Privacy policy'}
        </Link>
        <button type="button" onClick={dismiss}>
          {lang === 'zh' ? '知道了' : 'Got it'}
        </button>
      </div>
    </aside>
  );
}

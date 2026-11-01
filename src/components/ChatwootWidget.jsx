import { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

/**
 * Chatwoot 的网站插件。
 *
 * 只在 research 端、已登录时加载；加载后立刻把用户塞给它，客服后台就能看到
 * 是谁在问。未识别身份的访客不显示悬浮按钮——一个匿名的会话，客服只能问
 * “请问您是……”，第一句话就浪费掉了。
 *
 * 开关：VITE_SUPPORT_CHAT=chatwoot 时启用，默认仍走自建的 BusinessSupportChat。
 */

const BASE_URL = 'https://app.chatwoot.com';
const WEBSITE_TOKEN = '7BdTKVoemcuJq9hEzAp3ePMz';

/** 同一个页面只注入一次 SDK；React 严格模式下 effect 会跑两遍。 */
let loading = null;

const loadSdk = () => {
  if (window.$chatwoot) return Promise.resolve(window.$chatwoot);
  if (loading) return loading;

  window.chatwootSettings = {
    position: 'right',
    type: 'standard',
    launcherTitle: '',
    showPopoutButton: false,
  };

  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      if (!window.chatwootSDK) {
        reject(new Error('Chatwoot SDK loaded without chatwootSDK'));
        return;
      }
      window.chatwootSDK.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
      resolve(window.$chatwoot);
    };
    script.onerror = () => reject(new Error('Chatwoot SDK failed to load'));
    document.head.appendChild(script);
  });

  return loading;
};

export default function ChatwootWidget() {
  const { user } = useAuth();
  const identified = useRef(null);

  const userId = user?.id ? String(user.id) : '';

  useEffect(() => {
    if (!userId) return undefined;
    let alive = true;

    loadSdk()
      .then((chatwoot) => {
        if (!alive || !chatwoot) return;
        /* 认领身份。这一步必须在显示之前完成：认领之前露出来的按钮，
           点开就是一个匿名会话，客服只能先问“请问您是……”。 */
        chatwoot.setUser(userId, {
          name: user?.displayName || user?.username || undefined,
          email: user?.email || undefined,
        });
        chatwoot.setCustomAttributes?.({
          plan: 'business',
          role: user?.role || 'business',
          locale: window.localStorage.getItem('language') || 'en-US',
        });
        /* iframe 是异步挂载的，show 立刻调会落在还没就绪的节点上 */
        [0, 300, 1200].forEach((delay) => window.setTimeout(() => {
          if (alive) window.$chatwoot?.show?.();
        }, delay));
        identified.current = userId;
      })
      .catch(() => { /* 客服窗口加载失败不该影响页面本身 */ });

    return () => {
      alive = false;
      /* 离开研究端就把气泡收起来。它在 body 上，不随组件卸载消失，
         不收就会出现“首页也挂着客服按钮”。 */
      window.$chatwoot?.hide?.();
    };
  }, [userId, user?.displayName, user?.username, user?.email, user?.role]);

  /* 退出登录：清掉身份，别再让下一个人用上一个人的会话。 */
  useEffect(() => {
    if (userId || !identified.current || !window.$chatwoot) return;
    window.$chatwoot.reset?.();
    window.$chatwoot.hide?.();
    identified.current = null;
  }, [userId]);

  return null;
}

/* CookieConsent v3 (MIT, orestbida) — configured for guanyisearch.
 *
 * Categories
 *   necessary  always on; sign-in, session, payment hand-off
 *   analytics  off until chosen; nothing is loaded today
 *   marketing  off until chosen; nothing is loaded today
 *
 * Anything that must wait for consent is loaded inside onConsent / onChange,
 * never on page load. Adding a script without wiring it here defeats the point.
 */
(function () {
  var zh = {
    consentModal: {
      title: '我们只用必要的 Cookie',
      description: '必要的 Cookie 用于保持登录状态和完成支付，无法关闭。分析类 Cookie 目前没有启用；将来启用时，只有你同意后才会运行。',
      acceptAllBtn: '全部接受',
      acceptNecessaryBtn: '仅必要',
      showPreferencesBtn: '偏好设置',
      footer: '<a href="/privacy">隐私政策</a>'
    },
    preferencesModal: {
      title: 'Cookie 偏好',
      acceptAllBtn: '全部接受',
      acceptNecessaryBtn: '仅必要',
      savePreferencesBtn: '保存选择',
      closeIconLabel: '关闭',
      sections: [
        { title: '必要', description: '保持登录、维持会话、完成支付跳转。关闭后网站无法正常工作。', linkedCategory: 'necessary' },
        { title: '分析', description: '用于了解页面如何使用。目前没有启用任何分析服务。', linkedCategory: 'analytics' },
        { title: '营销', description: '用于投放与衡量广告。目前没有启用任何广告服务。', linkedCategory: 'marketing' }
      ]
    }
  };

  var en = {
    consentModal: {
      title: 'We only use the cookies we need',
      description: 'Necessary cookies keep you signed in and complete payments, and cannot be switched off. Analytics cookies are not in use today; if we add them, they run only after you agree.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Necessary only',
      showPreferencesBtn: 'Preferences',
      footer: '<a href="/privacy">Privacy policy</a>'
    },
    preferencesModal: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Necessary only',
      savePreferencesBtn: 'Save choices',
      closeIconLabel: 'Close',
      sections: [
        { title: 'Necessary', description: 'Sign-in, session, and the payment hand-off. The site cannot work without them.', linkedCategory: 'necessary' },
        { title: 'Analytics', description: 'Understanding how pages are used. No analytics service is active today.', linkedCategory: 'analytics' },
        { title: 'Marketing', description: 'Delivering and measuring advertising. No advertising service is active today.', linkedCategory: 'marketing' }
      ]
    }
  };

  window.CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true, flipButtons: false }
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: { enabled: false },
      marketing: { enabled: false }
    },
    language: {
      default: 'en',
      autoDetect: 'document',
      translations: { en: en, zh: zh }
    },
    onConsent: function () {
      /* Load analytics or marketing here, and only here, once such a service exists. */
    },
    onChange: function () {
      /* Same: react to a change in consent, never load earlier. */
    }
  });
})();

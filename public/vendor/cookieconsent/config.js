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
      title: '我们重视您的隐私',
      description: '我们使用 Cookie 让网站正常工作，并了解页面如何使用。你可以全部接受、拒绝，或自行选择。',
      acceptAllBtn: '全部接受',
      acceptNecessaryBtn: '拒绝',
      showPreferencesBtn: '自定义',
      footer: '<a href="/legal/guanyisearch-cookie-notice-2026-09-zh.pdf" target="_blank" rel="noopener">Cookie 政策</a><a href="/privacy">隐私政策</a>'
    },
    preferencesModal: {
      title: 'Cookie 设置',
      acceptAllBtn: '全部接受',
      acceptNecessaryBtn: '拒绝',
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
      title: 'We value your privacy',
      description: 'We use cookies to keep the site working and understand how it is used. Accept all, reject optional cookies, or choose what you allow.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      showPreferencesBtn: 'Customise',
      footer: '<a href="/legal/guanyisearch-cookie-notice-2026-09-en.pdf" target="_blank" rel="noopener">Cookie policy</a><a href="/privacy">Privacy policy</a>'
    },
    preferencesModal: {
      title: 'Cookie settings',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
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
      preferencesModal: { layout: 'box', position: 'middle', equalWeightButtons: true, flipButtons: false }
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

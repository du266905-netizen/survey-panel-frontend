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
      title: '本网站的 Cookie',
      description: '我们使用 Cookie 让网站和服务正常工作。这些 Cookie 是必要的，会自动设置。<br><br>我们还希望使用一些可选的 Cookie，用来：<ul><li>让访问更贴近你的需要</li><li>根据你的使用方式改进网站</li><li>支持我们的市场沟通</li></ul>你可以接受或拒绝这些可选 Cookie，也可以在「管理 Cookie」里逐项选择。详情见 <a href="/legal/guanyisearch-cookie-notice-2026-09-zh.pdf" target="_blank" rel="noopener">Cookie 政策</a>。',
      acceptAllBtn: '接受可选 Cookie',
      acceptNecessaryBtn: '拒绝可选 Cookie',
      showPreferencesBtn: '管理 Cookie',
      footer: '<a href="/legal/guanyisearch-cookie-notice-2026-09-zh.pdf" target="_blank" rel="noopener">Cookie 政策</a>'
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
      title: 'Cookies on this website',
      description: 'We use cookies to help keep our website and services working properly. These cookies are necessary and are set automatically.<br><br>We would also like to use some optional cookies that:<ul><li>make your visit more personal</li><li>improve our website based on how you use it</li><li>support our marketing</li></ul>You can accept or decline these cookies, or choose which types to accept under Manage cookies. Read the <a href="/legal/guanyisearch-cookie-notice-2026-09-en.pdf" target="_blank" rel="noopener">cookie notice</a> for detail.',
      acceptAllBtn: 'Accept optional cookies',
      acceptNecessaryBtn: 'Decline optional cookies',
      showPreferencesBtn: 'Manage cookies',
      footer: '<a href="/legal/guanyisearch-cookie-notice-2026-09-en.pdf" target="_blank" rel="noopener">View our cookie policy</a>'
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

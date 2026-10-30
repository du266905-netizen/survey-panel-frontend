export const customSubmissionCopy = {
  'zh-CN': {
    title: '项目提交成功',
    body: '感谢你填写的信息。我们已收到，并会尽快与你联系，进行下一步的对接和探讨。请注意留意邮箱和消息栏。',
    action: '查看项目',
  },
  'zh-Hant': {
    title: '專案提交成功',
    body: '感謝你填寫的資訊。我們已收到，並會盡快與你聯繫，進行下一步的對接和探討。請留意你的電子郵件與訊息欄。',
    action: '查看專案',
  },
  'en-US': {
    title: 'Project submitted successfully',
    body: 'Thank you for the information you provided. We have received it and will contact you as soon as possible to discuss the next steps. Please keep an eye on your email and messages.',
    action: 'View projects',
  },
  'en-GB': {
    title: 'Project submitted successfully',
    body: 'Thank you for the information you provided. We have received it and will contact you as soon as possible to discuss the next steps. Please keep an eye on your email and messages.',
    action: 'View projects',
  },
};

export function getCustomSubmissionCopy(language) {
  if (customSubmissionCopy[language]) return customSubmissionCopy[language];
  if (String(language || '').startsWith('zh')) return customSubmissionCopy['zh-CN'];
  return customSubmissionCopy['en-US'];
}

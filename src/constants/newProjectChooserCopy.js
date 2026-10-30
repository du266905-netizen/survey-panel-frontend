export const newProjectChooserCopy = {
  'en-US': {
    kicker: 'NEW PROJECT',
    title: 'New project',
    intro: 'Choose one of three ways to start.',
    note: 'Managed work starts with a short scoping review. Self-service opens the editor now.',
    products: {
      customSurvey: {
        title: 'Custom survey research',
        description: 'Scoping, questionnaire, fieldwork and delivery.',
        action: 'Request survey',
      },
      researchSupport: {
        title: 'Custom research support',
        description: 'Interviews, usability, groups, or participant recruitment.',
        action: 'Request support',
      },
      selfService: {
        title: 'Survey (self-service, 24h)',
        description: 'Write the brief and open the editor now. No scoping call.',
        action: 'Start now',
      },
    },
  },
  'en-GB': {
    kicker: 'NEW PROJECT',
    title: 'New project',
    intro: 'Choose one of three ways to start.',
    note: 'Managed work starts with a short scoping review. Self-service opens the editor now.',
    products: {
      customSurvey: {
        title: 'Custom survey research',
        description: 'Scoping, questionnaire, fieldwork and delivery.',
        action: 'Request survey',
      },
      researchSupport: {
        title: 'Custom research support',
        description: 'Interviews, usability, groups, or participant recruitment.',
        action: 'Request support',
      },
      selfService: {
        title: 'Survey (self-service, 24h)',
        description: 'Write the brief and open the editor now. No scoping call.',
        action: 'Start now',
      },
    },
  },
  'zh-CN': {
    kicker: '新项目',
    title: '新建项目',
    intro: '三种方式，选一个开始。',
    note: '定制项目先做范围确认；自助调查直接进入编辑器。',
    products: {
      customSurvey: {
        title: '定制调查研究',
        description: '范围、问卷、执行与交付。',
        action: '申请调查',
      },
      researchSupport: {
        title: '定制研究支持',
        description: '访谈、可用性、焦点小组或招募。',
        action: '申请支持',
      },
      selfService: {
        title: '调查（自助 · 24 小时）',
        description: '自己写 brief，立即进入编辑器。',
        action: '立即开始',
      },
    },
  },
  'zh-Hant': {
    kicker: '新專案',
    title: '新建專案',
    intro: '三種方式，選一個開始。',
    note: '定製專案先做範圍確認；自助調查直接進入編輯器。',
    products: {
      customSurvey: {
        title: '定製調查研究',
        description: '範圍、問卷、執行與交付。',
        action: '申請調查',
      },
      researchSupport: {
        title: '定製研究支持',
        description: '訪談、可用性、焦點小組或招募。',
        action: '申請支持',
      },
      selfService: {
        title: '調查（自助 · 24 小時）',
        description: '自己寫 brief，立即進入編輯器。',
        action: '立即開始',
      },
    },
  },
};

export function getNewProjectChooserCopy(language) {
  if (newProjectChooserCopy[language]) return newProjectChooserCopy[language];
  if (String(language || '').startsWith('zh')) return newProjectChooserCopy['zh-CN'];
  return newProjectChooserCopy['en-US'];
}

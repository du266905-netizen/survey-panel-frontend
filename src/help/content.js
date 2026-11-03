/* Help centre content.
 *
 * Structure follows the published docs of comparable products (Claude Code,
 * Prolific, SurveyMonkey): a category rail, one article per surface, and every
 * article long enough to carry its own section rail — outcome first, then the
 * steps, then the exceptions.
 *
 * Blocks stay small on purpose: p, h, steps, note. Anything richer belongs in
 * a screenshot, not in markup.
 *
 * Files: articles/workspace.js (start, projects), articles/research.js
 * (results), articles/payments-core.js and payments-billing.js (payments),
 * articles/account.js (account and support).
 */

import { WORKSPACE } from './articles/workspace.js';
import { METHODS } from './articles/methods.js';
import { METHODS_EXTRAS } from './articles/methods-extras.js';
import { PROJECT_EXTRAS } from './articles/project-extras.js';
import { RESULTS_EXTRAS } from './articles/results-extras.js';
import { ACCOUNT_EXTRAS } from './articles/account-extras.js';
import { RESEARCH } from './articles/research.js';
import { PAYMENTS_CORE } from './articles/payments-core.js';
import { PAYMENTS_BILLING } from './articles/payments-billing.js';
import { ACCOUNT } from './articles/account.js';

export const CATEGORIES = [
  {
    id: 'start',
    zh: '开始使用',
    en: 'Getting started',
    zhNote: '账号、登录与工作区的基本操作。',
    enNote: 'Account, sign-in, and finding your way around.',
  },
  {
    id: 'projects',
    zh: '项目与问卷',
    en: 'Projects and questionnaires',
    zhNote: '从新建项目到问卷上线。',
    enNote: 'From a new project to a live questionnaire.',
  },
  {
    id: 'recruiting',
    zh: '招募与样本',
    en: 'Recruiting',
    zhNote: '样本、配额与参与者质量。',
    enNote: 'Samples, quotas, and participant quality.',
  },
  {
    id: 'methods',
    zh: '问卷方法',
    en: 'Question design',
    zhNote: '出题、筛选题、逻辑、受众与配额、交叉表。',
    enNote: 'Writing questions, screening, logic, audiences, crosstabs.',
  },
  {
    id: 'results',
    zh: '结果与报告',
    en: 'Results',
    zhNote: '查看结果、导出数据、交付报告。',
    enNote: 'Reading results, exporting data, delivering reports.',
  },
  {
    id: 'payments',
    zh: '充值与账单',
    en: 'Payments and billing',
    zhNote: '充值、付款方式、付款链接、账单与发票。',
    enNote: 'Top-ups, payment methods, links, billing, and invoices.',
  },
  {
    id: 'account',
    zh: '账户与安全',
    en: 'Account and security',
    zhNote: '资料、密码、安全与联系客服。',
    enNote: 'Profile, password, security, and reaching support.',
  },
];

export const ARTICLES = [
  ...WORKSPACE,
  ...PROJECT_EXTRAS,
  ...METHODS,
  ...METHODS_EXTRAS,
  ...RESEARCH,
  ...RESULTS_EXTRAS,
  ...PAYMENTS_CORE,
  ...PAYMENTS_BILLING,
  ...ACCOUNT,
  ...ACCOUNT_EXTRAS,
];

export const findArticle = (slug) => ARTICLES.find((article) => article.slug === slug);

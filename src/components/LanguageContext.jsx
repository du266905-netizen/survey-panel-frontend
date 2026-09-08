import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'guanyisearch-language';

const englishCopy = {
  navigation: { about: 'About us', takePart: 'Take part', standards: 'Standards', organisations: 'For organisations', signIn: 'Sign in', join: 'Join us', workspace: 'Open workspace', items: { how: 'How it works', approach: 'Our approach', surveys: 'Available surveys', news: 'News Wall', rewards: 'Rewards', privacy: 'Your information', terms: 'Participation terms' } },
  hero: { eyebrow: 'GUANYISEARCH / Insights & services', lines: ['Every voice', 'carries', 'forward.'], description: 'Take part in thoughtful research, share what you see, and help turn lived experience into clearer decisions.' },
  approach: { principle: 'Our principle', title: 'Human First', deck: 'We believe that real people will always be the starting point for research.', mark: ['REAL PEOPLE', 'REAL INSIGHT'], markBody: 'One real response at a time, a more trustworthy picture can grow.', imageAlt: 'Impressionist shoreline landscape', imageCaption: 'Real voices deserve to be heard with care.', lede: 'AI can generate endless content that appears real. But it can never recreate a particular person, in a particular moment, expressing what they truly think.', voices: 'Real voices', voicesBody: 'Behind every survey result is a person who chose to share a perspective. Those individual voices make insight worth trusting.', technology: 'Technology, in service', technologyBody: 'We use matching and real-time data to respect your time, show your impact, and keep every reward rule clear and fair.', principleLabel: 'Our principle', principleBody: 'Human-centered does not mean rejecting technology. It means making technology serve people.' },
  home: {
    contactKicker: 'Get in touch', contactTitle: 'Tell us what matters to you.', contactIntro: 'Share your question or idea. We will follow up using the details you provide.', name: 'Your name', email: 'Your email', contactNumber: 'Contact number', optional: 'Optional', phonePlaceholder: 'Phone number', country: 'Country or territory', subject: 'Subject', message: 'Message', send: 'Send message', sending: 'Sending', received: 'Thank you. Your message has been received.', sendError: 'We could not send your message. Please try again.',
    prompts: ['Read the latest news', 'Join a survey', 'Share your view', 'Bring a research question'], begin: 'Let’s begin:', nodes: { news: ['News wall', "See the world's perspective. Stay up to date."], survey: ['Surveys', 'Take surveys and earn gift cards and more.'], community: ['Community', 'Join the community.'], business: ['Business', 'Custom questionnaires and tailored studies.'] },
    evidence: 'The world is never one-size-fits-all. GUANYISEARCH listens deeply, blending global vision with local research expertise. Grounded in scientific sample design and rigorous qualitative-quantitative methodologies, we consistently uphold internationally recognized research ethics and data privacy standards to uncover authentic insights—empowering better decisions and better lives.', evidenceStatement: 'Let every choice be evidence-based.',
    globalLabel: 'Global perspective', globalTitle: 'Research begins with people, in every context.', globalBody: 'A global view reminds us that every response comes from a different life, place, and point of view. The platform keeps each participation journey clear and considered from the first step to reward.', rewardsLabel: 'Rewards & panel', rewardsTitle: 'A little more to look forward to.', rewardsBody: 'Join the panel for surveys that value your time, special tasks, and clear reward opportunities.', rewardCards: [['For everyday moments', 'Gift cards', 'Complete eligible surveys, build your Coins balance, and choose from selected gift-card rewards.'], ['Where available', 'Tokens', 'In supported regions, selected token reward options can be part of your next redemption choice.'], ['Inside the panel', 'Special tasks', 'From time to time, eligible members can receive an additional task and another way to earn Coins.']],
    footer: { description: 'A considered research space for participants and organisations: clear opportunities, credible input, and practical next steps.', contact: 'Contact the team', about: 'About us', how: 'How it works', approach: 'Our approach', explore: 'Explore', news: 'News Wall', participate: 'Participate', surveys: 'Find surveys', wallet: 'Rewards & wallet', invite: 'Invite program', organisations: 'For organisations', questionnaires: 'Custom questionnaires', studies: 'Tailored research', standards: 'Standards', privacy: 'Privacy', terms: 'Terms', rights: '© 2026 GuanyiSearch. All rights reserved.', privacyPolicy: 'Privacy Policy', termsService: 'Terms of Service' },
  },
};

const publicCopyByLanguage = {
  'en-GB': { navigation: { ...englishCopy.navigation }, hero: { eyebrow: 'GUANYISEARCH / Insights & services', lines: ['Every voice', 'carries us', 'forward.'], description: 'Take part in thoughtful research, share what you see, and help turn lived experience into clearer decisions.' } },
  'zh-CN': { navigation: { about: '关于我们', takePart: '参与研究', standards: '我们的标准', organisations: '面向组织', signIn: '登录', join: '加入我们', workspace: '进入工作区', items: { how: '了解参与方式', approach: '我们的理念', surveys: '可参与的问卷', news: '资讯墙', rewards: '奖励', privacy: '你的信息', terms: '参与条款' } }, hero: { eyebrow: 'GUANYISEARCH / 洞察与服务', lines: ['每一种声音', '都能让我们', '向前一步。'], description: '参与有温度的研究，分享你的见解，让真实经验带来更清晰的决策。' }, approach: { principle: '我们的理念', title: '以人为先', deck: '我们相信，真实的人永远是研究的起点。', mark: ['真实的人', '真实的洞察'], markBody: '每一份真实回应，都让更可信的图景逐渐成形。', imageAlt: '印象派海岸风景', imageCaption: '真实的声音，值得被认真聆听。', lede: '人工智能可以生成看似真实的无尽内容，却无法重现某个具体的人，在某个具体的时刻，表达自己真正所想。', voices: '真实的声音', voicesBody: '每一项调研结果背后，都是一个选择分享观点的人。正是这些独特的声音，让洞察值得信赖。', technology: '技术，为人服务', technologyBody: '我们利用匹配和实时数据来尊重你的时间、呈现你的影响，并让每一项奖励规则都清晰、公平。', principleLabel: '我们的理念', principleBody: '以人为本并不意味着拒绝技术，而是让技术始终服务于人。' }, home: { contactKicker: '联系我们', contactTitle: '告诉我们你在关注什么。', contactIntro: '分享你的问题或想法。我们会通过你提供的联系方式跟进。', name: '你的姓名', email: '你的邮箱', contactNumber: '联系电话', optional: '选填', phonePlaceholder: '电话号码', country: '国家或地区', subject: '主题', message: '留言内容', send: '发送消息', sending: '正在发送', received: '感谢你的留言，我们已收到。', sendError: '暂时无法发送，请稍后再试。', prompts: ['阅读最新资讯', '参与一项调研', '分享你的观点', '提出一个研究问题'], begin: '让我们从这里开始：', nodes: { news: ['资讯墙', '看见世界的不同视角，保持了解。'], survey: ['问卷调研', '参与问卷，赢取礼品卡等奖励。'], community: ['社群', '加入我们的社群。'], business: ['企业研究', '定制问卷与专属研究服务。'] }, evidence: '世界从来不是千篇一律。GUANYISEARCH 深度聆听，融合全球视野与本地研究专长。我们以科学的样本设计和严谨的定性、定量研究方法为基础，始终遵循国际认可的研究伦理与数据隐私标准，挖掘真实洞察，帮助人们做出更明智的决策，拥有更美好的生活。', evidenceStatement: '让每一个选择都有事实依据。', globalLabel: '全球视野', globalTitle: '研究始于每个人，也关乎每一种处境。', globalBody: '每一份回应都来自不同的人生、地点与视角。我们让每一次参与从开始到回馈都清晰、周到。', rewardsLabel: '奖励与社群', rewardsTitle: '还有更多值得期待。', rewardsBody: '加入社群，参与尊重你时间的调研、特别任务与清晰的奖励机会。', rewardCards: [['日常时刻', '礼品卡', '完成符合条件的问卷，累积 Coins 余额，并从精选礼品卡奖励中选择。'], ['适用地区', '代币', '在支持的地区，指定代币奖励可成为你的下一项兑换选择。'], ['社群内', '特别任务', '符合条件的成员会不时收到额外任务，获得更多 Coins 的机会。']], footer: { description: '面向参与者与组织的研究空间：清晰的机会、可信的意见与务实的下一步。', contact: '联系团队', about: '关于我们', how: '了解参与方式', approach: '我们的理念', explore: '探索', news: '资讯墙', participate: '参与研究', surveys: '寻找问卷', wallet: '奖励与钱包', invite: '邀请计划', organisations: '面向组织', questionnaires: '定制问卷', studies: '专属研究', standards: '标准', privacy: '隐私', terms: '条款', rights: '© 2026 GuanyiSearch。保留所有权利。', privacyPolicy: '隐私政策', termsService: '服务条款' } } },
  'zh-Hant': { navigation: { about: '關於我們', takePart: '參與研究', standards: '我們的標準', organisations: '面向組織', signIn: '登入', join: '加入我們', workspace: '進入工作區', items: { how: '了解參與方式', approach: '我們的理念', surveys: '可參與的問卷', news: '資訊牆', rewards: '獎勵', privacy: '你的資料', terms: '參與條款' } }, hero: { eyebrow: 'GUANYISEARCH / 洞察與服務', lines: ['每一種聲音', '都能讓我們', '向前一步。'], description: '參與有溫度的研究，分享你的見解，讓真實經驗帶來更清晰的決策。' }, home: { contactKicker: '聯絡我們', contactTitle: '告訴我們你在關注什麼。', contactIntro: '分享你的問題或想法。我們會透過你提供的聯絡方式跟進。', name: '你的姓名', email: '你的電郵', contactNumber: '聯絡電話', optional: '選填', phonePlaceholder: '電話號碼', country: '國家或地區', subject: '主題', message: '留言內容', send: '發送訊息', sending: '正在發送', received: '感謝你的留言，我們已收到。', sendError: '暫時無法發送，請稍後再試。', prompts: ['閱讀最新資訊', '參與一項調查', '分享你的觀點', '提出一個研究問題'], begin: '讓我們從這裡開始：', nodes: { news: ['資訊牆', '看見世界的不同視角，保持了解。'], survey: ['問卷調查', '參與問卷，贏取禮品卡等獎勵。'], community: ['社群', '加入我們的社群。'], business: ['企業研究', '客製問卷與專屬研究服務。'] }, evidence: '世界從來不是千篇一律。GUANYISEARCH 深度聆聽，融合全球視野與本地研究專長。我們以科學的樣本設計和嚴謹的定性、定量研究方法為基礎，始終遵循國際認可的研究倫理與資料隱私標準，挖掘真實洞察，幫助人們做出更明智的決策，擁有更美好的生活。', evidenceStatement: '讓每一個選擇都有事實依據。', globalLabel: '全球視野', globalTitle: '研究始於每個人，也關乎每一種處境。', globalBody: '每一份回應都來自不同的人生、地點與視角。我們讓每一次參與從開始到回饋都清晰、周到。', rewardsLabel: '獎勵與社群', rewardsTitle: '還有更多值得期待。', rewardsBody: '加入社群，參與尊重你時間的調查、特別任務與清晰的獎勵機會。', rewardCards: [['日常時刻', '禮品卡', '完成符合條件的問卷，累積 Coins 餘額，並從精選禮品卡獎勵中選擇。'], ['適用地區', '代幣', '在支援的地區，指定代幣獎勵可成為你的下一項兌換選擇。'], ['社群內', '特別任務', '符合條件的成員會不時收到額外任務，獲得更多 Coins 的機會。']], footer: { description: '面向參與者與組織的研究空間：清晰的機會、可信的意見與務實的下一步。', contact: '聯絡團隊', about: '關於我們', how: '了解參與方式', approach: '我們的理念', explore: '探索', news: '資訊牆', participate: '參與研究', surveys: '尋找問卷', wallet: '獎勵與錢包', invite: '邀請計畫', organisations: '面向組織', questionnaires: '客製問卷', studies: '專屬研究', standards: '標準', privacy: '隱私', terms: '條款', rights: '© 2026 GuanyiSearch。保留所有權利。', privacyPolicy: '隱私政策', termsService: '服務條款' } } },
  de: { navigation: { about: 'Über uns', takePart: 'Mitmachen', standards: 'Standards', organisations: 'Für Organisationen', signIn: 'Anmelden', join: 'Mitmachen', workspace: 'Arbeitsbereich öffnen' }, hero: { eyebrow: 'GUANYISEARCH / EINBLICKE & DIENSTLEISTUNGEN', lines: ['Jede Stimme', 'trägt uns', 'weiter.'], description: 'Nehmen Sie an durchdachter Forschung teil, teilen Sie Ihre Sicht und helfen Sie, Erfahrungen in klarere Entscheidungen zu verwandeln.' } },
  fr: { navigation: { about: 'À propos', takePart: 'Participer', standards: 'Nos normes', organisations: 'Pour les organisations', signIn: 'Se connecter', join: 'Nous rejoindre', workspace: 'Ouvrir l’espace' }, hero: { eyebrow: 'GUANYISEARCH / ANALYSES & SERVICES', lines: ['Chaque voix', 'nous porte', 'plus loin.'], description: 'Participez à une recherche attentive, partagez votre point de vue et transformez les expériences vécues en décisions plus claires.' } },
  nl: { navigation: { about: 'Over ons', takePart: 'Deelnemen', standards: 'Normen', organisations: 'Voor organisaties', signIn: 'Inloggen', join: 'Doe mee', workspace: 'Werkruimte openen' }, hero: { eyebrow: 'GUANYISEARCH / INZICHTEN & DIENSTEN', lines: ['Elke stem', 'brengt ons', 'vooruit.'], description: 'Neem deel aan doordacht onderzoek, deel wat u ziet en help ervaringen om te zetten in helderdere beslissingen.' } },
  da: { navigation: { about: 'Om os', takePart: 'Deltag', standards: 'Standarder', organisations: 'For organisationer', signIn: 'Log ind', join: 'Deltag', workspace: 'Åbn arbejdsområde' }, hero: { eyebrow: 'GUANYISEARCH / INDSIGTER & SERVICES', lines: ['Hver stemme', 'fører os', 'fremad.'], description: 'Deltag i gennemtænkt forskning, del det du ser, og hjælp med at gøre erfaringer til klarere beslutninger.' } },
  es: { navigation: { about: 'Sobre nosotros', takePart: 'Participa', standards: 'Estándares', organisations: 'Para organizaciones', signIn: 'Iniciar sesión', join: 'Únete', workspace: 'Abrir espacio' }, hero: { eyebrow: 'GUANYISEARCH / IDEAS Y SERVICIOS', lines: ['Cada voz', 'nos lleva', 'adelante.'], description: 'Participa en una investigación reflexiva, comparte lo que ves y ayuda a convertir experiencias en decisiones más claras.' } },
  fi: { navigation: { about: 'Meistä', takePart: 'Osallistu', standards: 'Standardit', organisations: 'Organisaatioille', signIn: 'Kirjaudu', join: 'Liity mukaan', workspace: 'Avaa työtila' }, hero: { eyebrow: 'GUANYISEARCH / NÄKEMYKSET & PALVELUT', lines: ['Jokainen ääni', 'vie meitä', 'eteenpäin.'], description: 'Osallistu harkittuun tutkimukseen, jaa näkemyksesi ja auta muuttamaan kokemukset selkeämmiksi päätöksiksi.' } },
  it: { navigation: { about: 'Chi siamo', takePart: 'Partecipa', standards: 'Standard', organisations: 'Per le organizzazioni', signIn: 'Accedi', join: 'Unisciti a noi', workspace: 'Apri spazio di lavoro' }, hero: { eyebrow: 'GUANYISEARCH / IDEE E SERVIZI', lines: ['Ogni voce', 'ci porta', 'avanti.'], description: 'Partecipa a una ricerca attenta, condividi ciò che vedi e aiuta a trasformare le esperienze in decisioni più chiare.' } },
  ja: { navigation: { about: '私たちについて', takePart: '参加する', standards: '基準', organisations: '組織の方へ', signIn: 'ログイン', join: '参加する', workspace: 'ワークスペースを開く' }, hero: { eyebrow: 'GUANYISEARCH / インサイト＆サービス', lines: ['すべての声が', '私たちを', '前へ進める。'], description: '思慮深いリサーチに参加し、あなたの視点を共有することで、経験をより明確な意思決定へつなげます。' } },
  ko: { navigation: { about: '회사 소개', takePart: '참여하기', standards: '기준', organisations: '조직용', signIn: '로그인', join: '함께하기', workspace: '워크스페이스 열기' }, hero: { eyebrow: 'GUANYISEARCH / 인사이트 & 서비스', lines: ['모든 목소리가', '우리를', '앞으로 이끕니다.'], description: '사려 깊은 연구에 참여하고 관점을 나누어, 삶의 경험을 더 명확한 의사결정으로 이어가세요.' } },
  no: { navigation: { about: 'Om oss', takePart: 'Delta', standards: 'Standarder', organisations: 'For organisasjoner', signIn: 'Logg inn', join: 'Bli med', workspace: 'Åpne arbeidsområde' }, hero: { eyebrow: 'GUANYISEARCH / INNSIKT & TJENESTER', lines: ['Hver stemme', 'fører oss', 'videre.'], description: 'Delta i gjennomtenkt forskning, del det du ser, og hjelp med å gjøre erfaringer om til tydeligere beslutninger.' } },
  pt: { navigation: { about: 'Sobre nós', takePart: 'Participe', standards: 'Padrões', organisations: 'Para organizações', signIn: 'Entrar', join: 'Junte-se a nós', workspace: 'Abrir espaço de trabalho' }, hero: { eyebrow: 'GUANYISEARCH / INSIGHTS & SERVIÇOS', lines: ['Cada voz', 'nos leva', 'adiante.'], description: 'Participe de uma pesquisa cuidadosa, compartilhe o que vê e ajude a transformar experiências em decisões mais claras.' } },
  ru: { navigation: { about: 'О нас', takePart: 'Участвовать', standards: 'Стандарты', organisations: 'Для организаций', signIn: 'Войти', join: 'Присоединиться', workspace: 'Открыть рабочее пространство' }, hero: { eyebrow: 'GUANYISEARCH / ИНСАЙТЫ И УСЛУГИ', lines: ['Каждый голос', 'ведёт нас', 'вперёд.'], description: 'Участвуйте в продуманных исследованиях, делитесь своим взглядом и помогайте превращать опыт в более ясные решения.' } },
  sv: { navigation: { about: 'Om oss', takePart: 'Delta', standards: 'Standarder', organisations: 'För organisationer', signIn: 'Logga in', join: 'Gå med', workspace: 'Öppna arbetsyta' }, hero: { eyebrow: 'GUANYISEARCH / INSIKTER & TJÄNSTER', lines: ['Varje röst', 'för oss', 'framåt.'], description: 'Delta i genomtänkt forskning, dela det du ser och hjälp till att göra erfarenheter till tydligare beslut.' } },
  tr: { navigation: { about: 'Hakkımızda', takePart: 'Katılın', standards: 'Standartlar', organisations: 'Kuruluşlar için', signIn: 'Giriş yap', join: 'Bize katılın', workspace: 'Çalışma alanını aç' }, hero: { eyebrow: 'GUANYISEARCH / İÇGÖRÜLER & HİZMETLER', lines: ['Her ses', 'bizi', 'ileri taşır.'], description: 'Düşünceli araştırmalara katılın, gördüklerinizi paylaşın ve yaşanmış deneyimleri daha net kararlara dönüştürmeye yardımcı olun.' } },
};

export const languages = [
  { code: 'en-US', label: 'English (US)', shortLabel: 'EN-US' },
  { code: 'en-GB', label: 'English (UK)', shortLabel: 'EN-GB' },
  { code: 'zh-Hant', label: '中文（繁體）', shortLabel: '繁中' },
  { code: 'zh-CN', label: '中文（简体）', shortLabel: '简中' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'nl', label: 'Nederlands', shortLabel: 'NL' },
  { code: 'da', label: 'Dansk', shortLabel: 'DA' },
  { code: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'fi', label: 'Suomi', shortLabel: 'FI' },
  { code: 'it', label: 'Italiano', shortLabel: 'IT' },
  { code: 'ja', label: '日本語', shortLabel: 'JA' },
  { code: 'ko', label: '한국어', shortLabel: 'KO' },
  { code: 'no', label: 'Norsk', shortLabel: 'NO' },
  { code: 'pt', label: 'Português', shortLabel: 'PT' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU' },
  { code: 'sv', label: 'Svenska', shortLabel: 'SV' },
  { code: 'tr', label: 'Türkçe', shortLabel: 'TR' },
];

const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return languages.some((language) => language.code === saved) ? saved : 'en-US';
  } catch {
    return 'en-US';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const activeLanguage = languages.find((item) => item.code === language) || languages[0];
    document.documentElement.lang = activeLanguage.code;
    document.documentElement.dataset.language = activeLanguage.code;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage.code);
    } catch {
      // A private browsing setting can block storage; the current-session choice still works.
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    languages,
    activeLanguage: languages.find((item) => item.code === language) || languages[0],
    publicCopy: {
      ...englishCopy,
      ...(publicCopyByLanguage[language] || {}),
      navigation: { ...englishCopy.navigation, ...(publicCopyByLanguage[language]?.navigation || {}), items: { ...englishCopy.navigation.items, ...(publicCopyByLanguage[language]?.navigation?.items || {}) } },
      hero: { ...englishCopy.hero, ...(publicCopyByLanguage[language]?.hero || {}) },
      approach: { ...englishCopy.approach, ...(publicCopyByLanguage[language]?.approach || {}) },
      home: { ...englishCopy.home, ...(publicCopyByLanguage[language]?.home || {}) },
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

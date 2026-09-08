import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'guanyisearch-language';

const englishCopy = {
  navigation: { about: 'About us', takePart: 'Take part', standards: 'Standards', organisations: 'For organisations', signIn: 'Sign in', join: 'Join us', workspace: 'Open workspace' },
  hero: { eyebrow: 'GUANYISEARCH / Insights & services', lines: ['Every voice', 'carries', 'forward.'], description: 'Take part in thoughtful research, share what you see, and help turn lived experience into clearer decisions.' },
};

const publicCopyByLanguage = {
  'en-GB': { navigation: { ...englishCopy.navigation }, hero: { eyebrow: 'GUANYISEARCH / Insights & services', lines: ['Every voice', 'carries us', 'forward.'], description: 'Take part in thoughtful research, share what you see, and help turn lived experience into clearer decisions.' } },
  'zh-CN': { navigation: { about: '关于我们', takePart: '参与研究', standards: '我们的标准', organisations: '面向组织', signIn: '登录', join: '加入我们', workspace: '进入工作区' }, hero: { eyebrow: 'GUANYISEARCH / 洞察与服务', lines: ['每一种声音', '都能让我们', '向前一步。'], description: '参与有温度的研究，分享你的见解，让真实经验带来更清晰的决策。' } },
  'zh-Hant': { navigation: { about: '關於我們', takePart: '參與研究', standards: '我們的標準', organisations: '面向組織', signIn: '登入', join: '加入我們', workspace: '進入工作區' }, hero: { eyebrow: 'GUANYISEARCH / 洞察與服務', lines: ['每一種聲音', '都能讓我們', '向前一步。'], description: '參與有溫度的研究，分享你的見解，讓真實經驗帶來更清晰的決策。' } },
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
    publicCopy: publicCopyByLanguage[language] || englishCopy,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

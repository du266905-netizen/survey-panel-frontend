import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import roomImage from '../assets/careers/room.jpg';
import './Careers.css';

/* Careers — 2026-10-28.

   Owner's copy, Chinese as written; English and Traditional Chinese are a
   straight translation of it. The page runs: the opening passage at the 38
   step, the room photograph with the closing line on it, two policy blocks,
   then the roles section — search box and department filters on the left, the
   roles themselves on the right.

   Departments follow how a full-service research agency is organised: the work
   (research, data, fieldwork), the client side, product, and the commercial and
   support functions. Only four roles exist today; the empty departments stay
   listed with a zero count so new roles drop straight in. */

const careersCopy = {
  'zh-CN': {
    lead: '我们深知，员工是我们最大的财富。',
    rest: '是我们能够不断突破、迈向更美好未来的核心引擎。我们相信，只有让每一位员工在工作中找到成就感与归属感，我们才能共同创造出真正有价值的成果。我们提供的是一个开放、包容、充满活力的舞台，在guanyi，你可以尽情的发展你的才华。我们提供远程和现场办公两种职位，因此您可以选择在家办公，也可以选择在我们不断扩建的办公中心之一工作。',
    joinTitle: '成为我们的一员',
    joinNote: '我们始终如一的贯彻以人为本的理念',
    joinAction: '查看空缺职位',
    policy: [
      {
        title: '致力于提供平等的就业机会',
        paragraphs: [
          '观一（GUANYISEARCH）承诺为所有符合条件的申请人提供平等的就业机会。我们秉持多元化与包容性的理念，在招聘和录用过程中，绝不因种族、肤色、宗教信仰、性别、性取向、性别认同、国籍、年龄、婚育状况、残疾或受适用法律保护的其他任何身份而区别对待。',
          '我们深知，只有包容不同的声音，才能创造真正的价值。如果您在申请或面试过程中因身体残疾需要任何协助或便利，请随时与我们联系。我们将全力提供支持，且绝不会因此对您的申请产生任何不利影响。我们期待在平等、尊重的氛围中，遇见最合适的你。',
        ],
      },
      {
        title: '致求职者：关于在招聘中使用人工智能（AI）的说明',
        paragraphs: [
          '我们深知，人工智能已经成为当下及未来至关重要的核心技能。因此，我们非常欢迎求职者在参与我们的招聘流程时，合理使用 AI 来辅助准备——无论是完善你的简历排版，还是模拟面试演练。',
          '但与此同时，我们更希望：在整个招聘过程中，你所表达的观点、给出的回答以及展现出的核心能力，都真正源于你自身的思考。我们极其看重真诚的交流与碰撞，并满怀期待地想要看到那个真实、闪耀的你。',
          '在观一（GUANYISEARCH），AI 的定位永远是“辅助”，它旨在赋能我们，让招聘流程更高效，但绝不会取代招聘流程中最核心、最宝贵的人际互动与灵魂共鸣。',
        ],
      },
    ],
    roles: {
      title: '在招职位',
      searchPlaceholder: '搜索职位',
      all: '全部',
      empty: '暂无空缺职位。',
      categories: [
        ['research', '研究'],
        ['client', '客户服务'],
        ['data', '数据与统计'],
        ['ops', '运营与执行'],
        ['product', '产品与技术'],
        ['marketing', '市场与传播'],
        ['growth', '业务拓展'],
        ['people', '人才与财务'],
      ],
      items: [
        { name: '研究员', category: 'research' },
        { name: '客户经理', category: 'client' },
        { name: '市场营销经理', category: 'marketing' },
        { name: '业务拓展经理', category: 'growth' },
      ],
    },
  },
  'zh-Hant': {
    lead: '我們深知，員工是我們最大的財富。',
    rest: '是我們能夠不斷突破、邁向更美好未來的核心引擎。我們相信，只有讓每一位員工在工作中找到成就感與歸屬感，我們才能共同創造出真正有價值的成果。我們提供的是一個開放、包容、充滿活力的舞台，在guanyi，你可以盡情的發展你的才華。我們提供遠端與現場辦公兩種職位，因此您可以選擇在家辦公，也可以選擇在我們不斷擴建的辦公中心之一工作。',
    joinTitle: '成為我們的一員',
    joinNote: '我們始終如一的貫徹以人為本的理念',
    joinAction: '查看空缺職位',
    policy: [
      {
        title: '致力於提供平等的就業機會',
        paragraphs: [
          '觀一（GUANYISEARCH）承諾為所有符合條件的申請人提供平等的就業機會。我們秉持多元化與包容性的理念，在招聘和錄用過程中，絕不因種族、膚色、宗教信仰、性別、性取向、性別認同、國籍、年齡、婚育狀況、殘疾或受適用法保護的其他任何身分而區別對待。',
          '我們深知，只有包容不同的聲音，才能創造真正的價值。如果您在申請或面試過程中因身體殘疾需要任何協助或便利，請隨時與我們聯繫。我們將全力提供支持，且絕不會因此對您的申請產生任何不利影響。我們期待在平等、尊重的氛圍中，遇見最合適的你。',
        ],
      },
      {
        title: '致求職者：關於在招聘中使用人工智慧（AI）的說明',
        paragraphs: [
          '我們深知，人工智慧已經成為當下及未來至關重要的核心技能。因此，我們非常歡迎求職者在參與我們的招聘流程時，合理使用 AI 來輔助準備——無論是完善你的履歷排版，還是模擬面試演練。',
          '但與此同時，我們更希望：在整個招聘過程中，你所表達的觀點、給出的回答以及展現出的核心能力，都真正源於你自身的思考。我們極其看重真誠的交流與碰撞，並滿懷期待地想要看到那個真實、閃耀的你。',
          '在觀一（GUANYISEARCH），AI 的定位永遠是「輔助」，它旨在賦能我們，讓招聘流程更高效，但絕不會取代招聘流程中最核心、最寶貴的人際互動與靈魂共鳴。',
        ],
      },
    ],
    roles: {
      title: '在招職位',
      searchPlaceholder: '搜尋職位',
      all: '全部',
      empty: '暫無空缺職位。',
      categories: [
        ['research', '研究'],
        ['client', '客戶服務'],
        ['data', '數據與統計'],
        ['ops', '營運與執行'],
        ['product', '產品與技術'],
        ['marketing', '市場與傳播'],
        ['growth', '業務拓展'],
        ['people', '人才與財務'],
      ],
      items: [
        { name: '研究員', category: 'research' },
        { name: '客戶經理', category: 'client' },
        { name: '市場行銷經理', category: 'marketing' },
        { name: '業務拓展經理', category: 'growth' },
      ],
    },
  },
  'en-US': {
    lead: 'We know that people are our greatest asset.',
    rest: 'They are the engine behind every step forward we take. We believe good work comes from people who find a sense of achievement and belonging in what they do. That is what makes results worth having. What we offer is an open, inclusive and energetic stage. At Guanyi, you can develop your craft fully. Roles are either remote or on site, so you can work from home or from one of our growing offices.',
    joinTitle: 'Be one of us',
    joinNote: 'We have always held to a people-first principle.',
    joinAction: 'View open roles',
    policy: [
      {
        title: 'Equal opportunity',
        paragraphs: [
          'GuanyiSearch is committed to equal opportunity for every applicant who meets the requirements of the role. We work on the principle of diversity and inclusion: in recruitment and hiring we do not discriminate on grounds of race, colour, religion, sex, sexual orientation, gender identity, national origin, age, marital or parental status, disability, or any other status protected by applicable law.',
          'We know that real value only comes from including voices that differ. If a disability means you need help or an adjustment during the application or the interview, tell us at any time. We will do what we can, and it will have no bearing on how your application is assessed. We look forward to meeting the right person, on equal terms and with respect.',
        ],
      },
      {
        title: 'A note for applicants: using AI in our hiring process',
        paragraphs: [
          'Artificial intelligence is already a core skill, now and for the years ahead, so we welcome applicants who use AI sensibly while preparing — whether to tidy the layout of a CV or to rehearse an interview.',
          'What we ask in return is this: the views you express, the answers you give and the abilities you show during the process should come from your own thinking. We care about that exchange, and we want to meet the person behind it.',
          'At GuanyiSearch, AI is always an aid. It can make the process faster; it does not replace the human contact that sits at the centre of hiring.',
        ],
      },
    ],
    roles: {
      title: 'Open roles',
      searchPlaceholder: 'Search roles',
      all: 'All',
      empty: 'No openings at the moment.',
      categories: [
        ['research', 'Research'],
        ['client', 'Client service'],
        ['data', 'Data & statistics'],
        ['ops', 'Operations & fieldwork'],
        ['product', 'Product & technology'],
        ['marketing', 'Marketing & communications'],
        ['growth', 'Business development'],
        ['people', 'People & finance'],
      ],
      items: [
        { name: 'Researcher', category: 'research' },
        { name: 'Account Manager', category: 'client' },
        { name: 'Marketing Manager', category: 'marketing' },
        { name: 'Business Development Manager', category: 'growth' },
      ],
    },
  },
  'en-GB': {
    lead: 'We know that people are our greatest asset.',
    rest: 'They are the engine behind every step forward we take. We believe good work comes from people who find a sense of achievement and belonging in what they do. That is what makes results worth having. What we offer is an open, inclusive and energetic stage. At Guanyi, you can develop your craft fully. Roles are either remote or on site, so you can work from home or from one of our growing offices.',
    joinTitle: 'Be one of us',
    joinNote: 'We have always held to a people-first principle.',
    joinAction: 'View open roles',
    policy: [
      {
        title: 'Equal opportunity',
        paragraphs: [
          'GuanyiSearch is committed to equal opportunity for every applicant who meets the requirements of the role. We work on the principle of diversity and inclusion: in recruitment and hiring we do not discriminate on grounds of race, colour, religion, sex, sexual orientation, gender identity, national origin, age, marital or parental status, disability, or any other status protected by applicable law.',
          'We know that real value only comes from including voices that differ. If a disability means you need help or an adjustment during the application or the interview, tell us at any time. We will do what we can, and it will have no bearing on how your application is assessed. We look forward to meeting the right person, on equal terms and with respect.',
        ],
      },
      {
        title: 'A note for applicants: using AI in our hiring process',
        paragraphs: [
          'Artificial intelligence is already a core skill, now and for the years ahead, so we welcome applicants who use AI sensibly while preparing — whether to tidy the layout of a CV or to rehearse an interview.',
          'What we ask in return is this: the views you express, the answers you give and the abilities you show during the process should come from your own thinking. We care about that exchange, and we want to meet the person behind it.',
          'At GuanyiSearch, AI is always an aid. It can make the process faster; it does not replace the human contact that sits at the centre of hiring.',
        ],
      },
    ],
    roles: {
      title: 'Open roles',
      searchPlaceholder: 'Search roles',
      all: 'All',
      empty: 'No openings at the moment.',
      categories: [
        ['research', 'Research'],
        ['client', 'Client service'],
        ['data', 'Data & statistics'],
        ['ops', 'Operations & fieldwork'],
        ['product', 'Product & technology'],
        ['marketing', 'Marketing & communications'],
        ['growth', 'Business development'],
        ['people', 'People & finance'],
      ],
      items: [
        { name: 'Researcher', category: 'research' },
        { name: 'Account Manager', category: 'client' },
        { name: 'Marketing Manager', category: 'marketing' },
        { name: 'Business Development Manager', category: 'growth' },
      ],
    },
  },
};

export default function Careers() {
  const { language } = useLanguage();
  const t = careersCopy[language] || careersCopy['en-US'];
  usePageTitle('Careers');

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const roles = t.roles.items;
  const categories = t.roles.categories;

  const counts = useMemo(() => {
    const map = { all: roles.length };
    categories.forEach(([id]) => { map[id] = roles.filter((role) => role.category === id).length; });
    return map;
  }, [roles, categories]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return roles.filter((role) => (
      (category === 'all' || role.category === category)
      && (!needle || role.name.toLowerCase().includes(needle))
    ));
  }, [roles, query, category]);

  return (
    <main className="careers-page">
      <PublicSiteHeader />

      <section className="careers-intro">
        <div className="careers-container">
          <p className="careers-body"><span className="careers-lead">{t.lead}</span>{t.rest}</p>
        </div>
      </section>

      <section className="careers-room">
        <img src={roomImage} alt="" decoding="async" />
        <div className="careers-room-copy">
          <h2 className="careers-join-title">{t.joinTitle}</h2>
          <p className="careers-join-note">{t.joinNote}</p>
          <a className="careers-join-action" href="#openings">{t.joinAction}</a>
        </div>
      </section>

      <section className="careers-policy">
        <div className="careers-container">
          {t.policy.map((block) => (
            <article key={block.title}>
              <h2>{block.title}</h2>
              {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="careers-roles" id="openings">
        <div className="careers-container">
          <h2 className="careers-roles-title">{t.roles.title}</h2>
          <div className="careers-roles-layout">
          <aside className="careers-rail">
            <label className="careers-search">
              <Search size={17} strokeWidth={1.7} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.roles.searchPlaceholder}
                aria-label={t.roles.searchPlaceholder}
              />
            </label>
            <ul className="careers-filters">
              <li>
                <button type="button" className={category === 'all' ? 'is-active' : ''} onClick={() => setCategory('all')}>
                  {t.roles.all}<span>{counts.all}</span>
                </button>
              </li>
              {categories.map(([id, label]) => (
                <li key={id}>
                  <button type="button" className={category === id ? 'is-active' : ''} onClick={() => setCategory(id)}>
                    {label}<span>{counts[id]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="careers-roles-main">
            {visible.length ? (
              <ol className="careers-role-list">
                {visible.map((role, index) => (
                  <li key={role.name}>
                    <span className="careers-role-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="careers-role-name">{role.name}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="careers-roles-empty">{t.roles.empty}</p>
            )}
          </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </main>
  );
}

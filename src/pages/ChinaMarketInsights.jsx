import { ClipboardPenLine, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import beijingSkyline from '../assets/china-market/beijing-skyline.jpg';
import qingmingContext from '../assets/china-market/qingming-context.jpg';
import './ChinaMarketInsights.css';

/* 这页 2026-10-26 拆成三语：英 / 简 / 繁。其余语言回落英文。
   中文按业主的规矩写：陈述句，只写做什么、交付什么，不用对仗和金句。 */
const chinaCopy = {
  'en-US': {
    hero: {
      kicker: 'SOLUTIONS',
      title: 'China market research capability',
      lede: 'A strong respondent community and a mature insight network that reach people across China, and turn the evidence into a next step.',
      walk: 'Research starts from a decision: what has to be answered, which people are asked, which cities, and by when. Method and local network are set against that decision; sample and quality control sit in the same plan. Once fieldwork starts, preliminary data is available within 48 hours. What comes back is a China judgement the team can use directly.',
    },
    capability: {
      kicker: 'EXECUTION CAPABILITY',
      title: 'Built for China’s scale, detail and pace.',
      lede: 'Three things decide whether a China study holds: where the sample comes from, how it is screened, and who reads the answer.',
      items: [
        {
          title: 'Tier 1 to Tier 4 reach',
          body: 'Plan research across China’s major centres and lower-tier markets, with local context built into multi-city and continuous fieldwork.',
        },
        {
          title: 'Mature network, specific audiences',
          body: 'Reach a high-quality respondent community and recruit for defined segments—from new mothers and senior internet users to business leaders and niche communities.',
        },
        {
          title: 'Real data, manual quality control',
          body: 'Every project is reviewed from source to delivery. We reject bot data and use hands-on local quality checks to protect the reliability of the evidence.',
        },
      ],
    },
    scroll: {
      kicker: 'THE SCROLL',
      title: 'Ask the woodcutter',
      body: 'From the Book of Songs: “The ancients said: even the woodcutter has something worth asking.” We take it literally: the boatmen, porters and stallholders in this scroll are the people we ask.',
      alt: 'Detail of the scroll: boats on the river and a market street with porters and stalls',
      caption: 'Along the River During the Qingming Festival (detail) · Zhang Zeduan, Northern Song',
      note: 'Consumer expectations, language, media, retail, technology and daily life shift between cities, regions and communities. The report answers two things: why the answers differ, and what to do next.',
      action: 'Contact us',
    },
    cta: {
      kicker: 'REAL PEOPLE · REAL INSIGHT',
      title: 'Bring the China market question your team is weighing.',
      body: 'Share the decision, the people and the market context involved. We will build the research around that decision and help turn the result into a practical recommendation.',
      action: 'Commission a study',
    },
  },

  'zh-CN': {
    hero: {
      kicker: '解决方案',
      title: '中国市场调研能力',
      lede: '优质的社群和成熟的洞察网络，帮助团队触达中国的各类人群，并把证据变成下一步动作。',
      walk: '研究从一个决定开始：先确认要回答什么、问哪群人、在哪些城市、什么时候要。方法和本地网络按这个决定来配，样本和质检在同一份方案里定。执行开始后，初步数据最快 48 小时能看到；结束交回来的是一份团队能直接拿去用的中国市场判断。',
    },
    capability: {
      kicker: '执行能力',
      title: '按中国的规模、细节和节奏搭建。',
      lede: '一项中国研究站不站得住，看三件事：样本从哪来、怎么筛、谁在读答案。',
      items: [
        {
          title: '一线到四线都能落地',
          body: '覆盖中国主要城市与下沉市场，把本地语境放进多城市和连续性执行里。',
        },
        {
          title: '网络成熟，能做窄人群',
          body: '触达高质量的样本社区，按条件招募：新手妈妈、银发网民、企业决策者、小众社群。',
        },
        {
          title: '数据真实，人工质检',
          body: '每个项目从源头查到交付。剔除机器作答，用本地人工核查保证证据可靠。',
        },
      ],
    },
    scroll: {
      kicker: '画卷',
      title: '询于刍荛',
      body: '《诗经》说：“先民有言，询于刍荛。”连砍柴的人也有值得请教的看法。我们照字面做：画里这些船工、脚夫、摊贩，就是我们真的会去问的人。',
      alt: '清明上河图局部：河上的船与岸边的集市，有脚夫和摊位',
      caption: '清明上河图（局部）· 张择端 · 北宋',
      note: '消费者的期待、语言、媒介、零售、技术和日常，在城市、地区和社群之间不一样。报告回答两件事：为什么不同，下一步做什么。',
      action: '联系我们',
    },
    cta: {
      kicker: '真实的人 · 真实的判断',
      title: '把团队正在权衡的中国问题带来。',
      body: '说说要做的决定、涉及的人和市场背景。我们围着这个决定搭研究，再把结果整理成可执行的建议。',
      action: '委托一项研究',
    },
  },

  'zh-Hant': {
    hero: {
      kicker: '解決方案',
      title: '中國市場調研能力',
      lede: '優質的社群和成熟的洞察網絡，幫助團隊觸達中國的各類人群，並把證據變成下一步動作。',
      walk: '研究從一個決定開始：先確認要回答什麼、問哪群人、在哪些城市、什麼時候要。方法和本地網絡按這個決定來配，樣本和質檢在同一份方案裡定。執行開始後，初步數據最快 48 小時能看到；結束交回來的是一份團隊能直接拿去用的中國市場判斷。',
    },
    capability: {
      kicker: '執行能力',
      title: '按中國的規模、細節和節奏搭建。',
      lede: '一項中國研究站不站得住，看三件事：樣本從哪來、怎麼篩、誰在讀答案。',
      items: [
        {
          title: '一線到四線都能落地',
          body: '覆蓋中國主要城市與下沉市場，把本地語境放進多城市和連續性執行裡。',
        },
        {
          title: '網絡成熟，能做窄人群',
          body: '觸達高質量的樣本社群，按條件招募：新手媽媽、銀髮網民、企業決策者、小眾社群。',
        },
        {
          title: '數據真實，人工質檢',
          body: '每個專案從源頭查到交付。剔除機器作答，用本地人工核查保證證據可靠。',
        },
      ],
    },
    scroll: {
      kicker: '畫卷',
      title: '詢於芻蕘',
      body: '《詩經》說：「先民有言，詢於芻蕘。」連砍柴的人也有值得請教的看法。我們照字面做：畫裡這些船工、腳夫、攤販，就是我們真的會去問的人。',
      alt: '清明上河圖局部：河上的船與岸邊的集市，有腳夫和攤位',
      caption: '清明上河圖（局部）· 張擇端 · 北宋',
      note: '消費者的期待、語言、媒介、零售、技術和日常，在城市、地區和社群之間不一樣。報告回答兩件事：為什麼不同，下一步做什麼。',
      action: '聯繫我們',
    },
    cta: {
      kicker: '真實的人 · 真實的判斷',
      title: '把團隊正在權衡的中國問題帶來。',
      body: '說說要做的決定、涉及的人和市場背景。我們圍著這個決定搭研究，再把結果整理成可執行的建議。',
      action: '委託一項研究',
    },
  },
};

const capabilityIcons = [ClipboardPenLine, MapPinned, ShieldCheck];

export default function ChinaMarketInsights() {
  const { language } = useLanguage();
  const t = chinaCopy[language] || chinaCopy['en-US'];

  return (
    <main className="china-market-page has-cta">
      <PublicSiteHeader />
      <section className="china-market-hero">
        <img src={beijingSkyline} alt="" decoding="async" />
        <div className="china-market-hero-copy">
          <p className="china-market-kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.lede}</p>
        </div>
      </section>

      <section className="china-market-walk">
        <div className="china-market-container">
          <p className="china-market-walk-body">{t.hero.walk}</p>
        </div>
      </section>

      <section className="china-market-capabilities">
        <div className="china-market-container">
          <div className="china-market-capability-grid">
            {t.capability.items.map(({ title, body }, index) => {
              const Icon = capabilityIcons[index];
              return (
                <article key={title}>
                  <Icon size={23} strokeWidth={1.65} />
                  <h3><span>{String(index + 1).padStart(2, '0')}</span>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="china-market-context" aria-labelledby="china-market-statement-title">
        <div className="china-market-container china-market-context-grid">
          <div className="china-market-context-copy">
            <h2 id="china-market-statement-title">{t.scroll.title}</h2>
            <p className="china-market-context-body">{t.scroll.body}</p>
            <p className="china-market-context-body">{t.scroll.note}</p>
            <Link className="china-market-button china-market-context-action" to={withLanguage('/business/access', language)}>{t.scroll.action}</Link>
          </div>
          <figure className="china-market-context-art">
            <img src={qingmingContext} alt={t.scroll.alt} loading="lazy" decoding="async" />
            <figcaption>{t.scroll.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="china-market-cta">
        <div className="china-market-container">
          <div>
            <h2>{t.cta.title}</h2>
            <p>{t.cta.body}</p>
          </div>
          <Link className="china-market-button china-market-button--light" to={withLanguage('/business/access', language)}>{t.cta.action}</Link>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}

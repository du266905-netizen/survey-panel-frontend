import { ArrowRight, BadgeCheck, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';

const howCopy = {
  'en-US': {
    heroKicker: 'GuanyiSearch / How it works', heroTitle: 'From a verified account to a clear reward record.', heroBody: 'A considered path for account creation, profile completion, research participation, and visible records—built without exposing internal provider operations to members.',
    platformKicker: 'One operating foundation', platformTitle: 'Thoughtful systems start with clear human context.', platformBody: 'Panelists get a focused journey for registration, profile completion, surveys, records, and wallet activity. Operations teams get the context they need to diagnose delivery without exposing internal provider details to members.',
    photos: [['Research operations', 'Understand the people and signals behind every program.', 'Research team collaborating around a planning board'], ['Panelist reality', 'Designed around people, not faceless traffic.', 'Person using a smartphone beside a tablet'], ['Global perspective', 'Research begins with different lives, places, and points of view.', 'People walking through a city intersection']],
    standardsKicker: 'Research standards', standardsTitle: 'Research works better when people know where they stand.', standardsBody: 'The experience is built around clear eligibility, respectful privacy, and visible records—so every person can take part with confidence.',
    standards: [['Clear eligibility', 'A transparent start helps people understand how participation begins and what comes next.', BadgeCheck], ['Respectful privacy', 'Information is collected only when it has a clear purpose in the research experience.', ShieldCheck], ['Visible records', 'Participation, rewards, and account progress stay easy to understand at every step.', UserRoundCheck]],
    panelKicker: 'For panelists', panelTitle: 'A simple journey with a visible record of value.', panelBody: 'There is no need to navigate a maze of disconnected tools. Your account, verification, profile, participation history, and rewards all begin in one place.',
    steps: [['01', 'Create your account', 'Use Google or your email, then verify the account and accept the platform terms.'], ['02', 'Complete your profile', 'Tell us the basics so available research can be matched more thoughtfully.'], ['03', 'Track your rewards', 'Keep wallet activity, records, and redemption requests in one place.']],
    rewardKicker: 'Reward infrastructure', rewardTitle: 'Your wallet should be understandable at a glance.', rewardBody: 'Follow coins, transactions, and redemption requests in a single place as the reward system expands.', rewardAction: 'Create your account', rewardAlt: 'Rewards and digital participation',
  },
  'zh-CN': {
    heroKicker: 'GUANYISEARCH / 参与方式', heroTitle: '从完成验证，到看得懂的奖励记录。', heroBody: '从注册、完善资料、参与研究到查看记录，每一步都清晰可见，同时不会向成员暴露内部服务方的运作细节。',
    platformKicker: '一个清晰的参与基础', platformTitle: '好的系统，始于理解真实的人。', platformBody: '参与者可以专注于注册、完善资料、问卷、记录和钱包活动。运营团队拥有所需的交付信息，而不会向成员暴露内部服务方的细节。',
    photos: [['研究运营', '理解每个项目背后的人与信号。', '研究团队围绕规划板协作'], ['参与者真实体验', '为真实的人设计，而非没有面孔的流量。', '一位使用手机和电脑的人'], ['不同视角', '研究始于不同的生活、地点和观点。', '人们穿过城市路口']],
    standardsKicker: '研究标准', standardsTitle: '当人们清楚自己的位置，研究才会更好。', standardsBody: '体验围绕清晰的资格条件、受到尊重的隐私和可见的记录构建，让每个人都能安心参与。',
    standards: [['清晰的资格条件', '透明的开始帮助人们了解如何参与，以及下一步是什么。', BadgeCheck], ['被尊重的隐私', '只有在研究体验中具有明确目的时，我们才收集信息。', ShieldCheck], ['可见的记录', '参与、奖励和账户进度在每一步都应易于理解。', UserRoundCheck]],
    panelKicker: '面向参与者', panelTitle: '简单的旅程，清晰的价值记录。', panelBody: '无需在彼此割裂的工具中反复寻找。账户、验证、资料、参与历史和奖励都从同一个地方开始。',
    steps: [['01', '创建账户', '使用 Google 或邮箱注册，然后完成验证并同意平台条款。'], ['02', '完善个人资料', '告诉我们一些基本信息，让可参与的研究可以更周到地匹配。'], ['03', '查看奖励记录', '将钱包活动、记录和兑换申请集中在一个地方。']],
    rewardKicker: '奖励体系', rewardTitle: '你的钱包，应该一眼就能看懂。', rewardBody: '随着奖励体系不断扩展，你可以在同一处查看 Coins、交易和兑换申请。', rewardAction: '创建账户', rewardAlt: '奖励与数字化参与',
  },
  'zh-Hant': {
    heroKicker: 'GUANYISEARCH / 參與方式', heroTitle: '從完成驗證，到看得懂的獎勵紀錄。', heroBody: '從註冊、完善資料、參與研究到查看紀錄，每一步都清晰可見，同時不會向成員揭露內部服務方的運作細節。',
    platformKicker: '一個清晰的參與基礎', platformTitle: '好的系統，始於理解真實的人。', platformBody: '參與者可以專注於註冊、完善資料、問卷、紀錄和錢包活動。營運團隊擁有所需的交付資訊，而不會向成員揭露內部服務方的細節。',
    photos: [['研究營運', '理解每個專案背後的人與訊號。', '研究團隊圍繞規劃板協作'], ['參與者真實體驗', '為真實的人設計，而非沒有面孔的流量。', '一位使用手機和電腦的人'], ['不同視角', '研究始於不同的生活、地點和觀點。', '人們穿過城市路口']],
    standardsKicker: '研究標準', standardsTitle: '當人們清楚自己的位置，研究才會更好。', standardsBody: '體驗圍繞清晰的資格條件、受到尊重的隱私和可見的紀錄建構，讓每個人都能安心參與。',
    standards: [['清晰的資格條件', '透明的開始幫助人們了解如何參與，以及下一步是什麼。', BadgeCheck], ['被尊重的隱私', '只有在研究體驗中具有明確目的時，我們才收集資料。', ShieldCheck], ['可見的紀錄', '參與、獎勵和帳戶進度在每一步都應易於理解。', UserRoundCheck]],
    panelKicker: '面向參與者', panelTitle: '簡單的旅程，清晰的價值紀錄。', panelBody: '無須在彼此割裂的工具中反覆尋找。帳戶、驗證、資料、參與歷程和獎勵都從同一個地方開始。',
    steps: [['01', '建立帳戶', '使用 Google 或電郵註冊，然後完成驗證並同意平台條款。'], ['02', '完善個人資料', '告訴我們一些基本資料，讓可參與的研究可以更周到地配對。'], ['03', '查看獎勵紀錄', '將錢包活動、紀錄和兌換申請集中在一個地方。']],
    rewardKicker: '獎勵體系', rewardTitle: '你的錢包，應該一眼就能看懂。', rewardBody: '隨著獎勵體系不斷擴展，你可以在同一處查看 Coins、交易和兌換申請。', rewardAction: '建立帳戶', rewardAlt: '獎勵與數位化參與',
  },
};

function howFallbackCopy(home) {
  const footer = home.footer;
  return {
    heroKicker: `GUANYISEARCH / ${footer.how}`,
    heroTitle: home.globalTitle,
    heroBody: home.globalBody,
    platformKicker: footer.approach,
    platformTitle: home.evidenceStatement,
    platformBody: home.evidence,
    photos: [[footer.organisations, home.nodes.business[1], home.nodes.business[1]], [footer.participate, home.nodes.survey[1], home.nodes.survey[1]], [footer.explore, home.nodes.news[1], home.nodes.news[1]]],
    standardsKicker: footer.standards,
    standardsTitle: home.globalTitle,
    standardsBody: home.evidence,
    standards: [[footer.privacy, home.evidenceStatement, BadgeCheck], [footer.terms, home.globalBody, ShieldCheck], [footer.wallet, home.rewardsBody, UserRoundCheck]],
    panelKicker: footer.participate,
    panelTitle: home.rewardsTitle,
    panelBody: home.rewardsBody,
    steps: [['01', footer.surveys, home.nodes.survey[1]], ['02', footer.invite, home.nodes.community[1]], ['03', footer.wallet, home.rewardsBody]],
    rewardKicker: footer.wallet,
    rewardTitle: home.rewardsTitle,
    rewardBody: home.rewardsBody,
    rewardAction: footer.surveys,
    rewardAlt: home.rewardsTitle,
  };
}

export default function HowItWorks() {
  const { language, publicCopy } = useLanguage();
  const copy = howCopy[language] || howFallbackCopy(publicCopy.home);
  return (
    <main className="how-page">
      <style>{`
        .how-page { min-width: 320px; background: #171716; color: #efede7; font-family: var(--font-sans); }
        .how-shell { overflow: hidden; background: radial-gradient(circle at 78% 8%, rgba(255,255,255,.035), transparent 24%), linear-gradient(180deg, #1a1a19 0%, #151514 72%, #121211 100%); }
        .how-container { width: min(100% - 48px, 1240px); margin: 0 auto; }
        .how-nav { display: flex; align-items: center; justify-content: space-between; gap: 26px; border-bottom: 1px solid rgba(244,241,232,.13); padding: 26px 0; }
        .how-nav-brand { display: inline-flex; }
        .how-nav-links { display: flex; align-items: center; justify-content: flex-end; gap: 22px; }
        .how-nav-links a { color: rgba(239,237,231,.62); font-size: 13px; font-weight: 780; text-decoration: none; }
        .how-nav-links a:hover, .how-nav-links a.is-active { color: #fff; }
        .how-nav-links .how-nav-cta { border: 1px solid rgba(244,241,232,.23); border-radius: 999px; color: #fff; padding: 9px 14px; }
        .how-hero { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(280px,.65fr); gap: clamp(38px, 9vw, 130px); align-items: end; min-height: 510px; padding: clamp(70px, 9vw, 132px) 0 clamp(76px, 8vw, 110px); }
        .how-kicker { margin: 0; color: #beb5a5; font-size: 11px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .how-hero h1 { max-width: 760px; margin: 17px 0 0; color: var(--color-paper); font-family: var(--font-display); font-optical-sizing: auto; font-size: clamp(53px, 6.4vw, 92px); font-weight: 600; letter-spacing: -.06em; line-height: .94; }
        .how-hero > p { max-width: 420px; margin: 0 0 5px; color: rgba(236,233,226,.66); font-size: 17px; line-height: 1.86; }
        .how-platform { border-top: 1px solid rgba(244,241,232,.15); background: #181817; padding: clamp(72px, 8vw, 120px) 0; }
        .how-platform-head { display: grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr); gap: clamp(42px, 9vw, 138px); align-items: start; }
        .how-platform-head h2, .how-panelist-head h2 { max-width: 620px; margin: 15px 0 0; color: var(--color-paper); font-family: var(--font-display); font-optical-sizing: auto; font-size: clamp(38px, 4.7vw, 67px); font-weight: 600; letter-spacing: -.048em; line-height: 1.0; }
        .how-platform-head > p, .how-panelist-head > p { max-width: 545px; margin: 8px 0 0; color: rgba(236,233,226,.66); font-size: 16px; line-height: 1.87; }
        .how-photo-grid { display: grid; grid-template-columns: 1.08fr .92fr; gap: 16px; margin-top: clamp(46px, 6vw, 82px); }
        .how-photo { position: relative; min-height: 350px; overflow: hidden; border-radius: 22px; background: #222220; }
        .how-photo.is-wide { grid-column: 1 / -1; min-height: 380px; }
        .how-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .how-photo:hover img { transform: scale(1.035); }
        .how-photo:after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 42%, rgba(18,18,17,.86) 100%); content: ''; }
        .how-photo-caption { position: absolute; z-index: 1; right: 22px; bottom: 22px; left: 22px; }
        .how-photo-caption p { margin: 0; color: #cfc3a5; font-size: 10px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        .how-photo-caption strong { display: block; max-width: 580px; margin-top: 7px; color: #fff; font-size: clamp(18px, 2vw, 25px); line-height: 1.2; }
        .how-standards { background: #1d1d1c; border-top: 1px solid rgba(244,241,232,.12); border-bottom: 1px solid rgba(244,241,232,.12); padding: clamp(76px, 8vw, 124px) 0; }
        .how-standards-grid { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.2fr); gap: clamp(42px, 9vw, 130px); }
        .how-standards-copy h2 { max-width: 515px; margin: 14px 0 0; color: var(--color-paper); font-family: var(--font-display); font-optical-sizing: auto; font-size: clamp(37px, 4.3vw, 61px); font-weight: 600; letter-spacing: -.045em; line-height: 1.03; }
        .how-standards-copy > p { max-width: 465px; color: rgba(236,233,226,.66); font-size: 16px; line-height: 1.85; }
        .how-standard-list { display: grid; border-top: 1px solid rgba(244,241,232,.2); }
        .how-standard { display: grid; grid-template-columns: 48px 1fr; gap: 18px; border-bottom: 1px solid rgba(244,241,232,.2); padding: 25px 0; }
        .how-standard-icon { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(244,241,232,.24); border-radius: 50%; color: #efede7; }
        .how-standard h3 { margin: 1px 0 0; color: #fff; font-size: 18px; }
        .how-standard p { max-width: 500px; margin: 8px 0 0; color: rgba(236,233,226,.63); font-size: 14px; line-height: 1.72; }
        .how-panelists { background: #171716; padding: clamp(76px, 9vw, 132px) 0; }
        .how-panelist-head { max-width: 680px; }
        .how-panelist-head > p { margin-top: 18px; }
        .how-steps { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin-top: 54px; }
        .how-step { min-height: 220px; border: 1px solid rgba(244,241,232,.14); border-radius: 19px; background: linear-gradient(145deg, #232321, #1c1c1b); padding: 25px; }
        .how-step > span { color: #beb5a5; font-size: 12px; font-weight: 900; letter-spacing: .12em; }
        .how-step h3 { margin: 49px 0 0; color: #fff; font-size: 19px; }
        .how-step p { margin: 10px 0 0; color: rgba(236,233,226,.63); font-size: 14px; line-height: 1.72; }
        .how-reward { position: relative; min-height: 405px; overflow: hidden; border-radius: 24px; background: #1d1d1c; margin-top: 70px; }
        .how-reward img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .52; }
        .how-reward:after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(20,20,19,.94), rgba(20,20,19,.3)); content: ''; }
        .how-reward-copy { position: relative; z-index: 1; max-width: 560px; padding: clamp(38px, 6vw, 78px); }
        .how-reward-copy h2 { margin: 14px 0 0; color: #fff; font-family: var(--font-display); font-optical-sizing: auto; font-size: clamp(35px, 4.3vw, 58px); font-weight: 600; letter-spacing: -.045em; line-height: 1.02; }
        .how-reward-copy > p { color: rgba(238,235,228,.69); font-size: 16px; line-height: 1.82; }
        .how-reward-copy a { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(244,241,232,.22); border-radius: 999px; background: #f3efe4; color: #111; font-size: 14px; font-weight: 850; text-decoration: none; padding: 13px 18px; }
        .how-footer { border-top: 1px solid rgba(244,241,232,.12); padding: 30px 0; }
        .how-footer-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .how-footer-row p { margin: 0; color: rgba(235,232,225,.48); font-size: 12px; }
        .how-footer-row a { color: rgba(238,235,228,.64); font-size: 12px; font-weight: 800; text-decoration: none; }
        @media (max-width: 760px) { .how-container { width: min(100% - 40px, 1240px); } .how-nav { align-items: flex-start; flex-direction: column; gap: 18px; } .how-nav-links { width: 100%; justify-content: flex-start; gap: 15px; } .how-nav-links a { font-size: 12px; } .how-nav-links .how-nav-cta { margin-left: auto; } .how-hero, .how-platform-head, .how-standards-grid { grid-template-columns: 1fr; gap: 28px; } .how-hero { min-height: 0; padding: 76px 0; } .how-hero h1 { font-size: clamp(48px, 14vw, 68px); } .how-hero > p { margin: 0; font-size: 15px; } .how-photo-grid { grid-template-columns: 1fr; } .how-photo, .how-photo.is-wide { grid-column: auto; min-height: 320px; } .how-steps { grid-template-columns: 1fr; gap: 12px; margin-top: 38px; } .how-step { min-height: 0; } .how-step h3 { margin-top: 26px; } .how-reward { min-height: 490px; margin-top: 46px; } .how-reward-copy { padding: 44px 28px; } .how-footer-row { align-items: flex-start; flex-direction: column; } }
      `}</style>
      <style>{`
        .how-page { background: #f7f7f3; color: #17251f; }
        .how-shell { background: radial-gradient(circle at 78% 8%, rgba(170,184,156,.13), transparent 24%), repeating-linear-gradient(0deg, transparent 0 7px, rgba(40,67,54,.012) 8px 9px), #f7f7f3; }
        .how-kicker { color: #52705f; }
        .how-hero h1, .how-platform-head h2, .how-panelist-head h2, .how-standards-copy h2 { color: #17251f; }
        .how-hero > p, .how-platform-head > p, .how-panelist-head > p, .how-standards-copy > p, .how-standard p, .how-step p { color: #59675f; }
        .how-platform { border-color: rgba(36,56,46,.16); background: #fbfbf8; }
        .how-photo { background: #e4e8df; }
        .how-standards { border-color: rgba(36,56,46,.16); background: #f0f3ee; }
        .how-standard-list, .how-standard { border-color: rgba(36,56,46,.2); }
        .how-standard-icon { border-color: rgba(40,86,71,.28); color: #285647; }
        .how-standard h3 { color: #17251f; }
        .how-panelists { background: #fbfbf8; }
        .how-step { border-color: rgba(36,56,46,.16); background: #fffefd; }
        .how-step > span { color: #557662; }
        .how-step h3 { color: #17251f; }
        .how-reward { background: #dfe8dc; }
        .how-reward:after { background: linear-gradient(90deg, rgba(23,37,31,.9), rgba(23,37,31,.28)); }
        .how-reward-copy h2 { color: #f7f7f3; }
        .how-reward-copy > p { color: rgba(247,247,243,.82); }
        .how-reward-copy a { border-color: #f7f7f3; background: #f7f7f3; color: #17251f; }
      `}</style>

      <section className="how-shell">
        <section className="how-container how-hero">
          <div><p className="how-kicker">{copy.heroKicker}</p><h1>{copy.heroTitle}</h1></div>
          <p>{copy.heroBody}</p>
        </section>
      </section>

      <section className="how-platform">
        <div className="how-container">
          <div className="how-platform-head"><div><p className="how-kicker">{copy.platformKicker}</p><h2>{copy.platformTitle}</h2></div><p>{copy.platformBody}</p></div>
          <div className="how-photo-grid">
            <article className="how-photo"><img src="/research-operations.jpg" alt={copy.photos[0][2]} /><div className="how-photo-caption"><p>{copy.photos[0][0]}</p><strong>{copy.photos[0][1]}</strong></div></article>
            <article className="how-photo"><img src="/panelist-mobile.jpg" alt={copy.photos[1][2]} /><div className="how-photo-caption"><p>{copy.photos[1][0]}</p><strong>{copy.photos[1][1]}</strong></div></article>
            <article className="how-photo is-wide"><img src="/global-audience.jpg" alt={copy.photos[2][2]} /><div className="how-photo-caption"><p>{copy.photos[2][0]}</p><strong>{copy.photos[2][1]}</strong></div></article>
          </div>
        </div>
      </section>

      <section className="how-standards">
        <div className="how-container how-standards-grid">
          <div className="how-standards-copy"><p className="how-kicker">{copy.standardsKicker}</p><h2>{copy.standardsTitle}</h2><p>{copy.standardsBody}</p></div>
          <div className="how-standard-list">{copy.standards.map(([title, body, Icon]) => <article key={title} className="how-standard"><span className="how-standard-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </div>
      </section>

      <section className="how-container how-panelists">
        <div className="how-panelist-head"><p className="how-kicker">{copy.panelKicker}</p><h2>{copy.panelTitle}</h2><p>{copy.panelBody}</p></div>
        <div className="how-steps">{copy.steps.map(([number, title, body]) => <article key={number} className="how-step"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <article className="how-reward"><img src="/rewards-wallet.jpg" alt={copy.rewardAlt} /><div className="how-reward-copy"><p className="how-kicker">{copy.rewardKicker}</p><h2>{copy.rewardTitle}</h2><p>{copy.rewardBody}</p><Link to={withLanguage('/register', language)}>{copy.rewardAction} <ArrowRight size={17} /></Link></div></article>
      </section>

    </main>
  );
}

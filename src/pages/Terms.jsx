import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';
import { useLanguage } from '../components/LanguageContext';

const sections = [
  { id: 'acceptance', title: 'Accepting these terms' }, { id: 'eligibility', title: 'Eligibility and account responsibility' }, { id: 'conduct', title: 'Participation and prohibited conduct' }, { id: 'research-services', title: 'Research services' }, { id: 'client-questionnaires', title: 'Client-created questionnaires' }, { id: 'coins', title: 'Coins and rewards' }, { id: 'partner-content', title: 'Third-party content' }, { id: 'liability', title: 'Disclaimers and liability' }, { id: 'governing-law', title: 'Governing law' }, { id: 'changes', title: 'Changes and contact' },
];

const chineseTerms = {
  'zh-CN': {
    eyebrow: '服务条款', title: '为有价值的研究提供清晰条款。', intro: '本条款说明 Guanyi Media 研究社群参与、账户及研究相关服务的规则。', audience: '适用于社群参与者、账户持有人和研究联系人',
    sections: [
      ['接受本条款', ['登录、创建账户或使用 Guanyi Media 服务，即表示你同意本服务条款及隐私政策。']],
      ['资格与账户责任', ['你必须年满 18 周岁才能创建或使用参与者账户。你同意提供准确信息、妥善保管密码，并对通过账户进行的活动负责。', '如你代表组织使用研究服务，即表示你有权这样做。如怀疑账户被未经授权访问，请及时联系我们。']],
      ['参与与禁止行为', ['为维护公平的研究社群，你必须诚实完成研究活动，并且仅使用一个参与者账户。不得使用自动化工具、提供虚假或误导性信息、干扰服务，或试图获得未赚取的奖励。', '如我们有合理理由认为这些规则或适用要求被违反，可暂缓发放 Coins、限制访问、暂停或关闭账户。']],
      ['研究服务', ['研究相关服务可包括定制问卷及其他已约定的研究活动。具体项目的范围、交付物、时间、费用和数据处理条款将在适用时另行说明。使用客户工作区的组织和研究者还须遵守《商业研究者条款》。', '你不得提交违法内容、无权分享的个人信息，或侵犯他人权利的内容。']],
      ['客户创建的问卷', ['客户可创建问卷，并向自己的受众发布经批准的公开链接。客户负责问卷目的、受访者告知、收集所需的同意或其他合法依据，以及对结果的使用方式。', '客户不得索取密码、验证码、支付卡或银行资料、政府身份证明，或违法、剥削性、暴力、仇恨或歧视性内容。涉及敏感个人信息时，客户必须取得所需的明确同意并遵守适用的数据保护法律。我们可阻止发布、暂停收集或移除不符合这些要求的内容。', '问卷回答属于创建该问卷的客户。我们根据适用的服务关系和本政策提供问卷托管与安全保障的技术服务。']],
      ['Coins 与奖励', ['当前钱包标准：1,000 Coins = 1.00 美元；在可兑换时，最低兑换额为 10,000 Coins（10.00 美元）。', 'Coins 可针对符合条件的活动提供，并仅在相关参与经验证后记入。Coins 不是现金、不产生利息，除非我们明确允许，否则不得转让。', '奖励供应、兑换方式、兑换比率和最低门槛可能调整。我们会在钱包中展示当前条款，并在适用法律要求时通知重大变更。']],
      ['第三方内容', ['部分问卷内容和机会由研究合作伙伴提供。我们不保证第三方问卷内容、可用性、资格决定或结果始终完整、准确或不中断。']],
      ['免责声明与责任', ['在法律允许范围内，服务按“现状可用”提供。Guanyi Media 不对因使用服务产生的间接、附带、特殊、后果性或惩罚性损失负责。', '本条款不排除或限制法律上不得排除或限制的责任。']],
      ['适用法律', ['本条款受 Guanyi Media 注册地司法辖区法律管辖，不考虑法律冲突原则。你居住地适用的强制性消费者保护不受影响。']],
      ['变更与联系', ['我们可能因服务、法律要求或奖励运营的变化更新本条款。对于重大变更，在适用法律要求时，我们会在更新条款生效前通过服务、电子邮件或其他合理方式通知你。', '如对本条款有疑问，请联系我们。']],
    ],
  },
  'zh-Hant': {
    eyebrow: '服務條款', title: '為有價值的研究提供清晰條款。', intro: '本條款說明 Guanyi Media 研究社群參與、帳戶及研究相關服務的規則。', audience: '適用於社群參與者、帳戶持有人和研究聯絡人',
    sections: [
      ['接受本條款', ['登入、建立帳戶或使用 Guanyi Media 服務，即表示你同意本服務條款及隱私政策。']],
      ['資格與帳戶責任', ['你必須年滿 18 歲才能建立或使用參與者帳戶。你同意提供準確資料、妥善保管密碼，並對透過帳戶進行的活動負責。', '如你代表組織使用研究服務，即表示你有權這樣做。如懷疑帳戶被未經授權存取，請及時聯絡我們。']],
      ['參與與禁止行為', ['為維護公平的研究社群，你必須誠實完成研究活動，並且僅使用一個參與者帳戶。不得使用自動化工具、提供虛假或誤導性資料、干擾服務，或試圖獲得未賺取的獎勵。', '如我們有合理理由認為這些規則或適用要求被違反，可暫緩發放 Coins、限制存取、暫停或關閉帳戶。']],
      ['研究服務', ['研究相關服務可包括客製問卷及其他已約定的研究活動。具體專案的範圍、交付物、時間、費用和資料處理條款將在適用時另行說明。使用客戶工作區的組織和研究者還須遵守《商業研究者條款》。', '你不得提交違法內容、無權分享的個人資料，或侵犯他人權利的內容。']],
      ['客戶建立的問卷', ['客戶可建立問卷，並向自己的受眾發布經批准的公開連結。客戶負責問卷目的、受訪者告知、收集所需的同意或其他合法依據，以及對結果的使用方式。', '客戶不得索取密碼、驗證碼、支付卡或銀行資料、政府身分證明，或違法、剝削性、暴力、仇恨或歧視性內容。涉及敏感個人資料時，客戶必須取得所需的明確同意並遵守適用的資料保護法律。我們可阻止發布、暫停收集或移除不符合這些要求的內容。', '問卷回答屬於建立該問卷的客戶。我們根據適用的服務關係和本政策提供問卷代管與安全保障的技術服務。']],
      ['Coins 與獎勵', ['目前錢包標準：1,000 Coins = 1.00 美元；在可兌換時，最低兌換額為 10,000 Coins（10.00 美元）。', 'Coins 可針對符合條件的活動提供，並僅在相關參與經驗證後記入。Coins 不是現金、不產生利息，除非我們明確允許，否則不得轉讓。', '獎勵供應、兌換方式、兌換比率和最低門檻可能調整。我們會在錢包中展示目前條款，並在適用法律要求時通知重大變更。']],
      ['第三方內容', ['部分問卷內容和機會由研究合作夥伴提供。我們不保證第三方問卷內容、可用性、資格決定或結果始終完整、準確或不中斷。']],
      ['免責聲明與責任', ['在法律允許範圍內，服務按「現狀可用」提供。Guanyi Media 不對因使用服務產生的間接、附帶、特殊、後果性或懲罰性損失負責。', '本條款不排除或限制法律上不得排除或限制的責任。']],
      ['適用法律', ['本條款受 Guanyi Media 註冊地司法轄區法律管轄，不考慮法律衝突原則。你居住地適用的強制性消費者保護不受影響。']],
      ['變更與聯絡', ['我們可能因服務、法律要求或獎勵營運的變化更新本條款。對於重大變更，在適用法律要求時，我們會在更新條款生效前透過服務、電子郵件或其他合理方式通知你。', '如對本條款有疑問，請聯絡我們。']],
    ],
  },
};

export default function Terms() {
  const { language } = useLanguage();
  const localized = chineseTerms[language];
  if (localized) {
    const localizedSections = sections.map((section, index) => ({ ...section, title: localized.sections[index][0] }));
    return <LegalPageLayout eyebrow={localized.eyebrow} title={localized.title} intro={localized.intro} sections={localizedSections} audience={localized.audience}>
      {localized.sections.map(([title, paragraphs], index) => <LegalSection number={index + 1} id={sections[index].id} title={title} key={title}>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</LegalSection>)}
    </LegalPageLayout>;
  }
  return <LegalPageLayout eyebrow="Terms of service" title="Clear terms for useful research." intro="These terms explain the rules for Guanyi Media panel participation, accounts, and research-related services." sections={sections} audience="For panel participants, account holders, and research contacts">
    <LegalSection number={1} id="acceptance" title="Accepting these terms"><p>By signing in, creating an account, or using Guanyi Media services, you agree to these Terms of Service and the <a href="/privacy">Privacy Policy</a>.</p></LegalSection>
    <LegalSection number={2} id="eligibility" title="Eligibility and account responsibility"><p>You must be at least 18 years old to create or use a panel-participant account. You agree to provide accurate information, keep your password confidential, and remain responsible for activity performed through your account.</p><p>If you use research-related services on behalf of an organisation, you represent that you are authorised to do so. Please notify us promptly at <a href="mailto:heguanyi@guanyi-media.com?subject=Account%20Security">heguanyi@guanyi-media.com</a> if you believe your account has been accessed without permission.</p></LegalSection>
    <LegalSection number={3} id="conduct" title="Participation and prohibited conduct"><p>To maintain a fair research panel, you must complete research activities honestly and use only one participant account. You may not use automated tools, provide false or misleading information, interfere with the service, or attempt to obtain rewards you have not earned.</p><p>We may withhold Coins, limit access, suspend, or close an account when we reasonably believe these rules or applicable requirements have been violated.</p></LegalSection>
    <LegalSection number={4} id="research-services" title="Research services"><p>Research-related services may include custom questionnaires and other agreed research activities. Any service-specific scope, deliverables, timing, fees, and data-handling terms that apply to an engagement will be stated separately where relevant. Organisations and researchers using a client workspace are also subject to the <a href="/business/terms">Business Researcher Terms</a>.</p><p>You must not submit unlawful content, personal information you are not entitled to share, or content that infringes another person’s rights.</p></LegalSection>
    <LegalSection number={5} id="client-questionnaires" title="Client-created questionnaires"><p>Clients may create questionnaires and distribute an approved public link to their own audience. The client is responsible for the questionnaire’s purpose, its respondent notices, any consent or other lawful basis required for collection, and how the resulting responses are used.</p><p>Clients must not request passwords, verification codes, payment-card or bank details, government identifiers, or unlawful, sexually exploitative, violent, hateful, or discriminatory content. Where questions collect sensitive personal information, clients must obtain any required explicit consent and comply with applicable data-protection laws. We may prevent publication, pause collection, or remove content that does not meet these requirements.</p><p>Questionnaire responses belong to the client that created the questionnaire. We provide the technical service for hosting and securing the questionnaire, subject to the applicable service relationship and this policy.</p></LegalSection>
    <LegalSection number={6} id="coins" title="Coins and rewards"><div className="legal-highlight"><span>Current wallet standard</span><strong>1,000 Coins = US$1.00</strong><p>Minimum redemption: 10,000 Coins (US$10.00), where redemption is available.</p></div><p>Coins may be offered for eligible activities and are credited only after the relevant participation has been validated. Coins are not cash, do not earn interest, and cannot be transferred except where we expressly allow it.</p><p>Reward availability, redemption methods, exchange rates, and minimum thresholds may change. We will present the current terms in the wallet and provide notice of material changes where required.</p></LegalSection>
    <LegalSection number={7} id="partner-content" title="Third-party content"><p>Some survey content and opportunities are provided by research partners. We do not guarantee that third-party survey content, availability, eligibility decisions, or results will always be complete, accurate, or uninterrupted.</p></LegalSection>
    <LegalSection number={8} id="liability" title="Disclaimers and liability"><p>The service is provided on an “as available” basis to the extent permitted by law. Guanyi Media is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the service.</p><p>Nothing in these terms excludes liability that cannot lawfully be excluded or limited.</p></LegalSection>
    <LegalSection number={9} id="governing-law" title="Governing law"><p>These terms are governed by the laws of the jurisdiction in which Guanyi Media is registered, without regard to conflict-of-law principles. Any mandatory consumer protections that apply in your place of residence remain unaffected.</p></LegalSection>
    <LegalSection number={10} id="changes" title="Changes and contact"><p>We may update these terms to reflect changes to services, legal requirements, or reward operations. For material changes, we will provide notice through the service, by email, or by another reasonable method before the updated terms take effect where required.</p><p>For questions about these terms, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p></LegalSection>
  </LegalPageLayout>;
}

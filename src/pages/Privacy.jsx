import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';
import { useLanguage } from '../components/LanguageContext';

const sections = [
  { id: 'scope-controller', title: 'Scope and controller' },
  { id: 'information-collected', title: 'Information we collect' },
  { id: 'questionnaire-responses', title: 'Client questionnaires and responses' },
  { id: 'how-we-use', title: 'How we use information' },
  { id: 'sharing', title: 'Sharing by category' },
  { id: 'ai-support', title: 'AI-assisted support' },
  { id: 'retention', title: 'Retention' },
  { id: 'rights', title: 'Your privacy rights' },
  { id: 'california', title: 'California notice' },
  { id: 'cookies', title: 'Cookies and similar technology' },
  { id: 'security', title: 'Security and contact' },
];

const chinesePrivacy = {
  'zh-CN': {
    eyebrow: '隐私政策', title: '让研究与个人信息都清晰透明。', intro: '本政策说明 Guanyi Media 如何使用社群成员、账户持有人及研究服务联系人的信息。', audience: '适用于社群成员、账户持有人和研究联系人',
    sections: [
      ['适用范围与数据控制者', ['本隐私政策适用于注册或使用 Guanyi Media 研究社群、使用客户工作区、回答客户问卷，或因研究服务联系我们的人员。除非客户创建的问卷使该客户负责研究目的和回答使用方式，否则 Guanyi Media 是本政策所述个人信息的数据控制者。', '如有隐私问题或请求，请联系 heguanyi@guanyi-media.com。']],
      ['我们收集的信息', ['我们收集提供账户、支持参与和研究服务、管理奖励、与您沟通及保护服务所需的信息。', '账户信息包括电子邮箱、显示名称、密码、账户角色和会话信息。密码以受保护的形式存储，不会向团队直接显示。', '参与和资料信息包括您为参与社群选择提供的国家或地区、出生年份、性别、教育、就业、家庭信息、调研参与、资格和完成记录。', '研究联系信息包括姓名、电子邮箱、组织类型、地区及您告诉我们的研究需求。客户问卷信息包括问卷标题、目的说明、问题、回答、回答时间，以及用于保护回答流程的有限浏览器或网络衍生信息。', '技术和支持信息包括 IP 地址、浏览器和设备信息、根据网络信息推断的大致位置、支持消息，以及保护服务和回应请求所需的信息。']],
      ['客户问卷与回答', ['当您回答客户工作区创建的问卷时，客户通常负责决定回答的收集目的和使用方式。问卷会在您回答前标明客户或说明其为第三方客户，并展示目的说明。', '我们提供问卷托管、保护与交付的技术服务；提交的回答会提供给该问卷的创建者，并仅为运营服务、防止滥用和履行适用义务而处理。未经适当法律依据或告知，我们不会将客户回答数据用于无关目的。']],
      ['我们如何使用信息', ['我们使用信息来创建、验证及支持账户和工作区；为合适的研究机会匹配社群成员并管理参与和奖励；回应研究咨询；发送服务相关沟通及回应支持或隐私请求；保护服务、发现滥用并履行适用法律义务。', '我们为提供所请求服务、履行适用义务、维护服务完整性，并在需要时基于您的同意处理信息。']],
      ['信息共享类别', ['我们不会公开发布个人信息。为实现所述目的，我们可能向问卷创建者共享其客户问卷的回答；向研究合作伙伴和服务提供方共享提供研究服务、研究机会或服务功能所需的信息；向安全与通信服务提供方共享保护账户、回答收集或发送服务信息所需的技术或联系信息。', '在法律要求、保护权利和安全，或合法业务转让的情况下，我们也可能披露信息。']],
      ['AI 辅助支持', ['当您选择使用网站支持助手时，您发送的消息会用于提供支持回复。该助手使用公开的服务信息，不能替代人工处理个人账户、奖励、问卷或隐私请求。', '请勿在聊天中发送密码、验证码、支付卡资料、政府身份标识或完整金融资料。如您要求人工协助，相关对话及提供的联系方式会作为私密支持请求保存。']],
      ['保留期限', ['账户和参与信息通常会在账户存续期间保留。研究联系和工作区信息会在提供所请求服务及维护适当记录所需的期间保留。客户问卷回答会依适用的客户关系、问卷设置及适用要求保留。为履行法律义务、解决争议、保护服务或维护奖励记录，我们可能在必要时更长时间保留有限信息。']],
      ['您的隐私权利', ['根据您所在地区，您可能有权请求访问个人信息、更正不准确的信息、删除信息、撤回同意以及取得您向我们提供信息的可携副本。', '如需行使权利，请向 heguanyi@guanyi-media.com 发送邮件，主题写明“Privacy Request”。我们可能要求必要信息以核验请求，并会按适用法律回应。']],
      ['加利福尼亚隐私说明', ['对于加利福尼亚州居民，IP 地址、设备标识符及相关技术信息的某些使用在加利福尼亚隐私法下可能构成“共享”。您可发送主题为“California Privacy Request”的邮件至 heguanyi@guanyi-media.com，请求退出适用共享。', 'Guanyi Media 不会在知情情况下出售或共享 16 岁以下加利福尼亚居民的个人信息。']],
      ['Cookie 与类似技术', ['我们使用必要的浏览器存储和安全验证技术来保护注册、维持已验证访问并使服务正常运作；若禁用这些技术，核心功能将受影响。', '我们会在浏览器中记录您的 Cookie 偏好。可选分析和个性化广告在您选择前保持关闭。若新增可选测量或广告服务，只有在选择相应偏好后才会启用，并会在使用前更新本政策。']],
      ['安全与联系', ['我们使用传输加密、访问控制及其他技术和组织措施保护个人信息。任何传输或存储方式都无法完全安全，因此我们不能保证绝对安全。', '如对本政策有疑问，请联系 heguanyi@guanyi-media.com。']],
    ],
  },
  'zh-Hant': {
    eyebrow: '隱私政策', title: '讓研究與個人資料都清晰透明。', intro: '本政策說明 Guanyi Media 如何使用社群成員、帳戶持有人及研究服務聯絡人的資料。', audience: '適用於社群成員、帳戶持有人和研究聯絡人',
    sections: [
      ['適用範圍與資料控制者', ['本隱私政策適用於註冊或使用 Guanyi Media 研究社群、使用客戶工作區、回答客戶問卷，或因研究服務聯絡我們的人員。除非客戶建立的問卷使該客戶負責研究目的和回答使用方式，否則 Guanyi Media 是本政策所述個人資料的資料控制者。', '如有隱私問題或請求，請聯絡 heguanyi@guanyi-media.com。']],
      ['我們收集的資料', ['我們收集提供帳戶、支援參與和研究服務、管理獎勵、與您溝通及保護服務所需的資料。', '帳戶資料包括電子郵件、顯示名稱、密碼、帳戶角色和工作階段資料。密碼以受保護的形式儲存，不會向團隊直接顯示。', '參與和個人資料包括您為參與社群選擇提供的國家或地區、出生年份、性別、教育、就業、家庭資料、調查參與、資格和完成紀錄。', '研究聯絡資料包括姓名、電子郵件、組織類型、地區及您告訴我們的研究需求。客戶問卷資料包括問卷標題、目的說明、問題、回答、回答時間，以及用於保護回答流程的有限瀏覽器或網路衍生資料。', '技術和支援資料包括 IP 位址、瀏覽器和裝置資料、根據網路資料推斷的大致位置、支援訊息，以及保護服務和回應請求所需的資料。']],
      ['客戶問卷與回答', ['當您回答客戶工作區建立的問卷時，客戶通常負責決定回答的收集目的和使用方式。問卷會在您回答前標明客戶或說明其為第三方客戶，並展示目的說明。', '我們提供問卷代管、保護與交付的技術服務；提交的回答會提供給該問卷的建立者，並僅為營運服務、防止濫用和履行適用義務而處理。未經適當法律依據或告知，我們不會將客戶回答資料用於無關目的。']],
      ['我們如何使用資料', ['我們使用資料來建立、驗證及支援帳戶和工作區；為合適的研究機會配對社群成員並管理參與和獎勵；回應研究諮詢；發送服務相關溝通及回應支援或隱私請求；保護服務、發現濫用並履行適用法律義務。', '我們為提供所請求服務、履行適用義務、維護服務完整性，並在需要時基於您的同意處理資料。']],
      ['資料分享類別', ['我們不會公開發布個人資料。為實現所述目的，我們可能向問卷建立者分享其客戶問卷的回答；向研究合作夥伴和服務提供方分享提供研究服務、研究機會或服務功能所需的資料；向安全與通訊服務提供方分享保護帳戶、回答收集或發送服務訊息所需的技術或聯絡資料。', '在法律要求、保護權利和安全，或合法業務轉讓的情況下，我們也可能揭露資料。']],
      ['AI 輔助支援', ['當您選擇使用網站支援助手時，您發送的訊息會用於提供支援回覆。該助手使用公開的服務資料，不能取代人工處理個人帳戶、獎勵、問卷或隱私請求。', '請勿在聊天中傳送密碼、驗證碼、支付卡資料、政府身分標識或完整金融資料。如您要求人工協助，相關對話及提供的聯絡方式會作為私密支援請求保存。']],
      ['保留期限', ['帳戶和參與資料通常會在帳戶存續期間保留。研究聯絡和工作區資料會在提供所請求服務及維護適當紀錄所需的期間保留。客戶問卷回答會依適用的客戶關係、問卷設定及適用要求保留。為履行法律義務、解決爭議、保護服務或維護獎勵紀錄，我們可能在必要時更長時間保留有限資料。']],
      ['您的隱私權利', ['根據您所在的地區，您可能有權請求存取個人資料、更正不準確的資料、刪除資料、撤回同意以及取得您向我們提供資料的可攜副本。', '如需行使權利，請向 heguanyi@guanyi-media.com 發送電子郵件，主旨寫明「Privacy Request」。我們可能要求必要資料以核驗請求，並會按適用法律回應。']],
      ['加州隱私說明', ['對於加州居民，IP 位址、裝置識別碼及相關技術資料的某些使用在加州隱私法下可能構成「分享」。您可發送主旨為「California Privacy Request」的電子郵件至 heguanyi@guanyi-media.com，請求退出適用分享。', 'Guanyi Media 不會在知情情況下出售或分享 16 歲以下加州居民的個人資料。']],
      ['Cookie 與類似技術', ['我們使用必要的瀏覽器儲存和安全驗證技術來保護註冊、維持已驗證存取並使服務正常運作；若停用這些技術，核心功能將受影響。', '我們會在瀏覽器中記錄您的 Cookie 偏好。可選分析和個人化廣告在您選擇前保持關閉。若新增可選測量或廣告服務，只有在選擇相應偏好後才會啟用，並會在使用前更新本政策。']],
      ['安全與聯絡', ['我們使用傳輸加密、存取控制及其他技術和組織措施保護個人資料。任何傳輸或儲存方式都無法完全安全，因此我們不能保證絕對安全。', '如對本政策有疑問，請聯絡 heguanyi@guanyi-media.com。']],
    ],
  },
};

export default function Privacy() {
  const { language } = useLanguage();
  const localized = chinesePrivacy[language];
  if (localized) {
    const localizedSections = sections.map((section, index) => ({ ...section, title: localized.sections[index][0] }));
    return <LegalPageLayout eyebrow={localized.eyebrow} title={localized.title} intro={localized.intro} sections={localizedSections} audience={localized.audience}>
      {localized.sections.map(([title, paragraphs], index) => <LegalSection number={index + 1} id={sections[index].id} title={title} key={title}>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</LegalSection>)}
    </LegalPageLayout>;
  }
  return (
    <LegalPageLayout eyebrow="Privacy policy" title="Clear privacy for people and research." intro="This policy explains how Guanyi Media uses information from panel participants, account holders, and people who contact us about research services." sections={sections} audience="For panel participants, account holders, and research contacts">
      <LegalSection number={1} id="scope-controller" title="Scope and data controller">
        <p>This Privacy Policy applies to people who register for or use the Guanyi Media research panel, use a client workspace, answer a client questionnaire, or contact us about research services. Guanyi Media is the data controller for the personal information described here, except where a client-created questionnaire makes that client responsible for the research purpose and use of the responses.</p>
        <p>For privacy questions or requests, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>

      <LegalSection number={2} id="information-collected" title="Information we collect">
        <p>We collect information needed to provide accounts, support participation and research services, administer rewards, communicate with you, and protect the service.</p>
        <div className="legal-card-grid">
          <article><h3>Account information</h3><p>Email address, display name, password, account role, and account-session information. Passwords are stored in a protected form and are not displayed to our team.</p></article>
          <article><h3>Participation and profile information</h3><p>Information you choose to provide for panel participation, such as country or region, birth year, gender, education, employment, household information, survey participation, eligibility, and completion records.</p></article>
          <article><h3>Research contact information</h3><p>When you contact us about research services, we collect the name, email address, organisation type, region, and the information you include about your research needs.</p></article>
          <article><h3>Questionnaire information</h3><p>For client-created questionnaires, we process the questionnaire title, purpose notice, questions, responses, response timing, and limited browser or network-derived information used to protect the response process.</p></article>
          <article><h3>Technical and support information</h3><p>IP address, browser and device information, approximate location derived from network information, support messages, and information needed to protect the service and respond to requests.</p></article>
        </div>
      </LegalSection>

      <LegalSection number={3} id="questionnaire-responses" title="Client questionnaires and responses">
        <p>When you answer a questionnaire created in a client workspace, the client is generally responsible for deciding why responses are collected and how they are used. The questionnaire identifies the client or states that it is a third-party client and presents a purpose notice before you respond.</p>
        <p>We provide the technical service for hosting, securing, and delivering the questionnaire. We make the submitted response available to that questionnaire’s creator and process it to operate the service, prevent misuse, and meet applicable obligations. We do not use a client’s response data for unrelated purposes without an appropriate legal basis or notice.</p>
      </LegalSection>

      <LegalSection number={4} id="how-we-use" title="How we use information">
        <ul className="legal-list"><li>Create, authenticate, and support accounts and workspaces.</li><li>Match panel participants with suitable research opportunities and administer participation and rewards.</li><li>Respond to research enquiries and provide requested research-related services.</li><li>Send service-related communications and respond to support or privacy requests.</li><li>Protect the service, detect misuse, and meet applicable legal obligations.</li></ul>
        <p>We process information to provide requested services, meet applicable obligations, protect the integrity of the service, and, where required, on the basis of your consent.</p>
      </LegalSection>

      <LegalSection number={5} id="sharing" title="Sharing by category">
        <p>We do not publish personal information. We may share limited information with the following categories of recipients when needed for the stated purpose:</p>
        <div className="legal-card-grid is-three-up"><article><h3>Questionnaire creators</h3><p>Responses to a client-created questionnaire are shared with that questionnaire’s creator for the stated research purpose.</p></article><article><h3>Research partners and service providers</h3><p>Information necessary to provide a requested research service, support a research opportunity, or operate service features.</p></article><article><h3>Security and communications providers</h3><p>Technical or contact information needed to help keep accounts and response collection safe and send service-related messages.</p></article></div>
        <p>We may also disclose information when required by law, to protect rights and safety, or as part of a legitimate business transfer.</p>
      </LegalSection>

      <LegalSection number={6} id="ai-support" title="AI-assisted support">
        <p>When you choose to use the website support assistant, the messages you send are processed to provide a support response. The assistant uses published service information and is not a substitute for a person reviewing an individual account, reward, survey, or privacy request.</p>
        <p>Please do not include passwords, verification or one-time codes, payment-card details, government identifiers, or full financial details in chat. If you ask to talk to a person, the conversation and contact details you provide are stored as a private support request.</p>
      </LegalSection>

      <LegalSection number={7} id="retention" title="Data retention"><p>We generally retain account and participation information for the life of your account. Research-contact and workspace information is retained for as long as needed to provide the requested services and maintain appropriate records. Client questionnaire responses are retained according to the applicable client relationship, the questionnaire settings, and applicable requirements. We may retain limited information for longer where necessary for legal obligations, resolving disputes, protecting the service, or maintaining reward records.</p></LegalSection>
      <LegalSection number={8} id="rights" title="Your privacy rights"><p>Depending on where you live, you may have the right to request access to your information, correction of inaccurate information, deletion, withdrawal of consent, and a portable copy of information you provided to us.</p><p>To exercise a right, email <a href="mailto:heguanyi@guanyi-media.com?subject=Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “Privacy Request.” We may ask for information necessary to verify the request and will respond as required by applicable law.</p></LegalSection>
      <LegalSection number={9} id="california" title="California privacy notice"><p>For California residents, certain uses of IP addresses, device identifiers, and related technical information may be considered “sharing” under California privacy law. You may ask us to opt you out of applicable sharing by emailing <a href="mailto:heguanyi@guanyi-media.com?subject=California%20Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “California Privacy Request.”</p><p>Guanyi Media does not knowingly sell or share the personal information of California residents under 16 years of age.</p></LegalSection>
      <LegalSection number={10} id="cookies" title="Cookies and similar technology"><div className="legal-cookie-grid"><article><span>Necessary</span><h3>Security and account access</h3><p>We use necessary browser storage and security-verification technology to protect registration, maintain authenticated access, and keep the service working. These cannot be disabled without affecting core features.</p></article><article><span>Non-essential</span><h3>Optional measurement</h3><p>We record your Cookie preference in your browser. Optional analytics and personalized advertising remain off until you choose them. When we add an optional measurement or advertising service, we will only enable it after the matching preference has been selected and will update this policy before using it.</p></article></div></LegalSection>
      <LegalSection number={11} id="security" title="Security and contact"><p>We use encryption in transit, access controls, and other technical and organizational measures designed to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p><p>For questions about this policy, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p></LegalSection>
    </LegalPageLayout>
  );
}

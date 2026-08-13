import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';

const sections = [
  { id: 'scope-controller', title: 'Scope and controller' },
  { id: 'information-collected', title: 'Information we collect' },
  { id: 'how-we-use', title: 'How we use information' },
  { id: 'sharing', title: 'Sharing by category' },
  { id: 'ai-support', title: 'AI-assisted support' },
  { id: 'retention', title: 'Retention' },
  { id: 'rights', title: 'Your privacy rights' },
  { id: 'california', title: 'California notice' },
  { id: 'cookies', title: 'Cookies and similar technology' },
  { id: 'security', title: 'Security and contact' },
];

export default function Privacy() {
  return (
    <LegalPageLayout eyebrow="Privacy policy" title="Clear privacy for people and research." intro="This policy explains how Guanyi Media uses information from panel participants, account holders, and people who contact us about research services." sections={sections} audience="For panel participants, account holders, and research contacts">
      <LegalSection number={1} id="scope-controller" title="Scope and data controller">
        <p>This Privacy Policy applies to people who register for or use the Guanyi Media research panel, use a client workspace, or contact us about research services. Guanyi Media is the data controller for the personal information described here.</p>
        <p>For privacy questions or requests, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>

      <LegalSection number={2} id="information-collected" title="Information we collect">
        <p>We collect information needed to provide accounts, support participation and research services, administer rewards, communicate with you, and protect the service.</p>
        <div className="legal-card-grid">
          <article><h3>Account information</h3><p>Email address, display name, password, account role, and account-session information. Passwords are stored in a protected form and are not displayed to our team.</p></article>
          <article><h3>Participation and profile information</h3><p>Information you choose to provide for panel participation, such as country or region, birth year, gender, education, employment, household information, survey participation, eligibility, and completion records.</p></article>
          <article><h3>Research contact information</h3><p>When you contact us about research services, we collect the name, email address, organisation type, region, and the information you include about your research needs.</p></article>
          <article><h3>Technical and support information</h3><p>IP address, browser and device information, approximate location derived from network information, support messages, and information needed to protect the service and respond to requests.</p></article>
        </div>
      </LegalSection>

      <LegalSection number={3} id="how-we-use" title="How we use information">
        <ul className="legal-list"><li>Create, authenticate, and support accounts and workspaces.</li><li>Match panel participants with suitable research opportunities and administer participation and rewards.</li><li>Respond to research enquiries and provide requested research-related services.</li><li>Send service-related communications and respond to support or privacy requests.</li><li>Protect the service, detect misuse, and meet applicable legal obligations.</li></ul>
        <p>We process information to provide requested services, meet applicable obligations, protect the integrity of the service, and, where required, on the basis of your consent.</p>
      </LegalSection>

      <LegalSection number={4} id="sharing" title="Sharing by category">
        <p>We do not publish personal information. We may share limited information with the following categories of recipients when needed for the stated purpose:</p>
        <div className="legal-card-grid is-three-up"><article><h3>Research partners and service providers</h3><p>Information necessary to provide a requested research service, support a research opportunity, or operate service features.</p></article><article><h3>Security and fraud-prevention providers</h3><p>Technical and account information used to help keep accounts and participation safe.</p></article><article><h3>Communications providers</h3><p>Contact details needed to send verification, account, password, and service-related messages.</p></article></div>
        <p>We may also disclose information when required by law, to protect rights and safety, or as part of a legitimate business transfer.</p>
      </LegalSection>

      <LegalSection number={5} id="ai-support" title="AI-assisted support">
        <p>When you choose to use the website support assistant, the messages you send are processed to provide a support response. The assistant uses published service information and is not a substitute for a person reviewing an individual account, reward, survey, or privacy request.</p>
        <p>Please do not include passwords, verification or one-time codes, payment-card details, government identifiers, or full financial details in chat. If you ask to talk to a person, the conversation and contact details you provide are stored as a private support request.</p>
      </LegalSection>

      <LegalSection number={6} id="retention" title="Data retention"><p>We generally retain account and participation information for the life of your account. Research-contact and workspace information is retained for as long as needed to provide the requested services and maintain appropriate records. We may retain limited information for longer where necessary for legal obligations, resolving disputes, protecting the service, or maintaining reward records.</p></LegalSection>
      <LegalSection number={7} id="rights" title="Your privacy rights"><p>Depending on where you live, you may have the right to request access to your information, correction of inaccurate information, deletion, withdrawal of consent, and a portable copy of information you provided to us.</p><p>To exercise a right, email <a href="mailto:heguanyi@guanyi-media.com?subject=Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “Privacy Request.” We may ask for information necessary to verify the request and will respond as required by applicable law.</p></LegalSection>
      <LegalSection number={8} id="california" title="California privacy notice"><p>For California residents, certain uses of IP addresses, device identifiers, and related technical information may be considered “sharing” under California privacy law. You may ask us to opt you out of applicable sharing by emailing <a href="mailto:heguanyi@guanyi-media.com?subject=California%20Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “California Privacy Request.”</p><p>Guanyi Media does not knowingly sell or share the personal information of California residents under 16 years of age.</p></LegalSection>
      <LegalSection number={9} id="cookies" title="Cookies and similar technology"><div className="legal-cookie-grid"><article><span>Necessary</span><h3>Security and account access</h3><p>We use necessary browser storage and security-verification technology to protect registration, maintain authenticated access, and keep the service working. These cannot be disabled without affecting core features.</p></article><article><span>Non-essential</span><h3>Optional measurement</h3><p>We record your Cookie preference in your browser. Optional analytics and personalized advertising remain off until you choose them. When we add an optional measurement or advertising service, we will only enable it after the matching preference has been selected and will update this policy before using it.</p></article></div></LegalSection>
      <LegalSection number={10} id="security" title="Security and contact"><p>We use encryption in transit, access controls, and other technical and organizational measures designed to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p><p>For questions about this policy, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p></LegalSection>
    </LegalPageLayout>
  );
}

import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';

const sections = [
  { id: 'scope-controller', title: 'Scope and controller' },
  { id: 'information-collected', title: 'Information we collect' },
  { id: 'how-we-use', title: 'How we use information' },
  { id: 'sharing', title: 'Sharing by category' },
  { id: 'retention', title: 'Retention' },
  { id: 'rights', title: 'Your privacy rights' },
  { id: 'california', title: 'California notice' },
  { id: 'cookies', title: 'Cookies and similar technology' },
  { id: 'security', title: 'Security and contact' },
];

export default function Privacy() {
  return (
    <LegalPageLayout
      eyebrow="Privacy policy"
      title="Clear privacy for every panelist."
      intro="This policy explains what Guanyi Media collects from registered panelists, why we use it, and the choices available to you."
      sections={sections}
    >
      <LegalSection number={1} id="scope-controller" title="Scope and data controller">
        <p>This Privacy Policy applies to people who register for or use the Guanyi Media research panel. Guanyi Media is the data controller for the personal information described here.</p>
        <p>For privacy questions or requests, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>

      <LegalSection number={2} id="information-collected" title="Information we collect">
        <p>We collect the information needed to create and maintain your account, match you with relevant research, administer rewards, and protect the panel.</p>
        <div className="legal-card-grid">
          <article>
            <h3>Account information</h3>
            <p>Email address, display name, and password. Passwords are stored in a protected form and are not displayed to our team.</p>
          </article>
          <article>
            <h3>Technical information</h3>
            <p>IP address, browser and device information, approximate location derived from network information, and account-session information.</p>
          </article>
          <article>
            <h3>Panel profile information</h3>
            <p>Information you choose to provide, including country or region, birth year, gender, education, employment, marital status, children, and household income where requested.</p>
          </article>
          <article>
            <h3>Participation and reward information</h3>
            <p>Survey participation, eligibility and completion records, Coins activity, redemption requests, and account support communications.</p>
          </article>
        </div>
      </LegalSection>

      <LegalSection number={3} id="how-we-use" title="How we use information">
        <ul className="legal-list">
          <li>Create, authenticate, and support your account.</li>
          <li>Match you with survey opportunities and administer eligibility checks.</li>
          <li>Credit Coins, maintain reward records, and respond to account requests.</li>
          <li>Improve the panel experience and protect it against misuse or fraud.</li>
        </ul>
        <p>We process information to provide the panel services you request, meet applicable obligations, protect the integrity of the panel, and, where required, on the basis of your consent.</p>
      </LegalSection>

      <LegalSection number={4} id="sharing" title="Sharing by category">
        <p>We do not publish your personal information. We may share limited information with the following categories of recipients when needed for the stated purpose:</p>
        <div className="legal-card-grid is-three-up">
          <article>
            <h3>Research and survey partners</h3>
            <p>Basic profile information, such as country, gender, birth year, and relevant eligibility details, to match suitable research.</p>
          </article>
          <article>
            <h3>Security and fraud-prevention providers</h3>
            <p>Technical and account information used to help verify that panel participation is genuine and safe.</p>
          </article>
          <article>
            <h3>Communications providers</h3>
            <p>Account contact details needed to send verification, welcome, password, and service-related messages.</p>
          </article>
        </div>
        <p>We may also disclose information when required by law, to protect rights and safety, or as part of a legitimate business transfer.</p>
      </LegalSection>

      <LegalSection number={5} id="retention" title="Data retention">
        <p>We generally retain your personal information for the life of your account or until you ask us to delete it. We may retain limited information for longer where necessary for legal obligations, resolving disputes, protecting the panel, or maintaining reward records.</p>
      </LegalSection>

      <LegalSection number={6} id="rights" title="Your privacy rights">
        <p>Depending on where you live, you may have the right to request access to your information, correction of inaccurate information, deletion, withdrawal of consent, and a portable copy of information you provided to us.</p>
        <p>To exercise a right, email <a href="mailto:heguanyi@guanyi-media.com?subject=Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “Privacy Request.” We may ask for information necessary to verify the request and will respond as required by applicable law.</p>
      </LegalSection>

      <LegalSection number={7} id="california" title="California privacy notice">
        <p>For California residents, certain uses of IP addresses, device identifiers, and related technical information may be considered “sharing” under California privacy law. You may ask us to opt you out of applicable sharing by emailing <a href="mailto:heguanyi@guanyi-media.com?subject=California%20Privacy%20Request">heguanyi@guanyi-media.com</a> with the subject line “California Privacy Request.”</p>
        <p>Guanyi Media does not knowingly sell or share the personal information of California residents under 16 years of age.</p>
      </LegalSection>

      <LegalSection number={8} id="cookies" title="Cookies and similar technology">
        <div className="legal-cookie-grid">
          <article>
            <span>Necessary</span>
            <h3>Security and account access</h3>
            <p>We use necessary browser storage and security-verification technology to protect registration, maintain authenticated access, and keep the service working. These cannot be disabled through the panel without affecting core features.</p>
          </article>
          <article>
            <span>Non-essential</span>
            <h3>Optional measurement</h3>
            <p>We do not currently use non-essential analytics cookies in the panel. If that changes, we will update this policy and request consent where required.</p>
          </article>
        </div>
      </LegalSection>

      <LegalSection number={9} id="security" title="Security and contact">
        <p>We use encryption in transit, access controls, and other technical and organizational measures designed to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
        <p>For questions about this policy, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

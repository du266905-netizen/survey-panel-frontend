import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout';

const sections = [
  { id: 'acceptance', title: 'Accepting these terms' },
  { id: 'eligibility', title: 'Eligibility and account responsibility' },
  { id: 'conduct', title: 'Participation and prohibited conduct' },
  { id: 'coins', title: 'Coins and rewards' },
  { id: 'partner-content', title: 'Third-party content' },
  { id: 'liability', title: 'Disclaimers and liability' },
  { id: 'governing-law', title: 'Governing law' },
  { id: 'changes', title: 'Changes and contact' },
];

export default function Terms() {
  return (
    <LegalPageLayout
      eyebrow="Terms of service"
      title="The rules that keep research fair."
      intro="These terms explain who can join the Guanyi Media panel, how participation works, and how Coins and rewards are handled."
      sections={sections}
    >
      <LegalSection number={1} id="acceptance" title="Accepting these terms">
        <p>By checking the agreement box during registration, creating an account, or using the Guanyi Media panel, you agree to these Terms of Service and the <a href="/privacy">Privacy Policy</a>.</p>
      </LegalSection>

      <LegalSection number={2} id="eligibility" title="Eligibility and account responsibility">
        <p>You must be at least 18 years old to create or use an account. You agree to provide accurate information, keep your password confidential, and remain responsible for activity performed through your account.</p>
        <p>Please notify us promptly at <a href="mailto:heguanyi@guanyi-media.com?subject=Account%20Security">heguanyi@guanyi-media.com</a> if you believe your account has been accessed without permission.</p>
      </LegalSection>

      <LegalSection number={3} id="conduct" title="Participation and prohibited conduct">
        <p>To maintain a fair research panel, you must complete surveys honestly and use only one account. You may not use automated tools, provide false or misleading information, interfere with the service, or attempt to obtain rewards you have not earned.</p>
        <p>We may withhold Coins, limit access, suspend, or close an account when we reasonably believe these rules or applicable requirements have been violated.</p>
      </LegalSection>

      <LegalSection number={4} id="coins" title="Coins and rewards">
        <div className="legal-highlight">
          <span>Current wallet standard</span>
          <strong>1,000 Coins = US$1.00</strong>
          <p>Minimum redemption: 10,000 Coins (US$10.00), where redemption is available.</p>
        </div>
        <p>Coins may be offered for eligible activities and are credited only after the relevant participation has been validated. Coins are not cash, do not earn interest, and cannot be transferred except where we expressly allow it.</p>
        <p>Reward availability, redemption methods, exchange rates, and minimum thresholds may change. We will present the current terms in the wallet and provide notice of material changes where required.</p>
      </LegalSection>

      <LegalSection number={5} id="partner-content" title="Third-party content">
        <p>Some survey content and opportunities are provided by research partners. We do not guarantee that third-party survey content, availability, eligibility decisions, or results will always be complete, accurate, or uninterrupted.</p>
      </LegalSection>

      <LegalSection number={6} id="liability" title="Disclaimers and liability">
        <p>The panel is provided on an “as available” basis to the extent permitted by law. Guanyi Media is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the panel.</p>
        <p>Nothing in these terms excludes liability that cannot lawfully be excluded or limited.</p>
      </LegalSection>

      <LegalSection number={7} id="governing-law" title="Governing law">
        <p>These terms are governed by the laws of the jurisdiction in which Guanyi Media is registered, without regard to conflict-of-law principles. Any mandatory consumer protections that apply in your place of residence remain unaffected.</p>
      </LegalSection>

      <LegalSection number={8} id="changes" title="Changes and contact">
        <p>We may update these terms to reflect changes to the panel, legal requirements, or reward operations. For material changes, we will provide notice through the panel, by email, or by another reasonable method before the updated terms take effect where required.</p>
        <p>For questions about these terms, contact <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

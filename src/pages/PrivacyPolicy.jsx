import LegalDocument from './LegalDocument';

/* One page, two documents.
 *
 * The privacy policy and the acceptable use policy answer different questions —
 * what we do with information, and what may be done on the platform — but they
 * belong to the same reader at the same moment, so they share /privacy: the
 * policy first, the usage rules under it, each with its own heading, date and
 * PDF.
 */
export default function PrivacyPolicy() {
  return (
    <>
      <LegalDocument slug="privacy" />
      <LegalDocument slug="acceptable-use" part />
    </>
  );
}

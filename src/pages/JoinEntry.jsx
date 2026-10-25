import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import HomeChoiceSection from '../components/HomeChoiceSection';
import usePageTitle from '../hooks/usePageTitle';
import PublicSiteHeader from '../components/PublicSiteHeader';
import './JoinEntry.css';

/* Public sign-in page (2026-10-25): the homepage chooser, mounted as a page.

   Nothing is copied from the home page — `HomeChoiceSection` is the same
   component there and here, so the film, the participant/researcher switch and
   the sign-in form cannot drift. The page carries `home-atlas` because that is
   the theme scope the block's controls are styled in (square fields, lime
   primary, 54px buttons); without it the card falls back to plain defaults.

   The two-card chooser that used to sit here was `JoinChoice`; its copy is
   kept in docs/COPY-2026-10-25-JOIN-CHOICE.md for reuse. */
export default function JoinEntry() {
  const { publicCopy } = useLanguage();
  usePageTitle(publicCopy.chrome.header.signIn);
  return (
    <main className="home-atlas join-entry-page">
      <PublicSiteHeader />
      <HomeChoiceSection headingLevel={1} />
      <HomeFooter />
    </main>
  );
}

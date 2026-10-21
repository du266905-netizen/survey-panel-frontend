import { useLanguage } from './LanguageContext';
import HomeAuthForm from './HomeAuthForm';
import './HomeEntry.css';

/* Account entry block — extracted from the homepage hero (2026-10-22).

   The hero is a reading hero now: words on the left, the film on the right.
   The account switch and the sign-in form made that column taller than the
   film and threw the hero off balance, so they live here as their own band.
   Keeping them in one component also means the same block can be reused on
   another entry surface without copying the form. */
const audienceLabels = {
  'zh-CN': ['参与者', '研究员'],
  'zh-Hant': ['參與者', '研究員'],
  en: ['Participant', 'Researcher'],
};

export default function HomeEntry({ audience, onAudienceChange }) {
  const { language } = useLanguage();
  const isResearch = audience === 'research';
  const [participantLabel, researchLabel] = audienceLabels[language] || audienceLabels.en;

  return (
    <section className="home-entry" aria-label="Choose an account type">
      <div className="home-entry-inner">
        <div className="home-entry-actions" role="group" aria-label="Choose account type">
          <button
            type="button"
            className={`video-hero-cta${isResearch ? ' video-hero-cta--outline' : ''}`}
            aria-pressed={!isResearch}
            onClick={() => onAudienceChange('participant')}
          >
            {participantLabel}
          </button>
          <button
            type="button"
            className={`video-hero-cta${isResearch ? '' : ' video-hero-cta--outline'}`}
            aria-pressed={isResearch}
            onClick={() => onAudienceChange('research')}
          >
            {researchLabel}
          </button>
        </div>
        <div className="home-entry-form">
          <HomeAuthForm audience={audience} />
        </div>
      </div>
    </section>
  );
}

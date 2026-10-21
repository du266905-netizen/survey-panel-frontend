import { HumanManifesto } from '../components/HomeLegacySections';
import HomeFilmSection from '../components/HomeFilmSection';
import './OurApproach.css';

/* Our approach — the film frame, then the human manifesto.
   The two sections that used to open this page (ResearchQuestion,
   ResearchNetwork) were moved to src/_archive/our-approach on 22 Oct 2026. */

export default function OurApproach() {
  return (
    <main className="home-continuation approach-page">
      <HomeFilmSection />
      <HumanManifesto headingLevel="h2" />
    </main>
  );
}

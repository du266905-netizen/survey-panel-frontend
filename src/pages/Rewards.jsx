import { useLanguage } from '../components/LanguageContext';
import HomeRewardCards from '../components/HomeRewardCards';
import './Rewards.css';

/* Public rewards page: the three reward cards, ready for more content later.
   The member wallet stays at /wallet; this page is the public front door. */

export default function Rewards() {
  const { publicCopy } = useLanguage();
  const copy = publicCopy.home;
  return (
    <main className="rewards-page">
      <section className="rewards-hero" aria-labelledby="rewards-title">
        <h1 id="rewards-title">{copy.rewardsTitle}</h1>
        <p>{copy.rewardsBody}</p>
      </section>
      <section className="rewards-cards" aria-label={copy.rewardsLabel}>
        <HomeRewardCards cards={copy.rewardCards} />
      </section>
    </main>
  );
}

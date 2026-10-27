import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import { careersCopy } from './Careers';
import skyImage from '../assets/careers/sky.jpg';
import './JobDetail.css';

/* Job detail — template, 2026-10-28.

   Structure follows the owner's reference: a photograph band with one line on
   it, then back link, role name, location and the apply action. The body — the
   description itself — has no copy yet, so it is not rendered; the slot is
   noted in the code where it goes. */

const chrome = {
  'zh-CN': {
    line: '平等、包容、开放创新的高效性组织',
    back: '返回职位列表',
    apply: '申请该职位',
  },
  'zh-Hant': {
    line: '平等、包容、開放創新的高效性組織',
    back: '返回職位列表',
    apply: '申請該職位',
  },
  'en-US': {
    line: 'An equal, inclusive, and innovative high-performing organization.',
    back: 'Back to jobs',
    apply: 'Apply for this role',
  },
  'en-GB': {
    line: 'An equal, inclusive, and innovative high-performing organization.',
    back: 'Back to jobs',
    apply: 'Apply for this role',
  },
};

export default function JobDetail() {
  const { language } = useLanguage();
  const { slug } = useParams();
  const copy = careersCopy[language] || careersCopy['en-US'];
  const t = chrome[language] || chrome['en-US'];
  const role = copy.roles.items.find((item) => item.slug === slug);

  usePageTitle(role ? role.name : copy.roles.title);

  return (
    <main className="careers-page job-detail-page">
      <PublicSiteHeader />

      <section className="job-hero">
        <img src={skyImage} alt="" decoding="async" />
        <p className="job-hero-line">{t.line}</p>
      </section>

      <section className="job-head">
        <div className="careers-container">
          <Link className="job-back" to={withLanguage('/careers', language)}>
            <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
            {t.back}
          </Link>

          <div className="job-head-row">
            <div>
              <h1 className="job-title">{role ? role.name : copy.roles.title}</h1>
              {role && (
                <p className="job-meta">
                  <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
                  {role.meta}
                </p>
              )}
            </div>
            {role && (
              <a className="job-apply" href={`mailto:careers@guanyi-media.com?subject=${encodeURIComponent(role.name)}`}>
                {t.apply}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* The description goes here: duties, requirements, process. No copy yet. */}

      <HomeFooter />
    </main>
  );
}

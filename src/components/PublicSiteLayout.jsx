import { HomeFooter } from './HomeLegacySections';
import PublicSiteHeader from './PublicSiteHeader';

export default function PublicSiteLayout({ children }) {
  return (
    <div className="public-site-layout">
      <PublicSiteHeader />
      {children}
      <HomeFooter />
    </div>
  );
}

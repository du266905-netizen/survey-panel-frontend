import { Outlet, useLocation } from 'react-router-dom';
import BusinessTopNav from '../components/BusinessTopNav';
import './BusinessSettingsLayout.css';

/* Settings used to mount the fixed left rail and their own reduced top bar.
   The workspace has one top navigation now, so the frame is the same as Home
   and Projects: top nav, then the page's own content column. Nothing inside
   the pages changed — this file only replaced the chrome around them. */
function activeIdFor(pathname) {
  if (pathname.startsWith('/business/team')) return 'team';
  if (pathname.startsWith('/business/billing')) return 'billing';
  if (pathname.startsWith('/business/budget')) return 'budget';
  return 'account';
}

export default function BusinessSettingsLayout() {
  const { pathname } = useLocation();

  return (
    <main className="business-workspace business-settings-frame">
      <BusinessTopNav activeId={activeIdFor(pathname)} />
      {/* The account-page class carries the content styles. It sits on the pane,
          not on <main>, so its "first child header" rules cannot reach the top
          navigation and restyle it. */}
      <div className="business-account-page business-account-pane">
        <Outlet />
      </div>
    </main>
  );
}

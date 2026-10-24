/* Public navigation — content only, one place to edit.

   The four top-level groups are fixed by the owner (2026-10-22):
   About us / Solutions / Industries / Support. Which pages sit under them is
   still being decided, so treat every item below as a temporary placement.
   `items: []` renders the label without a panel. Industries opened on
   2026-10-24 with automotive; the other sectors are still unclassified.

   English is the source language for now; the labels move into the language
   library in a later pass. */
export const publicNavigation = [
  {
    id: 'about',
    label: 'About us',
    items: [
      { to: '/about', title: 'About GuanyiSearch', note: 'Who we are' },
      { to: '/our-approach', title: 'Our approach', note: 'People first, evidence second' },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      { to: '/business', title: 'Market research', note: 'Studies for product, brand and market entry' },
      { to: '/china-market-insights', title: 'China market insights', note: 'Local context and expression' },
      { to: '/how-it-works', title: 'How it works', note: 'The panel, the standard, the process' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    items: [
      { to: '/industries/automotive', title: 'Automotive & transportation', note: 'Vehicles, dealers, buyers' },
      { to: '/industries/luxury', title: 'Luxury & lifestyle', note: 'Affluent buyers, brands, travel' },
      { to: '/industries/consumer', title: 'Consumer & retail', note: 'Category, shelf, basket' },
      { to: '/industries/healthcare', title: 'Healthcare & life sciences', note: 'Patients, clinicians, access' },
      { to: '/industries/finance', title: 'Financial services & wealth', note: 'Trust, pricing, retention' },
      { to: '/industries/social', title: 'Social & education', note: 'Access, delivery, evidence' },
    ],
  },
  {
    id: 'participants',
    label: 'Participants',
    items: [
      { to: '/register', title: 'Join as a participant', note: 'Take part in thoughtful, paid research' },
      { to: '/partners', title: 'Available surveys', note: 'Find a study that fits your profile' },
      { to: '/rewards', title: 'Rewards', note: 'Coins, gift cards and redemptions' },
      { to: '/contact', title: 'Contact us', note: 'Talk to the research team' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      { to: '/news', title: 'News Wall', note: 'A daily brief on the market' },
      { to: '/privacy', title: 'Privacy', note: 'How we handle your information' },
      { to: '/terms', title: 'Terms', note: 'Participation terms' },
    ],
  },
];

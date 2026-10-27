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
    /* One page now, so the label is the link: no panel, no chevron. */
    id: 'about',
    label: 'About us',
    to: '/about',
    items: [],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    /* 2026-10-26 定稿：左栏七个研究对象（市场 → 人 → 产品 → 品牌 → 渠道 →
       客户），右栏三个方法。没有独立页面的项先指向最接近的现有页；
       页面做好后只改这里的 `to`，组件不用动。
       2026-10-27：进入市场、定性、定量、了解受众已各自成页。
       `id` 是文案键：chromeCopy 里按它取译文，缺译文时回落这里的英文。 */
    sections: [
      {
        id: 'research',
        label: 'Research',
        items: [
          { id: 'market-entry', to: '/solutions/market-entry', title: 'Market entry', note: 'Size, audience and route to market' },
          { id: 'china-insights', to: '/china-market-insights', title: 'China insights', note: 'What we see in China, and how we deliver' },
          { id: 'audience', to: '/solutions/audience', title: 'Audience understanding', note: 'Who buys, why, and how they split' },
          { id: 'product-pricing', to: '/solutions/product-pricing', title: 'Product & pricing', note: 'Concepts, packs and price points' },
          { id: 'brand-comms', to: '/solutions/brand-comms', title: 'Brand & communications', note: 'Brand health, advertising and campaigns' },
          { id: 'channel-retail', to: '/solutions/channel-retail', title: 'Channel & retail', note: 'Shelf, listing and price execution' },
          { id: 'customer-experience', to: '/solutions/customer-experience', title: 'Customer experience', note: 'Why customers leave, and what keeps them' },
        ],
      },
      {
        id: 'methods',
        label: 'Methods',
        items: [
          { id: 'qualitative', to: '/solutions/qualitative', title: 'Qualitative', note: 'Interviews, groups and observation' },
          { id: 'quantitative', to: '/solutions/quantitative', title: 'Quantitative', note: 'Surveys, trackers and sizing' },
          { id: 'mixed', to: '/solutions/mixed', title: 'Mixed methods', note: 'Both, in one design' },
        ],
      },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    items: [
      { to: '/industries/automotive', title: 'Automotive', note: 'Vehicles, dealers, buyers' },
      { to: '/industries/travel', title: 'Travel & transportation', note: 'Destinations, booking, stay' },
      { to: '/industries/consumer', title: 'Retail & FMCG', note: 'Category, pack, shelf' },
      { to: '/industries/healthcare', title: 'Healthcare & life sciences', note: 'Patients, clinicians, access' },
      { to: '/industries/finance', title: 'Financial services & wealth', note: 'Trust, pricing, retention' },
      { to: '/industries/social', title: 'Social & education', note: 'Access, delivery, evidence' },
      { to: '/industries/industrial', title: 'Industrial & building products', note: 'Dealers, specification, projects' },
      { to: '/industries/tech', title: 'Technology & digital', note: 'Roadmap, pricing, retention' },
      { to: '/industries/media', title: 'Media & entertainment', note: 'Audience, content, advertising' },
      { to: '/industries/ecommerce', title: 'E-commerce & shopper', note: 'Platform, listing, basket' },
    ],
  },
  {
    id: 'participants',
    label: 'Participants',
    items: [
      { to: '/register', title: 'Join as a participant', note: 'Take part in thoughtful, paid research' },
      { to: '/partners', title: 'Available surveys', note: 'Find a study that fits your profile' },
      { to: '/rewards', title: 'Rewards', note: 'Coins, gift cards and redemptions' },
      { to: '/news', title: 'News Wall', note: 'A daily brief on the market' },
      { to: '/contact', title: 'Contact us', note: 'Participant support' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      { to: '/privacy', title: 'Privacy', note: 'How we handle your information' },
      { to: '/terms', title: 'Terms', note: 'Participation terms' },
      { to: '/business/terms', title: 'Researcher terms', note: 'Terms for organisations and researchers' },
    ],
  },
];

import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'catalog-promo',
    eyebrow: 'Funky social bookmarking and profile surfacing',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'sbm',
    featuredTaskKeys: ['sbm', 'profile', 'article'],
  },
  navigation: {
    variant: 'capsule',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})

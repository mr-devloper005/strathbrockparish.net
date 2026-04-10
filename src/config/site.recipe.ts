import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'curation-warm',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'floating-bar',
  footerTemplate: 'editorial-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'sbm',
  enabledTasks: ['listing', 'classified', 'article', 'image', 'profile', 'sbm'],
  taskTemplates: {
    listing: 'listing-showcase',
    classified: 'classified-market',
    article: 'article-journal',
    image: 'image-portfolio',
    profile: 'profile-business',
    sbm: 'sbm-library',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}

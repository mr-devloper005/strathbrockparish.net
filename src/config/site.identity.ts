export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'strathbrockparish',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Strathbrok Parish',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Social bookmarking and profile board',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A funky social bookmarking and profile-driven discovery board for browsing curated links, useful resources, and public identity surfaces without changing the underlying multi-task platform logic.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'strathbrockparish.net',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://strathbrockparish.net',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

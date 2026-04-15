import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

import { AppProviders } from '@/components/app-providers'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()
  const hasLeftSidebarNav = true

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        data-nav-layout={hasLeftSidebarNav ? 'sidebar-left' : 'topbar'}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}${hasLeftSidebarNav ? ' factory-left-nav' : ''}`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

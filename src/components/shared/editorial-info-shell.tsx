import type { ReactNode } from 'react'
import Link from 'next/link'

import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

/** Warm cream / tan editorial palette aligned with the home editorial footer. */
export const editorialInfoTone = {
  page: 'min-h-screen bg-[linear-gradient(180deg,#fffdf0_0%,#fff7ea_36%,#f5ebe0_100%)] text-[#1a120c]',
  heroBand: 'border-b border-[#e5d5c6] bg-[#fffdfa]/85 backdrop-blur-[2px]',
  kicker: 'text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a68b6a]',
  title: 'mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#1a120c] sm:text-5xl lg:text-[3.25rem]',
  lead: 'mt-5 max-w-2xl text-base leading-8 text-[#5c4638]',
  panel:
    'rounded-[2rem] border border-[#e5d5c6] bg-[#fffdfa] p-6 shadow-[0_24px_60px_rgba(106,72,48,0.07)] sm:p-8 lg:p-9',
  soft: 'rounded-[1.65rem] border border-[#ead9ca] bg-[#fff4e8] p-5 sm:p-6',
  softMuted: 'rounded-[1.65rem] border border-[#ead9ca] bg-[#fff8f0]/90 p-5',
  muted: 'text-[#5c4638]',
  sectionLabel: 'text-xs font-semibold uppercase tracking-[0.24em] text-[#a68b6a]',
  action:
    'inline-flex items-center justify-center gap-2 rounded-full bg-[#2f1d16] px-5 py-3 text-sm font-semibold text-[#fff4e4] transition-colors hover:bg-[#452920]',
  actionOutline:
    'inline-flex items-center justify-center gap-2 rounded-full border border-[#dcc8b7] bg-transparent px-5 py-3 text-sm font-semibold text-[#2f1d16] transition-colors hover:bg-[#f5e7d7]',
  inner: 'mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8',
  link: 'font-medium text-[#1a120c] underline decoration-[#c9a88a] decoration-2 underline-offset-4 hover:decoration-[#8b6d5a]',
  input:
    'h-12 w-full rounded-2xl border border-[#dcc8b7] bg-[#fffdfa] px-4 text-sm text-[#1a120c] outline-none ring-[#a68b6a]/25 placeholder:text-[#8b735f] focus:ring-2',
  textarea:
    'min-h-[168px] w-full rounded-2xl border border-[#dcc8b7] bg-[#fffdfa] px-4 py-3 text-sm text-[#1a120c] outline-none ring-[#a68b6a]/25 placeholder:text-[#8b735f] focus:ring-2',
} as const

const crossLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact us', href: '/contact' },
  { name: 'Help', href: '/help' },
  { name: 'Terms & policy', href: '/terms-and-policy' },
] as const

export type InfoCrosslinkId = 'about' | 'contact' | 'help' | 'terms-policy'

export function EditorialInfoShell({
  kicker,
  title,
  lead,
  actions,
  children,
}: {
  kicker?: string
  title: string
  lead?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={editorialInfoTone.page}>
      <NavbarShell />
      <main>
        <section className={editorialInfoTone.heroBand}>
          <div className={cn(editorialInfoTone.inner, 'pb-12 pt-10')}>
            {kicker ? <p className={editorialInfoTone.kicker}>{kicker}</p> : null}
            <h1 className={editorialInfoTone.title}>{title}</h1>
            {lead ? <p className={editorialInfoTone.lead}>{lead}</p> : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </section>
        <div className={cn(editorialInfoTone.inner, 'pb-20 pt-4 sm:pt-6')}>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export function InfoPageCrosslinks({ current }: { current: InfoCrosslinkId }) {
  return (
    <aside className="mt-16 grid gap-8 rounded-[2rem] border border-[#e5d5c6] bg-[#fffdfa]/90 p-8 shadow-[0_16px_48px_rgba(106,72,48,0.05)] md:grid-cols-2 md:gap-12">
      <div>
        <p className={editorialInfoTone.sectionLabel}>Priority lanes</p>
        <p className={`mt-3 text-sm leading-7 ${editorialInfoTone.muted}`}>
          Jump back into bookmarks, profiles, and the surfaces you use most. Everything stays one click away in the main
          navigation.
        </p>
        <Link href="/" className={`mt-5 inline-block text-sm ${editorialInfoTone.link}`}>
          Return home
        </Link>
      </div>
      <div>
        <p className={editorialInfoTone.sectionLabel}>More routes</p>
        <ul className="mt-4 space-y-2.5 text-sm">
          {crossLinks.map((item) => {
            const active =
              (current === 'about' && item.href === '/about') ||
              (current === 'contact' && item.href === '/contact') ||
              (current === 'help' && item.href === '/help') ||
              (current === 'terms-policy' && item.href === '/terms-and-policy')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-xl px-1 py-0.5 font-medium transition-colors',
                    active ? 'text-[#a68b6a]' : 'text-[#1a120c] hover:text-[#6b4f3a]',
                  )}
                >
                  {item.name}
                  {active ? <span className="ml-2 text-xs font-normal text-[#a68b6a]">(you are here)</span> : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

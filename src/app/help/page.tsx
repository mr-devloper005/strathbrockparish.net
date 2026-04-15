import Link from 'next/link'
import { ArrowRight, BookOpen, LifeBuoy, Search, Shield } from 'lucide-react'

import { HelpFaqPanel } from '@/app/help/help-faq-panel'
import { EditorialInfoShell, editorialInfoTone, InfoPageCrosslinks } from '@/components/shared/editorial-info-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const guides = [
  {
    icon: BookOpen,
    title: 'First session checklist',
    body: 'Confirm your profile, pick a primary lane (bookmarks, listings, or publishing), and save one resource you already trust.',
    href: '/sbm',
    cta: 'Open bookmarks',
  },
  {
    icon: Search,
    title: 'Search & discovery',
    body: 'Combine filters with plain language queries. If a result looks wrong, flag the URL when you contact support.',
    href: '/search',
    cta: 'Try search',
  },
  {
    icon: Shield,
    title: 'Safety & reporting',
    body: 'We remove spam, harassment, and illegal material. Keep copies of links or screenshots when you report an issue.',
    href: '/terms',
    cta: 'Read acceptable use',
  },
]

export default function HelpPage() {
  return (
    <EditorialInfoShell
      kicker="Help"
      title="Guides, guardrails, and answers—in plain language."
      lead={`Everything here is written for people using ${SITE_CONFIG.name} weekly, not engineers reading release notes. Start with a guide or jump into the FAQ.`}
      actions={
        <Link href="/contact" className={editorialInfoTone.action}>
          Contact support
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {guides.map((g) => (
          <div key={g.title} className={`${editorialInfoTone.soft} flex flex-col`}>
            <g.icon className="h-5 w-5 text-[#8b6d5a]" />
            <h2 className="mt-4 text-lg font-semibold text-[#1a120c]">{g.title}</h2>
            <p className={`mt-2 flex-1 text-sm leading-7 ${editorialInfoTone.muted}`}>{g.body}</p>
            <Link href={g.href} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${editorialInfoTone.link}`}>
              {g.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className={editorialInfoTone.panel}>
          <div className="flex items-center gap-2 text-[#8b6d5a]">
            <LifeBuoy className="h-5 w-5" />
            <p className={editorialInfoTone.sectionLabel}>Frequently asked</p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1a120c]">Straight answers</h2>
          <p className={`mt-3 text-sm leading-7 ${editorialInfoTone.muted}`}>
            These entries replace older boilerplate. Expand a question to read the full response.
          </p>
          <div className="mt-6">
            <HelpFaqPanel />
          </div>
        </div>

        <div className="space-y-5">
          <div className={editorialInfoTone.soft}>
            <p className={editorialInfoTone.sectionLabel}>Still stuck?</p>
            <h3 className="mt-2 text-xl font-semibold text-[#1a120c]">Send us the page URL</h3>
            <p className={`mt-3 text-sm leading-7 ${editorialInfoTone.muted}`}>
              Screenshots and steps to reproduce beat vague descriptions. We route technical issues separately from editorial questions so nothing gets lost.
            </p>
            <Link href="/contact" className={`mt-5 inline-flex ${editorialInfoTone.action}`}>
              Write to the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className={`${editorialInfoTone.softMuted} text-sm leading-7 ${editorialInfoTone.muted}`}>
            <p className="font-semibold text-[#1a120c]">Service note</p>
            <p className="mt-2">
              Live status for infrastructure lives on the{' '}
              <Link href="/status" className={editorialInfoTone.link}>
                status page
              </Link>{' '}
              when enabled for your deployment.
            </p>
          </div>
        </div>
      </div>

      <InfoPageCrosslinks current="help" />
    </EditorialInfoShell>
  )
}

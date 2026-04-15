import Link from 'next/link'
import { ArrowRight, FileText, Gavel, Lock, Scale } from 'lucide-react'

import { EditorialInfoShell, editorialInfoTone, InfoPageCrosslinks } from '@/components/shared/editorial-info-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const commitments = [
  {
    icon: Scale,
    title: 'Fair rules',
    body: 'Our terms describe what you may publish, how disputes are handled, and when we remove content. They are written to be readable in one sitting.',
  },
  {
    icon: Lock,
    title: 'Privacy by design',
    body: 'We collect what we need to operate the service, explain why it exists, and avoid burying surprises in legal appendices.',
  },
  {
    icon: Gavel,
    title: 'Regional respect',
    body: 'Where local regulations apply, we aim to surface the right controls and notices. Tell us if something should be clearer for your jurisdiction.',
  },
]

const checklists = [
  {
    title: 'Before you publish',
    items: ['You have the rights to the text, images, and links you upload.', 'Contact details point to real inboxes or phone lines.', 'You understand the acceptable use rules in the Terms.'],
  },
  {
    title: 'Your privacy choices',
    items: ['Review what data we process in the Privacy policy.', 'Use Settings to manage marketing preferences when available.', 'Contact us for access or deletion requests where applicable.'],
  },
]

export default function TermsAndPolicyPage() {
  return (
    <EditorialInfoShell
      kicker="Terms & policy"
      title="One calm doorway into everything legal."
      lead={`Use this page when you need the big picture. The detailed documents for ${SITE_CONFIG.name} are linked below—each opens in the same warm layout as the rest of the site.`}
      actions={
        <>
          <Link href="/terms" className={editorialInfoTone.action}>
            Terms of service
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/privacy" className={editorialInfoTone.actionOutline}>
            Privacy policy
          </Link>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {commitments.map((c) => (
          <div key={c.title} className={editorialInfoTone.soft}>
            <c.icon className="h-5 w-5 text-[#8b6d5a]" />
            <h2 className="mt-3 text-lg font-semibold text-[#1a120c]">{c.title}</h2>
            <p className={`mt-2 text-sm leading-7 ${editorialInfoTone.muted}`}>{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {checklists.map((block) => (
          <div key={block.title} className={editorialInfoTone.panel}>
            <div className="flex items-center gap-2 text-[#8b6d5a]">
              <FileText className="h-5 w-5" />
              <p className={editorialInfoTone.sectionLabel}>{block.title}</p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5c4638]">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a68b6a]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mt-12 ${editorialInfoTone.panel}`}>
        <h2 className="text-xl font-semibold text-[#1a120c] sm:text-2xl">Related policies</h2>
        <p className={`mt-2 text-sm ${editorialInfoTone.muted}`}>Cookies, licensing, and other notices stay linked from the footer for quick access.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/cookies" className={editorialInfoTone.actionOutline}>
            Cookie notice
          </Link>
          <Link href="/licenses" className={editorialInfoTone.actionOutline}>
            Licenses
          </Link>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-[#a68b6a]">Last updated · April 15, 2026</p>
      </div>

      <InfoPageCrosslinks current="terms-policy" />
    </EditorialInfoShell>
  )
}

import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

import { EditorialInfoShell, editorialInfoTone, InfoPageCrosslinks } from '@/components/shared/editorial-info-shell'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { SITE_CONFIG } from '@/lib/site-config'

function contactLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: MapPin, title: 'Listings & coverage', body: 'Ask about new categories, geography coverage, or verification for your business surface.' },
      { icon: Phone, title: 'Partnerships', body: 'Bulk onboarding, sponsored placements, and co-marketing for local discovery programmes.' },
      { icon: Clock, title: 'Response window', body: 'We typically reply within two working days for operational questions.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: Mail, title: 'Editorial & pitches', body: 'Essays, guest columns, and publication timing—send a short outline and your best headline idea.' },
      { icon: MessageCircle, title: 'Reader feedback', body: 'Tell us when typography, contrast, or navigation gets in the way of reading.' },
      { icon: Clock, title: 'Response window', body: 'We aim to acknowledge editorial notes within three working days.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: MessageCircle, title: 'Creator desk', body: 'Gallery placements, licensing questions, and visual feature requests.' },
      { icon: Mail, title: 'Press & kits', body: 'Request logos, screenshots, and talking points for coverage.' },
      { icon: Clock, title: 'Response window', body: 'Visual enquiries are triaged within two working days.' },
    ]
  }
  return [
    { icon: MessageCircle, title: 'Bookmarks & curation', body: 'Collections, import help, and profile-linked boards—tell us what you are trying to organise.' },
    { icon: Mail, title: 'Community programmes', body: 'Workshops, shared shelves, and parish-friendly rollouts.' },
    { icon: Clock, title: 'Response window', body: 'We reply within two working days for most requests.' },
  ]
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = contactLanes(productKind)

  return (
    <EditorialInfoShell
      kicker="Contact us"
      title="We read every message—especially the long, specific ones."
      lead={`Describe what you are trying to publish, fix, or explore on ${SITE_CONFIG.name}. The more context you share, the faster we can route you to the right person.`}
      actions={
        <Link href="/help" className={editorialInfoTone.actionOutline}>
          Browse Help first
        </Link>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-start">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <div key={lane.title} className={editorialInfoTone.soft}>
              <lane.icon className="h-5 w-5 text-[#8b6d5a]" />
              <h2 className="mt-3 text-lg font-semibold text-[#1a120c]">{lane.title}</h2>
              <p className={`mt-2 text-sm leading-7 ${editorialInfoTone.muted}`}>{lane.body}</p>
            </div>
          ))}
          <div className={`rounded-[1.65rem] border border-dashed border-[#dcc8b7] bg-[#fffdfa]/80 p-5`}>
            <p className={`text-sm leading-7 ${editorialInfoTone.muted}`}>
              Prefer email? Use the form—your message arrives in the same inbox we monitor for operational requests. We do not publish your note without permission.
            </p>
          </div>
        </div>

        <div className={editorialInfoTone.panel}>
          <h2 className="text-xl font-semibold text-[#1a120c] sm:text-2xl">Send a message</h2>
          <p className={`mt-2 text-sm ${editorialInfoTone.muted}`}>All fields help us respond with something useful, not a template.</p>
          <form className="mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-[#1a120c]">
                Name
                <input className={editorialInfoTone.input} name="name" autoComplete="name" placeholder="Your full name" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-[#1a120c]">
                Email
                <input
                  className={editorialInfoTone.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-[#1a120c]">
              Topic
              <input className={editorialInfoTone.input} name="topic" placeholder="e.g. Listing verification, partnership, bug on /help" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-[#1a120c]">
              Message
              <textarea
                className={editorialInfoTone.textarea}
                name="message"
                placeholder="Include URLs, screenshots, or deadlines. The more detail, the better we can help."
              />
            </label>
            <button type="submit" className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ${editorialInfoTone.action}`}>
              <Send className="h-4 w-4" />
              Send message
            </button>
          </form>
        </div>
      </div>

      <InfoPageCrosslinks current="contact" />
    </EditorialInfoShell>
  )
}

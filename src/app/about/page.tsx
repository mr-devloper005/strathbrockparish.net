import Link from 'next/link'
import { ArrowRight, BookMarked, Compass, HeartHandshake, Sparkles, Users } from 'lucide-react'

import { EditorialInfoShell, editorialInfoTone, InfoPageCrosslinks } from '@/components/shared/editorial-info-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    icon: Compass,
    title: 'Calm discovery',
    body: 'We bias toward clear hierarchy, generous spacing, and typography you can read for more than a few seconds—so you spend less time fighting the interface.',
  },
  {
    icon: BookMarked,
    title: 'Curated knowledge',
    body: 'Bookmarks, collections, and profiles work together so teams can capture what matters and pass it on without losing context in a noisy feed.',
  },
  {
    icon: Users,
    title: 'People at the centre',
    body: 'Whether you are publishing, listing, or saving links, the experience is built around real humans: contributors, readers, and local communities.',
  },
]

const milestones = [
  { year: '2024', title: 'Foundation', detail: 'Launched the first unified surfaces for publishing, discovery, and saved resources.' },
  { year: '2025', title: 'Broader lanes', detail: 'Expanded tasks for listings, classifieds, and richer profile storytelling.' },
  { year: '2026', title: 'Polish & trust', detail: 'Tightened accessibility, legal clarity, and navigation so priority routes stay obvious.' },
]

export default function AboutPage() {
  return (
    <EditorialInfoShell
      kicker="About"
      title={`${SITE_CONFIG.name} is built for slow, trustworthy browsing—not endless novelty.`}
      lead={`We combine editorial calm with practical tools so ${SITE_CONFIG.name} can serve parishes, creators, and local organisations without feeling like a generic dashboard.`}
      actions={
        <>
          <Link href="/contact" className={editorialInfoTone.action}>
            Talk with us
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/team" className={editorialInfoTone.actionOutline}>
            Meet the team
          </Link>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className={editorialInfoTone.panel}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ead9ca] bg-[#fff4e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a5c4a]">
            <Sparkles className="h-3.5 w-3.5" />
            Our story
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#1a120c] sm:text-3xl">Why this site exists</h2>
          <p className={`mt-4 text-sm leading-8 sm:text-base ${editorialInfoTone.muted}`}>
            Modern platforms often optimise for urgency. We optimise for clarity: fewer competing calls to action, honest descriptions of what each lane does, and navigation that respects your attention.
          </p>
          <p className={`mt-4 text-sm leading-8 sm:text-base ${editorialInfoTone.muted}`}>
            {SITE_CONFIG.name} hosts structured content—articles, bookmarks, listings, and more—so visitors can move from inspiration to action without wading through unrelated noise.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Lanes shipped', 'Multi-task'],
              ['Focus', 'Editorial rhythm'],
              ['Support', 'Human answers'],
            ].map(([label, value]) => (
              <div key={label} className={editorialInfoTone.softMuted}>
                <p className={editorialInfoTone.sectionLabel}>{label}</p>
                <p className="mt-2 text-lg font-semibold text-[#1a120c]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {pillars.map((item) => (
            <div key={item.title} className={editorialInfoTone.soft}>
              <item.icon className="h-5 w-5 text-[#8b6d5a]" />
              <h3 className="mt-3 text-lg font-semibold text-[#1a120c]">{item.title}</h3>
              <p className={`mt-2 text-sm leading-7 ${editorialInfoTone.muted}`}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-14">
        <p className={editorialInfoTone.sectionLabel}>How we have grown</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1a120c] sm:text-3xl">Milestones, not vanity metrics</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {milestones.map((m) => (
            <div key={m.year} className={editorialInfoTone.panel}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a68b6a]">{m.year}</p>
              <h3 className="mt-3 text-xl font-semibold text-[#1a120c]">{m.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${editorialInfoTone.muted}`}>{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className={`${editorialInfoTone.panel} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ead9ca] bg-[#fff4e8]">
              <HeartHandshake className="h-6 w-6 text-[#8b6d5a]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1a120c] sm:text-2xl">Partner with us thoughtfully</h2>
              <p className={`mt-2 max-w-xl text-sm leading-7 ${editorialInfoTone.muted}`}>
                If you represent a parish, charity, or community initiative, we are happy to discuss how this platform can reflect your voice—without compromising accessibility or readability.
              </p>
            </div>
          </div>
          <Link href="/contact" className={`shrink-0 self-start md:self-center ${editorialInfoTone.action}`}>
            Open contact
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <InfoPageCrosslinks current="about" />
    </EditorialInfoShell>
  )
}

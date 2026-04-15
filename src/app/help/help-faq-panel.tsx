'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const helpFaqs = [
  {
    id: 'start',
    question: 'How do I get oriented on the site?',
    answer:
      'Use the left navigation for your primary tasks—bookmarks, profiles, and publishing lanes. The footer groups legal pages and support. Search is always available from the top bar when your layout includes it.',
  },
  {
    id: 'account',
    question: 'Where do I manage my account and security?',
    answer:
      'Open Settings from your profile menu to update contact details, adjust preferences, and review security options. If you cannot sign in, use the password recovery link on the login page.',
  },
  {
    id: 'bookmarks',
    question: 'How do bookmarks and collections work?',
    answer:
      'Save links into collections so your team can reuse trusted resources. Collections can be shared or kept personal depending on how you configure them when you publish.',
  },
  {
    id: 'listings',
    question: 'How are listings and classifieds reviewed?',
    answer:
      'Submissions should describe real services or items accurately. We may remove content that violates our acceptable use rules or looks misleading. See the Terms page for the full list.',
  },
  {
    id: 'privacy',
    question: 'What data do you collect when I browse?',
    answer:
      'We collect the data needed to run the service—account details, usage signals that keep the product reliable, and optional analytics where enabled. Read the Privacy policy for categories and retention.',
  },
  {
    id: 'contact',
    question: 'When should I email instead of using Help?',
    answer:
      'Use Help for how-to questions. Use Contact us for partnership inquiries, billing issues, or anything that needs a direct conversation with our team.',
  },
  {
    id: 'accessibility',
    question: 'Do you support keyboard and screen reader use?',
    answer:
      'We aim for sensible focus order, visible labels on controls, and readable contrast on core flows. If something blocks you, tell us via Contact us with the page URL and browser so we can fix it.',
  },
  {
    id: 'updates',
    question: 'How will I know about product changes?',
    answer:
      'Major updates appear in the blog or announcements when enabled for your site. Legal changes are reflected on the Terms and Privacy pages with a refreshed “last updated” date.',
  },
]

export function HelpFaqPanel() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {helpFaqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-[#ead9ca]">
          <AccordionTrigger className="text-left text-[#1a120c] hover:no-underline">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-[#5c4638]">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

import { div, h2, ul, li, a, p, shadow, sheet, slot, hr } from "../ellipsi.js"
import styleReset from "./styleReset.js"

// Attached to a shadow root
const profileStyles = sheet({
  ul: {
    margin: 0,
  },
  li: {
    display: 'inline',
  },
  'li + li::before': {
    content: '" ∘ "', // Quotations needed in CSS must be double-quoted
  },
  hr: {
    marginBlock: '0.5rem',
  },
})

export default function (name, bio, pronouns, link) {
  // Remove protocol from link name if the protocol is https
  const linkName = link?.replace('https://', '')

  // Parse the bio string as rich HTML
  const RichBio = p({ slot: 'bio' })
  RichBio.innerHTML = bio

  return div(
    RichBio,  // Hidden by shadow DOM and then inserted into a slot
    shadow(
      styleReset,
      profileStyles,
      h2(name || 'Unnamed User'),
      ul(
        pronouns ? li(pronouns) : null,
        link ? li(a(linkName, { href: link })) : null,
      ),
      hr(),
      slot({ name: RichBio.slot }),
    ),
  )
}

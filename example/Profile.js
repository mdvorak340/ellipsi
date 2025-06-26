import { div, h2, ul, li, a, p } from "../ellipsi.min.js"

export default function Profile(name, bio, pronouns, link) {
  const linkDisplay = link?.replace('https://', '')

  return div({ class: 'profile' },
    h2(name || 'UNNAMED USER'),
    ul({ class: 'inline' },
      pronouns ? li(pronouns) : null,
      link ? li(a(linkDisplay, { href: link })) : null,
    ),
    p(bio),
  )
}

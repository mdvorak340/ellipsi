import { input, output, p, a, on, fieldset, legend, form, textarea, h2, ul, li, label, button } from '../ellipsi.min.js'

export default function ProfileForm() {
  // Easy but bad way to create unique IDs between different instances
  const uniq = (id) => `${id}-${Date.now()}`

  const Name = input({
    id: uniq('name-input'),
    type: 'text',
    placeholder: 'My name is...',
  })

  const Pronouns = input({
    id: uniq('woke-input'),
    type: 'text',
    placeholder: 'My pronouns are...'
  })

  const Desc = textarea({
    id: uniq('desc-input'),
    placeholder: 'A little about me...',
  })

  const Link = input({
    id: uniq('link-input'),
    type: 'text',
    placeholder: 'my.website.com',
  })

  const TextDirectionRtl = input({
    id: uniq('rtl-input'),
    type: 'checkbox',
  })

  const Result = output({ id: uniq('result'), dir: 'ltr' })

  const SaveResult = button(
    'Copy as HTML',
    { type: 'button' },
    on('click', () => navigator.clipboard.writeText(Result.innerHTML)),
  )

  const update = (event) => {
    Result.setAttribute(
      'dir',
      TextDirectionRtl.checked ? 'rtl' : 'ltr',
    )
    Result.replaceChildren(
      h2(Name.value || 'Jane Deer'),
      ul(
        { class: 'inline' },
        Pronouns.value ? li(Pronouns.value) : null,
        Link.value ? li(a(Link.value, { href: 'https://' + Link.value })) : null,
      ),
      p(Desc.value),
    )
  }

  update()
  return form(
    { class: 'profile' },
    on('keydown', update),
    on('input', update),
    fieldset(
      legend('Input'),
      Name,
      Desc,
      Pronouns,
      Link,
      TextDirectionRtl,
      label('Right-to-Left text', { for: TextDirectionRtl.id }),
    ),
    fieldset(
      legend('Output'),
      Result,
      SaveResult,
    ),
  )
}

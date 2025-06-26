import { input, output, on, fieldset, legend, form, textarea, button } from '../ellipsi.min.js'
import Profile from './Profile.js'

export default function ProfileForm() {
  const Name = input({
    type: 'text',
    placeholder: 'My name is...',
  })

  const Pronouns = input({
    type: 'text',
    placeholder: 'My pronouns are...'
  })

  const Bio = textarea({
    spellcheck: 'false',
    placeholder: 'A little about me...',
  })

  const Link = input({
    type: 'text',
    placeholder: 'https://my.website.com',
  })

  const Result = output()

  const SaveResult = button(
    'Copy as HTML',
    { type: 'button' },
    on('click', () => navigator.clipboard.writeText(Result.innerHTML)),
  )

  const updateForm = () => {
    let validUrl = null

    if (Link.value) {
      try {
        const _ = new URL(Link.value) // Throws on invalid URL
        validUrl = Link.value
        Link.classList.remove('invalid')
      } catch {
        Link.classList.add('invalid')
      }
    } else {
      Link.classList.remove('invalid')
    }

    Result.replaceChildren(
      Profile(Name.value, Bio.value, Pronouns.value, validUrl)
    )
  }

  updateForm()
  return form({ class: 'profile-form' },
    on('keydown', updateForm),
    on('input', updateForm),
    fieldset({ class: 'input' },
      legend('Input'),
      Name,
      Bio,
      Pronouns,
      Link,
    ),
    fieldset({ class: 'output' },
      legend('Output'),
      Result,
      SaveResult,
    ),
  )
}

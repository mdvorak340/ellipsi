import { input, output, on, fieldset, legend, form, textarea, button, sheet, shadow, div } from '../ellipsi.js'
import Profile from './Profile.js'
import styleReset from './styleReset.js'

// Attached to a shadow root
const profileFormStyles = sheet({
  fieldset: {
    padding: '1rem',
    marginBlock: '1rem',
  },
  'input[type="text"], textarea': {
    width: '100%',
    display: 'block',
    marginBlock: '0.5rem',
    font: '0.8rem monospace',
    padding: '0.2rem',
  },
  textarea: {
    minHeight: '5rem',
    resize: 'vertical',
  },
  form: {
    display: 'grid',
    gap: '1rem',
    gridTemplate: '"in out" 1fr / 1fr 1fr',
  },
  'input.invalid': {
    textDecoration: 'underline 1px wavy #c44',
  },
  'fieldset.output': {
    display: 'grid',
    gap: '1rem',
    gridTemplate: '"out" 1fr "btn" min-content / 1fr',
  },
})

export default function () {
  // Form inputs
  const NameIn = input({
    type: 'text',
    placeholder: 'My name is...',
  })
  const PronounsIn = input({
    type: 'text',
    placeholder: 'My pronouns are...'
  })
  const BioIn = textarea({
    spellcheck: 'false',
    placeholder: 'A little about me...',
  })
  const LinkIn = input({
    type: 'text',
    placeholder: 'https://my.website.com',
  })

  // Form outputs
  const ResultOut = output()

  // Form buttons
  const SaveResultBtn = button(
    'Copy as HTML',
    { type: 'button' },
    on('click', () => navigator.clipboard.writeText(ResultOut.innerHTML)),
  )

  // Event handler to update the form based on use input
  const updateForm = () => {
    let validUrl = null

    if (LinkIn.value) {
      try {
        const _ = new URL(LinkIn.value) // Throws on invalid URL
        validUrl = LinkIn.value
        LinkIn.classList.remove('invalid')
      } catch {
        LinkIn.classList.add('invalid')
      }
    } else {
      LinkIn.classList.remove('invalid')
    }

    ResultOut.replaceChildren(
      Profile(NameIn.value, BioIn.value, PronounsIn.value, validUrl)
    )
  }

  updateForm() // Init the form by firing the event handler function once
  return div(
    // Container div only hosts the shadow
    shadow(
      styleReset,
      profileFormStyles,
      form(
        on('keydown input', updateForm),
        fieldset(
          legend('Input'),
          NameIn,
          BioIn,
          PronounsIn,
          LinkIn,
        ),
        fieldset(
          { class: 'output' },
          legend('Output'),
          ResultOut,
          SaveResultBtn,
        ),
      ),
    ),
  )
}

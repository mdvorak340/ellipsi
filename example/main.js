// Warning: the use of shadow roots in this example is overkill but good as a
// demonstration.  When I first made this example, the components Profile
// and ProfileForm simply where given classes, and then those classes where
// styled in a CSS file along with everything else.

import { h1, p, a, span, button, on, sheet } from '../ellipsi.js'
import ProfileForm from './ProfileForm.js'
import styleReset from './styleReset.js'

// This is a constant reference to a specific element
const ProfileContainer = span()
// When we append this reference to another element and then change this
// element, the change will be reflected inside the other element

const Document = [
  h1('Ellipsi Demo'),
  p('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis urna nibh, sed luctus nunc pretium a. Integer vel convallis arcu, nec fringilla ante. Pellentesque molestie cursus est. Phasellus in nisi vitae dui vehicula aliquam. Aliquam laoreet fermentum libero vel convallis.'),
  p(
    "View ",
    a('the sacred texts', { href: 'https://www.spidersge.org' }),
    '!',
  ),
  button(
    'Make a new profile',
    // This Event listener references our same constant, but appends a
    // *different* ProfileForm each time
    on('click', () => ProfileContainer.prepend(ProfileForm())),
  ),
  ProfileContainer,
]

// It is not advised to create most sheets in this way (only for shadow DOMs
// and special cases) but for the purposes of this example we will not use any
// CSS files
const styles = sheet({
  body: {
    maxWidth: '65ch',
    minHeight: '100vh',
    marginInline: 'auto',
    padding: '1rem',
    lineHeight: 1.5,
  },
  p: {
    marginBlock: '1rem',
  },
  button: {
    padding: '0.5rem',
  },
})

document.adoptedStyleSheets.push(styleReset)
document.adoptedStyleSheets.push(styles)
document.body.replaceChildren(...Document)

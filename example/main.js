import { h1, p, a, span, button, on } from '../ellipsi.min.js'
import ProfileForm from './ProfileForm.js'

const ProfileContainer = span()

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
    on('click', () => ProfileContainer.prepend(ProfileForm())),
  ),
  ProfileContainer,
]

document.body.replaceChildren(...Document)

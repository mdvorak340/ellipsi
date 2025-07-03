import { sheet } from "../ellipsi.js"

// A resuable stylesheet created and used in JavaScript.
export default sheet({
  '*': {
    boxSizing: 'border-box',
    fontWeight: 'normal',
    padding: 0,
    margin: 0,
  },
  a: {
    color: '#44c',
    textDecoration: 'none',
  },
  'a:hover': {
    textDecoration: 'underline 1px solid currentcolor',
  },
  strong: {
    fontWeight: 'bold',
  },
  'ul, ol': {
    marginLeft: '2ch',
  },
})
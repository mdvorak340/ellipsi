# Ellipsi

`Ellipsi` is a simple JavaScript library used to create HTML tags
programmatically.

```js
const MyButton = button(
  'Click me!',                          // Add child elements,
  on('click', () => alert('Clicked~')), // event listeners,
  { id: 'my-button' },                  // and attributes.
)
```

## Using Ellipsi

`Ellipsi` has one primary function: `tag(name, ...children)`.  This function
is used to create elements of the type `HTMLElement` with clean syntax.

```js
const Heading = tag('h1', 'Tutorial') // <h1>Tutorial</h1>
```

Shortcuts are provided for most HTML elements, in the form:

```js
// Shortcut function:
const h1 = (...x) => tag('h1', ...x)
// Using shortcut:
const Heading = h1('Tutorial')
```

Many different things can be passed to `tag` as children --- text, attributes,
event handlers, even other tags.

```js
const MyTextInput = input({ id: 'my-text-input' })

const MyForm = form(
  label('Write your name:', { for: MyTextInput.id }),
  MyTextInput,
  button(
    'Greet',
    { type: 'button' },
    on('click', () => alert('Hello, ' + MyTextInput.value))
  ),
)
```

## Installing Ellipsi

Install the library using `npm` with:

    npm install ellipsi

Alternatively, download the library directly from
[here](https://raw.githubusercontent.com/mdvorak340/ellipsi/refs/heads/main/ellipsi.js)
and the minimized version from
[here](https://raw.githubusercontent.com/mdvorak340/ellipsi/refs/heads/main/ellipsi.min.js).

Then, in your JavaScript module:

```js
import { tag, on, h1, p /* et cetera */ } from 'ellipsi.js'
// Minimized version:
import { tag, on, h1, p /* et cetera */ } from 'ellipsi.min.js'
```

## Function Reference

### `tag(name, ...children)`

While the `name` of the tag should be a string, the `children` given to `tag`
can be of many different types.  These types will be handled as such:

1.  `string`: Converted to `Text` and attached to the new tag as a child.
2.  `Attr`: Cloned and attached to the new tag as an attribute.
2.  `EventListener`: Attached to the new tag using
    `HTMLElement.addEventListener()`.
3.  `Object`: Parsed as a collection of key/value pairs representing
    attributes (e.g. `{ id: 'my-id', class: 'my-class' }`).
4.  `HTMLElement`: Attached to the new tag as a child.

> [!WARNING]
>
> `tag` does not clone the `HTMLElement`s passed to it --- attaching the same
> one multiple times will simply move it around.
>
> ```js
> // Improper reusable component:
> const MyName = span('Mozzie', { class: 'fancy' })
>
> const AboutMe = section(
>   h1('About ', MyName), // Name will not appear here
>   p('Heya!  I am ', MyName), // Instead, it will be moved here
> )
> ```
> ```html
> <section>
>   <h1>About </h1>
>   <p>Heya! I am <span class="fancy">Mozzie</span></p>
> </section>
> ```
>
> An `HTMLElement` can be cloned with `HTMLElement.cloneNode(true)`, though
> this does *not* preserve event listeners, and so is often bad practice.
>
> To avoid this, it is best to turn reusable components into functions that
> return a new element entirely.  Reserve constant elements for times when you
> intead to be referencing the same exact instance of an element in different
> places, such as an input in a form who's value will be used later.
>
> ```js
> // Proper reusable component:
> const MyName = () => span('Mozzie', { class: 'fancy' })
>
> const AboutMe = section(
>   h1('About ', MyName()), // Unique element
>   p('Heya!  I am ', MyName()), // Unique element
> )
> ```
> ```html
> <section>
>   <h1>About <span class="fancy">Mozzie</span></h1>
>   <p>Heya! I am <span class="fancy">Mozzie</span></p>
> </section>
> ```

### `on(type, callback)`

`EventListener`s can be created using the `on(type, callback)` function.
`type` is a string representing the event name, and `callback` is the callback
function that takes one (optional) argument:  The triggering `Event`.

```js
// Ellipsi code:
const MeowButton = button('Click to meow', on('click', meow))
// Equivalent js code:
const MeowButton = document.createElement('button')
MeowButton.appendChild(document.createTextNode('Click to meow'))
MeowButton.addEventListener('click', meow)
```

### `attr(key, ...values)`

If you don't like JavaScript Object Notation or need to use JavaScript's
built-in `Attr` class to represent your HTML attributes, `attr` is provided
as shorthand.

If multiple values are given for an attribute, they will be joined with spaces.

```js
// Ellipsi code:
const Link = a(
  'The wisdom of Georg',
  attr('href', 'https://www.spidersge.org'),
)
// Equivalent js code:
const href = document.createAttribute('href')
href.value = 'https://www.spidersge.org'
const Link = document.createElement('a')
Link.appendChild(document.createTextNode('The wisdom of Georg'))
Link.setAttributeNode(href.cloneNode())
```

> [!NOTE]
>
> Typically, it is expected for you to use JSON to append attritubes instead of
> the `attr` function.
>
> ```js
> // Ellipsi code (with JSON attributes):
> const Link = a(
>   'The wisdom of Georg',
>   { href: 'https://www.spidersge.org' },
> )
> ```

## Example

Provided in the `./example/` directory.

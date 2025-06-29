# Ellipsi

`Ellipsi` is a simple JavaScript library used to create HTML tags
programmatically.

```js
const MyButton = button(
  'Click me!',                         // Add child elements,
  on('click', () => alert('Clicked')), // event listeners,
  { id: 'my-button' },                 // and attributes.
)
```

## Using Ellipsi

`Ellipsi` has one primary function: `tag(name, ...children)`.  This function
is used to create elements of the type `HTMLElement` with a clean syntax.

```js
const Heading = tag('h1', 'Tutorial')
// -> <h1>Tutorial</h1>
```

Shortcuts are provided for most HTML elements, in the form:

```js
// Shortcut function:
const h1 = (...x) => tag('h1', ...x)
// Using shortcut:
const Heading = h1('Tutorial')
// -> <h1>Tutorial</h1>
```

Many different things can be passed to `tag` as children --- text, attributes,
event handlers, other tags, and arrays.

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
can be of many different types.  These will be handled as such:

4.  `HTMLElement`: Attached to the new tag as a child.
2.  `Attr`: Cloned and attached to the new tag as an attribute.
2.  `EventListener`: Attached to the new tag using
    `HTMLElement.addEventListener()`.
3.  `Object`: Parsed as a collection of key/value pairs representing
    attributes (e.g. `{ id: 'my-id', class: 'my-class' }`).
1.  `Array`: Flattened and handled as above.
1.  All else will be converted to `Text` and attached to the new tag as a
    child.

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
>
> The above results in:
>
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
> It is best to turn reusable components into functions that return a new
> element entirely.  Reserve constant elements for times when you intend to be
> referencing an exact instance of an element in different places, such as an
> input in a form who's value will be used later.
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
>
> The above results in:
>
> ```html
> <section>
>   <h1>About <span class="fancy">Mozzie</span></h1>
>   <p>Heya! I am <span class="fancy">Mozzie</span></p>
> </section>
> ```

### `on(types, callback)`

`EventListener`s can be created using the `on(types, callback)` function.
`types` is a string representing the triggering event name(s) separated by
spaces, and `callback` is the callback function that takes one (optional)
argument:  The triggering `Event`.

```js
// Ellipsi code:
const UserInputForm = form(FormContent, on('click keydown', handleInput))
// Equivalent js code:
const UserInputForm = document.createElement('form')
UserInputForm.replaceChildren(...FormContent)
UserInputForm.addEventListener('click', handleInput)
UserInputForm.addEventListener('keydown', handleInput)
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
> You can also use JSON to append attritubes instead of the `attr`
> function.
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

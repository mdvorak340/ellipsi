/**
 * Creates an HTML tag.  Many helper functions are provided as shortcuts for
 * creating commmon elements (see the example).
 * @param {string} name The tag name.
 * @param {...string | HTMLElement | Attr | EventContainer} children The
 * children/attributes/event handlers of the tag.  `HTMLElement`s are cloned as
 * is, `Attr`s are cloned and attached to the tag itself, `EventContainer`s are
 * attached via `addEventListener`, and all else is converted to `Text` nodes.
 * @returns {HTMLElement} The created HTML tag.
 * @example
 * 
 *     const elementArray = [
 *       // Simple usage.
 *       tag('h1', 'A Header'),
 *       tag('p', 'A Paragraph'),
 *       // Using built-in helper functions.
 *       ul(
 *         li('A List Item'),
 *         li('A List Item'),
 *         li('A List Item', ' with multiple text nodes'),
 *       ),
 *       p(
 *         'Here\'s a ',
 *         a(
 *           'hyperlink with an attribute',
 *           attr('href', 'https://www.spidersge.org'),
 *         ),
 *       ),
 *       button(
 *         'Click me!',
 *         on('click', () => alert('Clicked!')),
 *         attr('type', 'button'),
 *       ),
 *     ];
 * 
 *     // Defining custom helper functions.
 *     const main = (...x) => tag('main', ...x);
 *     const app = main(...elementArray);
 */
export const tag = (name, ...children) => {
  const node = document.createElement(name);

  const safeChildren = children
    .map((child) => child instanceof HTMLElement ? child.cloneNode(true) :
                    child instanceof Attr ? node.setAttributeNode(child.cloneNode()) :
                    child instanceof EventContainer ? node.addEventListener(child.type, child.fn) :
                    document.createTextNode(child))
    .filter((child) => child !== null && child !== undefined);

  node.replaceChildren(...safeChildren);
  return node;
}

/**
 * Creates an HTML attribute.  Some helper functions are provided as shortcuts
 * for creating commmon attributes (see the example).  Due to namespace
 * restrictions, `class` is shortcuted as `className` and `for` as `forId`.
 * @param {string} key The attribute name.
 * @param {string} value The attribute value.
 * @returns {Attr} The attribute node.
 * @example
 * 
 *     // Simple usage.
 *     const a1 = tag('a', 'An anchor tag', attr('href', 'https://example.com'));
 *     // Using built-in helper functions.
 *     const a2 = tag('a', 'An anchor tag', href('https://example.com'));
 *     // Defining custom helper functions.
 *     const download = (v) => attr('download', v);
 *     const a3 = tag('a', 'An anchor tag', download('some-file.txt'));
 */
export const attr = (key, value) => {
  const node = document.createAttribute(key);
  node.value = value;
  return node;
}

/**
 * @callback eventCallback
 * @param {Event} [event] The triggering event, if any.
 * @returns {undefined}
 */

/**
 * An event container.  Serves only to represent a type-function pair for a
 * potential `tag.addEventListener(type, function)`.
 */
class EventContainer {
  /**
   * @param {string} type The event type.
   * @param {eventCallback} fn The callback function.
   */
  constructor(type, fn) {
    this.type = type;
    this.fn = fn;
  }
}

/**
 * Creates an event container.  Many helper functions are provided as shortcuts
 * for creating commmon event containers (see the example).
 * @param {string} type The event type.
 * @param {eventCallback} fn The callback function.
 * @returns {EventContainer} The event container.
 * @example
 *
 *     // Simple usage.
 *     const b1 = tag('button', 'Click me', on('click', () => alert('foo')));
 *     // Using built-in helper functions.
 *     const b2 = tag('button', 'Click me', onclick(() => alert('foo')));
 *     // Defining custom helper functions.
 *     const oncustomevent = (fn) => on('customevent', fn);
 *     const b3 = tag('button', 'Click me', oncustomevent(() => alert('foo')));
 */
export const on = (type, fn) => {
  return new EventContainer(type, fn);
}

export const h1 = (...x) => tag('h1', ...x);
export const h2 = (...x) => tag('h2', ...x);
export const h3 = (...x) => tag('h3', ...x);
export const h4 = (...x) => tag('h4', ...x);
export const h5 = (...x) => tag('h6', ...x);
export const h6 = (...x) => tag('h6', ...x);
export const a = (...x) => tag('a', ...x);
export const b = (...x) => tag('b', ...x);
export const br = (...x) => tag('br', ...x);
export const button = (...x) => tag('button', ...x);
export const code = (...x) => tag('code', ...x);
export const dd = (...x) => tag('dd', ...x);
export const div = (...x) => tag('div', ...x);
export const dl = (...x) => tag('dl', ...x);
export const dt = (...x) => tag('dt', ...x);
export const em = (...x) => tag('em', ...x);
export const fieldset = (...x) => tag('fieldset', ...x);
export const figcaption = (...x) => tag('figcaption', ...x);
export const figure = (...x) => tag('figure', ...x);
export const form = (...x) => tag('form', ...x);
export const hr = (...x) => tag('hr', ...x);
export const i = (...x) => tag('i', ...x);
export const img = (...x) => tag('img', ...x);
export const input = (...x) => tag('input', ...x);
export const label = (...x) => tag('label', ...x);
export const legend = (...x) => tag('legend', ...x);
export const li = (...x) => tag('li', ...x);
export const ol = (...x) => tag('ol', ...x);
export const p = (...x) => tag('p', ...x);
export const pre = (...x) => tag('pre', ...x);
export const q = (...x) => tag('q', ...x);
export const s = (...x) => tag('s', ...x);
export const section = (...x) => tag('section', ...x);
export const select = (...x) => tag('select', ...x);
export const span = (...x) => tag('span', ...x);
export const strong = (...x) => tag('strong', ...x);
export const sub = (...x) => tag('sub', ...x);
export const sup = (...x) => tag('sup', ...x);
export const table = (...x) => tag('table', ...x);
export const td = (...x) => tag('td', ...x);
export const textarea = (...x) => tag('textarea', ...x);
export const th = (...x) => tag('th', ...x);
export const tr = (...x) => tag('tr', ...x);
export const u = (...x) => tag('u', ...x);
export const ul = (...x) => tag('ul', ...x);
export const main = (...x) => tag('main', ...x);
export const search = (...x) => tag('search', ...x);

export const id = (v) => attr('id', v);
export const className = (v) => attr('class', v);
export const style = (v) => attr('style', v);
export const type = (v) => attr('type', v);
export const href = (v) => attr('href', v);
export const rel = (v) => attr('rel', v);
export const target = (v) => attr('target', v);
export const forId = (v) => attr('for', v);
export const download = (v) => attr('download', v);

export const onclick = (fn) => on('click', fn);
export const onchange = (fn) => on('change', fn);
export const oninput = (fn) => on('input', fn)
export const onselect = (fn) => on('select', fn)
export const onsubmit = (fn) => on('submit', fn)
export const onkeydown = (fn) => on('keydown', fn)
export const onkeyup = (fn) => on('keyup', fn)
export const onmousedown = (fn) => on('mousedown', fn)
export const onmousemove = (fn) => on('mousemove', fn)
export const onmouseover = (fn) => on('mouseover', fn)
export const onmouseup = (fn) => on('mouseup', fn)
export const onwheel = (fn) => on('wheel', fn)
export const onmouseout = (fn) => on('mouseout', fn)
export const ondrag = (fn) => on('drag', fn)
export const ondragend = (fn) => on('dragend', fn)
export const ondragenter = (fn) => on('dragenter', fn)
export const ondragleave = (fn) => on('dragleave', fn)
export const ondragover = (fn) => on('dragover', fn)
export const ondragstart = (fn) => on('dragstart', fn)
export const ondrop = (fn) => on('drop', fn)
export const onscroll = (fn) => on('scroll', fn)
export const oncopy = (fn) => on('copy', fn)
export const oncut = (fn) => on('cut', fn)
export const onpaste = (fn) => on('paste', fn)

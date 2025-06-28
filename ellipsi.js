/**
 * Creates an HTML tag.  Many helper functions are provided as shortcuts for
 * creating commmon elements.
 * @param {string} name The tag name.
 * @param {...string | HTMLElement | Attr | EventListener | Object} children
 * The children of the tag.  Handles different types differently:
 *
 * 1. `string`s are converted to `Text` and appended to the tag.
 * 2. `HTMLElement`s are appended as is (Not cloned).
 * 3. `Attr`s are cloned and then attached to the tag itself.
 * 4. `EventListener`s are attached to the tag itself.
 * 5. `Object`s are parsed as lists of HTML attribute key/value pairs and
 *    attached to the tag itself.
 *
 * @returns {HTMLElement} The created HTML tag.
 */
export const tag = (name, ...children) => {
  const htmlTag = document.createElement(name)

  const sanitize = (dirty) => dirty
    .map((child) => child instanceof HTMLElement ? child :
                    child instanceof Attr ? handleAttributeNode(htmlTag, child) :
                    child instanceof EventListener ? htmlTag.addEventListener(child.type, child.callback) :
                    child instanceof Array ? sanitize(child) :
                    child?.constructor === Object ? handleAttributeObject(htmlTag, child) :
                    child === null || child === undefined ? null :
                    document.createTextNode(child))
    .filter((child) => child !== null && child !== undefined)

  htmlTag.replaceChildren(...sanitize(children).flat())
  return htmlTag
}

/**
 * Adds an attribute node to a tag safely.
 * @param {HTMLElement} htmlTag The HTML tag.
 * @param {Attr} attrNode The HTML attribute.
 * @returns {undefined}
 */
const handleAttributeNode = (htmlTag, attrNode) => {
  if (htmlTag.hasAttribute(attrNode.name)) {
    const currentValue = htmlTag.getAttribute(attrNode.name)
    htmlTag.setAttribute(attrNode.name, currentValue + ' ' + attrNode.value)
  } else {
    htmlTag.setAttributeNode(attrNode.cloneNode())
  }
}

/**
 * Adds attributes to a tag from a JSON object.
 * @param {HTMLElement} htmlTag The HTML tag.
 * @param {Object} attrObj The attributes as a JSON object.
 * @returns {undefined}
 */
const handleAttributeObject = (htmlTag, attrObj) => {
  Object.keys(attrObj).forEach((key) => {
    const newValue = attrObj[key] instanceof Array ? attrObj[key].join(' ') :
                     attrObj[key]

    if (htmlTag.hasAttribute(key)) {
      const currentValue = htmlTag.getAttribute(key)
      htmlTag.setAttribute(key, currentValue + ' ' + newValue)
    } else {
      htmlTag.setAttribute(key, newValue)
    }
  })
}

/**
 * Creates an HTML attribute.
 * @param {string} key The attribute name.
 * @param {...string} values The attribute value(s).
 * @returns {Attr} The attribute node.
 */
export const attr = (key, ...values) => {
  const node = document.createAttribute(key)
  node.value = values.join(' ')
  return node
}

/**
 * @callback eventCallback
 * @param {Event} [event] The triggering event, if any.
 * @returns {undefined}
 */

/**
 * An event container.  Serves only to represent a type/callback pair for a
 * potential `tag.addEventListener(type, callback)`.
 */
export class EventListener {
  /**
   * @param {string} type The event type.
   * @param {eventCallback} callback The callback function.
   */
  constructor(type, callback) {
    this.type = type
    this.callback = callback
  }
}

/**
 * Creates a number of event containers for a callback function.
 * @param {string} types The event types separated by spaces.
 * @param {eventCallback} callback The callback function.
 * @returns {[EventListener]} The event containers.
 */
export const on = (types, callback) => {
  return types.split(' ').map((type) => new EventListener(type, callback))
}

export const h1 = (...x) => tag('h1', ...x)
export const h2 = (...x) => tag('h2', ...x)
export const h3 = (...x) => tag('h3', ...x)
export const h4 = (...x) => tag('h4', ...x)
export const h5 = (...x) => tag('h6', ...x)
export const h6 = (...x) => tag('h6', ...x)
export const a = (...x) => tag('a', ...x)
export const b = (...x) => tag('b', ...x)
export const br = (...x) => tag('br', ...x)
export const button = (...x) => tag('button', ...x)
export const code = (...x) => tag('code', ...x)
export const dd = (...x) => tag('dd', ...x)
export const div = (...x) => tag('div', ...x)
export const dl = (...x) => tag('dl', ...x)
export const dt = (...x) => tag('dt', ...x)
export const em = (...x) => tag('em', ...x)
export const fieldset = (...x) => tag('fieldset', ...x)
export const figcaption = (...x) => tag('figcaption', ...x)
export const figure = (...x) => tag('figure', ...x)
export const form = (...x) => tag('form', ...x)
export const hr = (...x) => tag('hr', ...x)
export const i = (...x) => tag('i', ...x)
export const img = (...x) => tag('img', ...x)
export const input = (...x) => tag('input', ...x)
export const label = (...x) => tag('label', ...x)
export const legend = (...x) => tag('legend', ...x)
export const li = (...x) => tag('li', ...x)
export const ol = (...x) => tag('ol', ...x)
export const p = (...x) => tag('p', ...x)
export const pre = (...x) => tag('pre', ...x)
export const q = (...x) => tag('q', ...x)
export const s = (...x) => tag('s', ...x)
export const section = (...x) => tag('section', ...x)
export const select = (...x) => tag('select', ...x)
export const span = (...x) => tag('span', ...x)
export const strong = (...x) => tag('strong', ...x)
export const sub = (...x) => tag('sub', ...x)
export const sup = (...x) => tag('sup', ...x)
export const table = (...x) => tag('table', ...x)
export const td = (...x) => tag('td', ...x)
export const textarea = (...x) => tag('textarea', ...x)
export const th = (...x) => tag('th', ...x)
export const tr = (...x) => tag('tr', ...x)
export const u = (...x) => tag('u', ...x)
export const ul = (...x) => tag('ul', ...x)
export const main = (...x) => tag('main', ...x)
export const search = (...x) => tag('search', ...x)
export const footer = (...x) => tag('footer', ...x)
export const header = (...x) => tag('header', ...x)
export const caption = (...x) => tag('caption', ...x)
export const output = (...x) => tag('output', ...x)
export const details = (...x) => tag('details', ...x)
export const summary = (...x) => tag('summary', ...x)
export const samp = (...x) => tag('samp', ...x)
export const datalist = (...x) => tag('datalist', ...x)
export const option = (...x) => tag('option', ...x)
export const kbd = (...x) => tag('kbd', ...x)
export const time = (...x) => tag('time', ...x)
export const canvas = (...x) => tag('canvas', ...x)

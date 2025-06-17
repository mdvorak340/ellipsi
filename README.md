<!-- OK i lied it's actually HTML -->
<h1><code>dots</code>: an HTML Assembler</h1>
<p><code>dots</code> is a simple, dependency-free JavaScript library that can be used to create HTML
  content quickly.</p>
<figure>
  <pre><code class="language-javascript">const myButton = button(
  "Click me!",
  id("my-button"),
  onclick(() =&gt; alert("Hello, World!")),
)</code></pre>
</figure>
<hr>
<p>The library consists of 3 primary functions:</p>
<dl>
  <dt><code class="language-javascript">tag(name, ...children)</code></dt>
  <dd>The main function; used to create tags of the given name. The children can be other <code
      class="language-javascript">HTMLElement</code>s, attributes, event handlers, or plain strings.<figure>
      <pre><code class="language-javascript">tag("h1", "A Header")</code></pre>
      <pre><code class="language-javascript">tag("ul",
  tag("li", "A List Item"),
)</code></pre>
    </figure>
  </dd>
  <dt><code class="language-javascript">attr(key, value)</code></dt>
  <dd>Used to create HTML attributes (<code class="language-javascript">Attr</code>s). Takes a simple key/value pair of
    strings.<figure>
      <pre><code class="language-javascript">attr("href", "https://www.spidersge.org")</code></pre>
    </figure>
  </dd>
  <dt><code class="language-javascript">on(event, function)</code></dt>
  <dd>Used to create event handlers (of a custom class, <code class="language-javascript">EventContainer</code>). Takes
    the event name as a string (e.g. "click") and a callback function.<figure>
      <pre><code class="language-javascript">on("click", () =&gt; alert("Clicked!"))</code></pre>
    </figure>
  </dd>
</dl>
<p>There are also a large number of pre-defined helper functions for common tags, attributes, and events, such as:</p>
<table>
  <caption>A simple example using shortcut functions.</caption>
  <tr>
    <td>
      <pre><code class="language-javascript">const link = a(
  "Explanation of Cats",
  href("https://en.wikipedia.org/wiki/Cat"),
)
const app = main(
  h1("Example", style("color:#44c")),
  p("Here is a link: ", link),
  button("Click me!", onclick(() =&gt; alert("mrow"))),
)</code></pre>
    </td>
    <td>
      <pre><code class="language-html">&lt;main&gt;
  &lt;h1 style="color:#44c"&gt;Example&lt;/h1&gt;
  &lt;p&gt;
    Here is a link:
    &lt;a href="https://en.wikipedia.org/wiki/Cat"
       &gt;Explanation of Cats&lt;/a&gt;
  &lt;/p&gt;
  &lt;button&gt;Click me!&lt;/button&gt;
&lt;/main&gt;</code></pre>
    </td>
  </tr>
</table>
<hr>
<h2>Extended Example</h2>
<p><a href="https://mdvorak340.github.io/dots/">This</a> entire page is actually an example! But yea, <em>normally</em> I would not recommend writing your page like this
  — <code>dots</code> is intended to be used to write HTML procedurally, not declaratively.</p>
<p>Here is the page source:</p>
<figure>
  <pre><code class="language-javascript">// Initial imports.
import { button, caption, className, code, dd, dl, dt, em, figure, footer, h1, h2, hr, id, onclick, p, pre, style, table, td, tr } from '@mdvorak340/dots'

// Syntax highlighting; external package.
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)

// Some helper functions.
const jsCode = (...x) =&gt; code(className('language-javascript'), ...x)
const htmlCode = (...x) =&gt; code(className('language-html'), ...x)
const jsCodeBlock = (...x) =&gt; pre(jsCode(...x))
const htmlCodeBlock = (...x) =&gt; pre(htmlCode(...x))

// The contents of the &lt;dl /&gt;; contains the 3 important functions.
const dlContents = [
  dt(jsCode('tag(name, ...children)')),
  dd(
    'The main function; used to create tags of the given name.  The children',
    ' can be other ', jsCode('HTMLElement'), 's, attributes, event handlers,',
    ' or plain strings.',
    figure(
      jsCodeBlock('tag("h1", "A Header")'),
      jsCodeBlock(`tag("ul",\n  tag("li", "A List Item"),\n)`),
    ),
  ),
  dt(jsCode('attr(key, value)')),
  dd(
    'Used to create HTML attributes (', jsCode('Attr'), 's).  Takes a simple',
    ' key/value pair of strings.',
    figure(jsCodeBlock('attr("href", "https://www.spidersge.org")')),
  ),
  dt(jsCode('on(event, function)')),
  dd(
    'Used to create event handlers (of a custom class, ',
    jsCode('EventContainer'), ').  Takes the event name as a string (e.g.',
    ' "click") and a callback function.',
    figure(jsCodeBlock('on("click", () =&gt; alert("Clicked!"))')),
  ),
]

// The code &lt;table /&gt; comparing the JS to the generated HTML.
const tableOfCode = table(
  caption('A simple example using shortcut functions.'),
  tr(
    td(jsCodeBlock(`const link = a(\n  "Explanation of Cats",\n  href("https://en.wikipedia.org/wiki/Cat"),\n)\nconst app = main(\n  h1("Example", style("color:#44c")),\n  p("Here is a link: ", link),\n  button("Click me!", onclick(() =&gt; alert("mrow"))),\n)`)),
    td(htmlCodeBlock(`&lt;main&gt;\n  &lt;h1 style="color:#44c"&gt;Example&lt;/h1&gt;\n  &lt;p&gt;\n    Here is a link:\n    &lt;a href="https://en.wikipedia.org/wiki/Cat"\n       &gt;Explanation of Cats&lt;/a&gt;\n  &lt;/p&gt;\n  &lt;button&gt;Click me!&lt;/button&gt;\n&lt;/main&gt;`)),
  ),
)

// Fetch this file for use as the extended example.
const thisCode = await fetch('../src/scripts.js').then(resp =&gt; resp.text())

// The name of library, complete with stylization.
const libName = code('dots', className('fancy'))

const pageContent = [
  h1(libName, ': an HTML Assembler'),
  p(
    libName,
    ' is a simple, dependency-free JavaScript library that can be used to',
    ' create HTML content quickly.'
  ),
  figure(jsCodeBlock(`const myButton = button(\n  "Click me!",\n  id("my-button"),\n  onclick(() =&gt; alert("Hello, World!")),\n)`)),
  button(
    "Click me!",
    id("my-button"),
    onclick(() =&gt; alert("Hello, World!")),
  ),
  hr(),
  p('The library consists of 3 primary functions:'),
  dl(...dlContents),
  p(
    'There are also a large number of pre-defined helper functions for common',
    ' tags, attributes, and events, such as:',
  ),
  tableOfCode,
  hr(),
  h2('Extended Example'),
  p(
    'This entire page is actually an example!  But yea, ', em('normally'),
    ' I would not recommend writing your page like this — ', libName, ' is',
    ' intended to be used to write HTML procedurally, not declaratively.',
  ),
  p('Here is the page source:'),
  figure(jsCodeBlock(thisCode)),
  footer(p('by Mozzie Dvorak')),
]

// The main function of the program, not related to `dots`.
const main = () =&gt; {
  document.body.replaceChildren(...pageContent)
  console.log(document.body.innerHTML)
  hljs.highlightAll()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
</code></pre>
</figure>

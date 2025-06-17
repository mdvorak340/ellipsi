<!-- OK i lied it's actually HTML -->
<h1><code class="fancy">dots</code>: an HTML Assembler</h1>
<p><code class="fancy">dots</code> is a simple, dependency-free JavaScript library that can be used to create HTML
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
  <dd>The main function; used to create tags of the given name. The children can be either <code
      class="language-javascript">HTMLElement</code>s, attributes, event handlers, or plain strings.<figure>
      <pre><code class="language-javascript">tag("h1", "A Header")</code></pre>
      <pre><code class="language-javascript">tag("ul",
  tag("li", "A List Item"),
)</code></pre>
    </figure>
  </dd>
  <dt><code class="language-javascript">attr(key, ...values)</code></dt>
  <dd>Used to create HTML attributes (<code class="language-javascript">Attr</code>s). Takes a simple key/value pair of
    strings.<figure>
      <pre><code class="language-javascript">attr("href", "https://www.spidersge.org")</code></pre>
      <pre><code class="language-javascript">attr("class", "centered", "container")</code></pre>
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
<p><a target="_blank" href="https://mdvorak340.github.io/dots">This</a> entire page is actually an example! But yea, <em>normally</em> I would not recommend writing your page like this
  — <code class="fancy">dots</code> is intended to be used to write HTML procedurally, not declaratively.</p>

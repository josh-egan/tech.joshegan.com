Each code block on this page is editable. Feel free to modify the examples to try out different things.

## Headers

```html
<h1>Page Title</h1>
<h2>First Section</h2>
<h3>Sub Section 1</h3>
<h3>Sub Section 2</h3>
<h2>Second Section</h2>
<h3>Sub Section 3</h3>
<h4>Sub Sub</h4>
<h5>Sub Sub Sub</h5>
<h6>Sub Sub Sub Sub</h6>
```

## &lt;a&gt;

```html
<a href="https://duckduckgo.com/"
   title="The search engine that doesn't track you."
   target="_blank">
   <img src="DDG_Dax-01.svg"
        alt="DuckDuckGo Logo"
        height="50px"/>
   DuckDuckGo
</a>
```

## Lists

```html
List types:

<ul>
  <li>
    Ordered Lists
    <ol>
      <li>Learn HTML</li>
      <li>Learn CSS</li>
      <li>Learn JavaScript</li>
    </ol>
  </li>
  <li>
    Unordered Lists
    <ul><li>Milk</li><li>Eggs</li><li>Cheese</li></ul>
  </li>
  <li>
    Definition Lists
    <dl>
      <dt>HTML</dt><dd>HyperText Markup Language</dd>
      <dt>CSS</dt><dd>Cascading Style Sheets</dd>
    </dl>
  </li>
</ul>
```

## Character Entities

```html
<table>
  <tr><th>Entity Code</th><th>Entity</th></tr>
  <tr><td>&amp;amp;</td><td>&amp;</td></tr>
  <tr><td>&amp;lt;</td><td>&lt;</td></tr>
  <tr><td>&amp;gt;</td><td>&gt;</td></tr>
</table>
```

<style>
.renderedHtml {
  border: 1px dashed #777777;
  padding: 20px;
}
</style>

<script>
var elements = document.getElementsByClassName('language-html')
for(var i = 0; i < elements.length; i++) {
  var codeElement = elements[i]
  var preElement = codeElement.parentNode
  var container = preElement.parentNode

  codeElement.setAttribute('contentEditable', true)

  var renderedHtmlElement = document.createElement('div')
  renderedHtmlElement.className = 'renderedHtml'
  renderedHtmlElement.innerHTML = codeElement.textContent
  container.insertBefore(renderedHtmlElement, preElement.nextSibling)

  codeElement.onkeyup = handleKeyUpFactory(renderedHtmlElement, codeElement)
}

function handleKeyUpFactory(renderEl, codeEl) {
  return function() { renderEl.innerHTML = codeEl.textContent }
}
</script>

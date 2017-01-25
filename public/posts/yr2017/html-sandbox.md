Each code block on this page is editable. Feel free to modify the examples to try out different things.

## Mashup

```html
<ul>
  <li>
    <a href="https://app.pluralsight.com/paths/skills/html5">https://app.pluralsight.com/paths/skills/html5</a>
    <br />
    On a new line.
  </li>
  <li>
    <a href="http://validator.w3.org/">http://validator.w3.org/</a>
    On the same line.
  </li>
</ul>
```

## &lt;a&gt;

```html
<a href="https://duckduckgo.com/"
   title="The search engine that doesn't track you."
   target="_blank">
   <img src="DDG_Dax-01.svg"
        alt="DuckDuckGo Logo"
        height="30px"/>
   DuckDuckGo
</a>
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

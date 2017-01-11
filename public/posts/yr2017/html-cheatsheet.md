## HTML Resources

- https://app.pluralsight.com/paths/skills/html5
- http://www.w3schools.com/tags/default.asp
- https://www.w3.org/TR/html5/ (HTML5 spec)
- http://validator.w3.org/

## History of HTML

- In 1989, Tim Berners-Lee invented HyperText Markup Language (HTML).
- HTML was created to share research documents containing text, data, and images with links to other documents.
- HTML is a markup language meant to processed by the client application, typically a browser.

## Sample HTML5 Page

```html
<!DOCTYPE html>
<html>
<head>
  <base href="http://www.joshegan.com/" target="_blank">

  <title>My Page Title</title>

  <meta charset="UTF-8" />
  <meta name="description" content="HTML Cheatsheet" />
  <meta name="keywords" content="HTML,HTML5" />
  <meta name="author" content="Josh Egan" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="stylesheet" type="text/css" href="/styles/my-styles.css" />

  <script async  src="//cse.google.com/adsense/search/async-ads.js"></script>`
  <script src="/path/to/script.js"></script>
</head>
<body>

  <h1>HTML Cheatsheet</h1>
  <h2>HTML Resources</h2>

  <ul>
    <li>
      <a href="https://app.pluralsight.com/paths/skills/html5">https://app.pluralsight.com/paths/skills/html5</a>
    </li>
    <li>
      <a href="http://validator.w3.org/">http://validator.w3.org/</a>
    </li>
  </ul>

  <h2>Sample HTML5 Page</h2>



  <script defer type="text/javascript">
    window.alert("the page has been loaded!")
  </script>
  <!-- this is a comment -->
  <!--
    Comments can
    be multiline
  -->
</body>
</html>
```

## HTML tags

### Anatomy of an HTML Tag

- Angle brackets (`<`, `>`) are used to indicate the beginning and end of a tag.
- The name of the tag comes immediately after the opening angle bracket `<`.
- An html tag has an opening tag and a closing tag. The closing tag begins with a forward slash `/`. For example, `<body></body>`.
- Tags can include attributes. An attribute is specified after the name of the tag and before the closing angle bracket. Some attributes are binary and do not require a value. For attributes that do require a value, the attribute value is defined using an `=` followed by the value surrounded by double quotes `"`. For example, `<script async src="script.js"></script>`
- A shorthand syntax where the forward slash is included at the end of the opening tag can sometimes be used when a tag has no content. For example, `<meta charset="UTF-8" />`

### Block vs. inline

Block elements are container elements for grouping other elements together. They may contain other block elements and inline elements.

Block elements include:
- `<div>`

Inline elements are for text and links that should be displayed inline. Inline elements cannot contain block elements, but they can contain inline elements.

Inline elements include:
- `<span>`
- `<a>`
- `<p>`

### Whitespace

Whitespace in the source code is generally ignored in HTML. However, whitespace is respected within the `<pre>` tag.

The `<br/>` tag can be used to force a line break.

#### Character entities

Character entities can be used to define whitespace and other characters that have special meaning in HTML.

The most common character entities have names, but the most robust way of referencing them is by number. The numbers are supported by more browsers.

- `&nbsp;` non-breaking space. Two words separated by a non-breaking space will not break into a new line. This can be useful when a line break might be disruptive. e.g. 10&nbsp;mph. (Resize the page and you'll see that you won't get a line break between the 10 and the mph.)
- `&#8209;` non-breaking hyphen (`-`)
- `&amp;` ampersand (`&`)
- `&lt;` less than. (`<`)
- `&gt;` greater than. (`>`)

Character entity references:
- https://dev.w3.org/html5/html-author/charref
- https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references

### HTML Tags Reference

For a more thorough reference, see http://www.w3schools.com/tags/default.asp

Tag | Example | Notes
--- | --- | ---
`<!DOCTYPE>` | `<!DOCTYPE html>` | HTML5 uses `<!DOCTYPE html>`. See [this page](https://www.w3.org/QA/2002/04/valid-dtd-list.html) for others.
`<html>` | `<html></html>` | The html tag is the root element for the page. There can only be one per page.
`<head>` | `<head></head>` | The head tag contains document metadata. The information contained in the `<head>` is used by browsers and search engines.
`<base>` | `<base href="//joshegan.com/" target="_blank">` | The base tag is used inside the `head` tag to define the base url to be used for all links on the page and/or the default target for all hyperlinks on the page. This can be useful for setting the base to the root of the site regardless of which page you are currently on.
`<title>` | `<title>My Page Title</title>` | Used inside the `<head>` tag. Sets the title for the page.
`<meta>` | `<meta charset="UTF-8">`<br/>`<meta name="description" content="HTML Cheatsheet">` | Used inside the `<head>` tag. Use the meta tag to set metadata about the document. You can use many of these tags to define multiple pieces of metadata.
`<style>` | `<style> h1 {color:red;} </style>`| Use the style tag inside the `head` tag to define inline styles. Generally, using this tag is not a good idea.
`<link>` | `<link rel="stylesheet" type="text/css" href="theme.css">` | The link tag is used inside the `head` tag to reference external stylesheets.
`<script>` | `<script type="text/javascript"> window.alert("hello!") </script>`<br/>`<script async src="path/to/script.js"></script>` | The script tag is used to reference a JavaScript file or to define JavaScript inline. This tag can be used in the `<head>` or `<body>` tags. If the `src` attribute is used, the script tag must be empty. The `type` attribute is optional in HTML5. The `async` attribute will tell the browser to load the script asynchronously. The `defer` attribute will tell the page to load the script after the page has finished parsing.
`<body>` | `<body></body>` | The body tag contains the document data. The tags within the `<body>` tag will be displayed in the browser.
`<h1>` | `<h1>Page Title</h1>` | The h1 tag defines the primary heading for the page. There should only be one h1 tag on a page. This tag is used by search engines.
`<h2>` `<h3` `<h4>` `<h5>` `<h6>` | `<h2>Sub Section 1</h2>`<br/>`<h3>Part 1</h3>`<br/>`<h3>Part 2</h3>`<br/>`<h4>2.1</h4>`<br/>`<h4>2.2</h4>` | The sub headings h2, h3, h4, h5, and h6 should be used semantically to indicate subsections within subsections.
`<div>` | `<div id="container" class="mainContainer"></div>` | The div tag is the most commonly used block element for displaying content sections, or content divisions, within a page.
`<p>` | `<p>The quick brown fox</p>` | The p tag defines a paragraph. It is unique in that it is displayed as a block element but it cannot contain other block elements.
`<pre>` | `<pre>`<br/>`This formatting`<br/>`is preserved.`<br/>`</pre>` | The pre tag is used for preformatted text. It will preserve whitespace from the source code.
`<br/>` | `<br/>` | The br tag is used for explicit line breaks.
`<hr/>` | `<hr/>` | The hr tag is used to define a horizontal rule, or a horizontal line that will be displayed on the page.
`<span>` | `<span class="emphasize">some text</span> | The span element is an inline element that is typically used for applying a style to a short span of text.
`<sup>` | `<sup>citation</sup> | The sup tag is used to make a superscript.
`<sub>` | `H<sub>2</sub>O` | The sub tag is used to make a subscript.
`<abbr>` | `<abbr title="HyperText Markup Language">HTML</abbr>` | The abbr tag is used for abbrevations or acronyms. The title attribute will be displayed on hover.
`<code>` | `<code>let a = x + y</code>` | The code tag is used to indicate code snippets. Used in combination with the `<pre>` tag, it can be used for a code block.
`<blockquote>` | `<blockquote cite="https://www.lds.org/scriptures/nt/matt/7.12?lang=eng#11">Therefore all things whatsoever ye would that men should do to you, do ye even so to them: for this is the law and the prophets.</blockquote>` | Use the blockquote tag to define a section that is quoted from another source.
`<q>` | `<q>It was the best of times.</q>` | Use the q tag for inline quotes.

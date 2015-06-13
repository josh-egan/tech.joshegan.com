When I started building this blog, I knew that one of the tools I wanted to use was markdown. I didn't know much about markdown, and I've learned a fair amount about it over the past few weeks. I thought I'd try to collect my thoughts into a post about what I've learned so far.

[According to Wikipedia](https://en.wikipedia.org/wiki/Markdown), markdown was created in 2004 by John Gruber. Well, as is so often the case, Wikipedia is right. John's post about markdown can be found [here](http://daringfireball.net/projects/markdown/). He describes his purpose of wanting to write documents using a syntax that is 'as readable as possible'. I'm in favor of readable documents. Count me in.

I was surprised to find that there are various flavors of markdown. The original markdown syntax is [described on John's website](http://daringfireball.net/projects/markdown/syntax). The flavor that I have been using for a while now, the flavor which provided my introduction to markdown, is [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/). I also recently discovered [CommonMark](https://github.com/jgm/CommonMark) syntax, which is an attempt to standardize markdown syntax. This can be extremely valuable when it comes to edge cases. I'll have more to say on this later.

So what makes them different? The original syntax supports basic functionality. GitHub flavored markdown introduces additional functionality (and also some special features available on github.com). CommonMark goes even further and supports a wide array of edge cases and specific syntax scenarios. The various compilers for each syntax provide variations as well.

One addition from GitHub flavored markdown that I would like to quickly point out is fenced code blocks. Since I write code, I use these frequently. The GitHub flavor allows us to write code in markdown like this:

    ```javascript
    function someFunction() {
      var alpha = "beta";
      return doSomething(alpha);
    }
    ```

Each processor supports different features and syntax, so I've found myself using several sources of information for getting the syntax right for what I'm trying to accomplish. For best results, look at the docs for the processor you're using. These are some of the sources I've found helpful:

- Original markdown syntax
  - For the original markdown syntax, I found [this small cheatsheet complete with a playground](http://daringfireball.net/projects/markdown/dingus).
- GitHub flavored markdown
  - The GitHub Guide [Mastering Markdown](https://guides.github.com/features/mastering-markdown) page is pretty concise. It describes the core syntax and also what it adds using examples.
- CommonMark syntax
  - CommonMark has a [detailed spec sheet](http://spec.commonmark.org/) describing syntax and giving examples. This is not short, but it is thorough. I've found that a quick `Ctrl+F` will help me quickly find what I'm looking for.
  - CommonMark also [hosts a dingus](http://spec.commonmark.org/dingus/) for experimenting.
  - markdown-it has a [live demo](https://markdown-it.github.io/) that simultaneously demonstrates syntax and examples.

Now a note on CommonMark. To be clear, CommonMark is a syntax specification. The CommonMark people have a reference implementation in javascript called [commonmark.js](https://github.com/jgm/commonmark.js). Anyone can implement the CommonMark syntax. One such library is [markdown-it](https://github.com/markdown-it/markdown-it). In addition to supporting CommonMark syntax, markdown-it also comes with a bunch of additional enhancements, making it a nice option.

So now that we have the markdown syntax down and we're aware of some of the various markdown syntax specs that are out there, how do we render markdown to html? Well, there are several libraries out there for converting markdown into html. One of the most popular javascript libraries I've found is [marked](https://github.com/chjj/marked). Marked mostly follows the GitHub flavored markdown syntax. I used marked initially in my hand-rolled blog. [Harp is currently using marked internally](https://github.com/sintaxi/terraform/blob/release-v0.11.1/lib/template/processors/md.js#L3) for processing markdown. The syntax supported by marked has a few issues that are solved by CommonMark though. For example, composing multiple lists back to back ends up creating a single list. This issue led me to find [CommonMark](https://github.com/jgm/CommonMark) and subsequently [markdown-it](https://github.com/markdown-it/markdown-it). I have since implemented markdown-it [in a fork](https://github.com/josh-egan/terraform) of harp's pre-processing engine, and I'm using it to build this blog. <i class="fa fa-smile-o"></i>

Now that we've converted markdown into html, we're almost done. Let's make the code look beautiful. Syntax highlighting can be done using libraries such as [highlight.js](https://github.com/isagalaev/highlight.js), [rainbow](https://github.com/ccampbell/rainbow), [SyntaxHighlighter](https://github.com/syntaxhighlighter/syntaxhighlighter), [prism](https://github.com/PrismJS/prism), and [SHJS](http://shjs.sourceforge.net/). These libraries can all be used server side, and several can be used client side. For a static site, I think it makes the most sense to do the syntax highlighting at compile time, especially when it can be easily integrated into the markdown compiler. I chose to use highlight.js. Highlight.js can easily be integrated into marked or markdown-it as follows:

```js
var highlight = require('highlight.js');

function applySyntaxHighlighting (code, lang) {
  if (lang && highlight.getLanguage(lang))
    return highlight.highlight(lang, code).value;

  var result = highlight.highlightAuto(code);
  console.log("Code block language was not specified in markdown. Auto detected language: " + result.language);
  return result.value;
}
```

```js
var markdownIt = require("markdown-it")({
  highlight: applySyntaxHighlighting
});
```

```js
var marked = require("marked");
marked.setOptions({
  highlight: applySyntaxHighlighting
});
```

Excellent! I love good code.

If you came here hoping for answers, you might walk away with more questions. But hopefully this general overview of markdown and the libraries that support it will help you get a taste for what's available and where to start looking.

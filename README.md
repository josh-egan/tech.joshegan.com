# [tech.joshegan.com](http://tech.joshegan.com/)
This is the GitHub Pages site for [tech.joshegan.com](http://tech.joshegan.com/). The master branch contains the uncompiled site. The site is compiled using [Eleventy](https://www.11ty.dev/) and then deployed to the [gh-pages branch](https://github.com/josh-egan/tech.joshegan.com/tree/gh-pages) using [gh-pages](https://www.npmjs.com/package/gh-pages).

## Setup
The Node version is pinned in `.tool-versions` (works with [mise](https://mise.jdx.dev/) or asdf).

```bash
mise install
npm install
```

## Writing
```bash
npm start
```

This serves the site at http://localhost:8080 and rebuilds on changes. Drafts are listed on the home page only in this mode.

Posts are markdown files in `public/posts/<directory>/`. Each directory has a `_data.json` file with the metadata for its posts, keyed by file name. See the `sample` entry in each file for the available fields.

## Deploying
```bash
npm run deploy
```

This builds the production site into `dist/` and pushes it to the gh-pages branch.

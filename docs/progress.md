# Progress

## Eleventy migration (in progress)

Replaced the broken Harp/Gulp toolchain (Node 0.12) with Eleventy 3 on Node 24, on the `eleventy-migration` branch. The output was checked against the live site: page structure, code highlighting colors, and screenshots at desktop and mobile widths all match, apart from the intended changes below.

Intended changes from the live site:
- Footer shows a copyright line ("© 2015–<build year> Josh Egan") instead of the "built with" and "hosted on" attributions.
- Post titles link to the post, and post pages have a correct `og:url`. Both were empty in the Harp build.
- The author gravatar loads at 250px instead of a stretched 80px image.

Remaining steps:
- [ ] Review the site locally with `npm start`.
- [ ] Commit and merge `eleventy-migration` into master.
- [ ] Deploy with `npm run deploy`. The first deploy also publishes post edits made since April 2018, plus the draft pages `ubuntu-setup` and `out-of-the-tar-pit` (reachable by URL, not listed on the home page).

## After the migration

### Explore updating highlight.js
highlight.js is pinned to 8.9.1 (deprecated), the version the original site was built with. Version 11 emits different token classes, which changed the color of about 16% of characters in code blocks, most in `cassandra-cheatsheet` and `aws-nodejs-server`. Options to explore:
- Upgrade to v11 and use its `hybrid.css` (replaces `public/styles/third-party/highlight-js/hybrid.css`), accepting some color changes.
- Upgrade to v11 and adjust the theme so the colors stay close to the current ones.
- Add explicit languages to unlabeled code fences, since much of the difference comes from auto-detection picking different languages.

Compare per-character colors and screenshots against the live site before deciding.

### Switch deploys to GitHub Actions
GitHub Actions is free for public repositories, which this one is. Add a workflow that builds on push to master and deploys with `actions/deploy-pages`, then change the Pages source from the `gh-pages` branch to GitHub Actions. Make sure `CNAME` still ends up in the output. Afterwards, remove the `deploy` script and the `gh-pages` dependency, and delete the `gh-pages` branch.

### Remove Disqus
Comments are no longer wanted. Remove the `#disqus_thread` block and the `embed.js` script from `public/_includes/post.pug`, the `#disqus_thread` rule from `public/styles/main.scss`, and then the site from the Disqus admin. Export existing comments first if they're worth keeping.

### Move the site to HTTPS
- Change `site_url` in `eleventy.config.js` to `https://tech.joshegan.com`. It's used for home page links and `og:url`.
- Update the `homepage` in `package.json` and the links in `README.md`.
- Turn on "Enforce HTTPS" in the repository's Pages settings so `http://` redirects.
- Remove Disqus first. Disqus can treat `http` and `https` URLs as different threads, so switching while it's active could hide existing comments.

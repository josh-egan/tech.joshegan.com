# Progress

## Eleventy migration (done)

Replaced the broken Harp/Gulp toolchain (Node 0.12) with Eleventy 3 on Node 24. Merged to master and deployed on 2026-10-13. The output was checked against the previous live site: page structure, code highlighting colors, and screenshots at desktop and mobile widths all matched, apart from these intended changes:
- Footer shows a copyright line ("© 2015–<build year> Josh Egan") instead of the "built with" and "hosted on" attributions.
- Post titles link to the post, and post pages have a correct `og:url`. Both were empty in the Harp build.
- The author gravatar loads at 250px instead of a stretched 80px image.

## Follow-ups

### Remove Disqus (done, not yet deployed)
Removed the Disqus embed from `public/_includes/post.pug` and the `#disqus_thread` style.
- [ ] Delete the site in the Disqus admin. Export the comments first if they're worth keeping.

### Move the site to HTTPS (done, not yet deployed)
`site_url`, the `package.json` homepage, the README, and the one self-link in a post now use `https://`.
- [ ] Turn on "Enforce HTTPS" in the repository's Settings → Pages so `http://` redirects. As of 2026-10-13, `http://tech.joshegan.com` still serves pages without redirecting.

### Switch deploys to GitHub Actions (workflow added, cutover pending)
`.github/workflows/deploy.yml` builds on every push to master (or a manual run) and deploys with `actions/deploy-pages`. Actions is free for public repositories. Cutover steps, in order:
- [ ] In Settings → Pages, change "Source" from "Deploy from a branch" to "GitHub Actions". The custom domain setting stays.
- [ ] Push to master (or run the workflow manually) and confirm the site updates.
- [ ] Remove the `deploy` script and the `gh-pages` dependency from `package.json`, and update the README's deploy section.
- [ ] Delete the `gh-pages` branch.

### Explore updating highlight.js (explored, decision needed)
highlight.js is pinned to 8.9.1 (deprecated), the version the original site was built with. Findings from comparing v11.12.0 against the live site, character by character:
- With v11 and its `hybrid.css`, about 16% of characters in code blocks change color. The posts that change most are `cassandra-cheatsheet` (35%) and `aws-nodejs-server` (28%).
- The biggest differences come from v11 tokenizing code differently:
  - v8 tinted whole SQL statements teal. v11 leaves them light gray with colored keywords.
  - JSON keys change from orange to blue or gray.
  - Some strings become green, and function names become yellow.
- A custom v11 theme can't close the gap. Even giving each v11 token class its closest old color leaves about 13% of characters different.
- Adding languages to unlabeled code fences barely matters: only one block on the site has no language.

Options:
1. Stay on 8.9.1. Highlighting only runs at build time on your own posts, so the age of the package is low-risk. The cost is older grammars for new posts.
2. Upgrade to v11 with its `hybrid.css` and accept the color changes. Same theme family, more accurate tokenizing.

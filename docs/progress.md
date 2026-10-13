# Progress

## Eleventy migration (done)

Replaced the broken Harp/Gulp toolchain (Node 0.12) with Eleventy 3 on Node 24. Merged to master and deployed on 2026-10-13. The output was checked against the previous live site: page structure, code highlighting colors, and screenshots at desktop and mobile widths all matched, apart from these intended changes:
- Footer shows a copyright line ("© 2015–<build year> Josh Egan") instead of the "built with" and "hosted on" attributions.
- Post titles link to the post, and post pages have a correct `og:url`. Both were empty in the Harp build.
- The author gravatar loads at 250px instead of a stretched 80px image.

## Follow-ups

### Remove Disqus (done)
Removed the Disqus embed from `public/_includes/post.pug` and the `#disqus_thread` style.
- [ ] Delete the site in the Disqus admin. Export the comments first if they're worth keeping.

### Move the site to HTTPS (done)
`site_url`, the `package.json` homepage, the README, and the one self-link in a post now use `https://`.
- [x] "Enforce HTTPS" is on: `http://` requests redirect to `https://` with a 301.

### Switch deploys to GitHub Actions (done)
`.github/workflows/deploy.yml` builds on every push to master (or a manual run) and deploys with `actions/deploy-pages`. Actions is free for public repositories. The Pages source is set to "GitHub Actions", the first Actions deploy succeeded on 2026-10-13, and the `gh-pages` deploy script, dependency, and branch were removed.

### Explore updating highlight.js (explored, decision needed)
Dependabot opened [PR #1](https://github.com/josh-egan/tech.joshegan.com/pull/1) to bump highlight.js to 10.4.1. Don't merge it until this is decided: merging deploys immediately and changes code colors.

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

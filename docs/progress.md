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

### Update highlight.js (done)
Upgraded from 8.9.1 to 11.12.0 on 2026-10-13, using v11's `hybrid.css` (copied from the package at build time). About 15% of code characters changed color, mostly SQL, JSON, and HTML blocks; reviewed locally and accepted. Code blocks without a language are no longer auto-detected and render as plain text, so give new code fences a language.

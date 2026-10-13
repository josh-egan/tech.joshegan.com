import path from 'node:path';
import pugPlugin from '@11ty/eleventy-plugin-pug';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import * as sass from 'sass';

const DEV_PORT = 8080;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Formats a YYYY-MM-DD date like "Jun 2nd, 2017".
function formatDate(value) {
  const [year, month, day] = String(value).split('-').map(Number);
  const suffix = (day % 100 >= 11 && day % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
  return `${MONTHS[month - 1]} ${day}${suffix}, ${year}`;
}

// Code blocks without a known language are left unhighlighted; returning '' lets markdown-it escape them.
function highlight(code, lang) {
  if (lang && hljs.getLanguage(lang))
    return hljs.highlight(code, { language: lang }).value;

  return '';
}

export default function (eleventyConfig) {
  const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

  eleventyConfig.addPlugin(pugPlugin);

  eleventyConfig.addGlobalData('site_title', 'tech.joshegan.com');
  eleventyConfig.addGlobalData('description', 'tech.joshegan.com is a blog about tech adventures.');
  eleventyConfig.addGlobalData('site_url', isProduction ? 'https://tech.joshegan.com' : `http://localhost:${DEV_PORT}`);
  eleventyConfig.addGlobalData('site_environment', isProduction ? 'PRODUCTION' : 'DEV');
  eleventyConfig.addGlobalData('formatDate', () => formatDate);
  eleventyConfig.addGlobalData('build_year', () => new Date().getFullYear());

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
    langPrefix: 'language-',
    highlight
  });
  // Auto-link bare domains like "github.com", as the original markdown-it 4 setup did.
  md.linkify.set({ fuzzyLink: true });
  eleventyConfig.setLibrary('md', md);
  // Eleventy disables indented (4-space) code blocks by default; several posts use them.
  eleventyConfig.amendLibrary('md', mdLib => mdLib.enable('code'));

  // Drafts are still built so they can be shared by URL, but are only listed on the home page in dev.
  // Newest first; posts with the same date are ordered by file name, descending, to match the original site.
  const sortKey = post => `${post.data.postDate} ${post.page.fileSlug}`;
  eleventyConfig.addCollection('posts', collectionApi =>
    collectionApi.getFilteredByGlob('public/posts/**/*.md')
      .filter(post => !(isProduction && post.data.isDraft))
      .sort((a, b) => sortKey(b).localeCompare(sortKey(a))));

  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    compile(inputContent, inputPath) {
      if (path.basename(inputPath).startsWith('_')) return;

      const result = sass.compileString(inputContent, { loadPaths: [path.dirname(inputPath)] });
      this.addDependencies(inputPath, result.loadedUrls);
      return () => result.css;
    }
  });

  eleventyConfig.addPassthroughCopy('public/CNAME');
  eleventyConfig.addPassthroughCopy('public/scripts');
  eleventyConfig.addPassthroughCopy('public/styles/third-party/google-fonts');
  eleventyConfig.addPassthroughCopy('public/styles/third-party/font-awesome-4.3.0');
  eleventyConfig.addPassthroughCopy({ 'node_modules/highlight.js/styles/hybrid.css': 'styles/third-party/highlight-js/hybrid.css' });
  eleventyConfig.addPassthroughCopy('public/posts/**/*.{jpg,png,svg}');

  eleventyConfig.setServerOptions({ port: DEV_PORT });

  return {
    dir: {
      input: 'public',
      output: 'dist'
    },
    markdownTemplateEngine: false
  };
}

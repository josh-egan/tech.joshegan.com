import fs from 'node:fs';
import path from 'node:path';

// Post metadata lives in a `_data.json` file in each post directory, keyed by post file name.
const metadataCache = new Map();

function postMetadata(data) {
  const dir = path.dirname(data.page.inputPath);
  if (!metadataCache.has(dir)) {
    const file = path.join(dir, '_data.json');
    metadataCache.set(dir, fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {});
  }
  return metadataCache.get(dir)[data.page.fileSlug] || {};
}

const metadataFields = [
  'title',
  'description',
  'postDate',
  'updateDate',
  'isDraft',
  'isBookReview',
  'finishedReadingDate',
  'bookTitle',
  'coverImageUrl',
  'purchaseUrl'
];

const eleventyComputed = {
  permalink: data => `${data.page.filePathStem}.html`,
  postUrl: data => data.site_url + data.page.filePathStem
};

for (const field of metadataFields) {
  eleventyComputed[field] = data => postMetadata(data)[field] ?? data[field];
}

export default {
  layout: 'post.pug',
  eleventyComputed
};

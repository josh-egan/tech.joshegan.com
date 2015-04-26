'use strict';

/* Here's a shout-out to the Aurelia project -
 this gulp file was inspired from the Aurelia
 Skeleton Navigation project. http://www.aurelia.io */

var NUM_SNIPPETS_PER_PAGE = 20;
var SNIPPET_LENGTH = 300;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var fs = require('fs');
var shell = require('shelljs');
var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    silent: false,
    langPrefix: 'lang-',
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

var paths = {
    source: 'scripts/**/*.js',
    markdown: 'markdown/**/*.md',
    sassFiles: 'styles/scss/**/*.scss',
    cssFolder: './styles/css',
    indexHtmlTemplate: 'indexTemplate.html',
    templateHtmlFile: 'template.html'
};

var templateHtml = fs.readFileSync(paths.templateHtmlFile, 'utf8');

gulp.task('default', ['watch']);

gulp.task('watch', ['dev-server'], function () {
    gulp.watch(paths.source, ['build', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.indexHtmlTemplate, ['build', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.templateHtmlFile, ['rebuild', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.sassFiles, ['compile-sass', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.markdown, browserSync.reload).on('change', handleMdFileChanged);
});

gulp.task('dev-server', function (done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

gulp.task('compile-sass', function () {
    gulp.src(paths.sassFiles)
        .pipe(sass({
            style: 'compressed',
            errLogToConsole: false,
            onError: function (err) {
                return console.log(err);
            }
        }))
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task('rebuild', function () {
    templateHtml = fs.readFileSync(paths.templateHtmlFile, 'utf8');

    var files = getFilesRecursivelySync('markdown');
    files.forEach(buildMdFile);

    buildIndexPage();
});

gulp.task('build', function () {
    buildIndexPage();
});

function handleMdFileChanged(event) {
    reportChange(event);
    updateCorrespondingHtmlFile(event);
    buildIndexPage();
}

function updateCorrespondingHtmlFile(event) {
    if (event.type !== 'deleted') {
        buildMdFile(event.path);
    }
    else if (existsSync(event.path)) {
        fs.unlinkSync(getHtmlPathFromMdPath(event.path));
    }
}

function buildMdFile(mdFilePath) {
    var mdContent = fs.readFileSync(mdFilePath, 'utf8');
    var articleTitle = mdContent.substring(mdContent.indexOf("# ") + 2, mdContent.indexOf("\r\n"));

    var markdown = marked(mdContent);
    var htmlContent = templateHtml.replace('{{MARKDOWN}}', markdown).replace('{{PAGE-TITLE}}', articleTitle);

    var markupPath = getHtmlPathFromMdPath(mdFilePath);
    var markupDir = markupPath.replace(/[\w\d-]+\.html$/g, '');

    if (!existsSync(markupDir)) {
        console.log('Creating directory... ');
        console.log(markupDir);
        fs.mkdirSync(markupDir);
    }

    fs.writeFileSync(markupPath, htmlContent, 'utf8');
    console.log('Successfully built - ' + markupPath);
}

function buildIndexPage() {
    var currentDir = shell.pwd();
    var files = getFilesRecursivelySync('posts').reverse();
    var articlesHtml = '';
    files.forEach(function (f, idx) {
        if (idx >= NUM_SNIPPETS_PER_PAGE) {
            throw 'Time to add support for pagination!';
        }

        var article = fs.readFileSync(f, 'utf8');

        var href = f.replace(currentDir, '').replace(/(\\)/g, '/');
        var articleLinkOpen = '<a href="' + href + '">';

        var headerStart = '<h1';
        var headerEnd = '</time></p>';
        var headerEndIdx = article.indexOf(headerEnd) + headerEnd.length;
        var headerHtml = article.substring(article.indexOf(headerStart), headerEndIdx);
        var header = headerHtml.replace(/(<h1[^>]+>)/ig, '$&' + articleLinkOpen).replace('</h1>', '</a></h1>');

        var snippetHtml = article.substring(headerEndIdx);
        var snippetNoTags = snippetHtml.replace(/(<[^>]+>)/ig, '').replace(/\s/g, ' ').replace(/[\s]{2,}/g, ' ');
        var snippet = snippetNoTags.substring(0, SNIPPET_LENGTH);

        articlesHtml += '<article class="post">' + header + '<p>' + snippet + ' ... ' + articleLinkOpen + 'Read More</a></p></article>';
    });

    var indexHtmlTemplate = fs.readFileSync(paths.indexHtmlTemplate, 'utf8');
    var indexHtml = indexHtmlTemplate.replace('{{ARTICLES}}', articlesHtml);
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('Successfully built index.html');
}

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

function getFilesRecursivelySync(path) {
    var files = [];
    getFilesRecursivelyHelper(fs.realpathSync(path), files);
    return files;
}

function getFilesRecursivelyHelper(path, files) {
    var dirFiles = fs.readdirSync(path);
    dirFiles.forEach(function (p) {
        var fullPath = path + '\\' + p;
        var stats = fs.lstatSync(fullPath);
        if (stats.isFile()) {
            files.push(fullPath);
        }
        else if (stats.isDirectory()) {
            getFilesRecursivelyHelper(fullPath, files);
        }
    });
}

function getHtmlPathFromMdPath(mdFilePath) {
    return mdFilePath.replace('\\markdown\\', '\\posts\\').replace(/\.md$/g, ".html");
}

function existsSync(path) {
    try {
        fs.lstatSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}

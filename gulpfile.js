'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var harp = require('harp');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

var harpServerOptions = {
  port: 9000
};

var browserSyncOptions = {
  open: false,
  proxy: 'localhost:' + harpServerOptions.port,
  notify: false,
  port: 3000
};

var harpConfig = {
  prod: {
    siteUrl: "http://tech.joshegan.com",
    siteEnvironment: "PRODUCTION"
  },
  dev: {
    siteUrl: "http://localhost:" + browserSyncOptions.port,
    siteEnvironment: "DEV"
  }
};

var paths = {
  projectDir: './',
  outputDir: './dist',
  outputFiles: './dist/**/*',
  srcFiles: './public/**/*'
};

gulp.task('default', ['watch']);

gulp.task('deploy', ['build-for-prod'], function () {
  return gulp.src(paths.outputFiles)
    .pipe(ghPages());
});

gulp.task('build-for-prod', function (done) {
  applyHarpConfig(harpConfig.prod);
  harp.compile(paths.projectDir, paths.outputDir, done);
});

gulp.task('watch', ['dev-server'], function () {
  browserSync(browserSyncOptions);

  gulp.src(paths.srcFiles)
    .pipe(watch(paths.srcFiles, {
      verbose: true
    }))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('dev-server', function (done) {
  applyHarpConfig(harpConfig.dev);
  harp.server(__dirname, harpServerOptions, done);
});

function applyHarpConfig(config) {
  process.env.SITE_URL = config.siteUrl;
  process.env.SITE_ENVIRONMENT = config.siteEnvironment;
}

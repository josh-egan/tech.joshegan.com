'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var harp = require('harp');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

var harpServerOptions = {
  port: 9000
};

var paths = {
  projectDir: './',
  outputDir: './dist',
  outputFiles: './dist/**/*.*',
  srcFiles: './public/**/*.*'
};

gulp.task('default', ['watch']);

gulp.task('deploy', ['build'], function () {
  return gulp.src(paths.outputFiles)
    .pipe(ghPages());
});

gulp.task('build', function (done) {
  harp.compile(paths.projectDir, paths.outputDir, done);
});

gulp.task('watch', ['dev-server'], function () {
  browserSync({
    open: false,
    proxy: 'localhost:' + harpServerOptions.port,
    notify: false
  });

  gulp.src(paths.srcFiles)
    .pipe(watch(paths.srcFiles, {
      verbose: true
    }))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('dev-server', function (done) {
  harp.server(__dirname, harpServerOptions, done);
});

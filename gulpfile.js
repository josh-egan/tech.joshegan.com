'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var harp = require('harp');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

var paths = {

};

gulp.task('default', ['watch']);

gulp.task('deploy', ['build'], function () {
  console.log('deploying...');
});

gulp.task('build', function () {
  console.log('building...');
});

gulp.task('watch', ['dev-server'], function () {
  console.log('watching...');
});

gulp.task('dev-server', function () {
  console.log('serving...');
});

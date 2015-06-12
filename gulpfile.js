'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var harp = require('harp');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');
var merge = require('merge');
var fs = require('fs');

var harpServerOptions = {
  port: 9000
};

var browserSynceOptions = {
  open: false,
  proxy: 'localhost:' + harpServerOptions.port,
  notify: false,
  port: 3000
};

var paths = {
  projectDir: './',
  outputDir: './dist',
  outputFiles: './dist/**/*',
  srcFiles: './public/**/*',
  harpConfigFile: 'harp.json'
};

var harpDevConfig = {
  "globals": {
    "site_url": "http://localhost:" + browserSynceOptions.port
  }
};

var harpProdConfig = {
  "globals": {
    "site_url": "http://tech.joshegan.com"
  }
};

gulp.task('default', ['watch']);

gulp.task('deploy', ['build-for-prod'], function () {
  return gulp.src(paths.outputFiles)
    .pipe(ghPages());
});

gulp.task('build-for-prod', function(done){
  configureHarp(harpProdConfig);
  harp.compile(paths.projectDir, paths.outputDir, done);
});

gulp.task('watch', ['dev-server'], function () {
  browserSync(browserSynceOptions);

  gulp.src(paths.srcFiles)
    .pipe(watch(paths.srcFiles, { verbose: true }))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('dev-server', function (done) {
  configureHarp(harpDevConfig);
  harp.server(__dirname, harpServerOptions, done);
});

function configureHarp(envConfig){
  var data = fs.readFileSync(paths.harpConfigFile, 'utf8');
  var currentConfig = JSON.parse(data);
  var updatedConfig = merge.recursive(true, currentConfig, envConfig);
  var jsonString = JSON.stringify(updatedConfig, null, 2);
  fs.writeFileSync(paths.harpConfigFile, jsonString, 'utf8');
}

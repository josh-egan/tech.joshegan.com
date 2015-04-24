'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');

var paths = {
    source: 'scripts/**/*.js',
    markup: 'markup/**/*.txt',
    style: 'styles/**/*.css',
    html: '**/*.html',
    output: 'posts/'
};

function reportChange(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('build-markup', function(){

});

gulp.task('serve', ['build-markup'], function(done) {
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

gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.source, ['build-markup', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.markup, ['build-markup', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
    gulp.watch(paths.html, browserSync.reload).on('change', reportChange);
});
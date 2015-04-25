'use strict';

/* Here's a shout-out to the Aurelia project -
 this gulp file was inspired from the Aurelia
 Skeleton Navigation project. http://www.aurelia.io */

var gulp = require('gulp');
var browserSync = require('browser-sync');

var paths = {
    source: 'scripts/**/*.js',
    markup: 'markup/**/*.txt',
    style: 'styles/**/*.css',
    html: '**/*.html',
    output: 'posts/'
};

gulp.task('default', ['watch']);

gulp.task('watch', ['dev-server'], function() {
    gulp.watch(paths.source, ['build-markup', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.markup, ['build-markup', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
    gulp.watch(paths.html, browserSync.reload).on('change', reportChange);
});

function reportChange(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('dev-server', ['build-markup'], function(done) {
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

gulp.task('build-markup', function(){

});

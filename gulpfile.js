var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/index.js')
        .pipe(babel())
        .pipe(browserify())        
        .pipe(gulp.dest('dist/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('src-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/*.js", ['src-watch']);
});
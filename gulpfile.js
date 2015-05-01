var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

var DEST = 'build/';

gulp.task('build', [], function () {
    return gulp.src([
        'src/messy.js'
    ])
        .pipe(uglify())
        .pipe(rename('messy.min.js'))
        .pipe(gulp.dest(DEST));
});
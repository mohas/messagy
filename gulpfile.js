var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

var DEST = 'build/';

gulp.task('build', [], function () {
    return gulp.src([
        'src/messagy.js'
    ])
        .pipe(uglify())
        .pipe(rename('messagy.min.js'))
        .pipe(gulp.dest(DEST));
});
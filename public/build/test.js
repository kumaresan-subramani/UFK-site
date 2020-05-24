'use strict';
var gulp = require('gulp');
var print = require('gulp-print');

// var htmlConfig = __dirname + config.htmllintConfig;


// gulp.task('html-lint', function () {
//     print = print || require('gulp-print');
//     var htmllint = require('./htmllint.js');
//     return gulp.src(config.htmllint)
//         .pipe(print())
//         .pipe(htmllint(htmlConfig));
// });

gulp.task('js-hint', function () {
    var jshint = require('gulp-jshint');
    return gulp.src(['./src/**/*.js','./build/*.js'])
        .pipe(print())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['js-hint']);
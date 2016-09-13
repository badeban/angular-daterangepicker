"use strict";
(function () {
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        cleanCSS = require('gulp-clean-css'),
        config = require('../config'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('sass', ['copy-sass'], function (done) {
        gulp.src(config.scss_main)
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({ extname: '.css' }))
            .pipe(cleanCSS({ keepSpecialComments: '0' }))
            .pipe(sourcemaps.write())
            .on('error', done)
            .pipe(gulp.dest(`${config.dist_dir}${config.css_dir}`))
            .on('end', done);
    });

    gulp.task('sass-demo', ['sass'], function (done) {
        gulp.src(config.scss_demo)
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({ extname: '.css' }))
            .pipe(cleanCSS({ keepSpecialComments: '0' }))
            .pipe(sourcemaps.write())
            .on('error', done)
            .pipe(gulp.dest(config.demo_dir))
            .on('end', done);
    });

}());

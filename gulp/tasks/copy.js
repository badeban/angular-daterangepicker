'use strict';
(function () {

    var gulp = require('gulp'),
        config = require('../config');

    gulp.task('copy-static-content', function () {
        return gulp
            .src(config.static_content, { base: config.base_dir })
            .pipe(gulp.dest(config.dist_dir));
    });

    gulp.task('copy-demo-content', ['copy-static-content'], function () {
        return gulp
            .src(config.demo_content)
            .pipe(gulp.dest(config.demo_dir));
    });

    gulp.task('copy-sass', function () {
        return gulp
            .src(config.scss_main)
            .pipe(gulp.dest(config.dist_dir + config.scss_dir));
    });

})();

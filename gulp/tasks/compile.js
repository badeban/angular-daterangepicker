'use strict';
(function () {

    var gulp = require('gulp'),
        config = require('../config'),
        ngAnnotate = require('gulp-ng-annotate'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify'),
        babel = require('gulp-babel'),
        concat = require('gulp-concat');

    gulp.task('compile-js', ['compile-js-nomin'], function () {
        return gulp.src(config.js_files, { base: config.base_dir })
            .pipe(sourcemaps.init())
            .pipe(babel(config.babelOptions))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(concat(config.module_name + '.min.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.dist_dir + config.script_dir));
    });

    gulp.task('compile-js-nomin', [], function () {
        return gulp.src(config.js_files, { base: config.base_dir })
            //.pipe(sourcemaps.init())
            .pipe(babel(config.babelOptions))
            .pipe(ngAnnotate())
            .pipe(concat(config.module_name + '.js'))
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dist_dir + config.script_dir));
    });

})();

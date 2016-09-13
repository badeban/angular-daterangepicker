'use strict';

(function () {
    var gulp = require('gulp');

    gulp.task('browserify', ['compile-js'], function () {

        var sourcemaps = require('gulp-sourcemaps'),
            config = require('../config'),
            browserify = require('browserify'),
            babelify = require('babelify'),
            source = require('vinyl-source-stream'),
            buffer = require('vinyl-buffer');

        return browserify({
            entries: `${config.base_dir}${config.demo_dir}demo.js`,
            debug: true
        })
            .transform(babelify, {
                presets: ["es2015"],
                sourceMaps: true
            })
            .bundle()
            .on('error', function (err) {
                console.log(err.toString());
                this.emit("end");
            })
            .pipe(source('demo.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('', {sourceRoot: '../'}))
            .pipe(gulp.dest(config.demo_dir))
    });

})();

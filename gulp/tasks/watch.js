'use strict';
(function () {

    var gulp = require('gulp'),
        config = require('../config');

    gulp.task('watch', ['build-demo'], function () {
        gulp.watch([config.scss_files, config.base_dir + config.demo_dir + '*.?css'], ['sass-demo']);
        gulp.watch([config.js_files, config.base_dir + config.demo_dir + '*.js'], ['browserify']);
        gulp.watch(config.templates, ['browserify']);
        gulp.watch(config.static_content, ['copy-static-content']);
        gulp.watch(config.demo_content, ['copy-demo-content']);
    });

})();

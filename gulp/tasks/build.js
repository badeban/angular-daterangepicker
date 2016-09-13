'use strict';

(function () {

    var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        config = require('../config');

    gulp.task('build', function (cb) {
        runSequence(
            'clean',
            [
                'copy-static-content',
                'compile-js',
                'sass'
            ],
            cb
        );
    });

    gulp.task('build-demo', function (cb) {
        runSequence(
            'clean',
            'clean-demo',
            [
                'browserify',
                'copy-demo-content',
                'sass-demo'
            ],
            cb
        );
    });

})();

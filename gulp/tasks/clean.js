'use strict';
(function () {

    var gulp = require('gulp'),
        del = require('del'),
        config = require('../config');

    gulp.task('clean', function (cb) {
        del(config.dist_dir).then(() => {
            cb();
        });
    });

    gulp.task('clean-demo', function (cb) {
        del(config.demo_dir).then(() => {
            cb();
        });
    });

})();

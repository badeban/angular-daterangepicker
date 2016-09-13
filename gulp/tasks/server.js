(function () {
    "use strict";

    var gulp = require('gulp'),
        config = require('../config');

    gulp.task('demo', ['watch'], function () {
        var connect = require('gulp-connect');
        connect.server({
            root: config.demo_dir,
            port: 3000,
            livereload: true,
            headers: {
                allow: 'GET, POST, PATCH, DELETE'
            }
        });

        gulp.watch(config.demo_dir + '**/*')
            .on('change', function (file) {
                gulp
                    .src(file.path)
                    .pipe(connect.reload());
            });
    });


    gulp.task('docs', ['ngdocs'], function () {
        var connect = require('gulp-connect');
        connect.server({
            root: 'docs/',
            port: 3000,
            livereload: true,
            headers: {
                allow: 'GET, POST, PATCH, DELETE'
            }
        });
    });

})();

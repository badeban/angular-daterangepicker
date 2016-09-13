'use strict';
(function () {

    var gulp = require('gulp'),
        config = require('../config');

    gulp.task('ngdocs', [], function () {
        var gulpDocs = require('gulp-ngdocs');
        var options = {
            scripts: [
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js.map',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js.map'
            ],
            html5Mode: false,
            startPage: '/api',
            title: `${config.module_name} Docs`,
            //image: 'path/to/my/image.png',
            //imageLink: 'http://my-domain.com',
            titleLink: `/${config.repo_name}/api`
        };
        return gulp.src('src/**/*.js')
            .pipe(gulpDocs.process(options))
            .pipe(gulp.dest(config.docs_dir));
    });

})();

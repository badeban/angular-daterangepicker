'use strict';

(function () {

    var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        config = require('../config');

    gulp.task('release', ['prepare-release', 'subtree'], function () {
        var gutil = require('gulp-util'),
            argv = require('yargs').argv;

        if (!!argv.patch)
            return makeRelease('patch');

        if (!!argv.minor)
            return makeRelease('minor');

        if (!!argv.major)
            return makeRelease('major');

        gutil.log('Usage: gulp release [ --patch OR --minor OR --major ]');
        return false;
    });

    gulp.task('prepare-release', ['build', 'ngdocs'], function (cb) {
        runSequence('check-git-status', cb);
    });

    function makeRelease (type) {
        var Q = require('q'),
            git = require('gulp-git'),
            bump = require('gulp-bump'),
            prompt = require('gulp-prompt'),
            tag_version = require('gulp-tag-version');

        var deferred = Q.defer();
        var commitMessage = 'increased version number for ' + type + ' release';

        gulp
            .src('./package.json')
            .pipe(bump({ type: type }))
            .pipe(gulp.dest('.'))
            .pipe(prompt.prompt({
                type: 'input',
                name: 'text',
                message: 'commit message',
                default: commitMessage,
                validate: function (text) {
                    return !!text;
                }
            }, function (res) {
                commitMessage = res.text;
            }))
            .pipe(git.commit(commitMessage))
            .pipe(tag_version())
            .on('end', deferred.resolve);

        return deferred.promise;
    }

    gulp.task('subtree', ['ngdocs'], function () {
        var subtree = require('gulp-subtree');
        
        return gulp.src(config.docs_dir)
            .pipe(subtree(config.subtree));
    });

})();

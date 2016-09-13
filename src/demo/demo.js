'use strict';

var angular = require('angular');
window.moment = require('moment');
require('moment/locale/de'); //optional
window.jQuery = require('jquery');
window.$ = window.jQuery;
window._ = require('lodash');
require('bootstrap-sass');
require('bootstrap-daterangepicker');

angular.module('example',
    [
        require('../../'), // inject the module
    ])
    .controller('TestCtrl', function ($scope) {
        $scope.date = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment()
        };
        $scope.singleDate = null;
        $scope.singleDate2 = moment().valueOf();

        $scope.opts = {
            locale: {
                format: 'lll',
                applyClass: 'btn-green',
                applyLabel: 'YAU',
                fromLabel: 'WHEN?',
                toLabel: 'TILL?',
                cancelLabel: 'NOPE',
                customRangeLabel: 'else?'
            },
            ranges: {
                'i lost 7 Days': [moment().subtract(6, 'days'), moment()],
                'i lost 30 Days': [moment().subtract(29, 'days'), moment()]
            }
        };

        $scope.setStartDate = function () {
            $scope.date.startDate = moment().subtract(4, 'days').toDate();
        };

        $scope.setRange = function () {
            $scope.date = {
                startDate: moment().subtract(5, 'days'),
                endDate: moment()
            };
        };

        //Watch for date changes
        $scope.$watch('date', function (newDate) {
            console.log('New date set: ', newDate);
        }, false);

    });


'use strict';

datepickerDefaults.$inject = ["$injector"];
localisation.$inject = ["$injector"];
dateRangePicker.$inject = ["$parse", "DATEPICKER_DEFAULTS"];
angular.module('angular-bsdaterangepicker', []).factory('DATEPICKER_DEFAULTS', datepickerDefaults).config(localisation).directive('dateRangePicker', dateRangePicker);

/* @ngInject */
function datepickerDefaults($injector) {
    var settings = {
        timePicker12Hour: false,
        timePickerSeconds: false,
        applyClass: 'btn-primary',
        cancelClass: 'btn-default',
        buttonClasses: 'btn btn-sm btn-flat',
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' - '
        }
    };
    if ($injector.has('$translate')) {
        var $translate = $injector.get('$translate');
        if ($translate.instant('DATEPICKER.FORMAT') != 'DATEPICKER.FORMAT') {
            _.merge(settings, {
                clearLabel: $translate.instant('DATEPICKER.CLEAR'),
                locale: {
                    weekLabel: $translate.instant('DATEPICKER.WEEKLABEL'),
                    separator: $translate.instant('DATEPICKER.SEPARATOR'),
                    applyLabel: $translate.instant('DATEPICKER.APPLY'),
                    fromLabel: $translate.instant('DATEPICKER.FROM'),
                    toLabel: $translate.instant('DATEPICKER.TO'),
                    cancelLabel: $translate.instant('DATEPICKER.CANCEL'),
                    customRangeLabel: $translate.instant('DATEPICKER.CUSTOM'),
                    format: $translate.instant('DATEPICKER.FORMAT')
                }
            });
        }
    }
    Object.freeze(settings);
    return settings;
}

/* @ngInject */
function localisation($injector) {
    if ($injector.has('$translateProvider')) {
        var $translateProvider = $injector.get('$translateProvider');
        $translateProvider.translations('en', {
            DATEPICKER: {
                APPLY: 'Apply',
                FROM: 'From',
                TO: 'To',
                CANCEL: 'Cancel',
                CUSTOM: 'Custom range',
                SEPARATOR: ' - ',
                WEEKLABEL: 'W',
                CLEAR: 'Clear',
                FORMAT: 'YYYY-MM-DD'
            }
        }).translations('de', {
            DATEPICKER: {
                APPLY: 'Übernehmen',
                FROM: 'Von',
                TO: 'Bis',
                CANCEL: 'Abbrechen',
                CUSTOM: 'Benutzerdefiniert',
                SEPARATOR: ' - ',
                WEEKLABEL: 'KW',
                CLEAR: 'Löschen',
                FORMAT: 'DD.MM.YYYY'
            }
        }).preferredLanguage('de');
    }
}

/* @ngInject */
function dateRangePicker($parse, DATEPICKER_DEFAULTS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            min: '=',
            max: '=',
            model: '=ngModel',
            opts: '=options',
            clearable: '='
        },
        link: function link($scope, element, attrs, modelCtrl) {
            var customOpts = $scope.opts,
                el = $(element),
                opts = _.merge({}, DATEPICKER_DEFAULTS, customOpts),
                picker = void 0;

            modelCtrl.$formatters.push(ngModelFormatter);
            modelCtrl.$render = ngModelRenderer;
            modelCtrl.$parsers.push(ngModelParser);
            modelCtrl.$isEmpty = ngModelIsEmpty;

            initialize();

            if (opts.singleDatePicker) {
                $scope.$watch('model', function (newVal) {
                    if (newVal) {
                        return setStartDate(newVal.startDate ? newVal.startDate : newVal);
                    }
                });
            } else {
                $scope.$watch('model.startDate', function (newVal) {
                    return setStartDate(newVal);
                });
                $scope.$watch('model.endDate', function (newVal) {
                    return setEndDate(newVal);
                });
            }

            initBoundary('min', validateMin, 'startDate', 'minDate');
            initBoundary('max', validateMax, 'endDate', 'maxDate');

            if (attrs.options) {
                $scope.$watch('opts', function (newOpts) {
                    _.merge(opts, newOpts);
                    return initialize();
                }, true);
            }

            if (attrs.clearable) {
                $scope.$watch('clearable', function (newClearable) {
                    if (newClearable) {
                        _.merge(opts, {
                            locale: {
                                cancelLabel: opts.clearLabel
                            }
                        });
                    }
                    initialize();
                    if (newClearable) {
                        return el.on('cancel.daterangepicker', function () {
                            return $scope.$apply(function () {
                                return $scope.model = opts.singleDatePicker ? null : {
                                    startDate: null,
                                    endDate: null
                                };
                            });
                        });
                    }
                });
            }

            function initialize() {
                var eventType, results;
                el.daterangepicker(angular.extend(opts, {
                    autoUpdateInput: false
                }), function (start, end) {
                    return $scope.$apply(function () {
                        var formatters, idx, viewValue;
                        $scope.model = opts.singleDatePicker ? start : {
                            startDate: start,
                            endDate: end
                        };
                        formatters = modelCtrl.$formatters;
                        idx = formatters.length;
                        viewValue = $scope.model;
                        while (idx--) {
                            viewValue = formatters[idx](viewValue);
                        }
                        modelCtrl.$viewValue = modelCtrl.$$lastCommittedViewValue = viewValue;
                        modelCtrl.$modelValue = $scope.model;
                        modelCtrl.$render();
                        return modelCtrl.$$writeModelToScope();
                    });
                });
                picker = el.data('daterangepicker');
                results = [];
                for (eventType in opts.eventHandlers) {
                    results.push(el.on(eventType, function (e, picker) {
                        var eventName;
                        eventName = e.type + '.' + e.namespace;
                        return $scope.$evalAsync(function () {
                            return $parse(opts.eventHandlers[eventName])(e, picker);
                        });
                    }));
                }
                return results;
            }

            function setStartDate(newValue) {
                if (picker && newValue) {
                    if (picker.endDate < newValue) {
                        picker.setEndDate(newValue);
                    }
                    opts.startDate = newValue;
                    return picker.setStartDate(newValue);
                }
            }

            function setEndDate(newValue) {
                if (picker && newValue) {
                    if (picker.startDate > newValue) {
                        picker.setStartDate(newValue);
                    }
                    opts.endDate = newValue;
                    return picker.setEndDate(newValue);
                }
            }

            function initBoundary(field, validator, modelField, optName) {
                if (attrs[field]) {
                    modelCtrl.$validators[field] = function (value) {
                        return value && validator(opts[optName], value[modelField]);
                    };
                    return $scope.$watch(field, function (date) {
                        opts[optName] = date ? moment(date) : false;
                        return initialize();
                    });
                }
            }

            function validate(validator) {
                return function (boundary, actual) {
                    if (boundary && actual) {
                        return validator(moment(boundary), moment(actual));
                    } else {
                        return true;
                    }
                };
            }

            function validateMin() {
                return validate(function (min, start) {
                    return min.isBefore(start) || min.isSame(start, 'day');
                });
            }

            function validateMax() {
                return validate(function (max, end) {
                    return max.isAfter(end) || max.isSame(end, 'day');
                });
            }

            function clear() {
                picker.setStartDate();
                return picker.setEndDate();
            }

            function ngModelIsEmpty(val) {
                return !(angular.isString(val) && val.length > 0);
            }

            function ngModelParser(val) {
                var objValue, x;
                objValue = {
                    startDate: null,
                    endDate: null
                };
                if (angular.isString(val) && val.length > 0) {
                    if (opts.singleDatePicker) {
                        objValue = momentize(val);
                    } else {
                        x = val.split(opts.locale.separator).map(momentize);
                        objValue.startDate = x[0];
                        objValue.endDate = x[1];
                    }
                }
                function momentize(value) {
                    return moment(value, opts.locale.format);
                }

                return objValue;
            }

            function ngModelRenderer() {
                if (modelCtrl.$modelValue && modelCtrl.$modelValue.startDate) {
                    setStartDate(modelCtrl.$modelValue.startDate);
                    setEndDate(modelCtrl.$modelValue.endDate);
                } else {
                    clear();
                }
                return el.val(modelCtrl.$viewValue);
            }

            function ngModelFormatter(objValue) {
                function formatDate(date) {
                    if (!moment.isMoment(date)) {
                        return moment(date).format(opts.locale.format);
                    } else {
                        return date.format(opts.locale.format);
                    }
                }

                if (opts.singleDatePicker && (objValue || objValue === 0)) {
                    return formatDate(objValue);
                } else if (!opts.singleDatePicker && objValue && objValue.startDate) {
                    return [formatDate(objValue.startDate), formatDate(objValue.endDate)].join(opts.locale.separator);
                } else {
                    return '';
                }
            }

            return $scope.$on('$destroy', function () {
                return picker != null ? picker.remove() : void 0;
            });
        }
    };
}
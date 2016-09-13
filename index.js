if (require){
    if (window && !window.moment) {
        window.moment = require('moment');
    }

    if (window && !window._) {
        window._ = require('lodash');
    }

    if (window && !window.$ && !window.jQuery) {
        window.$ = require('jquery');
        window.jQuery = window.$
    }

    if (typeof $().emulateTransitionEnd != 'function') {
        require('bootstrap-sass');
    }

    if (typeof $().daterangepicker != 'function') {
        require('bootstrap-daterangepicker');
    }
}
require('./dist/js/angular-bsdaterangepicker.js');
module.exports = 'angular-bsdaterangepicker';

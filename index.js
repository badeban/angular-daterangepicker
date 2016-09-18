if (require){
    if (window && !window.moment) {
        window.moment = require('moment');
    }

    if (window && !window._) {
        window._ = require('lodash');
    }

    if (window && !window.jQuery) {
        window.jQuery = require('jquery');
    }

    if (typeof jQuery().emulateTransitionEnd != 'function') {
        require('bootstrap-sass');
    }

    if (typeof jQuery().daterangepicker != 'function') {
        require('bootstrap-daterangepicker');
    }
}
require('./dist/js/angular-bsdaterangepicker.js');
module.exports = 'angular-bsdaterangepicker';

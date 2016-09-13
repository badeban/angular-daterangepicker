if (require){
    try{
        if (window && !window.moment) {
            window.moment = require('moment');
        }

        if (window && !window._) {
            window._ = require('lodash');
        }

        if (window && !window.$ && !window.jQuery) {
            window.$ = window.jQuery = require('jquery');
        }

        if (typeof $().emulateTransitionEnd != 'function') {
            require('bootstrap-sass');
        }

        if (typeof $().daterangepicker != 'function') {
            require('bootstrap-daterangepicker');
        }
    } catch (e) {
        //TODO
    }
}
require('./dist/js/angular-bsdaterangepicker.js');
module.exports = 'angular-bsdaterangepicker';

'use strict';

(function () {
    let config = new (function(){
        this.module_name = 'angular-bsdaterangepicker';
        this.base_dir = 'src/';
        this.dist_dir = 'dist/';
        this.demo_dir = 'docs/';
        this.script_dir = 'js/';
        this.scss_dir = 'scss/';
        this.css_dir = 'css/';

        this.static_content = [
            `${this.base_dir}images/**/*.*`
        ];

        this.demo_content = [
            `${this.base_dir}${this.demo_dir}*.*`,
            `!${this.base_dir}${this.demo_dir}*.sass`,
            `!${this.base_dir}${this.demo_dir}*.js`
        ];

        this.templates = `${this.base_dir}**/*.tpl.html`;
        this.template_cache = `${this.module_name}.TemplateCache.js`;

        this.js_files = `${this.base_dir}${this.script_dir}**/*.js`;

        this.scss_main = `${this.base_dir}${this.scss_dir}${this.module_name}.scss`;
        this.scss_files = [
            `${this.base_dir}${this.scss_dir}**/*.?css`
        ];

        this.scss_demo = `${this.base_dir}${this.demo_dir}demo.scss`;


        this.babelOptions = {
            presets: ['es2015']
        }
    })();

    module.exports = config;

})();

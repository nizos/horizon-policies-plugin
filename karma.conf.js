/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var child_process = require("child_process");

const puppeteer = require('puppeteer');
process.env.CHROMIUM_BIN = puppeteer.executablePath();
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
    // This tox venv is setup in the post-install npm step
    var pythonVersion = "python3.";
    var stdout = child_process.execFileSync("python3", ["--version"]);
    pythonVersion += stdout.toString().split(".")[1];
    var toxPath = './.tox/karma/lib/' + pythonVersion + '/site-packages/';
    console.log("Karma will check on directory: ", toxPath);



    config.set({
        preprocessors: {
            // Used to collect templates for preprocessing.
            // NOTE: the templates must also be listed in the files section below.
            './static/**/*.html': ['ng-html2js'],
            // Used to indicate files requiring coverage reports.
            './static/**/!(*.spec).js': ['coverage'],
        },

        // Sets up module to process templates.
        ngHtml2JsPreprocessor: {
            prependPrefix: '/',
            moduleName: 'templates'
        },

        // Assumes you're in the top-level horizon directory.
        basePath: './',

        // Contains both source and test files.
        files: [
            /*
             * shim, partly stolen from /i18n/js/horizon/
             * Contains expected items not provided elsewhere (dynamically by
             * Django or via jasmine template.
             */
            './test-shim.js',

            // from jasmine.html
            toxPath + 'xstatic/pkg/jquery/data/jquery.js',
            toxPath + 'xstatic/pkg/angular/data/angular.js',
            toxPath + 'xstatic/pkg/angular/data/angular-route.js',
            toxPath + 'xstatic/pkg/angular/data/angular-mocks.js',
            toxPath + 'xstatic/pkg/angular/data/angular-cookies.js',
            toxPath + 'xstatic/pkg/angular_bootstrap/data/angular-bootstrap.js',
            toxPath + 'xstatic/pkg/angular_gettext/data/angular-gettext.js',
            toxPath + 'xstatic/pkg/angular/data/angular-sanitize.js',
            toxPath + 'xstatic/pkg/d3/data/d3.js',
            toxPath + 'xstatic/pkg/rickshaw/data/rickshaw.js',
            toxPath + 'xstatic/pkg/angular_smart_table/data/smart-table.js',
            toxPath + 'xstatic/pkg/angular_lrdragndrop/data/lrdragndrop.js',
            toxPath + 'xstatic/pkg/spin/data/spin.js',
            toxPath + 'xstatic/pkg/spin/data/spin.jquery.js',
            toxPath + 'xstatic/pkg/tv4/data/tv4.js',
            toxPath + 'xstatic/pkg/objectpath/data/ObjectPath.js',
            toxPath + 'xstatic/pkg/angular_schema_form/data/schema-form.js',
            toxPath + 'xstatic/pkg/angular_fileupload/data/ng-file-upload.js',


            // TODO: These should be mocked.
            // '../horizon/js/horizon.js',
            // '../horizon/horizon/static/horizon/js/horizon.js',
            // toxPath + 'horizon/static/horizon/js/horizon.js',
            '../horizon/static/framework/util/actions/actions.module.js',
            '../horizon/static/framework/util/bind-scope/bind-scope.module.js',
            '../horizon/static/framework/util/extensible/extensible.module.js',
            '../horizon/static/framework/util/file/file.module.js',
            '../horizon/static/framework/util/filters/filters.module.js',
            '../horizon/static/framework/util/http/http.js',
            '../horizon/static/framework/util/i18n/i18n.js',
            '../horizon/static/framework/util/navigations/navigations.module.js',
            '../horizon/static/framework/util/promise-toggle/promise-toggle.module.js',
            '../horizon/static/framework/util/q/q.module.js',
            '../horizon/static/framework/util/tech-debt/tech-debt.module.js',
            '../horizon/static/framework/util/timezones/timezone.service.js',
            '../horizon/static/framework/util/uuid/uuid.js',
            '../horizon/static/framework/util/validators/validators.module.js',
            '../horizon/static/framework/util/workflow/workflow.module.js',
            '../horizon/static/framework/util/util.module.js',
            '../horizon/static/framework/widgets/action-list/action-list.module.js',
            '../horizon/static/framework/widgets/charts/charts.module.js',
            '../horizon/static/framework/widgets/contenteditable/contenteditable.module.js',
            '../horizon/static/framework/widgets/details/details.module.js',
            '../horizon/static/framework/widgets/form/form.module.js',
            '../horizon/static/framework/widgets/form/decorator.js',
            '../horizon/static/framework/widgets/headers/headers.module.js',
            '../horizon/static/framework/widgets/help-panel/help-panel.module.js',
            '../horizon/static/framework/widgets/load-edit/load-edit.module.js',
            '../horizon/static/framework/widgets/magic-search/magic-search.module.js',
            '../horizon/static/framework/widgets/metadata/display/display.module.js',
            '../horizon/static/framework/widgets/metadata/tree/tree.module.js',
            '../horizon/static/framework/widgets/metadata/metadata.module.js',
            '../horizon/static/framework/widgets/modal/modal.module.js',
            '../horizon/static/framework/widgets/modal-wait-spinner/modal-wait-spinner.module.js',
            '../horizon/static/framework/widgets/panel/panel.module.js',
            '../horizon/static/framework/widgets/property/property.module.js',
            '../horizon/static/framework/widgets/table/table.module.js',
            '../horizon/static/framework/widgets/toast/toast.module.js',
            '../horizon/static/framework/widgets/transfer-table/transfer-table.module.js',
            '../horizon/static/framework/widgets/wizard/wizard.module.js',
            '../horizon/static/framework/widgets/widgets.module.js',
            '../horizon/static/framework/framework.module.js',

            /**
             * Include framework source code from horizon that we need.
             * Otherwise, karma will not be able to find them when testing.
             * These files should be mocked in the foreseeable future.
             */
            // toxPath + 'horizon/static/framework/**/*.module.js',
            // toxPath + 'horizon/static/framework/**/!(*.spec|*.mock).js',
            // toxPath + 'openstack_dashboard/static/**/*.module.js',
            // toxPath + 'openstack_dashboard/static/**/!(*.spec|*.mock).js',
            // toxPath + 'openstack_dashboard/dashboards/**/static/**/*.module.js',
            // toxPath + 'openstack_dashboard/dashboards/**/static/**/!(*.spec|*.mock).js',

            /**
             * First, list all the files that defines application's angular modules.
             * Those files have extension of `.module.js`. The order among them is
             * not significant.
             */
            './policies_plugin/static/dashboard/identity/policy/policy.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/actions.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/context-menu/context-menu.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/copy/copy.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/download/download.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/history/history.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/paste/paste.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/print/print.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/reload/reload.module.js',
            './policies_plugin/static/dashboard/identity/policy/actions/upload/upload.module.js',
            './policies_plugin/static/dashboard/identity/policy/api/api.module.js',
            './policies_plugin/static/dashboard/identity/policy/model/model.module.js',
            './policies_plugin/static/dashboard/identity/policy/model/checklist-model/checklist-model.module.js',
            './policies_plugin/static/dashboard/identity/policy/model/policies-model/policies-model.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/components.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/plugin-info/plugin-info.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-details/policies-details.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/editor-autocomplete/autocomplete-item/autocomplete-item.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/editor-autocomplete/editor-autocomplete.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/policies-editor.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-pagination/policies-pagination.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-search/policies-search.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-table/policies-table.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/scroll-up/scroll-up.module.js',
            './policies_plugin/static/dashboard/identity/policy/policies/policies.module.js',
            './policies_plugin/static/dashboard/identity/policy/svg-icons/svg-icons.module.js',

            /**
             * Followed by other JavaScript files that defines angular providers
             * on the modules defined in files listed above. And they are not mock
             * files or spec files defined below. The order among them is not
             * significant.
             */
            '../horizon/static/framework/util/actions/action-result.service.js',
            '../horizon/static/framework/util/bind-scope/bind-scope.directive.js',
            '../horizon/static/framework/util/extensible/extensible.service.js',
            '../horizon/static/framework/util/file/file-reader.service.js',
            '../horizon/static/framework/util/file/text-download.service.js',
            '../horizon/static/framework/util/filters/filters.js',
            '../horizon/static/framework/util/filters/helpers.borrowed-from-underscore.js',
            '../horizon/static/framework/util/navigations/navigations.service.js',
            '../horizon/static/framework/util/promise-toggle/hz-promise-toggle.directive.js',
            '../horizon/static/framework/util/q/q.extensions.js',
            '../horizon/static/framework/util/tech-debt/dummy.controller.js',
            '../horizon/static/framework/util/tech-debt/helper-functions.service.js',
            '../horizon/static/framework/util/tech-debt/image-file-on-change.directive.js',
            '../horizon/static/framework/util/timezones/timezone.service.js',
            '../horizon/static/framework/util/validators/hz-password-match.directive.js',
            '../horizon/static/framework/util/validators/validate-number-max.directive.js',
            '../horizon/static/framework/util/validators/validate-unique.js',
            '../horizon/static/framework/util/workflow/workflow.service.js',
            '../horizon/static/framework/widgets/action-list/action-list.directive.js',
            '../horizon/static/framework/widgets/action-list/action.directive.js',
            '../horizon/static/framework/widgets/action-list/actions.controller.js',
            '../horizon/static/framework/widgets/action-list/actions.directive.js',
            '../horizon/static/framework/widgets/action-list/actions.service.js',
            '../horizon/static/framework/widgets/action-list/button-tooltip.directive.js',
            '../horizon/static/framework/widgets/action-list/button-tooltip.row-warning.service.js',
            '../horizon/static/framework/widgets/action-list/menu.directive.js',
            '../horizon/static/framework/widgets/charts/chart-tooltip.directive.js',
            '../horizon/static/framework/widgets/charts/pie-chart.directive.js',
            '../horizon/static/framework/widgets/contenteditable/contenteditable.directive.js',
            '../horizon/static/framework/widgets/details/details.directive.js',
            '../horizon/static/framework/widgets/details/routed-details-view.controller.js',
            '../horizon/static/framework/widgets/form/builders.provider.js',
            '../horizon/static/framework/widgets/form/decorator.js',
            '../horizon/static/framework/widgets/form/modal-form.controller.js',
            '../horizon/static/framework/widgets/form/modal-form.service.js',
            '../horizon/static/framework/widgets/headers/hz-page-header.directive.js',
            '../horizon/static/framework/widgets/help-panel/help-panel.directive.js',
            '../horizon/static/framework/widgets/load-edit/load-edit.directive.js',
            '../horizon/static/framework/widgets/magic-search/hz-magic-search-bar.directive.js',
            '../horizon/static/framework/widgets/magic-search/hz-magic-search-context.directive.js',
            '../horizon/static/framework/widgets/magic-search/magic-search.controller.js',
            '../horizon/static/framework/widgets/magic-search/magic-search.directive.js',
            '../horizon/static/framework/widgets/magic-search/magic-search.service.js',
            '../horizon/static/framework/widgets/magic-search/st-magic-search.directive.js',
            '../horizon/static/framework/widgets/metadata/display/metadata-display.directive.js',
            '../horizon/static/framework/widgets/metadata/display/metadata-display.controller.js',
            '../horizon/static/framework/widgets/metadata/tree/metadata-tree-item.controller.js',
            '../horizon/static/framework/widgets/metadata/tree/metadata-tree-item.directive.js',
            '../horizon/static/framework/widgets/metadata/tree/metadata-tree.controller.js',
            '../horizon/static/framework/widgets/metadata/tree/metadata-tree.directive.js',
            '../horizon/static/framework/widgets/metadata/tree/tree.service.js',
            '../horizon/static/framework/widgets/modal/delete-modal.service.js',
            '../horizon/static/framework/widgets/modal/simple-modal.controller.js',
            '../horizon/static/framework/widgets/modal/simple-modal.service.js',
            '../horizon/static/framework/widgets/modal/wizard-modal.service.js',
            '../horizon/static/framework/widgets/modal/wizard.controller.js',
            '../horizon/static/framework/widgets/modal-wait-spinner/modal-wait-spinner.directive.js',
            '../horizon/static/framework/widgets/modal-wait-spinner/modal-wait-spinner.service.js',
            '../horizon/static/framework/widgets/panel/hz-resource-panel.controller.js',
            '../horizon/static/framework/widgets/panel/hz-resource-panel.directive.js',
            '../horizon/static/framework/widgets/property/hz-field.directive.js',
            '../horizon/static/framework/widgets/property/hz-resource-property-list.directive.js',
            '../horizon/static/framework/widgets/property/hz-resource-property.controller.js',
            '../horizon/static/framework/widgets/property/hz-resource-property.directive.js',
            '../horizon/static/framework/widgets/table/hz-cell.directive.js',
            '../horizon/static/framework/widgets/table/hz-detail-row.directive.js',
            '../horizon/static/framework/widgets/table/hz-dynamic-table.controller.js',
            '../horizon/static/framework/widgets/table/hz-dynamic-table.directive.js',
            '../horizon/static/framework/widgets/table/hz-expand-detail.directive.js',
            '../horizon/static/framework/widgets/table/hz-no-items.directive.js',
            '../horizon/static/framework/widgets/table/hz-resource-table.controller.js',
            '../horizon/static/framework/widgets/table/hz-resource-table.directive.js',
            '../horizon/static/framework/widgets/table/hz-search-bar.directive.js',
            '../horizon/static/framework/widgets/table/hz-select-all.directive.js',
            '../horizon/static/framework/widgets/table/hz-select.directive.js',
            '../horizon/static/framework/widgets/table/hz-table-footer.controller.js',
            '../horizon/static/framework/widgets/table/hz-table-footer.directive.js',
            '../horizon/static/framework/widgets/table/hz-table.directive.js',
            '../horizon/static/framework/widgets/table/table.controller.js',
            '../horizon/static/framework/widgets/toast/toast.directive.js',
            '../horizon/static/framework/widgets/toast/toast.service.js',
            '../horizon/static/framework/widgets/transfer-table/filter-available.js',
            '../horizon/static/framework/widgets/transfer-table/transfer-table.controller.js',
            '../horizon/static/framework/widgets/transfer-table/transfer-table.directive.js',
            '../horizon/static/framework/widgets/wizard/modal-container.controller.js',
            '../horizon/static/framework/widgets/wizard/wizard.controller.js',
            '../horizon/static/framework/widgets/wizard/wizard.directive.js',
            '../horizon/static/framework/widgets/wizard/wizard.module.js',
            '../horizon/static/framework/widgets/widgets.module.js',
            '../horizon/static/framework/framework.module.js',
            '../horizon/static/framework/conf/conf.js',
            '../horizon/static/framework/conf/resource-type-registry.service.js',
            '../horizon/static/framework/conf/permissions.service.js',


            './policies_plugin/static/dashboard/identity/policy/actions/context-menu/context-menu.constant.js',
            './policies_plugin/static/dashboard/identity/policy/actions/context-menu/context-menu.directive.js',
            './policies_plugin/static/dashboard/identity/policy/actions/context-menu/context-menu.service.js',
            './policies_plugin/static/dashboard/identity/policy/actions/copy/copy.provider.js',
            './policies_plugin/static/dashboard/identity/policy/actions/download/download.provider.js',
            './policies_plugin/static/dashboard/identity/policy/actions/print/print.provider.js',
            './policies_plugin/static/dashboard/identity/policy/actions/reload/reload.provider.js',
            './policies_plugin/static/dashboard/identity/policy/actions/upload/upload.provider.js',
            './policies_plugin/static/dashboard/identity/policy/api/api.service.js',
            './policies_plugin/static/dashboard/identity/policy/model/checklist-model/checklist-model.directive.js',
            './policies_plugin/static/dashboard/identity/policy/model/policies-model/policies-model.service.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/plugin-info/plugin-info.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-details/policies-details.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/editor-autocomplete/autocomplete-item/autocomplete-item.directive.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/editor-autocomplete/editor-autocomplete.directive.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/editor-autocomplete/editor-autocomplete.provider.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-editor/policies-editor.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-pagination/policies-pagination.component.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-pagination/policies-pagination.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-search/policies-search.component.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-search/policies-search.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-table/policies-table.component.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-table/policies-table.controller.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/scroll-up/scroll-up.component.js',
            './policies_plugin/static/dashboard/identity/policy/policies/components/scroll-up/scroll-up.controller.js',
            './policies_plugin/static/dashboard/identity/policy/svg-icons/svg-icons.directive.js',

            /**
             * Then, list files for mocks with `mock.js` extension. The order
             * among them should not be significant.
             */
            // toxPath + 'openstack_dashboard/static/**/*.mock.js',

            /**
             * Finally, list files for spec with `spec.js` extension. The order
             * among them should not be significant.
             */
            './policies_plugin/static/dashboard/identity/policy/policies/components/policies-table/policies-table.controller.spec.js'
            // './static/**/*.spec.js',

            /**
             * Angular external templates
             */
            // './static/**/*.html'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        port: 9876,  // karma web server port

        colors: true,

        logLevel: config.LOG_INFO,

        // browsers: ['Chrome'],
        browsers: ['HeadlessChromium'],

        customLaunchers: {
            HeadlessChromium: {
                base: 'ChromiumHeadless',
                flags: [
                    '--no-sandbox',
                    '--remote-debugging-port=9222',
                    '--enable-logging',
                    '--user-data-dir=./karma-chrome',
                    '--v=1',
                    '--disable-background-timer-throttling',
                    '--disable-renderer-backgrounding',
                    '--proxy-bypass-list=*',
                    '--proxy-server=\'direct://\''
                ]
            }
        },

        browserNoActivityTimeout: 60000,

        reporters: ['progress', 'coverage', 'threshold'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage',
            'karma-threshold-reporter'
        ],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered
            // (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        // Places coverage report in HTML format in the subdirectory below.
        coverageReporter: {
            type: 'html',
            dir: '../cover/karma/'
        },

        // Coverage threshold values.
        thresholdReporter: {
            statements: 85, // target 100
            branches: 60, // target 100
            functions: 80, // target 100
            lines: 85 // target 100
        },

        concurrency: Infinity,

        failOnEmptyTestSuite: false
    });
};

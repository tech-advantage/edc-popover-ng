(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('edc-client-js'), require('@angular/common'), require('edc-popover-js/dist/edc-popover.css')) :
    typeof define === 'function' && define.amd ? define('edc-popover-ng', ['exports', '@angular/core', 'edc-client-js', '@angular/common', 'edc-popover-js/dist/edc-popover.css'], factory) :
    (global = global || self, factory(global['edc-popover-ng'] = {}, global.ng.core, global.edcClientJs, global.ng.common));
}(this, (function (exports, core, edcClientJs, common) { 'use strict';

    var PopoverConfigurationHandler = /** @class */ (function () {
        function PopoverConfigurationHandler() {
        }
        return PopoverConfigurationHandler;
    }());

    var LANGUAGE_CODES = [
        'en',
        'ar',
        'bg',
        'zh',
        'hr',
        'cs',
        'da',
        'nl',
        'et',
        'fi',
        'fr',
        'de',
        'el',
        'he',
        'hu',
        'is',
        'ga',
        'it',
        'ja',
        'ko',
        'lv',
        'lt',
        'lb',
        'mt',
        'no',
        'fa',
        'pl',
        'pt',
        'ro',
        'ru',
        'sk',
        'sl',
        'es',
        'sv',
        'tr',
        'vi',
    ];
    // Languages with translation contents
    var DEFINED_TRANSLATION_CODES = [
        'en',
        'fr',
        'ru',
        'vi',
        'zh'
    ];
    var SYS_LANG = 'en';

    var HelpService = /** @class */ (function () {
        function HelpService(configurationHandler) {
            this.configurationHandler = configurationHandler;
            this.edcClient = new edcClientJs.EdcClient(configurationHandler.getDocPath(), configurationHandler.getHelpPath(), configurationHandler.getPluginId(), true, // Context only, don't load the whole doc
            configurationHandler.getI18nPath());
        }
        HelpService.prototype.getHelp = function (primaryKey, subKey, pluginId, lang) {
            var pluginIdentifier = pluginId || this.configurationHandler.getPluginId();
            return this.edcClient.getHelper(primaryKey, subKey, pluginIdentifier, lang);
        };
        HelpService.prototype.getContextUrl = function (mainKey, subKey, languageCode, articleIndex, pluginId) {
            return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
        };
        HelpService.prototype.getDocumentationUrl = function (docId) {
            return this.edcClient.getDocumentationWebHelpUrl(docId);
        };
        HelpService.prototype.getI18nUrl = function () {
            return this.edcClient.getPopoverI18nUrl();
        };
        HelpService.prototype.getPluginId = function () {
            return this.configurationHandler.getPluginId();
        };
        HelpService.prototype.getIcon = function () {
            return this.configurationHandler.getIcon() || 'fa-question-circle-o';
        };
        HelpService.prototype.getContainer = function () {
            return this.configurationHandler.isAppendToBody() ? 'body' : '';
        };
        HelpService.prototype.getDefaultLanguage = function () {
            return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
        };
        HelpService.prototype.isLanguagePresent = function (langCode) {
            return this.edcClient.isLanguagePresent(langCode);
        };
        return HelpService;
    }());
    HelpService.decorators = [
        { type: core.Injectable }
    ];
    HelpService.ctorParameters = function () { return [
        { type: PopoverConfigurationHandler }
    ]; };

    var HelpConstants = /** @class */ (function () {
        function HelpConstants() {
        }
        return HelpConstants;
    }());
    HelpConstants.MESSAGE_COMING_SOON = 'Contextual help is coming soon.';

    var EdcTranslationService = /** @class */ (function () {
        function EdcTranslationService(helpService) {
            this.helpService = helpService;
            this.defaultLanguage = SYS_LANG;
            this.lang = SYS_LANG;
        }
        EdcTranslationService.prototype.getLang = function () {
            return this.lang;
        };
        EdcTranslationService.prototype.setLang = function (lang) {
            this.lang = lang;
        };
        return EdcTranslationService;
    }());
    EdcTranslationService.decorators = [
        { type: core.Injectable }
    ];
    EdcTranslationService.ctorParameters = function () { return [
        { type: HelpService }
    ]; };

    var HelpComponent = /** @class */ (function () {
        function HelpComponent(helpService, translationService) {
            this.helpService = helpService;
            this.translationService = translationService;
            this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
            this.placement = 'bottom';
        }
        HelpComponent.prototype.ngOnInit = function () {
            // If a lang input was provided, helper is already being loaded from ngOnChanges
            if (this.langLoading === undefined) {
                // No helper loading in progress from ngOnChanges, so initialize helper
                this.initHelper();
            }
            this.translationService.setLang(SYS_LANG);
            this.iconCss = this.helpService.getIcon();
            this.container = this.helpService.getContainer();
        };
        HelpComponent.prototype.ngOnChanges = function (changes) {
            if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
                this.initHelper();
            }
        };
        HelpComponent.prototype.initHelper = function () {
            if (this.key && this.subKey) {
                this.langLoading = this.lang || null;
                if (this.helper) {
                    // This is not the first initialization, just an update, skip timeout
                    this.loadHelper();
                }
                else {
                    // Set timeout because popover content loading is not a bootstrap top priority.
                    setTimeout(this.loadHelper.bind(this), 2000);
                }
            }
        };
        HelpComponent.prototype.loadHelper = function () {
            var _this = this;
            this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
                .then(function (helper) {
                if (!helper) {
                    throw new Error("Could not load Helper for the key " + _this.key + " and subKey " + _this.subKey);
                }
                _this.helper = helper;
                var resolvedLanguage = helper.language;
                if (resolvedLanguage !== _this.lang) {
                    console.warn("Requested language " + _this.lang + " could not be loaded,\n           content will be using default language " + helper.language + " instead");
                    _this.lang = resolvedLanguage;
                }
                // Set translation language for the labels
                _this.translationService.setLang(_this.lang);
                _this.langLoading = null;
            })
                .catch(function (err) {
                console.error(err);
                _this.langLoading = null;
            });
        };
        HelpComponent.prototype.goToArticle = function (index) {
            var articleUrl = this.helpService.getContextUrl(this.key, this.subKey, this.lang, index);
            this.open(articleUrl);
        };
        HelpComponent.prototype.goToLink = function (link) {
            var url = this.helpService.getDocumentationUrl(link.id);
            this.open(url);
        };
        HelpComponent.prototype.getPlacement = function () {
            return this.placement;
        };
        HelpComponent.prototype.cancelClick = function ($event) {
            $event.preventDefault();
        };
        HelpComponent.prototype.open = function (url) {
            window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
        };
        return HelpComponent;
    }());
    HelpComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'edc-help',
                    template: "<i class=\"fa help-icon {{ iconCss }}\"></i>",
                    styles: [":host{cursor:pointer;font-size:16px;line-height:34px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow:before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow:before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow:before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow:before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc;font-weight:700}.edc-popover-container{display:flex;flex-direction:column;flex-grow:1;line-height:20px;min-width:150px}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{color:#0275d8;cursor:pointer;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
                },] }
    ];
    HelpComponent.ctorParameters = function () { return [
        { type: HelpService },
        { type: EdcTranslationService }
    ]; };
    HelpComponent.propDecorators = {
        pluginId: [{ type: core.Input }],
        key: [{ type: core.Input }],
        subKey: [{ type: core.Input }],
        placement: [{ type: core.Input }],
        dark: [{ type: core.Input }],
        lang: [{ type: core.Input }]
    };

    var HelpModule = /** @class */ (function () {
        function HelpModule() {
        }
        HelpModule.forRoot = function (config) {
            return {
                ngModule: HelpModule,
                providers: [
                    HelpService,
                    config.configLoader
                ]
            };
        };
        return HelpModule;
    }());
    HelpModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        HelpComponent,
                    ],
                    providers: [
                        HelpService,
                        EdcTranslationService,
                    ],
                    exports: [
                        HelpComponent
                    ],
                    entryComponents: [
                        HelpComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of edc-popover-ng
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DEFINED_TRANSLATION_CODES = DEFINED_TRANSLATION_CODES;
    exports.HelpComponent = HelpComponent;
    exports.HelpModule = HelpModule;
    exports.HelpService = HelpService;
    exports.LANGUAGE_CODES = LANGUAGE_CODES;
    exports.PopoverConfigurationHandler = PopoverConfigurationHandler;
    exports.SYS_LANG = SYS_LANG;
    exports.ɵa = EdcTranslationService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=edc-popover-ng.umd.js.map

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('edc-client-js'), require('edc-popover-js'), require('@angular/common'), require('edc-popover-js/dist/edc-popover.css')) :
    typeof define === 'function' && define.amd ? define('edc-popover-ng', ['exports', '@angular/core', 'edc-client-js', 'edc-popover-js', '@angular/common', 'edc-popover-js/dist/edc-popover.css'], factory) :
    (global = global || self, factory(global['edc-popover-ng'] = {}, global.ng.core, global.edcClientJs, global.edcPopoverJs, global.ng.common));
}(this, (function (exports, core, edcClientJs, edcPopoverJs, common) { 'use strict';

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
        'fr'
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
        HelpService.prototype.getPopoverTranslation = function (langCode) {
            return this.edcClient.getPopoverLabels(langCode);
        };
        return HelpService;
    }());
    HelpService.decorators = [
        { type: core.Injectable }
    ];
    HelpService.ctorParameters = function () { return [
        { type: PopoverConfigurationHandler }
    ]; };

    var LABELS_EN = {
        articles: 'Need more...',
        links: 'Related topics',
        iconAlt: 'Help',
        comingSoon: 'Contextual help is coming soon.',
        errors: {
            failedData: 'An error occurred when fetching data !\\nCheck the brick keys provided to the EdcHelp component.'
        },
        content: null,
        url: '',
        exportId: ''
    };
    var LABELS_FR = {
        articles: 'Plus d\'info...',
        links: 'Sujets associés',
        iconAlt: 'Aide',
        comingSoon: 'Aide contextuelle à venir.',
        errors: {
            failedData: 'Une erreur est survenue lors de la récupération des données !' +
                '\\nVérifiez les clés de la brique fournies au composant EdcHelp.'
        },
        content: null,
        url: '',
        exportId: ''
    };
    var DEFAULT_LABELS = new Map()
        .set('en', LABELS_EN)
        .set('fr', LABELS_FR);

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
        EdcTranslationService.prototype.getTranslation = function (lang) {
            var _this = this;
            if (lang === void 0) { lang = this.lang; }
            var langToUse = this.helpService.isLanguagePresent(lang) ? lang : this.defaultLanguage;
            return this.helpService.getPopoverTranslation(langToUse)
                .catch(function () { return _this.loadDefaultLabels(lang); });
        };
        /**
         * Load default popover labels on error
         *
         * @param lang the lang code
         * @param defaultLanguage default lang code
         */
        EdcTranslationService.prototype.loadDefaultLabels = function (lang, defaultLanguage) {
            if (defaultLanguage === void 0) { defaultLanguage = this.defaultLanguage; }
            var labelTranslation = DEFAULT_LABELS.get(lang) || DEFAULT_LABELS.get(this.defaultLanguage)
                || DEFAULT_LABELS.get(SYS_LANG);
            return Promise.resolve(labelTranslation);
        };
        return EdcTranslationService;
    }());
    EdcTranslationService.decorators = [
        { type: core.Injectable }
    ];
    EdcTranslationService.ctorParameters = function () { return [
        { type: HelpService }
    ]; };

    var HelpConfigService = /** @class */ (function () {
        function HelpConfigService(helpService, translationService) {
            this.helpService = helpService;
            this.translationService = translationService;
        }
        HelpConfigService.prototype.buildPopoverConfig = function (primaryKey, subKey, pluginId, lang, placement, customClass) {
            var _this = this;
            if (placement === void 0) { placement = 'bottom'; }
            // Get the helper
            return this.helpService.getHelp(primaryKey, subKey, pluginId, lang)
                .then(function (helper) { return _this.addContent(helper, primaryKey, subKey, lang); })
                .then(function (config) { return _this.addLabels(config); })
                .then(function (config) { return _this.addOptions(config, placement, customClass); })
                .catch(function (err) {
                console.error(err);
            });
        };
        HelpConfigService.prototype.getIcon = function () {
            return this.helpService.getIcon();
        };
        HelpConfigService.prototype.updateOptions = function (config, placement, customClass) {
            if (!config) {
                return null;
            }
            config.options.placement = placement;
            config.options.customClass = customClass;
            return config;
        };
        HelpConfigService.prototype.addContent = function (helper, primaryKey, subKey, lang) {
            var config = new edcPopoverJs.PopoverConfig();
            if (helper) {
                var resolvedLanguage = helper.language;
                if (resolvedLanguage !== lang) {
                    console.warn("Requested language " + lang + " could not be loaded,\n           content will be using default language " + helper.language + " instead");
                }
                // Set translation language for the labels
                this.translationService.setLang(resolvedLanguage);
                var title = helper.label, description = helper.description, articles = helper.articles, links = helper.links;
                config.content = Object.assign(new edcPopoverJs.PopoverContent(), {
                    title: title, description: description, articles: articles, links: links
                });
                // Parse article and links urls
                this.parseUrls(config, primaryKey, subKey, resolvedLanguage, helper.exportId);
            }
            else {
                console.error("Could not load Helper for the key " + primaryKey + " and subKey " + subKey);
            }
            return config;
        };
        HelpConfigService.prototype.parseUrls = function (config, primaryKey, subKey, lang, pluginId) {
            var _this = this;
            if (!config || !config.content) {
                return;
            }
            var articles = config.content.articles || [];
            var links = config.content.links || [];
            articles.forEach(function (article, index) { return article.url = _this.helpService.getContextUrl(primaryKey, subKey, lang, index, pluginId); });
            links.forEach(function (link) { return link.url = _this.helpService.getDocumentationUrl(link.id); });
        };
        HelpConfigService.prototype.addLabels = function (config) {
            return this.translationService.getTranslation()
                .then(function (translations) {
                config.labels = translations;
                return config;
            })
                .catch(function () { return config; });
        };
        HelpConfigService.prototype.addOptions = function (config, placement, customClass) {
            config.options = Object.assign(new edcPopoverJs.PopoverOptions(), { placement: placement, customClass: customClass });
            var container = this.helpService.getContainer();
            if (container && container !== 'body') {
                config.options.appendTo = 'parent';
            }
            else {
                config.options.appendTo = function () { return document.body; };
            }
            return config;
        };
        return HelpConfigService;
    }());
    HelpConfigService.decorators = [
        { type: core.Injectable }
    ];
    HelpConfigService.ctorParameters = function () { return [
        { type: HelpService },
        { type: EdcTranslationService }
    ]; };

    var HelpComponent = /** @class */ (function () {
        function HelpComponent(helpConfigService) {
            this.helpConfigService = helpConfigService;
            this.DEFAULT_PLACEMENT = 'bottom';
        }
        HelpComponent.prototype.ngOnInit = function () {
            this.iconCss = this.helpConfigService.getIcon();
        };
        HelpComponent.prototype.ngOnChanges = function (changes) {
            // When at least one of the inputs related to content changes, the configuration must be rebuild
            var contentTriggers = ['pluginId', 'mainKey', 'subKey', 'lang'];
            // Those only require to update the configuration options attribute
            var optionsTriggers = ['placement', 'customClass'];
            if (contentTriggers.some(function (prop) { return changes[prop]; })) {
                this.buildPopoverConfig();
            }
            else if (optionsTriggers.some(function (prop) { return changes[prop]; })) {
                this.config = this.helpConfigService.updateOptions(this.config, this.placement, this.customClass);
            }
        };
        HelpComponent.prototype.getIconClasses = function () {
            var classes = [];
            if (this.iconCss) {
                classes.push(this.iconCss);
            }
            // Set dark class
            if (this.dark) {
                classes.push('on-dark');
            }
            return classes;
        };
        HelpComponent.prototype.buildPopoverConfig = function () {
            var _this = this;
            var placement = this.placement || this.DEFAULT_PLACEMENT;
            this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, placement, this.customClass)
                .then(function (config) {
                _this.config = config;
            });
        };
        return HelpComponent;
    }());
    HelpComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'edc-help',
                    template: "\n    <i class=\"fa help-icon\" [ngClass]=\"this.getIconClasses()\" edcHelpPopover [config]=\"config\"></i>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["edc-help{font-size:16px;line-height:34px;padding-right:5px}edc-help .help-icon{color:#d3d3d3;cursor:pointer}edc-help .help-icon:hover{color:#3c8dbc}edc-help .help-icon.on-dark{color:rgba(0,0,0,.3)}edc-help .help-icon.on-dark:hover{color:#fff}"]
                },] }
    ];
    HelpComponent.ctorParameters = function () { return [
        { type: HelpConfigService }
    ]; };
    HelpComponent.propDecorators = {
        pluginId: [{ type: core.Input }],
        mainKey: [{ type: core.Input }],
        subKey: [{ type: core.Input }],
        placement: [{ type: core.Input }],
        dark: [{ type: core.Input }],
        lang: [{ type: core.Input }],
        customClass: [{ type: core.Input }]
    };

    var HelpPopoverDirective = /** @class */ (function () {
        function HelpPopoverDirective(elementRef) {
            this.elementRef = elementRef;
        }
        HelpPopoverDirective.prototype.ngOnChanges = function (changes) {
            this.loadPopover();
        };
        HelpPopoverDirective.prototype.loadPopover = function () {
            if (this.config && this.elementRef && this.elementRef.nativeElement) {
                this.config.target = this.elementRef.nativeElement;
                this.popoverInstance = new edcPopoverJs.Popover(this.config);
            }
        };
        return HelpPopoverDirective;
    }());
    HelpPopoverDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[edcHelpPopover]' },] }
    ];
    HelpPopoverDirective.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    HelpPopoverDirective.propDecorators = {
        config: [{ type: core.Input }]
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
                        HelpPopoverDirective
                    ],
                    providers: [
                        HelpService,
                        EdcTranslationService,
                        HelpConfigService
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
    exports.ɵa = HelpConfigService;
    exports.ɵb = EdcTranslationService;
    exports.ɵc = HelpPopoverDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=edc-popover-ng.umd.js.map

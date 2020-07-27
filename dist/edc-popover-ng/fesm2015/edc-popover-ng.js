import { Injectable, Component, Input, NgModule } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { CommonModule } from '@angular/common';
import 'edc-popover-js/dist/edc-popover.css';

class PopoverConfigurationHandler {
}

const LANGUAGE_CODES = [
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
const DEFINED_TRANSLATION_CODES = [
    'en',
    'fr',
    'ru',
    'vi',
    'zh'
];
const SYS_LANG = 'en';

class HelpService {
    constructor(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), configurationHandler.getHelpPath(), configurationHandler.getPluginId(), true, // Context only, don't load the whole doc
        configurationHandler.getI18nPath());
    }
    getHelp(primaryKey, subKey, pluginId, lang) {
        const pluginIdentifier = pluginId || this.configurationHandler.getPluginId();
        return this.edcClient.getHelper(primaryKey, subKey, pluginIdentifier, lang);
    }
    getContextUrl(mainKey, subKey, languageCode, articleIndex, pluginId) {
        return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
    }
    getDocumentationUrl(docId) {
        return this.edcClient.getDocumentationWebHelpUrl(docId);
    }
    getI18nUrl() {
        return this.edcClient.getPopoverI18nUrl();
    }
    getPluginId() {
        return this.configurationHandler.getPluginId();
    }
    getIcon() {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    }
    getContainer() {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    }
    getDefaultLanguage() {
        return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
    }
    isLanguagePresent(langCode) {
        return this.edcClient.isLanguagePresent(langCode);
    }
}
HelpService.decorators = [
    { type: Injectable }
];
HelpService.ctorParameters = () => [
    { type: PopoverConfigurationHandler }
];

class HelpConstants {
}
HelpConstants.MESSAGE_COMING_SOON = 'Contextual help is coming soon.';

class EdcTranslationService {
    constructor(helpService) {
        this.helpService = helpService;
        this.defaultLanguage = SYS_LANG;
        this.lang = SYS_LANG;
    }
    getLang() {
        return this.lang;
    }
    setLang(lang) {
        this.lang = lang;
    }
}
EdcTranslationService.decorators = [
    { type: Injectable }
];
EdcTranslationService.ctorParameters = () => [
    { type: HelpService }
];

class HelpComponent {
    constructor(helpService, translationService) {
        this.helpService = helpService;
        this.translationService = translationService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    ngOnInit() {
        // If a lang input was provided, helper is already being loaded from ngOnChanges
        if (this.langLoading === undefined) {
            // No helper loading in progress from ngOnChanges, so initialize helper
            this.initHelper();
        }
        this.translationService.setLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    ngOnChanges(changes) {
        if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
            this.initHelper();
        }
    }
    initHelper() {
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
    }
    loadHelper() {
        this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
            .then((helper) => {
            if (!helper) {
                throw new Error(`Could not load Helper for the key ${this.key} and subKey ${this.subKey}`);
            }
            this.helper = helper;
            const { language: resolvedLanguage } = helper;
            if (resolvedLanguage !== this.lang) {
                console.warn(`Requested language ${this.lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
                this.lang = resolvedLanguage;
            }
            // Set translation language for the labels
            this.translationService.setLang(this.lang);
            this.langLoading = null;
        })
            .catch((err) => {
            console.error(err);
            this.langLoading = null;
        });
    }
    goToArticle(index) {
        const articleUrl = this.helpService.getContextUrl(this.key, this.subKey, this.lang, index);
        this.open(articleUrl);
    }
    goToLink(link) {
        const url = this.helpService.getDocumentationUrl(link.id);
        this.open(url);
    }
    getPlacement() {
        return this.placement;
    }
    cancelClick($event) {
        $event.preventDefault();
    }
    open(url) {
        window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
    }
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'edc-help',
                template: `<i class="fa help-icon {{ iconCss }}"></i>`,
                styles: [":host{cursor:pointer;font-size:16px;line-height:34px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow:before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow:before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow:before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow:before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc;font-weight:700}.edc-popover-container{display:flex;flex-direction:column;flex-grow:1;line-height:20px;min-width:150px}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{color:#0275d8;cursor:pointer;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
            },] }
];
HelpComponent.ctorParameters = () => [
    { type: HelpService },
    { type: EdcTranslationService }
];
HelpComponent.propDecorators = {
    pluginId: [{ type: Input }],
    key: [{ type: Input }],
    subKey: [{ type: Input }],
    placement: [{ type: Input }],
    dark: [{ type: Input }],
    lang: [{ type: Input }]
};

class HelpModule {
    static forRoot(config) {
        return {
            ngModule: HelpModule,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    }
}
HelpModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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

export { DEFINED_TRANSLATION_CODES, HelpComponent, HelpModule, HelpService, LANGUAGE_CODES, PopoverConfigurationHandler, SYS_LANG, EdcTranslationService as ɵa };
//# sourceMappingURL=edc-popover-ng.js.map

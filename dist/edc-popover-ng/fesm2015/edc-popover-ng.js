import { Injectable, Component, ViewEncapsulation, Input, Directive, ElementRef, NgModule } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfig, PopoverContent, PopoverOptions, Popover } from 'edc-popover-js';
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
    'fr'
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
    getPopoverTranslation(langCode) {
        return this.edcClient.getPopoverLabels(langCode);
    }
}
HelpService.decorators = [
    { type: Injectable }
];
HelpService.ctorParameters = () => [
    { type: PopoverConfigurationHandler }
];

const LABELS_EN = {
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
const LABELS_FR = {
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
const DEFAULT_LABELS = new Map()
    .set('en', LABELS_EN)
    .set('fr', LABELS_FR);

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
    getTranslation(lang = this.lang) {
        const langToUse = this.helpService.isLanguagePresent(lang) ? lang : this.defaultLanguage;
        return this.helpService.getPopoverTranslation(langToUse)
            .catch(() => this.loadDefaultLabels(lang));
    }
    /**
     * Load default popover labels on error
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    loadDefaultLabels(lang, defaultLanguage = this.defaultLanguage) {
        const labelTranslation = DEFAULT_LABELS.get(lang) || DEFAULT_LABELS.get(this.defaultLanguage)
            || DEFAULT_LABELS.get(SYS_LANG);
        return Promise.resolve(labelTranslation);
    }
}
EdcTranslationService.decorators = [
    { type: Injectable }
];
EdcTranslationService.ctorParameters = () => [
    { type: HelpService }
];

class HelpConfigService {
    constructor(helpService, translationService) {
        this.helpService = helpService;
        this.translationService = translationService;
    }
    buildPopoverConfig(primaryKey, subKey, pluginId, lang, placement = 'bottom', customClass) {
        // Get the helper
        return this.helpService.getHelp(primaryKey, subKey, pluginId, lang)
            .then((helper) => this.addContent(helper, primaryKey, subKey, lang))
            .then((config) => this.addLabels(config))
            .then((config) => this.addOptions(config, placement, customClass))
            .catch((err) => {
            console.error(err);
        });
    }
    getIcon() {
        return this.helpService.getIcon();
    }
    updateOptions(config, placement, customClass) {
        if (!config) {
            return null;
        }
        config.options.placement = placement;
        config.options.customClass = customClass;
        return config;
    }
    addContent(helper, primaryKey, subKey, lang) {
        const config = new PopoverConfig();
        if (helper) {
            const { language: resolvedLanguage } = helper;
            if (resolvedLanguage !== lang) {
                console.warn(`Requested language ${lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
            }
            // Set translation language for the labels
            this.translationService.setLang(resolvedLanguage);
            const { label: title, description, articles, links } = helper;
            config.content = Object.assign(new PopoverContent(), {
                title, description, articles, links
            });
            // Parse article and links urls
            this.parseUrls(config, primaryKey, subKey, resolvedLanguage, helper.exportId);
        }
        else {
            console.error(`Could not load Helper for the key ${primaryKey} and subKey ${subKey}`);
        }
        return config;
    }
    parseUrls(config, primaryKey, subKey, lang, pluginId) {
        if (!config || !config.content) {
            return;
        }
        const articles = config.content.articles || [];
        const links = config.content.links || [];
        articles.forEach((article, index) => article.url = this.helpService.getContextUrl(primaryKey, subKey, lang, index, pluginId));
        links.forEach((link) => link.url = this.helpService.getDocumentationUrl(link.id));
    }
    addLabels(config) {
        return this.translationService.getTranslation()
            .then((translations) => {
            config.labels = translations;
            return config;
        })
            .catch(() => config);
    }
    addOptions(config, placement, customClass) {
        config.options = Object.assign(new PopoverOptions(), { placement, customClass });
        const container = this.helpService.getContainer();
        if (container && container !== 'body') {
            config.options.appendTo = 'parent';
        }
        else {
            config.options.appendTo = () => document.body;
        }
        return config;
    }
}
HelpConfigService.decorators = [
    { type: Injectable }
];
HelpConfigService.ctorParameters = () => [
    { type: HelpService },
    { type: EdcTranslationService }
];

class HelpComponent {
    constructor(helpConfigService) {
        this.helpConfigService = helpConfigService;
        this.DEFAULT_PLACEMENT = 'bottom';
    }
    ngOnInit() {
        this.iconCss = this.helpConfigService.getIcon();
    }
    ngOnChanges(changes) {
        // When at least one of the inputs related to content changes, the configuration must be rebuild
        const contentTriggers = ['pluginId', 'mainKey', 'subKey', 'lang'];
        // Those only require to update the configuration options attribute
        const optionsTriggers = ['placement', 'customClass'];
        if (contentTriggers.some(prop => changes[prop])) {
            this.buildPopoverConfig();
        }
        else if (optionsTriggers.some(prop => changes[prop])) {
            this.config = this.helpConfigService.updateOptions(this.config, this.placement, this.customClass);
        }
    }
    getIconClasses() {
        const classes = [];
        if (this.iconCss) {
            classes.push(this.iconCss);
        }
        // Set dark class
        if (this.dark) {
            classes.push('on-dark');
        }
        return classes;
    }
    buildPopoverConfig() {
        const placement = this.placement || this.DEFAULT_PLACEMENT;
        this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, placement, this.customClass)
            .then((config) => {
            this.config = config;
        });
    }
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'edc-help',
                template: `
    <i class="fa help-icon" [ngClass]="this.getIconClasses()" edcHelpPopover [config]="config"></i>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: ["edc-help{font-size:16px;line-height:34px;padding-right:5px}edc-help .help-icon{color:#d3d3d3;cursor:pointer}edc-help .help-icon:hover{color:#3c8dbc}edc-help .help-icon.on-dark{color:rgba(0,0,0,.3)}edc-help .help-icon.on-dark:hover{color:#fff}"]
            },] }
];
HelpComponent.ctorParameters = () => [
    { type: HelpConfigService }
];
HelpComponent.propDecorators = {
    pluginId: [{ type: Input }],
    mainKey: [{ type: Input }],
    subKey: [{ type: Input }],
    placement: [{ type: Input }],
    dark: [{ type: Input }],
    lang: [{ type: Input }],
    customClass: [{ type: Input }]
};

class HelpPopoverDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnChanges(changes) {
        this.loadPopover();
    }
    loadPopover() {
        if (this.config && this.elementRef && this.elementRef.nativeElement) {
            this.config.target = this.elementRef.nativeElement;
            this.popoverInstance = new Popover(this.config);
        }
    }
}
HelpPopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[edcHelpPopover]' },] }
];
HelpPopoverDirective.ctorParameters = () => [
    { type: ElementRef }
];
HelpPopoverDirective.propDecorators = {
    config: [{ type: Input }]
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

export { DEFINED_TRANSLATION_CODES, HelpComponent, HelpModule, HelpService, LANGUAGE_CODES, PopoverConfigurationHandler, SYS_LANG, HelpConfigService as ɵa, EdcTranslationService as ɵb, HelpPopoverDirective as ɵc };
//# sourceMappingURL=edc-popover-ng.js.map

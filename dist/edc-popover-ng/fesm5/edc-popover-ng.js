import { __decorate, __metadata } from 'tslib';
import { Injectable, Input, Component, NgModule } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { TranslateService, TranslateModule, TranslateLoader as TranslateLoader$1, MissingTranslationHandler } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

var PopoverConfigurationHandler = /** @class */ (function () {
    function PopoverConfigurationHandler() {
    }
    return PopoverConfigurationHandler;
}());

var labels = {
	articles: "Need more...",
	links: "Related topics"
};
var en = {
	labels: labels
};

var labels$1 = {
	articles: "Plus d'info...",
	links: "Sujets associés"
};
var fr = {
	labels: labels$1
};

var labels$2 = {
	articles: "Подробнее...",
	links: "Связанные темы"
};
var ru = {
	labels: labels$2
};

var labels$3 = {
	articles: "Đọc thêm...",
	links: "Liên quan"
};
var vi = {
	labels: labels$3
};

var labels$4 = {
	articles: "需要更多...",
	links: "相关话题"
};
var zh = {
	labels: labels$4
};

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
// Default translations content
var localTranslations = {
    en: en,
    fr: fr,
    ru: ru,
    vi: vi,
    zh: zh
};

var HelpService = /** @class */ (function () {
    function HelpService(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), configurationHandler.getHelpPath(), configurationHandler.getPluginId(), true, // Context only, don't load the whole doc
        configurationHandler.getI18nPath());
    }
    HelpService.prototype.getHelp = function (primaryKey, subKey, pluginId) {
        return this.edcClient.getHelper(primaryKey, subKey, pluginId || this.configurationHandler.getPluginId());
    };
    HelpService.prototype.getContextUrl = function (mainKey, subKey, languageCode, articleIndex, pluginId) {
        return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
    };
    HelpService.prototype.getDocumentationUrl = function (docId) {
        return this.edcClient.getDocumentationWebHelpUrl(docId);
    };
    HelpService.prototype.getI18nUrl = function () {
        return this.edcClient.getI18nUrl();
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
    HelpService.prototype.setCurrentLanguage = function (languageCode) {
        this.edcClient.setCurrentLanguage(languageCode);
    };
    HelpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PopoverConfigurationHandler])
    ], HelpService);
    return HelpService;
}());

var HelpConstants = /** @class */ (function () {
    function HelpConstants() {
    }
    HelpConstants.MESSAGE_COMING_SOON = 'Contextual help is coming soon.';
    return HelpConstants;
}());

function isLanguageCodePresent(code, languages) {
    return code && languages && languages.length && languages.indexOf(code) > -1;
}

var HelpComponent = /** @class */ (function () {
    function HelpComponent(helpService, translateService) {
        this.helpService = helpService;
        this.translateService = translateService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    HelpComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.key && this.subKey) {
            setTimeout(function () {
                _this.helpService.getHelp(_this.key, _this.subKey, _this.pluginId)
                    .then(function (helper) { return _this.helper = helper; }, function (err) { return console.warn('Contextual Help not found : ', err); });
            }, 2000);
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    };
    HelpComponent.prototype.ngOnChanges = function (changes) {
        if (changes['lang'] && isLanguageCodePresent(changes['lang'].currentValue, LANGUAGE_CODES)) {
            this.translateService.use(this.lang);
            this.helpService.setCurrentLanguage(this.lang);
        }
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HelpComponent.prototype, "pluginId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HelpComponent.prototype, "key", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HelpComponent.prototype, "subKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HelpComponent.prototype, "placement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HelpComponent.prototype, "dark", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HelpComponent.prototype, "lang", void 0);
    HelpComponent = __decorate([
        Component({
            selector: 'edc-help',
            template: "\n    <!-- Popover template -->\n    <ng-template #popTemplate>\n      <div class=\"edc-popover-container\" (click)=\"$event.stopPropagation()\">\n        <article class=\"popover-article\">{{ helper?.description }}</article>\n        <div class=\"see-also\">\n          <div *ngIf=\"helper?.articles.length\">\n            <h6><strong><span>{{ 'labels.articles' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let article of helper.articles; let key = index\" class=\"see-also-item\"\n                  (click)=\"goToArticle(key)\">\n                <div class=\"article-link\">{{article.label}}</div>\n              </li>\n            </ul>\n          </div>\n          <div *ngIf=\"helper?.links.length\">\n            <h6><strong><span>{{ 'labels.links' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let link of helper.links\" class=\"see-also-item\" (click)=\"goToLink(link)\">\n                <div class=\"article-link\">{{link.label}}</div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n\n\n    <!-- app-help template -->\n    <i class=\"fa help-icon {{ iconCss }}\"\n    [popover]=\"helper ? popTemplate : comingSoon\"\n    [popoverTitle]=\"helper?.label\"\n    [placement]=\"getPlacement()\"\n    [ngClass]=\"{'on-dark': dark }\"\n    [container]=\"container\"\n    [outsideClick]=\"true\"\n    (click)=\"cancelClick($event)\">\n    </i>\n  ",
            styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
        }),
        __metadata("design:paramtypes", [HelpService, TranslateService])
    ], HelpComponent);
    return HelpComponent;
}());

var TranslateMissingTranslationHandler = /** @class */ (function () {
    function TranslateMissingTranslationHandler() {
    }
    TranslateMissingTranslationHandler.prototype.handle = function (params) {
        return '';
    };
    return TranslateMissingTranslationHandler;
}());

// AoT requires an exported function for factories
function HttpLoaderFactory(http, helpService) {
    var defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
    var i18nUrl = helpService.getI18nUrl();
    return new TranslateLoader(http, defaultLanguage, i18nUrl);
}
var TranslateLoader = /** @class */ (function () {
    function TranslateLoader(http, defaultLanguage, prefix, suffix) {
        if (defaultLanguage === void 0) { defaultLanguage = SYS_LANG; }
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = '.json'; }
        this.http = http;
        this.defaultLanguage = defaultLanguage;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    TranslateLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        if (lang === void 0) { lang = SYS_LANG; }
        var langToUse = isLanguageCodePresent(lang, LANGUAGE_CODES) ? lang : this.defaultLanguage;
        return this.http.get(this.prefix + "/" + langToUse + this.suffix).pipe(catchError(function () { return _this.getTranslationFile(lang); }));
    };
    /**
     * Get the i18n json file for the requested lang
     * Will be called if no i18n file was found on server for this lang
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    TranslateLoader.prototype.getTranslationFile = function (lang, defaultLanguage) {
        if (defaultLanguage === void 0) { defaultLanguage = this.defaultLanguage; }
        var translationFile = (lang && localTranslations[lang]) ||
            (defaultLanguage && localTranslations[defaultLanguage]) ||
            localTranslations[SYS_LANG];
        return of(translationFile);
    };
    return TranslateLoader;
}());

var ɵ0 = HttpLoaderFactory;
var HelpModule = /** @class */ (function () {
    function HelpModule() {
    }
    HelpModule_1 = HelpModule;
    HelpModule.forRoot = function (config) {
        return {
            ngModule: HelpModule_1,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    };
    var HelpModule_1;
    HelpModule = HelpModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader$1,
                        useFactory: ɵ0,
                        deps: [HttpClient, HelpService]
                    },
                    missingTranslationHandler: {
                        provide: MissingTranslationHandler,
                        useClass: TranslateMissingTranslationHandler
                    }
                }),
                PopoverModule.forRoot()
            ],
            declarations: [
                HelpComponent
            ],
            providers: [
                HelpService
            ],
            exports: [
                HelpComponent
            ],
            entryComponents: [
                HelpComponent
            ]
        })
    ], HelpModule);
    return HelpModule;
}());

export { DEFINED_TRANSLATION_CODES, HelpComponent, HelpModule, HelpService, LANGUAGE_CODES, PopoverConfigurationHandler, SYS_LANG, localTranslations, ɵ0, HttpLoaderFactory as ɵa, TranslateMissingTranslationHandler as ɵb };
//# sourceMappingURL=edc-popover-ng.js.map

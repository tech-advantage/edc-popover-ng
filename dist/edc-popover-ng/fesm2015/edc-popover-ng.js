import { __decorate, __metadata } from 'tslib';
import { Injectable, Input, Component, NgModule } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { TranslateService, TranslateModule, TranslateLoader as TranslateLoader$1, MissingTranslationHandler } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

class PopoverConfigurationHandler {
}

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
// Default translations content
const localTranslations = {
    en,
    fr,
    ru,
    vi,
    zh
};

let HelpService = class HelpService {
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
};
HelpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PopoverConfigurationHandler])
], HelpService);

class HelpConstants {
}
HelpConstants.MESSAGE_COMING_SOON = 'Contextual help is coming soon.';

let HelpComponent = class HelpComponent {
    constructor(helpService, translateService) {
        this.helpService = helpService;
        this.translateService = translateService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    ngOnInit() {
        // If a lang input was provided, helper is already being loaded from ngOnChanges
        if (this.langLoading === undefined) {
            // No helper loading in progress from ngOnChanges, so initialize helper
            this.initHelper();
        }
        this.translateService.setDefaultLang(SYS_LANG);
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
                this.lang = resolvedLanguage;
                console.warn(`Requested language ${this.lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
            }
            // Set translation language for the labels
            this.translateService.use(this.lang);
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
        template: `
    <!-- Popover template -->
    <ng-template #popTemplate>
      <div class="edc-popover-container" (click)="$event.stopPropagation()">
        <article class="popover-article">{{ helper?.description }}</article>
        <div class="see-also">
          <div *ngIf="helper?.articles.length">
            <h6><strong><span>{{ 'labels.articles' | translate }}</span></strong></h6>
            <ul class="see-also-list">
              <li *ngFor="let article of helper.articles; let key = index" class="see-also-item"
                  (click)="goToArticle(key)">
                <div class="article-link">{{article.label}}</div>
              </li>
            </ul>
          </div>
          <div *ngIf="helper?.links.length">
            <h6><strong><span>{{ 'labels.links' | translate }}</span></strong></h6>
            <ul class="see-also-list">
              <li *ngFor="let link of helper.links" class="see-also-item" (click)="goToLink(link)">
                <div class="article-link">{{link.label}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ng-template>


    <!-- app-help template -->
    <i class="fa help-icon {{ iconCss }}"
       [popover]="helper ? popTemplate : comingSoon"
       [popoverTitle]="helper?.label"
       [placement]="getPlacement()"
       [ngClass]="{'on-dark': dark }"
       [container]="container"
       [outsideClick]="true"
       (click)="cancelClick($event)">
    </i>
  `,
        styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
    }),
    __metadata("design:paramtypes", [HelpService, TranslateService])
], HelpComponent);

class TranslateMissingTranslationHandler {
    handle(params) {
        return '';
    }
}

class TranslateLoader {
    constructor(http, helpService, defaultLanguage = SYS_LANG, prefix = '', suffix = '.json') {
        this.http = http;
        this.helpService = helpService;
        this.defaultLanguage = defaultLanguage;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    getTranslation(lang = SYS_LANG) {
        const langToUse = this.helpService.isLanguagePresent(lang) ? lang : this.defaultLanguage;
        return this.http.get(`${this.prefix}/${langToUse}${this.suffix}`).pipe(catchError(() => this.getTranslationFile(lang)));
    }
    /**
     * Get the i18n json file for the requested lang
     * Will be called if no i18n file was found on server for this lang
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    getTranslationFile(lang, defaultLanguage = this.defaultLanguage) {
        const translationFile = (lang && localTranslations[lang]) ||
            (defaultLanguage && localTranslations[defaultLanguage]) ||
            localTranslations[SYS_LANG];
        return of(translationFile);
    }
}
// AoT requires an exported function for factories
function HttpLoaderFactory(http, helpService) {
    const defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
    const i18nUrl = helpService.getI18nUrl();
    return new TranslateLoader(http, helpService, defaultLanguage, i18nUrl);
}

var HelpModule_1;
const ɵ0 = HttpLoaderFactory;
let HelpModule = HelpModule_1 = class HelpModule {
    static forRoot(config) {
        return {
            ngModule: HelpModule_1,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    }
};
HelpModule = HelpModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule,
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

export { DEFINED_TRANSLATION_CODES, HelpComponent, HelpModule, HelpService, LANGUAGE_CODES, PopoverConfigurationHandler, SYS_LANG, localTranslations, ɵ0, HttpLoaderFactory as ɵa, TranslateMissingTranslationHandler as ɵb };
//# sourceMappingURL=edc-popover-ng.js.map

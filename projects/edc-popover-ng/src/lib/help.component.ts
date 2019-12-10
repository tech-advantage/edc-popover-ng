import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { SYS_LANG } from './translate/language-codes';

@Component({
  selector: 'edc-help',
  styleUrls: ['help.less'],
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
  `
})
export class HelpComponent implements OnInit, OnChanges {
  helper: Helper;
  container: string;
  iconCss: string;
  comingSoon = HelpConstants.MESSAGE_COMING_SOON;
  langLoading: string; // The lang in use to load the helper - for race conditions

  @Input() pluginId: string; // if defined, the plugin identifier to use for fetching help content
  @Input() key: string;
  @Input() subKey: string;
  @Input() placement = 'bottom';
  @Input() dark: boolean;
  @Input() lang: string;

  constructor(private readonly helpService: HelpService, private readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
    // If a lang input was provided, helper is already being loaded from ngOnChanges
    if (this.langLoading === undefined) {
      // No helper loading in progress from ngOnChanges, so initialize helper
      this.initHelper();
    }
    this.translateService.setDefaultLang(SYS_LANG);
    this.iconCss = this.helpService.getIcon();
    this.container = this.helpService.getContainer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
      this.initHelper();
    }

  }

  private initHelper(): void {
    if (this.key && this.subKey) {
      this.langLoading = this.lang || null;
      if (this.helper) {
        // This is not the first initialization, just an update, skip timeout
        this.loadHelper();
      } else {
        // Set timeout because popover content loading is not a bootstrap top priority.
        setTimeout(this.loadHelper.bind(this), 2000);
      }
    }
  }

  loadHelper(): void {
    this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
      .then((helper: Helper) => {
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
        this.translateService.use(this.lang);

        this.langLoading = null;
      })
      .catch((err: Error) => {
        console.error(err);
        this.langLoading = null;
      });
  }

  goToArticle(index: number): void {
    const articleUrl = this.helpService.getContextUrl(this.key, this.subKey, this.lang, index);
    this.open(articleUrl);
  }

  goToLink(link: Link): void {
    const url = this.helpService.getDocumentationUrl(link.id);
    this.open(url);
  }

  getPlacement(): string {
    return this.placement;
  }

  cancelClick($event: Event): void {
    $event.preventDefault();
  }

  private open(url: string): void {
    window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
  }
}

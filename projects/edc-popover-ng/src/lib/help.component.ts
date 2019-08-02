import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { isLanguageCodePresent } from './utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG } from './translate/language-codes';

@Component({
  selector: 'edc-help',
  styleUrls: [ 'help.less' ],
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

  @Input() pluginId: string; // if defined, the plugin identifier to use for fetching help content
  @Input() key: string;
  @Input() subKey: string;
  @Input() placement = 'bottom';
  @Input() dark: boolean;
  @Input() lang: string;

  constructor(private readonly helpService: HelpService, private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.key && this.subKey) {
      setTimeout(() => { // set timeout because popover content loading is not top priority.
        this.helpService.getHelp(this.key, this.subKey, this.pluginId)
          .then((helper: Helper) => this.helper = helper,
            (err) => console.warn('Contextual Help not found : ', err));
      }, 2000);
    }
    this.translateService.setDefaultLang(SYS_LANG);
    this.iconCss = this.helpService.getIcon();
    this.container = this.helpService.getContainer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang'] && isLanguageCodePresent(changes['lang'].currentValue, LANGUAGE_CODES)) {
      const langToUse = this.helpService.setCurrentLanguage(this.lang);
      if (langToUse) {
        this.translateService.use(langToUse);
      }
    }
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

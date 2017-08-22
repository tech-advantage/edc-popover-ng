import { Component, OnInit, Input } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';

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
            <h6><strong><span> Need more...</span></strong></h6>
            <ul class="list-unstyled see-also-list">
              <li *ngFor="let article of helper.articles; let key = index" class="see-also-item" (click)="goToArticle(key)">
                <div class="article-link">-{{article.label}}</div>
              </li>
            </ul>
          </div>
          <div *ngIf="helper?.links.length">
            <h6><strong><span>Links</span></strong></h6>
            <ul class="list-unstyled see-also-list">
              <li *ngFor="let link of helper.links" class="see-also-item" (click)="goToLink(link)">
                <div class="article-link">-{{link.label}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ng-template>

    <!-- app-help template -->
    <i class="fa help-icon {{ iconCss }}"
       #popover="bs-popover"
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
export class HelpComponent implements OnInit {
  helper: Helper;
  container: string;
  iconCss: string;
  comingSoon = HelpConstants.MESSAGE_COMING_SOON;

  @Input() key: string;
  @Input() subKey: string;
  @Input() placement = 'bottom';
  @Input() dark: boolean;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    if (this.key && this.subKey) {
      this.helpService.getHelp(this.key, this.subKey).then((helper: Helper) => this.helper = helper);
    }
    this.iconCss = this.helpService.getIcon();
    this.container = this.helpService.getContainer();
  }

  goToArticle(index: number): void {
    const basePath = this.helpService.getHelpPath();
    const url = `${basePath}/context/${this.key}/${this.subKey}/en/${index}`;
    this.open(url);
  }

  goToLink(link: Link): void {
    const basePath = this.helpService.getHelpPath();
    const url = `${basePath}/doc/${link.id}`;
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

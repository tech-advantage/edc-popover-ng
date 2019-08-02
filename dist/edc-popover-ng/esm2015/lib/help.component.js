import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { isLanguageCodePresent } from './utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG } from './translate/language-codes';
let HelpComponent = class HelpComponent {
    constructor(helpService, translateService) {
        this.helpService = helpService;
        this.translateService = translateService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    ngOnInit() {
        if (this.key && this.subKey) {
            setTimeout(() => {
                this.helpService.getHelp(this.key, this.subKey, this.pluginId)
                    .then((helper) => this.helper = helper, (err) => console.warn('Contextual Help not found : ', err));
            }, 2000);
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    ngOnChanges(changes) {
        if (changes['lang'] && isLanguageCodePresent(changes['lang'].currentValue, LANGUAGE_CODES)) {
            const langToUse = this.helpService.setCurrentLanguage(this.lang);
            if (langToUse) {
                this.translateService.use(langToUse);
            }
        }
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "pluginId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "subKey", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HelpComponent.prototype, "placement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], HelpComponent.prototype, "dark", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "lang", void 0);
HelpComponent = tslib_1.__decorate([
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
    tslib_1.__metadata("design:paramtypes", [HelpService, TranslateService])
], HelpComponent);
export { HelpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTZDdEUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQWF4QixZQUE2QixXQUF3QixFQUFtQixnQkFBa0M7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVQxRyxlQUFVLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBS3RDLGNBQVMsR0FBRyxRQUFRLENBQUM7SUFJK0UsQ0FBQztJQUU5RyxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztxQkFDM0QsSUFBSSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFDNUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUU7WUFDMUYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN0QztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFVO1FBQ2pCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sSUFBSSxDQUFDLEdBQVc7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGLENBQUE7QUFwRFU7SUFBUixLQUFLLEVBQUU7OytDQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7MENBQWE7QUFDWjtJQUFSLEtBQUssRUFBRTs7NkNBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7O2dEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7MkNBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7MkNBQWM7QUFYWCxhQUFhO0lBM0N6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUVwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUOztLQUNGLENBQUM7NkNBYzBDLFdBQVcsRUFBcUMsZ0JBQWdCO0dBYi9GLGFBQWEsQ0EwRHpCO1NBMURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVyLCBMaW5rIH0gZnJvbSAnZWRjLWNsaWVudC1qcyc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4vaGVscC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBDb25zdGFudHMgfSBmcm9tICcuL2hlbHAuY29uc3RhbnRzJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IGlzTGFuZ3VhZ2VDb2RlUHJlc2VudCB9IGZyb20gJy4vdXRpbHMvdHJhbnNsYXRlLnV0aWxzJztcbmltcG9ydCB7IExBTkdVQUdFX0NPREVTLCBTWVNfTEFORyB9IGZyb20gJy4vdHJhbnNsYXRlL2xhbmd1YWdlLWNvZGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWRjLWhlbHAnLFxuICBzdHlsZVVybHM6IFsgJ2hlbHAubGVzcycgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIFBvcG92ZXIgdGVtcGxhdGUgLS0+XG4gICAgPG5nLXRlbXBsYXRlICNwb3BUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJlZGMtcG9wb3Zlci1jb250YWluZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicG9wb3Zlci1hcnRpY2xlXCI+e3sgaGVscGVyPy5kZXNjcmlwdGlvbiB9fTwvYXJ0aWNsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlZS1hbHNvXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8uYXJ0aWNsZXMubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj57eyAnbGFiZWxzLmFydGljbGVzJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VlLWFsc28tbGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGFydGljbGUgb2YgaGVscGVyLmFydGljbGVzOyBsZXQga2V5ID0gaW5kZXhcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9BcnRpY2xlKGtleSlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+e3thcnRpY2xlLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8ubGlua3MubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj57eyAnbGFiZWxzLmxpbmtzJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VlLWFsc28tbGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxpbmsgb2YgaGVscGVyLmxpbmtzXCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCIgKGNsaWNrKT1cImdvVG9MaW5rKGxpbmspXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPnt7bGluay5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDwhLS0gYXBwLWhlbHAgdGVtcGxhdGUgLS0+XG4gICAgPGkgY2xhc3M9XCJmYSBoZWxwLWljb24ge3sgaWNvbkNzcyB9fVwiXG4gICAgW3BvcG92ZXJdPVwiaGVscGVyID8gcG9wVGVtcGxhdGUgOiBjb21pbmdTb29uXCJcbiAgICBbcG9wb3ZlclRpdGxlXT1cImhlbHBlcj8ubGFiZWxcIlxuICAgIFtwbGFjZW1lbnRdPVwiZ2V0UGxhY2VtZW50KClcIlxuICAgIFtuZ0NsYXNzXT1cInsnb24tZGFyayc6IGRhcmsgfVwiXG4gICAgW2NvbnRhaW5lcl09XCJjb250YWluZXJcIlxuICAgIFtvdXRzaWRlQ2xpY2tdPVwidHJ1ZVwiXG4gICAgKGNsaWNrKT1cImNhbmNlbENsaWNrKCRldmVudClcIj5cbiAgICA8L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgaGVscGVyOiBIZWxwZXI7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBpY29uQ3NzOiBzdHJpbmc7XG4gIGNvbWluZ1Nvb24gPSBIZWxwQ29uc3RhbnRzLk1FU1NBR0VfQ09NSU5HX1NPT047XG5cbiAgQElucHV0KCkgcGx1Z2luSWQ6IHN0cmluZzsgLy8gaWYgZGVmaW5lZCwgdGhlIHBsdWdpbiBpZGVudGlmaWVyIHRvIHVzZSBmb3IgZmV0Y2hpbmcgaGVscCBjb250ZW50XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJLZXk6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIGRhcms6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxhbmc6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleSAmJiB0aGlzLnN1YktleSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHNldCB0aW1lb3V0IGJlY2F1c2UgcG9wb3ZlciBjb250ZW50IGxvYWRpbmcgaXMgbm90IHRvcCBwcmlvcml0eS5cbiAgICAgICAgdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5wbHVnaW5JZClcbiAgICAgICAgICAudGhlbigoaGVscGVyOiBIZWxwZXIpID0+IHRoaXMuaGVscGVyID0gaGVscGVyLFxuICAgICAgICAgICAgKGVycikgPT4gY29uc29sZS53YXJuKCdDb250ZXh0dWFsIEhlbHAgbm90IGZvdW5kIDogJywgZXJyKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnNldERlZmF1bHRMYW5nKFNZU19MQU5HKTtcbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEljb24oKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGFpbmVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2xhbmcnXSAmJiBpc0xhbmd1YWdlQ29kZVByZXNlbnQoY2hhbmdlc1snbGFuZyddLmN1cnJlbnRWYWx1ZSwgTEFOR1VBR0VfQ09ERVMpKSB7XG4gICAgICBjb25zdCBsYW5nVG9Vc2UgPSB0aGlzLmhlbHBTZXJ2aWNlLnNldEN1cnJlbnRMYW5ndWFnZSh0aGlzLmxhbmcpO1xuICAgICAgaWYgKGxhbmdUb1VzZSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UudXNlKGxhbmdUb1VzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ29Ub0FydGljbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFydGljbGVVcmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRleHRVcmwodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLmxhbmcsIGluZGV4KTtcbiAgICB0aGlzLm9wZW4oYXJ0aWNsZVVybCk7XG4gIH1cblxuICBnb1RvTGluayhsaW5rOiBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXREb2N1bWVudGF0aW9uVXJsKGxpbmsuaWQpO1xuICAgIHRoaXMub3Blbih1cmwpO1xuICB9XG5cbiAgZ2V0UGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VtZW50O1xuICB9XG5cbiAgY2FuY2VsQ2xpY2soJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgd2luZG93Lm9wZW4odXJsLCAnaGVscCcsICdzY3JvbGxiYXJzPTEscmVzaXphYmxlPTEsaGVpZ2h0PTgwMCx3aWR0aD0xMjAwJyk7XG4gIH1cbn1cbiJdfQ==
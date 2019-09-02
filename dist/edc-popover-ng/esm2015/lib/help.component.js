import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { SYS_LANG } from './translate/language-codes';
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
            // No helper loading in progress from ngOnChanges, so init helper
            this.startHelper();
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    ngOnChanges(changes) {
        if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
            this.startHelper();
        }
    }
    startHelper() {
        this.langLoading = this.lang || null;
        this.helpService.setCurrentLanguage(this.lang).then(lang => {
            if (lang) {
                // We set local translate lang only if lang has been changed in client, using the returned value
                this.translateService.use(lang);
                this.lang = lang;
                this.initHelper();
            }
        });
    }
    initHelper() {
        if (this.key && this.subKey) {
            const loadHelper = () => {
                this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
                    .then((helper) => {
                    this.helper = helper;
                    this.langLoading = null;
                });
            };
            if (this.helper) {
                // This is not the first initialization, skip timeout
                loadHelper();
            }
            else {
                // Set timeout because popover content loading is not a bootstrap top priority.
                setTimeout(loadHelper, 2000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBNkN0RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBY3hCLFlBQTZCLFdBQXdCLEVBQW1CLGdCQUFrQztRQUE3RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVjFHLGVBQVUsR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQUM7UUFNdEMsY0FBUyxHQUFHLFFBQVEsQ0FBQztJQUs5QixDQUFDO0lBRUQsUUFBUTtRQUNOLGdGQUFnRjtRQUNoRixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQ2xDLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxN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Ozs7OztHQXNDVDs7S0FDRixDQUFDOzZDQWUwQyxXQUFXLEVBQXFDLGdCQUFnQjtHQWQvRixhQUFhLENBc0Z6QjtTQXRGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlciwgTGluayB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwQ29uc3RhbnRzIH0gZnJvbSAnLi9oZWxwLmNvbnN0YW50cyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBTWVNfTEFORyB9IGZyb20gJy4vdHJhbnNsYXRlL2xhbmd1YWdlLWNvZGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZWRjLWhlbHAnLFxuICBzdHlsZVVybHM6IFsnaGVscC5sZXNzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBQb3BvdmVyIHRlbXBsYXRlIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjcG9wVGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRjLXBvcG92ZXItY29udGFpbmVyXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBvcG92ZXItYXJ0aWNsZVwiPnt7IGhlbHBlcj8uZGVzY3JpcHRpb24gfX08L2FydGljbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWUtYWxzb1wiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmFydGljbGVzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+e3sgJ2xhYmVscy5hcnRpY2xlcycgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9zdHJvbmc+PC9oNj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBhcnRpY2xlIG9mIGhlbHBlci5hcnRpY2xlczsgbGV0IGtleSA9IGluZGV4XCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJnb1RvQXJ0aWNsZShrZXkpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPnt7YXJ0aWNsZS5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmxpbmtzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+e3sgJ2xhYmVscy5saW5rcycgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9zdHJvbmc+PC9oNj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsaW5rIG9mIGhlbHBlci5saW5rc1wiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiIChjbGljayk9XCJnb1RvTGluayhsaW5rKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj57e2xpbmsubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICA8IS0tIGFwcC1oZWxwIHRlbXBsYXRlIC0tPlxuICAgIDxpIGNsYXNzPVwiZmEgaGVscC1pY29uIHt7IGljb25Dc3MgfX1cIlxuICAgICAgIFtwb3BvdmVyXT1cImhlbHBlciA/IHBvcFRlbXBsYXRlIDogY29taW5nU29vblwiXG4gICAgICAgW3BvcG92ZXJUaXRsZV09XCJoZWxwZXI/LmxhYmVsXCJcbiAgICAgICBbcGxhY2VtZW50XT1cImdldFBsYWNlbWVudCgpXCJcbiAgICAgICBbbmdDbGFzc109XCJ7J29uLWRhcmsnOiBkYXJrIH1cIlxuICAgICAgIFtjb250YWluZXJdPVwiY29udGFpbmVyXCJcbiAgICAgICBbb3V0c2lkZUNsaWNrXT1cInRydWVcIlxuICAgICAgIChjbGljayk9XCJjYW5jZWxDbGljaygkZXZlbnQpXCI+XG4gICAgPC9pPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGhlbHBlcjogSGVscGVyO1xuICBjb250YWluZXI6IHN0cmluZztcbiAgaWNvbkNzczogc3RyaW5nO1xuICBjb21pbmdTb29uID0gSGVscENvbnN0YW50cy5NRVNTQUdFX0NPTUlOR19TT09OO1xuICBsYW5nTG9hZGluZzogc3RyaW5nOyAvLyBUaGUgbGFuZyBpbiB1c2UgdG8gbG9hZCB0aGUgaGVscGVyIC0gZm9yIHJhY2UgY29uZGl0aW9uc1xuXG4gIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7IC8vIGlmIGRlZmluZWQsIHRoZSBwbHVnaW4gaWRlbnRpZmllciB0byB1c2UgZm9yIGZldGNoaW5nIGhlbHAgY29udGVudFxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgQElucHV0KCkgc3ViS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlbWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSBkYXJrOiBib29sZWFuO1xuICBASW5wdXQoKSBsYW5nOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBoZWxwU2VydmljZTogSGVscFNlcnZpY2UsIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgYSBsYW5nIGlucHV0IHdhcyBwcm92aWRlZCwgaGVscGVyIGlzIGFscmVhZHkgYmVpbmcgbG9hZGVkIGZyb20gbmdPbkNoYW5nZXNcbiAgICBpZiAodGhpcy5sYW5nTG9hZGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBObyBoZWxwZXIgbG9hZGluZyBpbiBwcm9ncmVzcyBmcm9tIG5nT25DaGFuZ2VzLCBzbyBpbml0IGhlbHBlclxuICAgICAgdGhpcy5zdGFydEhlbHBlcigpO1xuICAgIH1cbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uuc2V0RGVmYXVsdExhbmcoU1lTX0xBTkcpO1xuICAgIHRoaXMuaWNvbkNzcyA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0SWNvbigpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250YWluZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snbGFuZyddICYmIGNoYW5nZXNbJ2xhbmcnXS5jdXJyZW50VmFsdWUgIT09IHRoaXMubGFuZ0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuc3RhcnRIZWxwZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0SGVscGVyKCk6IHZvaWQge1xuICAgIHRoaXMubGFuZ0xvYWRpbmcgPSB0aGlzLmxhbmcgfHwgbnVsbDtcbiAgICB0aGlzLmhlbHBTZXJ2aWNlLnNldEN1cnJlbnRMYW5ndWFnZSh0aGlzLmxhbmcpLnRoZW4obGFuZyA9PiB7XG4gICAgICBpZiAobGFuZykge1xuICAgICAgICAvLyBXZSBzZXQgbG9jYWwgdHJhbnNsYXRlIGxhbmcgb25seSBpZiBsYW5nIGhhcyBiZWVuIGNoYW5nZWQgaW4gY2xpZW50LCB1c2luZyB0aGUgcmV0dXJuZWQgdmFsdWVcbiAgICAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnVzZShsYW5nKTtcbiAgICAgICAgdGhpcy5sYW5nID0gbGFuZztcbiAgICAgICAgdGhpcy5pbml0SGVscGVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRIZWxwZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICBjb25zdCBsb2FkSGVscGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHAodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLnBsdWdpbklkLCB0aGlzLmxhbmcpXG4gICAgICAgICAgLnRoZW4oKGhlbHBlcjogSGVscGVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhlbHBlciA9IGhlbHBlcjtcbiAgICAgICAgICAgIHRoaXMubGFuZ0xvYWRpbmcgPSBudWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmhlbHBlcikge1xuICAgICAgICAvLyBUaGlzIGlzIG5vdCB0aGUgZmlyc3QgaW5pdGlhbGl6YXRpb24sIHNraXAgdGltZW91dFxuICAgICAgICBsb2FkSGVscGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXQgdGltZW91dCBiZWNhdXNlIHBvcG92ZXIgY29udGVudCBsb2FkaW5nIGlzIG5vdCBhIGJvb3RzdHJhcCB0b3AgcHJpb3JpdHkuXG4gICAgICAgIHNldFRpbWVvdXQobG9hZEhlbHBlciwgMjAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ29Ub0FydGljbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFydGljbGVVcmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRleHRVcmwodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLmxhbmcsIGluZGV4KTtcbiAgICB0aGlzLm9wZW4oYXJ0aWNsZVVybCk7XG4gIH1cblxuICBnb1RvTGluayhsaW5rOiBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXREb2N1bWVudGF0aW9uVXJsKGxpbmsuaWQpO1xuICAgIHRoaXMub3Blbih1cmwpO1xuICB9XG5cbiAgZ2V0UGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VtZW50O1xuICB9XG5cbiAgY2FuY2VsQ2xpY2soJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgd2luZG93Lm9wZW4odXJsLCAnaGVscCcsICdzY3JvbGxiYXJzPTEscmVzaXphYmxlPTEsaGVpZ2h0PTgwMCx3aWR0aD0xMjAwJyk7XG4gIH1cbn1cbiJdfQ==
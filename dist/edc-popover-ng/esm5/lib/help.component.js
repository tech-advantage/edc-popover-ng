import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { isLanguageCodePresent } from './utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG } from './translate/language-codes';
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
            template: "\n    <!-- Popover template -->\n    <ng-template #popTemplate>\n      <div class=\"edc-popover-container\" (click)=\"$event.stopPropagation()\">\n        <article class=\"popover-article\">{{ helper?.description }}</article>\n        <div class=\"see-also\">\n          <div *ngIf=\"helper?.articles.length\">\n            <h6><strong><span>{{ 'labels.articles' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let article of helper.articles; let key = index\" class=\"see-also-item\"\n                  (click)=\"goToArticle(key)\">\n                <div class=\"article-link\">{{article.label}}</div>\n              </li>\n            </ul>\n          </div>\n          <div *ngIf=\"helper?.links.length\">\n            <h6><strong><span>{{ 'labels.links' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let link of helper.links\" class=\"see-also-item\" (click)=\"goToLink(link)\">\n                <div class=\"article-link\">{{link.label}}</div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n\n\n    <!-- app-help template -->\n    <i class=\"fa help-icon {{ iconCss }}\"\n    [popover]=\"helper ? popTemplate : comingSoon\"\n    [popoverTitle]=\"helper?.label\"\n    [placement]=\"getPlacement()\"\n    [ngClass]=\"{'on-dark': dark }\"\n    [container]=\"container\"\n    [outsideClick]=\"true\"\n    (click)=\"cancelClick($event)\">\n    </i>\n  ",
            styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
        }),
        tslib_1.__metadata("design:paramtypes", [HelpService, TranslateService])
    ], HelpComponent);
    return HelpComponent;
}());
export { HelpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTZDdEU7SUFhRSx1QkFBNkIsV0FBd0IsRUFBbUIsZ0JBQWtDO1FBQTdFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQW1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFUMUcsZUFBVSxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUt0QyxjQUFTLEdBQUcsUUFBUSxDQUFDO0lBSStFLENBQUM7SUFFOUcsZ0NBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDO3FCQUMzRCxJQUFJLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsRUFDNUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7WUFDbEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxFQUFFO1lBQzFGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3ZCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2pCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxNQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sNEJBQUksR0FBWixVQUFhLEdBQVc7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQWpEUTtRQUFSLEtBQUssRUFBRTs7bURBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzs4Q0FBYTtJQUNaO1FBQVIsS0FBSyxFQUFFOztpREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7b0RBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzsrQ0FBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzsrQ0FBYztJQVhYLGFBQWE7UUEzQ3pCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBRXBCLFFBQVEsRUFBRSw4L0NBc0NUOztTQUNGLENBQUM7aURBYzBDLFdBQVcsRUFBcUMsZ0JBQWdCO09BYi9GLGFBQWEsQ0F3RHpCO0lBQUQsb0JBQUM7Q0FBQSxBQXhERCxJQXdEQztTQXhEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlciwgTGluayB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwQ29uc3RhbnRzIH0gZnJvbSAnLi9oZWxwLmNvbnN0YW50cyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBpc0xhbmd1YWdlQ29kZVByZXNlbnQgfSBmcm9tICcuL3V0aWxzL3RyYW5zbGF0ZS51dGlscyc7XG5pbXBvcnQgeyBMQU5HVUFHRV9DT0RFUywgU1lTX0xBTkcgfSBmcm9tICcuL3RyYW5zbGF0ZS9sYW5ndWFnZS1jb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbICdoZWxwLmxlc3MnIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBQb3BvdmVyIHRlbXBsYXRlIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjcG9wVGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRjLXBvcG92ZXItY29udGFpbmVyXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBvcG92ZXItYXJ0aWNsZVwiPnt7IGhlbHBlcj8uZGVzY3JpcHRpb24gfX08L2FydGljbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWUtYWxzb1wiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmFydGljbGVzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+e3sgJ2xhYmVscy5hcnRpY2xlcycgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9zdHJvbmc+PC9oNj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBhcnRpY2xlIG9mIGhlbHBlci5hcnRpY2xlczsgbGV0IGtleSA9IGluZGV4XCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJnb1RvQXJ0aWNsZShrZXkpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPnt7YXJ0aWNsZS5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmxpbmtzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+e3sgJ2xhYmVscy5saW5rcycgfCB0cmFuc2xhdGUgfX08L3NwYW4+PC9zdHJvbmc+PC9oNj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsaW5rIG9mIGhlbHBlci5saW5rc1wiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiIChjbGljayk9XCJnb1RvTGluayhsaW5rKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj57e2xpbmsubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICA8IS0tIGFwcC1oZWxwIHRlbXBsYXRlIC0tPlxuICAgIDxpIGNsYXNzPVwiZmEgaGVscC1pY29uIHt7IGljb25Dc3MgfX1cIlxuICAgIFtwb3BvdmVyXT1cImhlbHBlciA/IHBvcFRlbXBsYXRlIDogY29taW5nU29vblwiXG4gICAgW3BvcG92ZXJUaXRsZV09XCJoZWxwZXI/LmxhYmVsXCJcbiAgICBbcGxhY2VtZW50XT1cImdldFBsYWNlbWVudCgpXCJcbiAgICBbbmdDbGFzc109XCJ7J29uLWRhcmsnOiBkYXJrIH1cIlxuICAgIFtjb250YWluZXJdPVwiY29udGFpbmVyXCJcbiAgICBbb3V0c2lkZUNsaWNrXT1cInRydWVcIlxuICAgIChjbGljayk9XCJjYW5jZWxDbGljaygkZXZlbnQpXCI+XG4gICAgPC9pPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGhlbHBlcjogSGVscGVyO1xuICBjb250YWluZXI6IHN0cmluZztcbiAgaWNvbkNzczogc3RyaW5nO1xuICBjb21pbmdTb29uID0gSGVscENvbnN0YW50cy5NRVNTQUdFX0NPTUlOR19TT09OO1xuXG4gIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7IC8vIGlmIGRlZmluZWQsIHRoZSBwbHVnaW4gaWRlbnRpZmllciB0byB1c2UgZm9yIGZldGNoaW5nIGhlbHAgY29udGVudFxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgQElucHV0KCkgc3ViS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlbWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSBkYXJrOiBib29sZWFuO1xuICBASW5wdXQoKSBsYW5nOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBoZWxwU2VydmljZTogSGVscFNlcnZpY2UsIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXkgJiYgdGhpcy5zdWJLZXkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBzZXQgdGltZW91dCBiZWNhdXNlIHBvcG92ZXIgY29udGVudCBsb2FkaW5nIGlzIG5vdCB0b3AgcHJpb3JpdHkuXG4gICAgICAgIHRoaXMuaGVscFNlcnZpY2UuZ2V0SGVscCh0aGlzLmtleSwgdGhpcy5zdWJLZXksIHRoaXMucGx1Z2luSWQpXG4gICAgICAgICAgLnRoZW4oKGhlbHBlcjogSGVscGVyKSA9PiB0aGlzLmhlbHBlciA9IGhlbHBlcixcbiAgICAgICAgICAgIChlcnIpID0+IGNvbnNvbGUud2FybignQ29udGV4dHVhbCBIZWxwIG5vdCBmb3VuZCA6ICcsIGVycikpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5zZXREZWZhdWx0TGFuZyhTWVNfTEFORyk7XG4gICAgdGhpcy5pY29uQ3NzID0gdGhpcy5oZWxwU2VydmljZS5nZXRJY29uKCk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRhaW5lcigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydsYW5nJ10gJiYgaXNMYW5ndWFnZUNvZGVQcmVzZW50KGNoYW5nZXNbJ2xhbmcnXS5jdXJyZW50VmFsdWUsIExBTkdVQUdFX0NPREVTKSkge1xuICAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnVzZSh0aGlzLmxhbmcpO1xuICAgICAgdGhpcy5oZWxwU2VydmljZS5zZXRDdXJyZW50TGFuZ3VhZ2UodGhpcy5sYW5nKTtcbiAgICB9XG4gIH1cblxuICBnb1RvQXJ0aWNsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYXJ0aWNsZVVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGV4dFVybCh0aGlzLmtleSwgdGhpcy5zdWJLZXksIHRoaXMubGFuZywgaW5kZXgpO1xuICAgIHRoaXMub3BlbihhcnRpY2xlVXJsKTtcbiAgfVxuXG4gIGdvVG9MaW5rKGxpbms6IExpbmspOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldERvY3VtZW50YXRpb25VcmwobGluay5pZCk7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnZXRQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBjYW5jZWxDbGljaygkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cub3Blbih1cmwsICdoZWxwJywgJ3Njcm9sbGJhcnM9MSxyZXNpemFibGU9MSxoZWlnaHQ9ODAwLHdpZHRoPTEyMDAnKTtcbiAgfVxufVxuIl19
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
            var langToUse = this.helpService.setCurrentLanguage(this.lang);
            if (langToUse) {
                this.translateService.use(langToUse);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTZDdEU7SUFhRSx1QkFBNkIsV0FBd0IsRUFBbUIsZ0JBQWtDO1FBQTdFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQW1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFUMUcsZUFBVSxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUt0QyxjQUFTLEdBQUcsUUFBUSxDQUFDO0lBSStFLENBQUM7SUFFOUcsZ0NBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDO3FCQUMzRCxJQUFJLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsRUFDNUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7WUFDbEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxFQUFFO1lBQzFGLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksU0FBUyxFQUFFO2dCQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdEM7U0FDRjtJQUNILENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksS0FBYTtRQUN2QixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsSUFBVTtRQUNqQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksTUFBYTtRQUN2QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLDRCQUFJLEdBQVosVUFBYSxHQUFXO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxnREFBZ0QsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFuRFE7UUFBUixLQUFLLEVBQUU7O21EQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7OENBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7aURBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O29EQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7K0NBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7K0NBQWM7SUFYWCxhQUFhO1FBM0N6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUVwQixRQUFRLEVBQUUsOC9DQXNDVDs7U0FDRixDQUFDO2lEQWMwQyxXQUFXLEVBQXFDLGdCQUFnQjtPQWIvRixhQUFhLENBMER6QjtJQUFELG9CQUFDO0NBQUEsQUExREQsSUEwREM7U0ExRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgaXNMYW5ndWFnZUNvZGVQcmVzZW50IH0gZnJvbSAnLi91dGlscy90cmFuc2xhdGUudXRpbHMnO1xuaW1wb3J0IHsgTEFOR1VBR0VfQ09ERVMsIFNZU19MQU5HIH0gZnJvbSAnLi90cmFuc2xhdGUvbGFuZ3VhZ2UtY29kZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlZGMtaGVscCcsXG4gIHN0eWxlVXJsczogWyAnaGVscC5sZXNzJyBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gUG9wb3ZlciB0ZW1wbGF0ZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImVkYy1wb3BvdmVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwb3BvdmVyLWFydGljbGVcIj57eyBoZWxwZXI/LmRlc2NyaXB0aW9uIH19PC9hcnRpY2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VlLWFsc29cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5hcnRpY2xlcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMuYXJ0aWNsZXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYXJ0aWNsZSBvZiBoZWxwZXIuYXJ0aWNsZXM7IGxldCBrZXkgPSBpbmRleFwiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ29Ub0FydGljbGUoa2V5KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj57e2FydGljbGUubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5saW5rcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMubGlua3MnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGluayBvZiBoZWxwZXIubGlua3NcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xpbmsobGluaylcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+e3tsaW5rLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgPCEtLSBhcHAtaGVscCB0ZW1wbGF0ZSAtLT5cbiAgICA8aSBjbGFzcz1cImZhIGhlbHAtaWNvbiB7eyBpY29uQ3NzIH19XCJcbiAgICBbcG9wb3Zlcl09XCJoZWxwZXIgPyBwb3BUZW1wbGF0ZSA6IGNvbWluZ1Nvb25cIlxuICAgIFtwb3BvdmVyVGl0bGVdPVwiaGVscGVyPy5sYWJlbFwiXG4gICAgW3BsYWNlbWVudF09XCJnZXRQbGFjZW1lbnQoKVwiXG4gICAgW25nQ2xhc3NdPVwieydvbi1kYXJrJzogZGFyayB9XCJcbiAgICBbY29udGFpbmVyXT1cImNvbnRhaW5lclwiXG4gICAgW291dHNpZGVDbGlja109XCJ0cnVlXCJcbiAgICAoY2xpY2spPVwiY2FuY2VsQ2xpY2soJGV2ZW50KVwiPlxuICAgIDwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBoZWxwZXI6IEhlbHBlcjtcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGljb25Dc3M6IHN0cmluZztcbiAgY29taW5nU29vbiA9IEhlbHBDb25zdGFudHMuTUVTU0FHRV9DT01JTkdfU09PTjtcblxuICBASW5wdXQoKSBwbHVnaW5JZDogc3RyaW5nOyAvLyBpZiBkZWZpbmVkLCB0aGUgcGx1Z2luIGlkZW50aWZpZXIgdG8gdXNlIGZvciBmZXRjaGluZyBoZWxwIGNvbnRlbnRcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN1YktleTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgQElucHV0KCkgZGFyazogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFuZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gc2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgdG9wIHByaW9yaXR5LlxuICAgICAgICB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHAodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLnBsdWdpbklkKVxuICAgICAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4gdGhpcy5oZWxwZXIgPSBoZWxwZXIsXG4gICAgICAgICAgICAoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0NvbnRleHR1YWwgSGVscCBub3QgZm91bmQgOiAnLCBlcnIpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uuc2V0RGVmYXVsdExhbmcoU1lTX0xBTkcpO1xuICAgIHRoaXMuaWNvbkNzcyA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0SWNvbigpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250YWluZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snbGFuZyddICYmIGlzTGFuZ3VhZ2VDb2RlUHJlc2VudChjaGFuZ2VzWydsYW5nJ10uY3VycmVudFZhbHVlLCBMQU5HVUFHRV9DT0RFUykpIHtcbiAgICAgIGNvbnN0IGxhbmdUb1VzZSA9IHRoaXMuaGVscFNlcnZpY2Uuc2V0Q3VycmVudExhbmd1YWdlKHRoaXMubGFuZyk7XG4gICAgICBpZiAobGFuZ1RvVXNlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UobGFuZ1RvVXNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnb1RvQXJ0aWNsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYXJ0aWNsZVVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGV4dFVybCh0aGlzLmtleSwgdGhpcy5zdWJLZXksIHRoaXMubGFuZywgaW5kZXgpO1xuICAgIHRoaXMub3BlbihhcnRpY2xlVXJsKTtcbiAgfVxuXG4gIGdvVG9MaW5rKGxpbms6IExpbmspOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldERvY3VtZW50YXRpb25VcmwobGluay5pZCk7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnZXRQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBjYW5jZWxDbGljaygkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cub3Blbih1cmwsICdoZWxwJywgJ3Njcm9sbGJhcnM9MSxyZXNpemFibGU9MSxoZWlnaHQ9ODAwLHdpZHRoPTEyMDAnKTtcbiAgfVxufVxuIl19
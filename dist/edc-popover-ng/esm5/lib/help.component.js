import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { SYS_LANG } from './translate/language-codes';
var HelpComponent = /** @class */ (function () {
    function HelpComponent(helpService, translateService) {
        this.helpService = helpService;
        this.translateService = translateService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    HelpComponent.prototype.ngOnInit = function () {
        // If a lang input was provided, helper is already being loaded from ngOnChanges
        if (this.langLoading === undefined) {
            // No helper loading in progress from ngOnChanges, so init helper
            this.startHelper();
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    };
    HelpComponent.prototype.ngOnChanges = function (changes) {
        if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
            this.startHelper();
        }
    };
    HelpComponent.prototype.startHelper = function () {
        var _this = this;
        this.langLoading = this.lang || null;
        this.helpService.setCurrentLanguage(this.lang).then(function (lang) {
            if (lang) {
                // We set local translate lang only if lang has been changed in client, using the returned value
                _this.translateService.use(lang);
                _this.lang = lang;
                _this.initHelper();
            }
        });
    };
    HelpComponent.prototype.initHelper = function () {
        var _this = this;
        if (this.key && this.subKey) {
            var loadHelper = function () {
                _this.helpService.getHelp(_this.key, _this.subKey, _this.pluginId, _this.lang)
                    .then(function (helper) {
                    _this.helper = helper;
                    _this.langLoading = null;
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
            template: "\n    <!-- Popover template -->\n    <ng-template #popTemplate>\n      <div class=\"edc-popover-container\" (click)=\"$event.stopPropagation()\">\n        <article class=\"popover-article\">{{ helper?.description }}</article>\n        <div class=\"see-also\">\n          <div *ngIf=\"helper?.articles.length\">\n            <h6><strong><span>{{ 'labels.articles' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let article of helper.articles; let key = index\" class=\"see-also-item\"\n                  (click)=\"goToArticle(key)\">\n                <div class=\"article-link\">{{article.label}}</div>\n              </li>\n            </ul>\n          </div>\n          <div *ngIf=\"helper?.links.length\">\n            <h6><strong><span>{{ 'labels.links' | translate }}</span></strong></h6>\n            <ul class=\"see-also-list\">\n              <li *ngFor=\"let link of helper.links\" class=\"see-also-item\" (click)=\"goToLink(link)\">\n                <div class=\"article-link\">{{link.label}}</div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n\n\n    <!-- app-help template -->\n    <i class=\"fa help-icon {{ iconCss }}\"\n       [popover]=\"helper ? popTemplate : comingSoon\"\n       [popoverTitle]=\"helper?.label\"\n       [placement]=\"getPlacement()\"\n       [ngClass]=\"{'on-dark': dark }\"\n       [container]=\"container\"\n       [outsideClick]=\"true\"\n       (click)=\"cancelClick($event)\">\n    </i>\n  ",
            styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
        }),
        tslib_1.__metadata("design:paramtypes", [HelpService, TranslateService])
    ], HelpComponent);
    return HelpComponent;
}());
export { HelpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBNkN0RDtJQWNFLHVCQUE2QixXQUF3QixFQUFtQixnQkFBa0M7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVYxRyxlQUFVLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBTXRDLGNBQVMsR0FBRyxRQUFRLENBQUM7SUFLOUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNsQyxpRUFBaUU7WUFDakUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUks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QUFDO2lEQWUwQyxXQUFXLEVBQXFDLGdCQUFnQjtPQWQvRixhQUFhLENBc0Z6QjtJQUFELG9CQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0F0RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgU1lTX0xBTkcgfSBmcm9tICcuL3RyYW5zbGF0ZS9sYW5ndWFnZS1jb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbJ2hlbHAubGVzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gUG9wb3ZlciB0ZW1wbGF0ZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImVkYy1wb3BvdmVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwb3BvdmVyLWFydGljbGVcIj57eyBoZWxwZXI/LmRlc2NyaXB0aW9uIH19PC9hcnRpY2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VlLWFsc29cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5hcnRpY2xlcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMuYXJ0aWNsZXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYXJ0aWNsZSBvZiBoZWxwZXIuYXJ0aWNsZXM7IGxldCBrZXkgPSBpbmRleFwiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ29Ub0FydGljbGUoa2V5KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj57e2FydGljbGUubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5saW5rcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMubGlua3MnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGluayBvZiBoZWxwZXIubGlua3NcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xpbmsobGluaylcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+e3tsaW5rLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgPCEtLSBhcHAtaGVscCB0ZW1wbGF0ZSAtLT5cbiAgICA8aSBjbGFzcz1cImZhIGhlbHAtaWNvbiB7eyBpY29uQ3NzIH19XCJcbiAgICAgICBbcG9wb3Zlcl09XCJoZWxwZXIgPyBwb3BUZW1wbGF0ZSA6IGNvbWluZ1Nvb25cIlxuICAgICAgIFtwb3BvdmVyVGl0bGVdPVwiaGVscGVyPy5sYWJlbFwiXG4gICAgICAgW3BsYWNlbWVudF09XCJnZXRQbGFjZW1lbnQoKVwiXG4gICAgICAgW25nQ2xhc3NdPVwieydvbi1kYXJrJzogZGFyayB9XCJcbiAgICAgICBbY29udGFpbmVyXT1cImNvbnRhaW5lclwiXG4gICAgICAgW291dHNpZGVDbGlja109XCJ0cnVlXCJcbiAgICAgICAoY2xpY2spPVwiY2FuY2VsQ2xpY2soJGV2ZW50KVwiPlxuICAgIDwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBoZWxwZXI6IEhlbHBlcjtcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGljb25Dc3M6IHN0cmluZztcbiAgY29taW5nU29vbiA9IEhlbHBDb25zdGFudHMuTUVTU0FHRV9DT01JTkdfU09PTjtcbiAgbGFuZ0xvYWRpbmc6IHN0cmluZzsgLy8gVGhlIGxhbmcgaW4gdXNlIHRvIGxvYWQgdGhlIGhlbHBlciAtIGZvciByYWNlIGNvbmRpdGlvbnNcblxuICBASW5wdXQoKSBwbHVnaW5JZDogc3RyaW5nOyAvLyBpZiBkZWZpbmVkLCB0aGUgcGx1Z2luIGlkZW50aWZpZXIgdG8gdXNlIGZvciBmZXRjaGluZyBoZWxwIGNvbnRlbnRcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN1YktleTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgQElucHV0KCkgZGFyazogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFuZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIElmIGEgbGFuZyBpbnB1dCB3YXMgcHJvdmlkZWQsIGhlbHBlciBpcyBhbHJlYWR5IGJlaW5nIGxvYWRlZCBmcm9tIG5nT25DaGFuZ2VzXG4gICAgaWYgKHRoaXMubGFuZ0xvYWRpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gTm8gaGVscGVyIGxvYWRpbmcgaW4gcHJvZ3Jlc3MgZnJvbSBuZ09uQ2hhbmdlcywgc28gaW5pdCBoZWxwZXJcbiAgICAgIHRoaXMuc3RhcnRIZWxwZXIoKTtcbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnNldERlZmF1bHRMYW5nKFNZU19MQU5HKTtcbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEljb24oKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGFpbmVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2xhbmcnXSAmJiBjaGFuZ2VzWydsYW5nJ10uY3VycmVudFZhbHVlICE9PSB0aGlzLmxhbmdMb2FkaW5nKSB7XG4gICAgICB0aGlzLnN0YXJ0SGVscGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGFydEhlbHBlcigpOiB2b2lkIHtcbiAgICB0aGlzLmxhbmdMb2FkaW5nID0gdGhpcy5sYW5nIHx8IG51bGw7XG4gICAgdGhpcy5oZWxwU2VydmljZS5zZXRDdXJyZW50TGFuZ3VhZ2UodGhpcy5sYW5nKS50aGVuKGxhbmcgPT4ge1xuICAgICAgaWYgKGxhbmcpIHtcbiAgICAgICAgLy8gV2Ugc2V0IGxvY2FsIHRyYW5zbGF0ZSBsYW5nIG9ubHkgaWYgbGFuZyBoYXMgYmVlbiBjaGFuZ2VkIGluIGNsaWVudCwgdXNpbmcgdGhlIHJldHVybmVkIHZhbHVlXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UobGFuZyk7XG4gICAgICAgIHRoaXMubGFuZyA9IGxhbmc7XG4gICAgICAgIHRoaXMuaW5pdEhlbHBlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0SGVscGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleSAmJiB0aGlzLnN1YktleSkge1xuICAgICAgY29uc3QgbG9hZEhlbHBlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5wbHVnaW5JZCwgdGhpcy5sYW5nKVxuICAgICAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWxwZXIgPSBoZWxwZXI7XG4gICAgICAgICAgICB0aGlzLmxhbmdMb2FkaW5nID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5oZWxwZXIpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBub3QgdGhlIGZpcnN0IGluaXRpYWxpemF0aW9uLCBza2lwIHRpbWVvdXRcbiAgICAgICAgbG9hZEhlbHBlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgYSBib290c3RyYXAgdG9wIHByaW9yaXR5LlxuICAgICAgICBzZXRUaW1lb3V0KGxvYWRIZWxwZXIsIDIwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdvVG9BcnRpY2xlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBhcnRpY2xlVXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250ZXh0VXJsKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5sYW5nLCBpbmRleCk7XG4gICAgdGhpcy5vcGVuKGFydGljbGVVcmwpO1xuICB9XG5cbiAgZ29Ub0xpbmsobGluazogTGluayk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0RG9jdW1lbnRhdGlvblVybChsaW5rLmlkKTtcbiAgICB0aGlzLm9wZW4odXJsKTtcbiAgfVxuXG4gIGdldFBsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlbWVudDtcbiAgfVxuXG4gIGNhbmNlbENsaWNrKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbih1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5vcGVuKHVybCwgJ2hlbHAnLCAnc2Nyb2xsYmFycz0xLHJlc2l6YWJsZT0xLGhlaWdodD04MDAsd2lkdGg9MTIwMCcpO1xuICB9XG59XG4iXX0=
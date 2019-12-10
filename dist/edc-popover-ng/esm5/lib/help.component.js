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
            // No helper loading in progress from ngOnChanges, so initialize helper
            this.initHelper();
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    };
    HelpComponent.prototype.ngOnChanges = function (changes) {
        if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
            this.initHelper();
        }
    };
    HelpComponent.prototype.initHelper = function () {
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
    };
    HelpComponent.prototype.loadHelper = function () {
        var _this = this;
        this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
            .then(function (helper) {
            if (!helper) {
                throw new Error("Could not load Helper for the key " + _this.key + " and subKey " + _this.subKey);
            }
            _this.helper = helper;
            var resolvedLanguage = helper.language;
            if (resolvedLanguage !== _this.lang) {
                console.warn("Requested language " + _this.lang + " could not be loaded,\n           content will be using default language " + helper.language + " instead");
                _this.lang = resolvedLanguage;
            }
            // Set translation language for the labels
            _this.translateService.use(_this.lang);
            _this.langLoading = null;
        })
            .catch(function (err) {
            console.error(err);
            _this.langLoading = null;
        });
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
            styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc;font-weight:700}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
        }),
        tslib_1.__metadata("design:paramtypes", [HelpService, TranslateService])
    ], HelpComponent);
    return HelpComponent;
}());
export { HelpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBNkN0RDtJQWNFLHVCQUE2QixXQUF3QixFQUFtQixnQkFBa0M7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVYxRyxlQUFVLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBTXRDLGNBQVMsR0FBRyxRQUFRLENBQUM7SUFLOUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNsQyx1RUFBdUU7WUFDdkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtJQUVILENBQUM7SUFFTyxrQ0FBVSxHQUFsQjtRQUNFLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLHFFQUFxRTtnQkFDckUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLCtFQUErRTtnQkFDL0UsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3RFLElBQUksQ0FBQyxVQUFDLE1BQWM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUFxQyxLQUFJLENBQUMsR0FBRyxvQkFBZSxLQUFJLENBQUMsTUFBUSxDQUFDLENBQUM7YUFDNUY7WUFDRCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNiLElBQUEsa0NBQTBCLENBQVk7WUFDOUMsSUFBSSxnQkFBZ0IsS0FBSyxLQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUFzQixLQUFJLENBQUMsSUFBSSxpRkFDRixNQUFNLENBQUMsUUFBUSxhQUFVLENBQUMsQ0FBQztnQkFDckUsS0FBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQzthQUM5QjtZQUNELDBDQUEwQztZQUMxQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyQyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFVO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEtBQWE7UUFDdkIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsZ0NBQVEsR0FBUixVQUFTLElBQVU7UUFDakIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsb0NBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLE1BQWE7UUFDdkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyw0QkFBSSxHQUFaLFVBQWEsR0FBVztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsZ0RBQWdELENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBckZRO1FBQVIsS0FBSyxFQUFFOzttREFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7OzhDQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7O2lEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOztvREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7OytDQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7OytDQUFjO0lBWlgsYUFBYTtRQTNDekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFFcEIsUUFBUSxFQUFFLG1oREFzQ1Q7O1NBQ0YsQ0FBQztpREFlMEMsV0FBVyxFQUFxQyxnQkFBZ0I7T0FkL0YsYUFBYSxDQTZGekI7SUFBRCxvQkFBQztDQUFBLEFBN0ZELElBNkZDO1NBN0ZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVyLCBMaW5rIH0gZnJvbSAnZWRjLWNsaWVudC1qcyc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4vaGVscC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBDb25zdGFudHMgfSBmcm9tICcuL2hlbHAuY29uc3RhbnRzJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IFNZU19MQU5HIH0gZnJvbSAnLi90cmFuc2xhdGUvbGFuZ3VhZ2UtY29kZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlZGMtaGVscCcsXG4gIHN0eWxlVXJsczogWydoZWxwLmxlc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tIFBvcG92ZXIgdGVtcGxhdGUgLS0+XG4gICAgPG5nLXRlbXBsYXRlICNwb3BUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJlZGMtcG9wb3Zlci1jb250YWluZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicG9wb3Zlci1hcnRpY2xlXCI+e3sgaGVscGVyPy5kZXNjcmlwdGlvbiB9fTwvYXJ0aWNsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlZS1hbHNvXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8uYXJ0aWNsZXMubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj57eyAnbGFiZWxzLmFydGljbGVzJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VlLWFsc28tbGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGFydGljbGUgb2YgaGVscGVyLmFydGljbGVzOyBsZXQga2V5ID0gaW5kZXhcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImdvVG9BcnRpY2xlKGtleSlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+e3thcnRpY2xlLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8ubGlua3MubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj57eyAnbGFiZWxzLmxpbmtzJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VlLWFsc28tbGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxpbmsgb2YgaGVscGVyLmxpbmtzXCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCIgKGNsaWNrKT1cImdvVG9MaW5rKGxpbmspXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPnt7bGluay5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDwhLS0gYXBwLWhlbHAgdGVtcGxhdGUgLS0+XG4gICAgPGkgY2xhc3M9XCJmYSBoZWxwLWljb24ge3sgaWNvbkNzcyB9fVwiXG4gICAgICAgW3BvcG92ZXJdPVwiaGVscGVyID8gcG9wVGVtcGxhdGUgOiBjb21pbmdTb29uXCJcbiAgICAgICBbcG9wb3ZlclRpdGxlXT1cImhlbHBlcj8ubGFiZWxcIlxuICAgICAgIFtwbGFjZW1lbnRdPVwiZ2V0UGxhY2VtZW50KClcIlxuICAgICAgIFtuZ0NsYXNzXT1cInsnb24tZGFyayc6IGRhcmsgfVwiXG4gICAgICAgW2NvbnRhaW5lcl09XCJjb250YWluZXJcIlxuICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwidHJ1ZVwiXG4gICAgICAgKGNsaWNrKT1cImNhbmNlbENsaWNrKCRldmVudClcIj5cbiAgICA8L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgaGVscGVyOiBIZWxwZXI7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBpY29uQ3NzOiBzdHJpbmc7XG4gIGNvbWluZ1Nvb24gPSBIZWxwQ29uc3RhbnRzLk1FU1NBR0VfQ09NSU5HX1NPT047XG4gIGxhbmdMb2FkaW5nOiBzdHJpbmc7IC8vIFRoZSBsYW5nIGluIHVzZSB0byBsb2FkIHRoZSBoZWxwZXIgLSBmb3IgcmFjZSBjb25kaXRpb25zXG5cbiAgQElucHV0KCkgcGx1Z2luSWQ6IHN0cmluZzsgLy8gaWYgZGVmaW5lZCwgdGhlIHBsdWdpbiBpZGVudGlmaWVyIHRvIHVzZSBmb3IgZmV0Y2hpbmcgaGVscCBjb250ZW50XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJLZXk6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIGRhcms6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxhbmc6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSwgcHJpdmF0ZSByZWFkb25seSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBJZiBhIGxhbmcgaW5wdXQgd2FzIHByb3ZpZGVkLCBoZWxwZXIgaXMgYWxyZWFkeSBiZWluZyBsb2FkZWQgZnJvbSBuZ09uQ2hhbmdlc1xuICAgIGlmICh0aGlzLmxhbmdMb2FkaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIE5vIGhlbHBlciBsb2FkaW5nIGluIHByb2dyZXNzIGZyb20gbmdPbkNoYW5nZXMsIHNvIGluaXRpYWxpemUgaGVscGVyXG4gICAgICB0aGlzLmluaXRIZWxwZXIoKTtcbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnNldERlZmF1bHRMYW5nKFNZU19MQU5HKTtcbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEljb24oKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGFpbmVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2xhbmcnXSAmJiBjaGFuZ2VzWydsYW5nJ10uY3VycmVudFZhbHVlICE9PSB0aGlzLmxhbmdMb2FkaW5nKSB7XG4gICAgICB0aGlzLmluaXRIZWxwZXIoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgaW5pdEhlbHBlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXkgJiYgdGhpcy5zdWJLZXkpIHtcbiAgICAgIHRoaXMubGFuZ0xvYWRpbmcgPSB0aGlzLmxhbmcgfHwgbnVsbDtcbiAgICAgIGlmICh0aGlzLmhlbHBlcikge1xuICAgICAgICAvLyBUaGlzIGlzIG5vdCB0aGUgZmlyc3QgaW5pdGlhbGl6YXRpb24sIGp1c3QgYW4gdXBkYXRlLCBza2lwIHRpbWVvdXRcbiAgICAgICAgdGhpcy5sb2FkSGVscGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXQgdGltZW91dCBiZWNhdXNlIHBvcG92ZXIgY29udGVudCBsb2FkaW5nIGlzIG5vdCBhIGJvb3RzdHJhcCB0b3AgcHJpb3JpdHkuXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5sb2FkSGVscGVyLmJpbmQodGhpcyksIDIwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvYWRIZWxwZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5wbHVnaW5JZCwgdGhpcy5sYW5nKVxuICAgICAgLnRoZW4oKGhlbHBlcjogSGVscGVyKSA9PiB7XG4gICAgICAgIGlmICghaGVscGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgbG9hZCBIZWxwZXIgZm9yIHRoZSBrZXkgJHt0aGlzLmtleX0gYW5kIHN1YktleSAke3RoaXMuc3ViS2V5fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVscGVyID0gaGVscGVyO1xuICAgICAgICBjb25zdCB7IGxhbmd1YWdlOiByZXNvbHZlZExhbmd1YWdlIH0gPSBoZWxwZXI7XG4gICAgICAgIGlmIChyZXNvbHZlZExhbmd1YWdlICE9PSB0aGlzLmxhbmcpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFJlcXVlc3RlZCBsYW5ndWFnZSAke3RoaXMubGFuZ30gY291bGQgbm90IGJlIGxvYWRlZCxcbiAgICAgICAgICAgY29udGVudCB3aWxsIGJlIHVzaW5nIGRlZmF1bHQgbGFuZ3VhZ2UgJHtoZWxwZXIubGFuZ3VhZ2V9IGluc3RlYWRgKTtcbiAgICAgICAgICB0aGlzLmxhbmcgPSByZXNvbHZlZExhbmd1YWdlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0cmFuc2xhdGlvbiBsYW5ndWFnZSBmb3IgdGhlIGxhYmVsc1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UudXNlKHRoaXMubGFuZyk7XG5cbiAgICAgICAgdGhpcy5sYW5nTG9hZGluZyA9IG51bGw7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy5sYW5nTG9hZGluZyA9IG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdvVG9BcnRpY2xlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBhcnRpY2xlVXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250ZXh0VXJsKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5sYW5nLCBpbmRleCk7XG4gICAgdGhpcy5vcGVuKGFydGljbGVVcmwpO1xuICB9XG5cbiAgZ29Ub0xpbmsobGluazogTGluayk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0RG9jdW1lbnRhdGlvblVybChsaW5rLmlkKTtcbiAgICB0aGlzLm9wZW4odXJsKTtcbiAgfVxuXG4gIGdldFBsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlbWVudDtcbiAgfVxuXG4gIGNhbmNlbENsaWNrKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbih1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5vcGVuKHVybCwgJ2hlbHAnLCAnc2Nyb2xsYmFycz0xLHJlc2l6YWJsZT0xLGhlaWdodD04MDAsd2lkdGg9MTIwMCcpO1xuICB9XG59XG4iXX0=
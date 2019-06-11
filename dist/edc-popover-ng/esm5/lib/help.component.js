/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
var HelpComponent = /** @class */ (function () {
    function HelpComponent(helpService) {
        this.helpService = helpService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    /**
     * @return {?}
     */
    HelpComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.key && this.subKey) {
            setTimeout(function () {
                // set timeout because popover content loading is not top priority.
                _this.helpService.getHelp(_this.key, _this.subKey, _this.pluginId)
                    .then(function (helper) { return _this.helper = helper; }, function (err) { return console.warn('Contextual Help not found : ', err); });
            }, 2000);
        }
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    HelpComponent.prototype.goToArticle = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var basePath = this.helpService.getHelpPath();
        /** @type {?} */
        var pluginId = this.pluginId || this.helpService.getPluginId();
        /** @type {?} */
        var url = basePath + "/context/";
        if (pluginId) {
            url += pluginId + "/";
        }
        else {
            console.warn('Please check if plugin Id was correctly set in the edc-popover-ng configuration handler');
        }
        url += this.key + "/" + this.subKey + "/en/" + index;
        this.open(url);
    };
    /**
     * @param {?} link
     * @return {?}
     */
    HelpComponent.prototype.goToLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        /** @type {?} */
        var basePath = this.helpService.getHelpPath();
        /** @type {?} */
        var url = basePath + "/doc/" + link.id;
        this.open(url);
    };
    /**
     * @return {?}
     */
    HelpComponent.prototype.getPlacement = /**
     * @return {?}
     */
    function () {
        return this.placement;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    HelpComponent.prototype.cancelClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
    };
    /**
     * @param {?} url
     * @return {?}
     */
    HelpComponent.prototype.open = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
    };
    HelpComponent.decorators = [
        { type: Component, args: [{
                    selector: 'edc-help',
                    template: "\n    <!-- Popover template -->\n    <ng-template #popTemplate>\n      <div class=\"edc-popover-container\" (click)=\"$event.stopPropagation()\">\n        <article class=\"popover-article\">{{ helper?.description }}</article>\n        <div class=\"see-also\">\n          <div *ngIf=\"helper?.articles.length\">\n            <h6><strong><span>Need more...</span></strong></h6>\n            <ul class=\"list-unstyled see-also-list\">\n              <li *ngFor=\"let article of helper.articles; let key = index\" class=\"see-also-item\"\n                  (click)=\"goToArticle(key)\">\n                <div class=\"article-link\">-{{article.label}}</div>\n              </li>\n            </ul>\n          </div>\n          <div *ngIf=\"helper?.links.length\">\n            <h6><strong><span>Related Topics</span></strong></h6>\n            <ul class=\"list-unstyled see-also-list\">\n              <li *ngFor=\"let link of helper.links\" class=\"see-also-item\" (click)=\"goToLink(link)\">\n                <div class=\"article-link\">-{{link.label}}</div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n\n\n    <!-- app-help template -->\n    <i class=\"fa help-icon {{ iconCss }}\"\n    [popover]=\"helper ? popTemplate : comingSoon\"\n    [popoverTitle]=\"helper?.label\"\n    [placement]=\"getPlacement()\"\n    [ngClass]=\"{'on-dark': dark }\"\n    [container]=\"container\"\n    [outsideClick]=\"true\"\n    (click)=\"cancelClick($event)\">\n    </i>\n  ",
                    styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px;padding-left:20px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}"]
                }] }
    ];
    /** @nocollapse */
    HelpComponent.ctorParameters = function () { return [
        { type: HelpService }
    ]; };
    HelpComponent.propDecorators = {
        pluginId: [{ type: Input }],
        key: [{ type: Input }],
        subKey: [{ type: Input }],
        placement: [{ type: Input }],
        dark: [{ type: Input }]
    };
    return HelpComponent;
}());
export { HelpComponent };
if (false) {
    /** @type {?} */
    HelpComponent.prototype.helper;
    /** @type {?} */
    HelpComponent.prototype.container;
    /** @type {?} */
    HelpComponent.prototype.iconCss;
    /** @type {?} */
    HelpComponent.prototype.comingSoon;
    /** @type {?} */
    HelpComponent.prototype.pluginId;
    /** @type {?} */
    HelpComponent.prototype.key;
    /** @type {?} */
    HelpComponent.prototype.subKey;
    /** @type {?} */
    HelpComponent.prototype.placement;
    /** @type {?} */
    HelpComponent.prototype.dark;
    /** @type {?} */
    HelpComponent.prototype.helpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBMEQvQyx1QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7MEJBUi9CLGFBQWEsQ0FBQyxtQkFBbUI7eUJBS3pCLFFBQVE7S0FHbUI7Ozs7SUFFaEQsZ0NBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMzQixVQUFVLENBQUM7O2dCQUNULEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDO3FCQUMzRCxJQUFJLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsRUFDNUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7YUFDakUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNsRDs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksS0FBYTs7UUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFDaEQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNqRSxJQUFJLEdBQUcsR0FBTSxRQUFRLGNBQVcsQ0FBQztRQUNqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLEdBQUcsSUFBTyxRQUFRLE1BQUcsQ0FBQztTQUN2QjthQUFNO1lBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyx5RkFBeUYsQ0FBQyxDQUFDO1NBQ3pHO1FBQ0QsR0FBRyxJQUFPLElBQUksQ0FBQyxHQUFHLFNBQUksSUFBSSxDQUFDLE1BQU0sWUFBTyxLQUFPLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjs7Ozs7SUFFRCxnQ0FBUTs7OztJQUFSLFVBQVMsSUFBVTs7UUFDakIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFDaEQsSUFBTSxHQUFHLEdBQU0sUUFBUSxhQUFRLElBQUksQ0FBQyxFQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjs7OztJQUVELG9DQUFZOzs7SUFBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksTUFBYTtRQUN2QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDekI7Ozs7O0lBRU8sNEJBQUk7Ozs7Y0FBQyxHQUFXO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxnREFBZ0QsQ0FBQyxDQUFDOzs7Z0JBakc5RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBRXBCLFFBQVEsRUFBRSxtL0NBc0NUOztpQkFDRjs7OztnQkE5Q1EsV0FBVzs7OzJCQXFEakIsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzt3QkEzRFI7O1NBaURhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlciwgTGluayB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwQ29uc3RhbnRzIH0gZnJvbSAnLi9oZWxwLmNvbnN0YW50cyc7XG5pbXBvcnQgeyBQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbICdoZWxwLmxlc3MnIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBQb3BvdmVyIHRlbXBsYXRlIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjcG9wVGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRjLXBvcG92ZXItY29udGFpbmVyXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBvcG92ZXItYXJ0aWNsZVwiPnt7IGhlbHBlcj8uZGVzY3JpcHRpb24gfX08L2FydGljbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWUtYWxzb1wiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmFydGljbGVzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+TmVlZCBtb3JlLi4uPC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBhcnRpY2xlIG9mIGhlbHBlci5hcnRpY2xlczsgbGV0IGtleSA9IGluZGV4XCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJnb1RvQXJ0aWNsZShrZXkpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPi17e2FydGljbGUubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5saW5rcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPlJlbGF0ZWQgVG9waWNzPC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsaW5rIG9mIGhlbHBlci5saW5rc1wiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiIChjbGljayk9XCJnb1RvTGluayhsaW5rKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj4te3tsaW5rLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgPCEtLSBhcHAtaGVscCB0ZW1wbGF0ZSAtLT5cbiAgICA8aSBjbGFzcz1cImZhIGhlbHAtaWNvbiB7eyBpY29uQ3NzIH19XCJcbiAgICBbcG9wb3Zlcl09XCJoZWxwZXIgPyBwb3BUZW1wbGF0ZSA6IGNvbWluZ1Nvb25cIlxuICAgIFtwb3BvdmVyVGl0bGVdPVwiaGVscGVyPy5sYWJlbFwiXG4gICAgW3BsYWNlbWVudF09XCJnZXRQbGFjZW1lbnQoKVwiXG4gICAgW25nQ2xhc3NdPVwieydvbi1kYXJrJzogZGFyayB9XCJcbiAgICBbY29udGFpbmVyXT1cImNvbnRhaW5lclwiXG4gICAgW291dHNpZGVDbGlja109XCJ0cnVlXCJcbiAgICAoY2xpY2spPVwiY2FuY2VsQ2xpY2soJGV2ZW50KVwiPlxuICAgIDwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaGVscGVyOiBIZWxwZXI7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBpY29uQ3NzOiBzdHJpbmc7XG4gIGNvbWluZ1Nvb24gPSBIZWxwQ29uc3RhbnRzLk1FU1NBR0VfQ09NSU5HX1NPT047XG5cbiAgQElucHV0KCkgcGx1Z2luSWQ6IHN0cmluZzsgLy8gaWYgZGVmaW5lZCwgdGhlIHBsdWdpbiBpZGVudGlmaWVyIHRvIHVzZSBmb3IgZmV0Y2hpbmcgaGVscCBjb250ZW50XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJLZXk6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIGRhcms6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwU2VydmljZTogSGVscFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gc2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgdG9wIHByaW9yaXR5LlxuICAgICAgICB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHAodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLnBsdWdpbklkKVxuICAgICAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4gdGhpcy5oZWxwZXIgPSBoZWxwZXIsXG4gICAgICAgICAgICAoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0NvbnRleHR1YWwgSGVscCBub3QgZm91bmQgOiAnLCBlcnIpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEljb24oKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGFpbmVyKCk7XG4gIH1cblxuICBnb1RvQXJ0aWNsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHBQYXRoKCk7XG4gICAgY29uc3QgcGx1Z2luSWQgPSB0aGlzLnBsdWdpbklkIHx8IHRoaXMuaGVscFNlcnZpY2UuZ2V0UGx1Z2luSWQoKTtcbiAgICBsZXQgdXJsID0gYCR7YmFzZVBhdGh9L2NvbnRleHQvYDtcbiAgICBpZiAocGx1Z2luSWQpIHtcbiAgICAgIHVybCArPSBgJHtwbHVnaW5JZH0vYDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgY2hlY2sgaWYgcGx1Z2luIElkIHdhcyBjb3JyZWN0bHkgc2V0IGluIHRoZSBlZGMtcG9wb3Zlci1uZyBjb25maWd1cmF0aW9uIGhhbmRsZXInKTtcbiAgICB9XG4gICAgdXJsICs9IGAke3RoaXMua2V5fS8ke3RoaXMuc3ViS2V5fS9lbi8ke2luZGV4fWA7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnb1RvTGluayhsaW5rOiBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHBQYXRoKCk7XG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVBhdGh9L2RvYy8ke2xpbmsuaWR9YDtcbiAgICB0aGlzLm9wZW4odXJsKTtcbiAgfVxuXG4gIGdldFBsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlbWVudDtcbiAgfVxuXG4gIGNhbmNlbENsaWNrKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbih1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5vcGVuKHVybCwgJ2hlbHAnLCAnc2Nyb2xsYmFycz0xLHJlc2l6YWJsZT0xLGhlaWdodD04MDAsd2lkdGg9MTIwMCcpO1xuICB9XG59XG4iXX0=
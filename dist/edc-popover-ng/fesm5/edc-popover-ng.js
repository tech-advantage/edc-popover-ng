import { Injectable, Component, Input, NgModule } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
PopoverConfigurationHandler = /** @class */ (function () {
    function PopoverConfigurationHandler() {
    }
    return PopoverConfigurationHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelpService = /** @class */ (function () {
    function HelpService(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.helpPath = configurationHandler.getHelpPath();
        // Edc-popover only uses contextual help, instantiate client with contextualOnly parameter set to true
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), '', configurationHandler.getPluginId(), true);
    }
    /**
     * @param {?} primaryKey
     * @param {?} subKey
     * @param {?=} pluginId
     * @return {?}
     */
    HelpService.prototype.getHelp = /**
     * @param {?} primaryKey
     * @param {?} subKey
     * @param {?=} pluginId
     * @return {?}
     */
    function (primaryKey, subKey, pluginId) {
        return this.edcClient.getHelper(primaryKey, subKey, pluginId || this.configurationHandler.getPluginId());
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getHelpPath = /**
     * @return {?}
     */
    function () {
        return this.helpPath;
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getPluginId = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.getPluginId();
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getIcon = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getContainer = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    };
    HelpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HelpService.ctorParameters = function () { return [
        { type: PopoverConfigurationHandler }
    ]; };
    return HelpService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelpConstants = /** @class */ (function () {
    function HelpConstants() {
    }
    HelpConstants.MESSAGE_COMING_SOON = 'Contextual help is coming soon.';
    return HelpConstants;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelpModule = /** @class */ (function () {
    function HelpModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    HelpModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: HelpModule,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    };
    HelpModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PopoverModule.forRoot()
                    ],
                    declarations: [
                        HelpComponent
                    ],
                    providers: [
                        HelpService
                    ],
                    exports: [
                        HelpComponent
                    ],
                    entryComponents: [
                        HelpComponent
                    ]
                },] }
    ];
    return HelpModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelpComponent, HelpModule, HelpService, PopoverConfigurationHandler };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRjLXBvcG92ZXItbmcuanMubWFwIiwic291cmNlcyI6WyJuZzovL2VkYy1wb3BvdmVyLW5nL2xpYi9jb25maWcvcG9wb3Zlci1jb25maWd1cmF0aW9uLWhhbmRsZXIudHMiLCJuZzovL2VkYy1wb3BvdmVyLW5nL2xpYi9oZWxwLnNlcnZpY2UudHMiLCJuZzovL2VkYy1wb3BvdmVyLW5nL2xpYi9oZWxwLmNvbnN0YW50cy50cyIsIm5nOi8vZWRjLXBvcG92ZXItbmcvbGliL2hlbHAuY29tcG9uZW50LnRzIiwibmc6Ly9lZGMtcG9wb3Zlci1uZy9saWIvaGVscC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyIHtcblxuICBhYnN0cmFjdCBnZXRQbHVnaW5JZCgpOiBzdHJpbmc7XG5cbiAgYWJzdHJhY3QgZ2V0SGVscFBhdGgoKTogc3RyaW5nO1xuXG4gIGFic3RyYWN0IGdldERvY1BhdGgoKTogc3RyaW5nO1xuXG4gIGFic3RyYWN0IGdldEljb24oKTogc3RyaW5nO1xuXG4gIGFic3RyYWN0IGlzQXBwZW5kVG9Cb2R5KCk6IGJvb2xlYW47XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVkY0NsaWVudCwgSGVscGVyIH0gZnJvbSAnZWRjLWNsaWVudC1qcyc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIgfSBmcm9tICcuL2NvbmZpZy9wb3BvdmVyLWNvbmZpZ3VyYXRpb24taGFuZGxlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBlZGNDbGllbnQ6IEVkY0NsaWVudDtcbiAgcHJpdmF0ZSBoZWxwUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhdGlvbkhhbmRsZXI6IFBvcG92ZXJDb25maWd1cmF0aW9uSGFuZGxlcikge1xuICAgIHRoaXMuaGVscFBhdGggPSBjb25maWd1cmF0aW9uSGFuZGxlci5nZXRIZWxwUGF0aCgpO1xuICAgIC8vIEVkYy1wb3BvdmVyIG9ubHkgdXNlcyBjb250ZXh0dWFsIGhlbHAsIGluc3RhbnRpYXRlIGNsaWVudCB3aXRoIGNvbnRleHR1YWxPbmx5IHBhcmFtZXRlciBzZXQgdG8gdHJ1ZVxuICAgIHRoaXMuZWRjQ2xpZW50ID0gbmV3IEVkY0NsaWVudChjb25maWd1cmF0aW9uSGFuZGxlci5nZXREb2NQYXRoKCksICcnLCBjb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpLCB0cnVlKTtcbiAgfVxuXG4gIGdldEhlbHAocHJpbWFyeUtleTogc3RyaW5nLCBzdWJLZXk6IHN0cmluZywgcGx1Z2luSWQ/OiBzdHJpbmcpOiBQcm9taXNlPEhlbHBlcj4ge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXRIZWxwZXIocHJpbWFyeUtleSwgc3ViS2V5LCBwbHVnaW5JZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCkpO1xuICB9XG5cbiAgZ2V0SGVscFBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5oZWxwUGF0aDtcbiAgfVxuXG4gIGdldFBsdWdpbklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKTtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRJY29uKCkgfHwgJ2ZhLXF1ZXN0aW9uLWNpcmNsZS1vJztcbiAgfVxuXG4gIGdldENvbnRhaW5lcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmlzQXBwZW5kVG9Cb2R5KCkgPyAnYm9keScgOiAnJztcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEhlbHBDb25zdGFudHMge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1FU1NBR0VfQ09NSU5HX1NPT04gPSAnQ29udGV4dHVhbCBoZWxwIGlzIGNvbWluZyBzb29uLic7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlciwgTGluayB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwQ29uc3RhbnRzIH0gZnJvbSAnLi9oZWxwLmNvbnN0YW50cyc7XG5pbXBvcnQgeyBQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbICdoZWxwLmxlc3MnIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSBQb3BvdmVyIHRlbXBsYXRlIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjcG9wVGVtcGxhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiZWRjLXBvcG92ZXItY29udGFpbmVyXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInBvcG92ZXItYXJ0aWNsZVwiPnt7IGhlbHBlcj8uZGVzY3JpcHRpb24gfX08L2FydGljbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWUtYWxzb1wiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJoZWxwZXI/LmFydGljbGVzLmxlbmd0aFwiPlxuICAgICAgICAgICAgPGg2PjxzdHJvbmc+PHNwYW4+TmVlZCBtb3JlLi4uPC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBhcnRpY2xlIG9mIGhlbHBlci5hcnRpY2xlczsgbGV0IGtleSA9IGluZGV4XCIgY2xhc3M9XCJzZWUtYWxzby1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJnb1RvQXJ0aWNsZShrZXkpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlua1wiPi17e2FydGljbGUubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5saW5rcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPlJlbGF0ZWQgVG9waWNzPC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNlZS1hbHNvLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsaW5rIG9mIGhlbHBlci5saW5rc1wiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiIChjbGljayk9XCJnb1RvTGluayhsaW5rKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj4te3tsaW5rLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgPCEtLSBhcHAtaGVscCB0ZW1wbGF0ZSAtLT5cbiAgICA8aSBjbGFzcz1cImZhIGhlbHAtaWNvbiB7eyBpY29uQ3NzIH19XCJcbiAgICBbcG9wb3Zlcl09XCJoZWxwZXIgPyBwb3BUZW1wbGF0ZSA6IGNvbWluZ1Nvb25cIlxuICAgIFtwb3BvdmVyVGl0bGVdPVwiaGVscGVyPy5sYWJlbFwiXG4gICAgW3BsYWNlbWVudF09XCJnZXRQbGFjZW1lbnQoKVwiXG4gICAgW25nQ2xhc3NdPVwieydvbi1kYXJrJzogZGFyayB9XCJcbiAgICBbY29udGFpbmVyXT1cImNvbnRhaW5lclwiXG4gICAgW291dHNpZGVDbGlja109XCJ0cnVlXCJcbiAgICAoY2xpY2spPVwiY2FuY2VsQ2xpY2soJGV2ZW50KVwiPlxuICAgIDwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaGVscGVyOiBIZWxwZXI7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBpY29uQ3NzOiBzdHJpbmc7XG4gIGNvbWluZ1Nvb24gPSBIZWxwQ29uc3RhbnRzLk1FU1NBR0VfQ09NSU5HX1NPT047XG5cbiAgQElucHV0KCkgcGx1Z2luSWQ6IHN0cmluZzsgLy8gaWYgZGVmaW5lZCwgdGhlIHBsdWdpbiBpZGVudGlmaWVyIHRvIHVzZSBmb3IgZmV0Y2hpbmcgaGVscCBjb250ZW50XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJLZXk6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIGRhcms6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwU2VydmljZTogSGVscFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gc2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgdG9wIHByaW9yaXR5LlxuICAgICAgICB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHAodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLnBsdWdpbklkKVxuICAgICAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4gdGhpcy5oZWxwZXIgPSBoZWxwZXIsXG4gICAgICAgICAgICAoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0NvbnRleHR1YWwgSGVscCBub3QgZm91bmQgOiAnLCBlcnIpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEljb24oKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGFpbmVyKCk7XG4gIH1cblxuICBnb1RvQXJ0aWNsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHBQYXRoKCk7XG4gICAgY29uc3QgcGx1Z2luSWQgPSB0aGlzLnBsdWdpbklkIHx8IHRoaXMuaGVscFNlcnZpY2UuZ2V0UGx1Z2luSWQoKTtcbiAgICBsZXQgdXJsID0gYCR7YmFzZVBhdGh9L2NvbnRleHQvYDtcbiAgICBpZiAocGx1Z2luSWQpIHtcbiAgICAgIHVybCArPSBgJHtwbHVnaW5JZH0vYDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgY2hlY2sgaWYgcGx1Z2luIElkIHdhcyBjb3JyZWN0bHkgc2V0IGluIHRoZSBlZGMtcG9wb3Zlci1uZyBjb25maWd1cmF0aW9uIGhhbmRsZXInKTtcbiAgICB9XG4gICAgdXJsICs9IGAke3RoaXMua2V5fS8ke3RoaXMuc3ViS2V5fS9lbi8ke2luZGV4fWA7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnb1RvTGluayhsaW5rOiBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHBQYXRoKCk7XG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVBhdGh9L2RvYy8ke2xpbmsuaWR9YDtcbiAgICB0aGlzLm9wZW4odXJsKTtcbiAgfVxuXG4gIGdldFBsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlbWVudDtcbiAgfVxuXG4gIGNhbmNlbENsaWNrKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbih1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5vcGVuKHVybCwgJ2hlbHAnLCAnc2Nyb2xsYmFycz0xLHJlc2l6YWJsZT0xLGhlaWdodD04MDAsd2lkdGg9MTIwMCcpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3BvdmVyJztcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBNb2R1bGVDb25maWcge1xuICBjb25maWdMb2FkZXI6IFByb3ZpZGVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBvcG92ZXJNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSGVscFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUFBOzs7c0NBREE7SUFhQzs7Ozs7O0FDYkQ7SUFVRSxxQkFBb0Isb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFFbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakg7Ozs7Ozs7SUFFRCw2QkFBTzs7Ozs7O0lBQVAsVUFBUSxVQUFrQixFQUFFLE1BQWMsRUFBRSxRQUFpQjtRQUMzRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzFHOzs7O0lBRUQsaUNBQVc7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7O0lBRUQsaUNBQVc7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDaEQ7Ozs7SUFFRCw2QkFBTzs7O0lBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxzQkFBc0IsQ0FBQztLQUN0RTs7OztJQUVELGtDQUFZOzs7SUFBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7S0FDakU7O2dCQTlCRixVQUFVOzs7O2dCQUZGLDJCQUEyQjs7c0JBRnBDOzs7Ozs7Ozs7O3dDQ0MrQyxpQ0FBaUM7d0JBRGhGOzs7Ozs7O0FDQUE7SUE2REUsdUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhOzBCQVIvQixhQUFhLENBQUMsbUJBQW1CO3lCQUt6QixRQUFRO0tBR21COzs7O0lBRWhELGdDQUFROzs7SUFBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDOztnQkFDVCxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQztxQkFDM0QsSUFBSSxDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUEsRUFDNUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxHQUFBLENBQUMsQ0FBQzthQUNqRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2xEOzs7OztJQUVELG1DQUFXOzs7O0lBQVgsVUFBWSxLQUFhOztRQUN2QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNoRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQ2pFLElBQUksR0FBRyxHQUFNLFFBQVEsY0FBVyxDQUFDO1FBQ2pDLElBQUksUUFBUSxFQUFFO1lBQ1osR0FBRyxJQUFPLFFBQVEsTUFBRyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLHlGQUF5RixDQUFDLENBQUM7U0FDekc7UUFDRCxHQUFHLElBQU8sSUFBSSxDQUFDLEdBQUcsU0FBSSxJQUFJLENBQUMsTUFBTSxZQUFPLEtBQU8sQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCOzs7OztJQUVELGdDQUFROzs7O0lBQVIsVUFBUyxJQUFVOztRQUNqQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNoRCxJQUFNLEdBQUcsR0FBTSxRQUFRLGFBQVEsSUFBSSxDQUFDLEVBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCOzs7O0lBRUQsb0NBQVk7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELG1DQUFXOzs7O0lBQVgsVUFBWSxNQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFTyw0QkFBSTs7OztjQUFDLEdBQVc7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7OztnQkFqRzlFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFFcEIsUUFBUSxFQUFFLG0vQ0FzQ1Q7O2lCQUNGOzs7O2dCQTlDUSxXQUFXOzs7MkJBcURqQixLQUFLO3NCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7O3dCQTNEUjs7Ozs7OztBQ0FBOzs7Ozs7O0lBNkJTLGtCQUFPOzs7O0lBQWQsVUFBZSxNQUF3QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsTUFBTSxDQUFDLFlBQVk7YUFDcEI7U0FDRixDQUFDO0tBQ0g7O2dCQTNCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYSxDQUFDLE9BQU8sRUFBRTtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULFdBQVc7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7cUJBQ2Q7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLGFBQWE7cUJBQ2Q7aUJBQ0Y7O3FCQTNCRDs7Ozs7Ozs7Ozs7Ozs7OyJ9
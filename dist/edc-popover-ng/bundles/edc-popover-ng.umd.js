(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('edc-client-js'), require('@angular/common'), require('ngx-bootstrap/popover')) :
    typeof define === 'function' && define.amd ? define('edc-popover-ng', ['exports', '@angular/core', 'edc-client-js', '@angular/common', 'ngx-bootstrap/popover'], factory) :
    (factory((global['edc-popover-ng'] = {}),global.ng.core,global.edcClientJs,global.ng.common,global.popover));
}(this, (function (exports,core,edcClientJs,common,popover) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ PopoverConfigurationHandler = /** @class */ (function () {
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
            this.edcClient = new edcClientJs.EdcClient(configurationHandler.getDocPath(), '', configurationHandler.getPluginId(), true);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HelpService.ctorParameters = function () {
            return [
                { type: PopoverConfigurationHandler }
            ];
        };
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
            { type: core.Component, args: [{
                        selector: 'edc-help',
                        template: "\n    <!-- Popover template -->\n    <ng-template #popTemplate>\n      <div class=\"edc-popover-container\" (click)=\"$event.stopPropagation()\">\n        <article class=\"popover-article\">{{ helper?.description }}</article>\n        <div class=\"see-also\">\n          <div *ngIf=\"helper?.articles.length\">\n            <h6><strong><span>Need more...</span></strong></h6>\n            <ul class=\"list-unstyled see-also-list\">\n              <li *ngFor=\"let article of helper.articles; let key = index\" class=\"see-also-item\"\n                  (click)=\"goToArticle(key)\">\n                <div class=\"article-link\">-{{article.label}}</div>\n              </li>\n            </ul>\n          </div>\n          <div *ngIf=\"helper?.links.length\">\n            <h6><strong><span>Related Topics</span></strong></h6>\n            <ul class=\"list-unstyled see-also-list\">\n              <li *ngFor=\"let link of helper.links\" class=\"see-also-item\" (click)=\"goToLink(link)\">\n                <div class=\"article-link\">-{{link.label}}</div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n\n\n    <!-- app-help template -->\n    <i class=\"fa help-icon {{ iconCss }}\"\n    [popover]=\"helper ? popTemplate : comingSoon\"\n    [popoverTitle]=\"helper?.label\"\n    [placement]=\"getPlacement()\"\n    [ngClass]=\"{'on-dark': dark }\"\n    [container]=\"container\"\n    [outsideClick]=\"true\"\n    (click)=\"cancelClick($event)\">\n    </i>\n  ",
                        styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px;padding-left:20px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}"]
                    }] }
        ];
        /** @nocollapse */
        HelpComponent.ctorParameters = function () {
            return [
                { type: HelpService }
            ];
        };
        HelpComponent.propDecorators = {
            pluginId: [{ type: core.Input }],
            key: [{ type: core.Input }],
            subKey: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            dark: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            popover.PopoverModule.forRoot()
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

    exports.HelpComponent = HelpComponent;
    exports.HelpModule = HelpModule;
    exports.HelpService = HelpService;
    exports.PopoverConfigurationHandler = PopoverConfigurationHandler;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRjLXBvcG92ZXItbmcudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9lZGMtcG9wb3Zlci1uZy9saWIvY29uZmlnL3BvcG92ZXItY29uZmlndXJhdGlvbi1oYW5kbGVyLnRzIiwibmc6Ly9lZGMtcG9wb3Zlci1uZy9saWIvaGVscC5zZXJ2aWNlLnRzIiwibmc6Ly9lZGMtcG9wb3Zlci1uZy9saWIvaGVscC5jb25zdGFudHMudHMiLCJuZzovL2VkYy1wb3BvdmVyLW5nL2xpYi9oZWxwLmNvbXBvbmVudC50cyIsIm5nOi8vZWRjLXBvcG92ZXItbmcvbGliL2hlbHAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvcG92ZXJDb25maWd1cmF0aW9uSGFuZGxlciB7XG5cbiAgYWJzdHJhY3QgZ2V0UGx1Z2luSWQoKTogc3RyaW5nO1xuXG4gIGFic3RyYWN0IGdldEhlbHBQYXRoKCk6IHN0cmluZztcblxuICBhYnN0cmFjdCBnZXREb2NQYXRoKCk6IHN0cmluZztcblxuICBhYnN0cmFjdCBnZXRJY29uKCk6IHN0cmluZztcblxuICBhYnN0cmFjdCBpc0FwcGVuZFRvQm9keSgpOiBib29sZWFuO1xuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGNDbGllbnQsIEhlbHBlciB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9jb25maWcvcG9wb3Zlci1jb25maWd1cmF0aW9uLWhhbmRsZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVscFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZWRjQ2xpZW50OiBFZGNDbGllbnQ7XG4gIHByaXZhdGUgaGVscFBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25IYW5kbGVyOiBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhlbHBQYXRoID0gY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SGVscFBhdGgoKTtcbiAgICAvLyBFZGMtcG9wb3ZlciBvbmx5IHVzZXMgY29udGV4dHVhbCBoZWxwLCBpbnN0YW50aWF0ZSBjbGllbnQgd2l0aCBjb250ZXh0dWFsT25seSBwYXJhbWV0ZXIgc2V0IHRvIHRydWVcbiAgICB0aGlzLmVkY0NsaWVudCA9IG5ldyBFZGNDbGllbnQoY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0RG9jUGF0aCgpLCAnJywgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKSwgdHJ1ZSk7XG4gIH1cblxuICBnZXRIZWxwKHByaW1hcnlLZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIHBsdWdpbklkPzogc3RyaW5nKTogUHJvbWlzZTxIZWxwZXI+IHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0SGVscGVyKHByaW1hcnlLZXksIHN1YktleSwgcGx1Z2luSWQgfHwgdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpKTtcbiAgfVxuXG4gIGdldEhlbHBQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGVscFBhdGg7XG4gIH1cblxuICBnZXRQbHVnaW5JZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCk7XG4gIH1cblxuICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SWNvbigpIHx8ICdmYS1xdWVzdGlvbi1jaXJjbGUtbyc7XG4gIH1cblxuICBnZXRDb250YWluZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5pc0FwcGVuZFRvQm9keSgpID8gJ2JvZHknIDogJyc7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBIZWxwQ29uc3RhbnRzIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNRVNTQUdFX0NPTUlOR19TT09OID0gJ0NvbnRleHR1YWwgaGVscCBpcyBjb21pbmcgc29vbi4nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlZGMtaGVscCcsXG4gIHN0eWxlVXJsczogWyAnaGVscC5sZXNzJyBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gUG9wb3ZlciB0ZW1wbGF0ZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImVkYy1wb3BvdmVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwb3BvdmVyLWFydGljbGVcIj57eyBoZWxwZXI/LmRlc2NyaXB0aW9uIH19PC9hcnRpY2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VlLWFsc29cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5hcnRpY2xlcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPk5lZWQgbW9yZS4uLjwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC11bnN0eWxlZCBzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYXJ0aWNsZSBvZiBoZWxwZXIuYXJ0aWNsZXM7IGxldCBrZXkgPSBpbmRleFwiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ29Ub0FydGljbGUoa2V5KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj4te3thcnRpY2xlLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8ubGlua3MubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj5SZWxhdGVkIFRvcGljczwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC11bnN0eWxlZCBzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGluayBvZiBoZWxwZXIubGlua3NcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xpbmsobGluaylcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+LXt7bGluay5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDwhLS0gYXBwLWhlbHAgdGVtcGxhdGUgLS0+XG4gICAgPGkgY2xhc3M9XCJmYSBoZWxwLWljb24ge3sgaWNvbkNzcyB9fVwiXG4gICAgW3BvcG92ZXJdPVwiaGVscGVyID8gcG9wVGVtcGxhdGUgOiBjb21pbmdTb29uXCJcbiAgICBbcG9wb3ZlclRpdGxlXT1cImhlbHBlcj8ubGFiZWxcIlxuICAgIFtwbGFjZW1lbnRdPVwiZ2V0UGxhY2VtZW50KClcIlxuICAgIFtuZ0NsYXNzXT1cInsnb24tZGFyayc6IGRhcmsgfVwiXG4gICAgW2NvbnRhaW5lcl09XCJjb250YWluZXJcIlxuICAgIFtvdXRzaWRlQ2xpY2tdPVwidHJ1ZVwiXG4gICAgKGNsaWNrKT1cImNhbmNlbENsaWNrKCRldmVudClcIj5cbiAgICA8L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGhlbHBlcjogSGVscGVyO1xuICBjb250YWluZXI6IHN0cmluZztcbiAgaWNvbkNzczogc3RyaW5nO1xuICBjb21pbmdTb29uID0gSGVscENvbnN0YW50cy5NRVNTQUdFX0NPTUlOR19TT09OO1xuXG4gIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7IC8vIGlmIGRlZmluZWQsIHRoZSBwbHVnaW4gaWRlbnRpZmllciB0byB1c2UgZm9yIGZldGNoaW5nIGhlbHAgY29udGVudFxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgQElucHV0KCkgc3ViS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlbWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSBkYXJrOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleSAmJiB0aGlzLnN1YktleSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHNldCB0aW1lb3V0IGJlY2F1c2UgcG9wb3ZlciBjb250ZW50IGxvYWRpbmcgaXMgbm90IHRvcCBwcmlvcml0eS5cbiAgICAgICAgdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5wbHVnaW5JZClcbiAgICAgICAgICAudGhlbigoaGVscGVyOiBIZWxwZXIpID0+IHRoaXMuaGVscGVyID0gaGVscGVyLFxuICAgICAgICAgICAgKGVycikgPT4gY29uc29sZS53YXJuKCdDb250ZXh0dWFsIEhlbHAgbm90IGZvdW5kIDogJywgZXJyKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgdGhpcy5pY29uQ3NzID0gdGhpcy5oZWxwU2VydmljZS5nZXRJY29uKCk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRhaW5lcigpO1xuICB9XG5cbiAgZ29Ub0FydGljbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwUGF0aCgpO1xuICAgIGNvbnN0IHBsdWdpbklkID0gdGhpcy5wbHVnaW5JZCB8fCB0aGlzLmhlbHBTZXJ2aWNlLmdldFBsdWdpbklkKCk7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VQYXRofS9jb250ZXh0L2A7XG4gICAgaWYgKHBsdWdpbklkKSB7XG4gICAgICB1cmwgKz0gYCR7cGx1Z2luSWR9L2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIGNoZWNrIGlmIHBsdWdpbiBJZCB3YXMgY29ycmVjdGx5IHNldCBpbiB0aGUgZWRjLXBvcG92ZXItbmcgY29uZmlndXJhdGlvbiBoYW5kbGVyJyk7XG4gICAgfVxuICAgIHVybCArPSBgJHt0aGlzLmtleX0vJHt0aGlzLnN1YktleX0vZW4vJHtpbmRleH1gO1xuICAgIHRoaXMub3Blbih1cmwpO1xuICB9XG5cbiAgZ29Ub0xpbmsobGluazogTGluayk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwUGF0aCgpO1xuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VQYXRofS9kb2MvJHtsaW5rLmlkfWA7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnZXRQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBjYW5jZWxDbGljaygkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cub3Blbih1cmwsICdoZWxwJywgJ3Njcm9sbGJhcnM9MSxyZXNpemFibGU9MSxoZWlnaHQ9ODAwLHdpZHRoPTEyMDAnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9wb3Zlcic7XG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi9oZWxwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4vaGVscC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBIZWxwTW9kdWxlQ29uZmlnIHtcbiAgY29uZmlnTG9hZGVyOiBQcm92aWRlcjtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQb3BvdmVyTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEhlbHBTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBIZWxwTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIZWxwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEhlbHBTZXJ2aWNlLFxuICAgICAgICBjb25maWcuY29uZmlnTG9hZGVyXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkVkY0NsaWVudCIsIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiUG9wb3Zlck1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztRQUFBOzs7MENBREE7UUFhQzs7Ozs7O0FDYkQ7UUFVRSxxQkFBb0Isb0JBQWlEO1lBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7WUFDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7WUFFbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJQSxxQkFBUyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqSDs7Ozs7OztRQUVELDZCQUFPOzs7Ozs7WUFBUCxVQUFRLFVBQWtCLEVBQUUsTUFBYyxFQUFFLFFBQWlCO2dCQUMzRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFHOzs7O1FBRUQsaUNBQVc7OztZQUFYO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7OztRQUVELGlDQUFXOzs7WUFBWDtnQkFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNoRDs7OztRQUVELDZCQUFPOzs7WUFBUDtnQkFDRSxPQUFPLElBQUksQ0FBQyxv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
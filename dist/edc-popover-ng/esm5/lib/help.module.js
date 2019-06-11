/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
/**
 * @record
 */
export function HelpModuleConfig() { }
/** @type {?} */
HelpModuleConfig.prototype.configLoader;
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
export { HelpModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7OztJQXlCcEMsa0JBQU87Ozs7SUFBZCxVQUFlLE1BQXdCO1FBQ3JDLE9BQU87WUFDTCxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWCxNQUFNLENBQUMsWUFBWTthQUNwQjtTQUNGLENBQUM7S0FDSDs7Z0JBM0JGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhLENBQUMsT0FBTyxFQUFFO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYTtxQkFDZDtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsYUFBYTtxQkFDZDtpQkFDRjs7cUJBM0JEOztTQTRCYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9wb3Zlcic7XG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi9oZWxwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4vaGVscC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBIZWxwTW9kdWxlQ29uZmlnIHtcbiAgY29uZmlnTG9hZGVyOiBQcm92aWRlcjtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQb3BvdmVyTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEhlbHBTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBIZWxwTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIZWxwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEhlbHBTZXJ2aWNlLFxuICAgICAgICBjb25maWcuY29uZmlnTG9hZGVyXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19
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
export class HelpModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: HelpModule,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBd0I3QyxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztLQUNIOzs7WUEzQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWEsQ0FBQyxPQUFPLEVBQUU7aUJBQ3hCO2dCQUNELFlBQVksRUFBRTtvQkFDWixhQUFhO2lCQUNkO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxXQUFXO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxhQUFhO2lCQUNkO2dCQUNELGVBQWUsRUFBRTtvQkFDZixhQUFhO2lCQUNkO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3BvdmVyJztcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBNb2R1bGVDb25maWcge1xuICBjb25maWdMb2FkZXI6IFByb3ZpZGVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBvcG92ZXJNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSGVscFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { EdcTranslationService } from './translate/edc-translation.service';
import { HelpPopoverDirective } from './help-popover.directive';
import { HelpConfigService } from './config/help-config.service';
import 'edc-popover-js/dist/edc-popover.css';
export class HelpModule {
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
                    CommonModule
                ],
                declarations: [
                    HelpComponent,
                    HelpPopoverDirective
                ],
                providers: [
                    HelpService,
                    EdcTranslationService,
                    HelpConfigService
                ],
                exports: [
                    HelpComponent
                ],
                entryComponents: [
                    HelpComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL2hlbHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE9BQU8scUNBQXFDLENBQUM7QUEwQjdDLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTdCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGFBQWE7b0JBQ2Isb0JBQW9CO2lCQUNyQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsV0FBVztvQkFDWCxxQkFBcUI7b0JBQ3JCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7aUJBQ2Q7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLGFBQWE7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRWRjVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xhdGUvZWRjLXRyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscFBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2hlbHAtcG9wb3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGVscENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy9oZWxwLWNvbmZpZy5zZXJ2aWNlJztcblxuaW1wb3J0ICdlZGMtcG9wb3Zlci1qcy9kaXN0L2VkYy1wb3BvdmVyLmNzcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscE1vZHVsZUNvbmZpZyB7XG4gIGNvbmZpZ0xvYWRlcjogUHJvdmlkZXI7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSGVscENvbXBvbmVudCxcbiAgICBIZWxwUG9wb3ZlckRpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBIZWxwU2VydmljZSxcbiAgICBFZGNUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgSGVscENvbmZpZ1NlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEhlbHBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
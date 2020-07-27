import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { EdcTranslationService } from './translate/edc-translation.service';
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
                ],
                providers: [
                    HelpService,
                    EdcTranslationService,
                ],
                exports: [
                    HelpComponent
                ],
                entryComponents: [
                    HelpComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL2hlbHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTVFLE9BQU8scUNBQXFDLENBQUM7QUF3QjdDLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTNCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGFBQWE7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULFdBQVc7b0JBQ1gscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtpQkFDZDtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsYUFBYTtpQkFDZDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSGVscENvbXBvbmVudCB9IGZyb20gJy4vaGVscC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBFZGNUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL3RyYW5zbGF0ZS9lZGMtdHJhbnNsYXRpb24uc2VydmljZSc7XG5cbmltcG9ydCAnZWRjLXBvcG92ZXItanMvZGlzdC9lZGMtcG9wb3Zlci5jc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBNb2R1bGVDb25maWcge1xuICBjb25maWdMb2FkZXI6IFByb3ZpZGVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEhlbHBTZXJ2aWNlLFxuICAgIEVkY1RyYW5zbGF0aW9uU2VydmljZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEhlbHBNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
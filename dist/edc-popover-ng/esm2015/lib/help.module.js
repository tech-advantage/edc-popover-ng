import * as tslib_1 from "tslib";
var HelpModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateMissingTranslationHandler } from './translate/translate-missing-handler';
import { HttpLoaderFactory } from './translate/translate-loader';
const ɵ0 = HttpLoaderFactory;
let HelpModule = HelpModule_1 = class HelpModule {
    static forRoot(config) {
        return {
            ngModule: HelpModule_1,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    }
};
HelpModule = HelpModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: ɵ0,
                    deps: [HttpClient, HelpService]
                },
                missingTranslationHandler: {
                    provide: MissingTranslationHandler,
                    useClass: TranslateMissingTranslationHandler
                }
            }),
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
    })
], HelpModule);
export { HelpModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztXQVk3QyxpQkFBaUI7QUF1QnJDLElBQWEsVUFBVSxrQkFBdkIsTUFBYSxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVlksVUFBVTtJQTdCdEIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRTtvQkFDTixPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxJQUFtQjtvQkFDN0IsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztpQkFDaEM7Z0JBQ0QseUJBQXlCLEVBQUU7b0JBQ3pCLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSxrQ0FBa0M7aUJBQzdDO2FBQ0YsQ0FBQztZQUNGLGFBQWEsQ0FBQyxPQUFPLEVBQUU7U0FDeEI7UUFDRCxZQUFZLEVBQUU7WUFDWixhQUFhO1NBQ2Q7UUFDRCxTQUFTLEVBQUU7WUFDVCxXQUFXO1NBQ1o7UUFDRCxPQUFPLEVBQUU7WUFDUCxhQUFhO1NBQ2Q7UUFDRCxlQUFlLEVBQUU7WUFDZixhQUFhO1NBQ2Q7S0FDRixDQUFDO0dBQ1csVUFBVSxDQVV0QjtTQVZZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3BvdmVyJztcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlLCBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCBUcmFuc2xhdGVMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLW1pc3NpbmctaGFuZGxlcic7XG5pbXBvcnQgeyBIdHRwTG9hZGVyRmFjdG9yeSB9IGZyb20gJy4vdHJhbnNsYXRlL3RyYW5zbGF0ZS1sb2FkZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBNb2R1bGVDb25maWcge1xuICBjb25maWdMb2FkZXI6IFByb3ZpZGVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IEh0dHBMb2FkZXJGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgSGVscFNlcnZpY2VdXG4gICAgICB9LFxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjoge1xuICAgICAgICBwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICB1c2VDbGFzczogVHJhbnNsYXRlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclxuICAgICAgfVxuICAgIH0pLFxuICAgIFBvcG92ZXJNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSGVscFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateMissingTranslationHandler } from './translate/translate-missing-handler';
import { HttpLoaderFactory } from './translate/translate-loader';
var ɵ0 = HttpLoaderFactory;
var HelpModule = /** @class */ (function () {
    function HelpModule() {
    }
    HelpModule_1 = HelpModule;
    HelpModule.forRoot = function (config) {
        return {
            ngModule: HelpModule_1,
            providers: [
                HelpService,
                config.configLoader
            ]
        };
    };
    var HelpModule_1;
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
    return HelpModule;
}());
export { HelpModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO1NBWTdDLGlCQUFpQjtBQXVCckM7SUFBQTtJQVVBLENBQUM7bUJBVlksVUFBVTtJQUNkLGtCQUFPLEdBQWQsVUFBZSxNQUF3QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsTUFBTSxDQUFDLFlBQVk7YUFDcEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFUVSxVQUFVO1FBN0J0QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixlQUFlLENBQUMsT0FBTyxDQUFDO29CQUN0QixNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLFVBQVUsSUFBbUI7d0JBQzdCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7cUJBQ2hDO29CQUNELHlCQUF5QixFQUFFO3dCQUN6QixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxRQUFRLEVBQUUsa0NBQWtDO3FCQUM3QztpQkFDRixDQUFDO2dCQUNGLGFBQWEsQ0FBQyxPQUFPLEVBQUU7YUFDeEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osYUFBYTthQUNkO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFdBQVc7YUFDWjtZQUNELE9BQU8sRUFBRTtnQkFDUCxhQUFhO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsYUFBYTthQUNkO1NBQ0YsQ0FBQztPQUNXLFVBQVUsQ0FVdEI7SUFBRCxpQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3BvdmVyJztcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlLCBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLCBUcmFuc2xhdGVMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLW1pc3NpbmctaGFuZGxlcic7XG5pbXBvcnQgeyBIdHRwTG9hZGVyRmFjdG9yeSB9IGZyb20gJy4vdHJhbnNsYXRlL3RyYW5zbGF0ZS1sb2FkZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBNb2R1bGVDb25maWcge1xuICBjb25maWdMb2FkZXI6IFByb3ZpZGVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IEh0dHBMb2FkZXJGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgSGVscFNlcnZpY2VdXG4gICAgICB9LFxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjoge1xuICAgICAgICBwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICB1c2VDbGFzczogVHJhbnNsYXRlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclxuICAgICAgfVxuICAgIH0pLFxuICAgIFBvcG92ZXJNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSGVscFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
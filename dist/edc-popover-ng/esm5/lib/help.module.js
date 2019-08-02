import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
                HttpClientModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO1NBYTdDLGlCQUFpQjtBQXVCckM7SUFBQTtJQVVBLENBQUM7bUJBVlksVUFBVTtJQUNkLGtCQUFPLEdBQWQsVUFBZSxNQUF3QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsTUFBTSxDQUFDLFlBQVk7YUFDcEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFUVSxVQUFVO1FBOUJ0QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBQ2hCLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQ3RCLE1BQU0sRUFBRTt3QkFDTixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsVUFBVSxJQUFtQjt3QkFDN0IsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztxQkFDaEM7b0JBQ0QseUJBQXlCLEVBQUU7d0JBQ3pCLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLFFBQVEsRUFBRSxrQ0FBa0M7cUJBQzdDO2lCQUNGLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRTthQUN4QjtZQUNELFlBQVksRUFBRTtnQkFDWixhQUFhO2FBQ2Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsV0FBVzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGFBQWE7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDZixhQUFhO2FBQ2Q7U0FDRixDQUFDO09BQ1csVUFBVSxDQVV0QjtJQUFELGlCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3BvcG92ZXInO1xuaW1wb3J0IHsgSGVscENvbXBvbmVudCB9IGZyb20gJy4vaGVscC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3RyYW5zbGF0ZS90cmFuc2xhdGUtbWlzc2luZy1oYW5kbGVyJztcbmltcG9ydCB7IEh0dHBMb2FkZXJGYWN0b3J5IH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLWxvYWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscE1vZHVsZUNvbmZpZyB7XG4gIGNvbmZpZ0xvYWRlcjogUHJvdmlkZXI7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICB1c2VGYWN0b3J5OiBIdHRwTG9hZGVyRmFjdG9yeSxcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIEhlbHBTZXJ2aWNlXVxuICAgICAgfSxcbiAgICAgIG1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXI6IHtcbiAgICAgICAgcHJvdmlkZTogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcixcbiAgICAgICAgdXNlQ2xhc3M6IFRyYW5zbGF0ZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJcbiAgICAgIH1cbiAgICB9KSxcbiAgICBQb3BvdmVyTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEhlbHBTZXJ2aWNlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBIZWxwTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIZWxwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEhlbHBTZXJ2aWNlLFxuICAgICAgICBjb25maWcuY29uZmlnTG9hZGVyXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19
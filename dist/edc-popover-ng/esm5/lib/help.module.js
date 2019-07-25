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
                        useClass: TranslateMissingTranslationHandler,
                        deps: [HelpService]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO1NBWTdDLGlCQUFpQjtBQXdCckM7SUFBQTtJQVVBLENBQUM7bUJBVlksVUFBVTtJQUNkLGtCQUFPLEdBQWQsVUFBZSxNQUF3QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVU7WUFDcEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsTUFBTSxDQUFDLFlBQVk7YUFDcEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFUVSxVQUFVO1FBOUJ0QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixlQUFlLENBQUMsT0FBTyxDQUFDO29CQUN0QixNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLFVBQVUsSUFBbUI7d0JBQzdCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7cUJBQ2hDO29CQUNELHlCQUF5QixFQUFFO3dCQUN6QixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxRQUFRLEVBQUUsa0NBQWtDO3dCQUM1QyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7cUJBQ3BCO2lCQUNGLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRTthQUN4QjtZQUNELFlBQVksRUFBRTtnQkFDWixhQUFhO2FBQ2Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsV0FBVzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGFBQWE7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDZixhQUFhO2FBQ2Q7U0FDRixDQUFDO09BQ1csVUFBVSxDQVV0QjtJQUFELGlCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3BvcG92ZXInO1xuaW1wb3J0IHsgSGVscENvbXBvbmVudCB9IGZyb20gJy4vaGVscC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3RyYW5zbGF0ZS90cmFuc2xhdGUtbWlzc2luZy1oYW5kbGVyJztcbmltcG9ydCB7IEh0dHBMb2FkZXJGYWN0b3J5IH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLWxvYWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscE1vZHVsZUNvbmZpZyB7XG4gIGNvbmZpZ0xvYWRlcjogUHJvdmlkZXI7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgdXNlRmFjdG9yeTogSHR0cExvYWRlckZhY3RvcnksXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBIZWxwU2VydmljZV1cbiAgICAgIH0sXG4gICAgICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIHVzZUNsYXNzOiBUcmFuc2xhdGVNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICBkZXBzOiBbSGVscFNlcnZpY2VdXG4gICAgICB9XG4gICAgfSksXG4gICAgUG9wb3Zlck1vZHVsZS5mb3JSb290KClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBIZWxwU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVscE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSGVscE1vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSGVscE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBIZWxwU2VydmljZSxcbiAgICAgICAgY29uZmlnLmNvbmZpZ0xvYWRlclxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
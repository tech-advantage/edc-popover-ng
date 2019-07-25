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
export { HelpModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztXQVk3QyxpQkFBaUI7QUF3QnJDLElBQWEsVUFBVSxrQkFBdkIsTUFBYSxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVlksVUFBVTtJQTlCdEIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRTtvQkFDTixPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxJQUFtQjtvQkFDN0IsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztpQkFDaEM7Z0JBQ0QseUJBQXlCLEVBQUU7b0JBQ3pCLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDcEI7YUFDRixDQUFDO1lBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRTtTQUN4QjtRQUNELFlBQVksRUFBRTtZQUNaLGFBQWE7U0FDZDtRQUNELFNBQVMsRUFBRTtZQUNULFdBQVc7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNQLGFBQWE7U0FDZDtRQUNELGVBQWUsRUFBRTtZQUNmLGFBQWE7U0FDZDtLQUNGLENBQUM7R0FDVyxVQUFVLENBVXRCO1NBVlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3BvcG92ZXInO1xuaW1wb3J0IHsgSGVscENvbXBvbmVudCB9IGZyb20gJy4vaGVscC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUsIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3RyYW5zbGF0ZS90cmFuc2xhdGUtbWlzc2luZy1oYW5kbGVyJztcbmltcG9ydCB7IEh0dHBMb2FkZXJGYWN0b3J5IH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLWxvYWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVscE1vZHVsZUNvbmZpZyB7XG4gIGNvbmZpZ0xvYWRlcjogUHJvdmlkZXI7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgdXNlRmFjdG9yeTogSHR0cExvYWRlckZhY3RvcnksXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBIZWxwU2VydmljZV1cbiAgICAgIH0sXG4gICAgICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIHVzZUNsYXNzOiBUcmFuc2xhdGVNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICBkZXBzOiBbSGVscFNlcnZpY2VdXG4gICAgICB9XG4gICAgfSksXG4gICAgUG9wb3Zlck1vZHVsZS5mb3JSb290KClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBIZWxwU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBIZWxwQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVscE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSGVscE1vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSGVscE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBIZWxwU2VydmljZSxcbiAgICAgICAgY29uZmlnLmNvbmZpZ0xvYWRlclxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
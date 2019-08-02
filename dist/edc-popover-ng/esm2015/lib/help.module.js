import * as tslib_1 from "tslib";
var HelpModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
export { HelpModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztXQWE3QyxpQkFBaUI7QUF1QnJDLElBQWEsVUFBVSxrQkFBdkIsTUFBYSxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVlksVUFBVTtJQTlCdEIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixlQUFlLENBQUMsT0FBTyxDQUFDO2dCQUN0QixNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsSUFBbUI7b0JBQzdCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7aUJBQ2hDO2dCQUNELHlCQUF5QixFQUFFO29CQUN6QixPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxRQUFRLEVBQUUsa0NBQWtDO2lCQUM3QzthQUNGLENBQUM7WUFDRixhQUFhLENBQUMsT0FBTyxFQUFFO1NBQ3hCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osYUFBYTtTQUNkO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsV0FBVztTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYTtTQUNkO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsYUFBYTtTQUNkO0tBQ0YsQ0FBQztHQUNXLFVBQVUsQ0FVdEI7U0FWWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9wb3Zlcic7XG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi9oZWxwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4vaGVscC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciwgVHJhbnNsYXRlTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciB9IGZyb20gJy4vdHJhbnNsYXRlL3RyYW5zbGF0ZS1taXNzaW5nLWhhbmRsZXInO1xuaW1wb3J0IHsgSHR0cExvYWRlckZhY3RvcnkgfSBmcm9tICcuL3RyYW5zbGF0ZS90cmFuc2xhdGUtbG9hZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBIZWxwTW9kdWxlQ29uZmlnIHtcbiAgY29uZmlnTG9hZGVyOiBQcm92aWRlcjtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IEh0dHBMb2FkZXJGYWN0b3J5LFxuICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgSGVscFNlcnZpY2VdXG4gICAgICB9LFxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjoge1xuICAgICAgICBwcm92aWRlOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICB1c2VDbGFzczogVHJhbnNsYXRlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclxuICAgICAgfVxuICAgIH0pLFxuICAgIFBvcG92ZXJNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSGVscFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlbHBDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEhlbHBNb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEhlbHBNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSGVscFNlcnZpY2UsXG4gICAgICAgIGNvbmZpZy5jb25maWdMb2FkZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
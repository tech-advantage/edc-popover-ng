import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateMissingTranslationHandler } from './translate/translate-missing-handler';
import { HttpLoaderFactory } from './translate/translate-loader';

export interface HelpModuleConfig {
  configLoader: Provider;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
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
export class HelpModule {
  static forRoot(config: HelpModuleConfig): ModuleWithProviders {
    return {
      ngModule: HelpModule,
      providers: [
        HelpService,
        config.configLoader
      ]
    };
  }
}

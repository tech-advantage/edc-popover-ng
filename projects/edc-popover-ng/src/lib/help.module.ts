import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { EdcTranslationService } from './translate/edc-translation.service';
import { HelpPopoverDirective } from './help-popover.directive';
import { HelpConfigService } from './config/help-config.service';

import 'edc-popover-js/dist/edc-popover.css';

export interface HelpModuleConfig {
  configLoader: Provider;
}

@NgModule({
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
})
export class HelpModule {
  static forRoot(config: HelpModuleConfig): ModuleWithProviders<HelpModule> {
    return {
      ngModule: HelpModule,
      providers: [
        HelpService,
        config.configLoader
      ]
    };
  }
}

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './services/help.service';
import { EdcTranslationService } from './services/edc-translation.service';
import { HelpPopoverDirective } from './help-popover.directive';
import { HelpConfigService } from './services/help-config.service';
import { HelpIconService } from './services/help-icon.service';
import { HelpErrorService } from './services/help-error.service';
import { HelpPopoverService } from './services/help-popover.service';

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
    HelpConfigService,
    HelpIconService,
    HelpErrorService,
    HelpPopoverService
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

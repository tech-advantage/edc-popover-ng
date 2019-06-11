import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';

export interface HelpModuleConfig {
  configLoader: Provider;
}

@NgModule({
  imports: [
    CommonModule,
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

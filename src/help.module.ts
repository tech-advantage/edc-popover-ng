import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { HelpModuleConfig } from './help.config';
import { CONFIG } from './help.service';


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
  ]
})
export class HelpModule {
  static forRoot(config: HelpModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: HelpModule,
      providers: [
        HelpService,
        {provide: CONFIG, useValue: config},
      ]
    };
  }
}

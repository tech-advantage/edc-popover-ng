import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CONFIG } from 'help.service';

export interface HelpModuleConfig {
  helpPath?: string;
  body?: boolean;
  icon?: string;
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

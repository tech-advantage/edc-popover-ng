import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { PopoverModule } from 'ngx-bootstrap';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HelpModule,
      providers: [HelpService]
    };
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { HelpService } from './help.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot()
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

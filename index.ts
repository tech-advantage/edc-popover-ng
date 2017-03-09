import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './src/help.component';
import { HelpService } from './src/help.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export * from './src/help.component';
export * from './src/help.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [
    HelpComponent
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

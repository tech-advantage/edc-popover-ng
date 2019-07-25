import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { HelpModule } from 'projects/edc-popover-ng/src/lib/help.module';
import { PopoverConfigurationHandler } from 'projects/edc-popover-ng/src/lib/config/popover-configuration-handler';
import { PopoverConfigHandler } from 'src/config/popover-config-handler';
import { ConfigService } from 'src/config/config.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HelpModule.forRoot({
      configLoader: {provide: PopoverConfigurationHandler, useClass: PopoverConfigHandler}
    }),
    FormsModule
  ],
  providers: [
    ConfigService,
    {
      provide   : APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps      : [ConfigService],
      multi     : true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

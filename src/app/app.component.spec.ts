import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HelpModule } from 'projects/edc-popover-ng/src/lib/help.module';
import { PopoverConfigurationHandler } from 'projects/edc-popover-ng/src/lib/config/popover-configuration-handler';
import { PopoverConfigHandler } from 'src/config/popover-config-handler';
import { ConfigService } from 'src/config/config.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigLoader } from 'src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PopoverConfig } from 'src/config/edc-configuration';
import { mock } from 'projects/edc-popover-ng/src/lib/utils/test-helpers';

describe('AppComponent', () => {

  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule,
        CommonModule,
        HelpModule.forRoot({
            configLoader: { provide: PopoverConfigurationHandler, useClass: PopoverConfigHandler }
        })],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
}).compileComponents();
  });

  beforeEach(() => {
    configService = TestBed.inject<ConfigService>(ConfigService);
  });

  beforeEach(() => {
    const popoverConfig = mock(PopoverConfig, {
      helpPath: 'myHelpPath',
      docPath: 'myDocPath',
      pluginId: 'myPluginId'
    });
    spyOn(configService, 'getConfiguration').and.returnValue({ popover: popoverConfig });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should have as title 'edc-popover-ng-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('edc-popover-ng demo');
  });
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to edc-popover-ng demo!');
  });
});

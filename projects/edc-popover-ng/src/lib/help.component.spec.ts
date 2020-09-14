import { HelpComponent } from './help.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { mock, mockService, TestModule } from './utils/test-helpers';
import { HelpConfigService } from './services/help-config.service';
import { HelpPopoverDirective } from './help-popover.directive';
import { IconPopoverConfig } from './config/icon-popover-config';
import { EdcPopoverOptions } from './config/edc-popover-options';

describe('Help component', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let helpConfigService: HelpConfigService;

  let config: IconPopoverConfig;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [
        HelpComponent,
        HelpPopoverDirective
      ],
      providers: [
        mockService(HelpConfigService, ['getIconClasses', 'updateOptions', 'buildPopoverConfig'])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    helpConfigService = TestBed.inject<HelpConfigService>(HelpConfigService);
  });

  beforeEach(() => {
    const bindings = {
      mainKey: 'main',
      subKey: 'sub',
      pluginId: 'myPlugin',
      lang: 'fr',
      options: new EdcPopoverOptions()
    };
    fixture = TestBed.createComponent(HelpComponent);
    component = Object.assign(fixture.componentInstance, bindings);
    fixture.detectChanges();
  });

  describe('init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.mainKey).toEqual('main');
      expect(component.subKey).toEqual('sub');
      expect(component.pluginId).toEqual('myPlugin');
      expect(component.lang).toEqual('fr');
    });
  });

  describe('runtime', () => {

    describe('getIconClasses', () => {

      it('should return icon class', () => {
        // Given icon classes is provided by help config service
        spyOn(helpConfigService, 'getIconClasses').and.returnValue(['my-icon']);

        // When requesting the classes for the icon
        const classes = component.getIconClasses();

        // Then it should have called helpConfigService.getIconClasses()
        expect(helpConfigService.getIconClasses).toHaveBeenCalledWith(component.config);
        expect(classes).toEqual(['my-icon']);
      });
    });
  });

  describe('getIconStyle', () => {

    beforeEach(() => {
      config = new IconPopoverConfig();
    });

    it('should return the icon style object', () => {
      // Given configuration has icon style defined
      const style: Partial<CSSStyleDeclaration> = {
        background: 'url(http://myimage.png)'
      };
      config.iconConfig.imageStyle = style;
      component.config = config;

      // When calling getIconStyle
      const iconStyle = component.getIconStyle();

      // Then it should be the config style
      expect(iconStyle).toEqual(style);
    });

    it('should return falsy if iconConfig is not defined', () => {
      // Given configuration icon style is not defined
      const style: Partial<CSSStyleDeclaration> = {
        background: 'url(http://myimage.png)'
      };
      config.iconConfig = undefined;
      component.config = config;

      // When calling getIconStyle
      const iconStyle = component.getIconStyle();

      // Then it should be the config style
      expect(iconStyle).toBeFalsy();
    });

  });

  describe('buildPopoverConfig', () => {
    let updatedConfig: IconPopoverConfig;

    beforeEach(() => {
      config = new IconPopoverConfig();
      updatedConfig = new IconPopoverConfig();
    });

    const inputChange = (inputName: string, value: string | EdcPopoverOptions) => {
      expect(component.config).toBeUndefined();
      spyOn(helpConfigService, 'buildPopoverConfig').and.returnValue(Promise.resolve(config));
      const changes: SimpleChanges = {};
      changes[inputName] = mock(SimpleChange, { currentValue: value });

      component.ngOnChanges(changes);

      fixture.detectChanges();
    };

    const testContentInput = (inputName: string, value: string | EdcPopoverOptions) => {
      inputChange(inputName, value);

      expect(helpConfigService.buildPopoverConfig).toHaveBeenCalledWith('main', 'sub', 'myPlugin', 'fr', component.options);
    };

    it('should set the popover configuration if main key changed', () => {
      testContentInput('mainKey', 'main');
    });

    it('should set the popover configuration if sub key changed', () => {
      testContentInput('subKey', 'sub');
    });

    it('should set the popover configuration if plugin id changed', () => {
      testContentInput('pluginId', 'myPlugin');
    });

    it('should set the popover configuration if lang id changed', () => {
      testContentInput('lang', 'fr');
    });

  });
});

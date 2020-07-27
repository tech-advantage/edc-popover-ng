import { HelpComponent } from './help.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockService, TestModule } from './utils/test-helpers';
import { HelpConfigService } from './config/help-config.service';
import { HelpPopoverDirective } from './help-popover.directive';

describe('Help component', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let helpConfigService: HelpConfigService;

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
        mockService(HelpConfigService, ['getIcon', 'updateOptions', 'buildPopoverConfig'])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    helpConfigService = TestBed.inject<HelpConfigService>(HelpConfigService);
  });

  beforeEach(() => {
    spyOn(helpConfigService, 'getIcon').and.returnValue('fa-question-circle-o');
  });

  beforeEach(() => {
    const bindings = {
      mainKey: 'main',
      subKey: 'sub',
      pluginId: 'myPlugin',
      lang: 'fr'
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
      expect(component.iconCss).toEqual('fa-question-circle-o');
    });
  });

  describe('runtime', () => {

    describe('getIconClasses', () => {

      it('should return icon class', () => {
        // Given component iconCss attribute is defined
        expect(component.iconCss).toEqual('fa-question-circle-o');
        expect(component.dark).toBeFalsy();

        const classes = component.getIconClasses();

        expect(classes.length).toEqual(1);
        expect(classes).toEqual(['fa-question-circle-o']);
      });

      it('should return icon class in dark mode', () => {
        // Given component iconCss attribute is defined
        component.dark = true;

        const classes = component.getIconClasses();

        expect(classes).toEqual(['fa-question-circle-o', 'on-dark']);
      });
      it('should return empty array if classes are not defined', () => {
        // Given component iconCss attribute is defined
        component.iconCss = undefined;
        component.dark = false;

        const classes = component.getIconClasses();

        expect(classes).toEqual([]);
      });
    });
  });
});

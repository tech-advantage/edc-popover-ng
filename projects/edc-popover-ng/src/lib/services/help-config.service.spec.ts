import { TestBed } from '@angular/core/testing';
import { HelpService } from './help.service';
import { mockHelper } from '../utils/test-helpers';
import { HelpConfigService } from './help-config.service';
import { PopoverOptions } from 'edc-popover-utils';
import { Helper } from 'edc-client-js';
import { IconPopoverConfig } from '../config/icon-popover-config';
import { HelpPopoverService } from './help-popover.service';
import { HelpIconService } from './help-icon.service';
import { HelpErrorService } from './help-error.service';

describe('Test Help Config service', () => {

  let helpConfigService: HelpConfigService;

  let helpServiceSpy: jasmine.SpyObj<HelpService>;
  let helpIconServiceSpy: jasmine.SpyObj<HelpIconService>;
  let helpPopoverServiceSpy: jasmine.SpyObj<HelpPopoverService>;
  let helpErrorServiceSpy: jasmine.SpyObj<HelpErrorService>;

  // Mock objects
  let helper: Helper;

  beforeEach(() => {
    const helpSpy = jasmine.createSpyObj('HelpService', ['getHelp', 'getPopoverOptions']);
    const helpIconSpy = jasmine.createSpyObj('HelpIconService', ['getIconClasses', 'getTooltip', 'buildIconClasses', 'getIconImageStyle']);
    const helpPopoverSpy = jasmine.createSpyObj('HelpPopoverService', ['addContent', 'addLabels']);
    const helpErrorSpy = jasmine.createSpyObj('HelpErrorService', ['handleHelpError']);

    TestBed.configureTestingModule({
      providers: [
        HelpConfigService,
        { provide: HelpService, useValue: helpSpy },
        { provide: HelpIconService, useValue: helpIconSpy },
        { provide: HelpPopoverService, useValue: helpPopoverSpy },
        { provide: HelpErrorService, useValue: helpPopoverSpy },
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    helpConfigService = TestBed.inject<HelpConfigService>(HelpConfigService);
    helpServiceSpy = TestBed.inject(HelpService) as jasmine.SpyObj<HelpService>;
    helpIconServiceSpy = TestBed.inject(HelpIconService) as jasmine.SpyObj<HelpIconService>;
    helpPopoverServiceSpy = TestBed.inject(HelpPopoverService) as jasmine.SpyObj<HelpPopoverService>;
    helpErrorServiceSpy = TestBed.inject(HelpErrorService) as jasmine.SpyObj<HelpErrorService>;
  });

  beforeEach(() => {
    helper = mockHelper();
  });

  beforeEach(() => {
    helpServiceSpy.getHelp.and.returnValue(Promise.resolve(helper));
  });

  describe('buildPopoverConfig', () => {

    it('should build the popover configuration', () => {
      // Given we have the helper with common properties

      // When calling buildPopoverConfig
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: IconPopoverConfig) => {
        });
    });

    // Options
    it('should set the append to option to body and placement to bottom', () => {
      // Given set the append to option to null
      const options = new PopoverOptions();
      options.appendTo = null;
      helpServiceSpy.getPopoverOptions.and.returnValue(options);

      // When calling buildPopoverConfig requesting the content in french
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: IconPopoverConfig) => {
          // Then append to option should be set as parent, via the function returning the body element
          expect(typeof config.options.appendTo).toEqual('function');
          // Bottom should be set from default value
          expect(config.options.placement).toEqual('bottom');
          expect(config.options.customClass).toBeUndefined();
        });
    });
    it('should set the append to option to parent and placement to top', () => {
      // Given set the append to option to 'parent'
      const options = new PopoverOptions();
      options.appendTo = 'parent';
      helpServiceSpy.getPopoverOptions.and.returnValue(options);

      // When calling buildPopoverConfig requesting the content in french
      helpConfigService.buildPopoverConfig('myMainKey',
        'mySubKey',
        'myPluginId',
        'en',
        new PopoverOptions())
        .then((config: IconPopoverConfig) => {
          // Then append to option should be set as parent
          expect(config.options.appendTo).toEqual('parent');
          // Bottom should be set from default value
          expect(config.options.placement).toEqual('top');
          // Custom class should have been set to "my-custom-class"
          expect(config.options.customClass).toEqual('my-custom-class');
        });
    });

  });
});

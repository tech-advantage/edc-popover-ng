import { TestBed } from '@angular/core/testing';
import { HelpErrorService } from './help-error.service';
import { HelpIconService } from './help-icon.service';
import { IconPopoverConfig } from '../config/icon-popover-config';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { EdcPopoverOptions } from '../config/edc-popover-options';
import { HelpPopoverService } from './help-popover.service';
import { DEFAULT_LABELS } from '../translate/default-translations';
import { ContentNotFoundError } from '../errors/content-not-found.error';
import { IconConfig } from '../config/icon-config';
import { IconBehavior, PopoverBehavior } from '../config/fail-behavior';
import { DEFAULT_ICON } from '../constants/style.constant';

describe('Test Help Error service', () => {

  let helpErrorService: HelpErrorService;

  let helpIconServiceSpy: { buildErrorIconConfig: jasmine.Spy };
  let helpPopoverServiceSpy: { addLabels: jasmine.Spy };

  beforeEach(() => {
    const helpPopoverSpy = jasmine.createSpyObj('HelpPopoverService', ['addLabels']);
    const helpIconSpy = jasmine.createSpyObj('HelpIconService', ['buildErrorIconConfig']);

    TestBed.configureTestingModule({
      providers: [
        HelpErrorService,
        { provide: HelpIconService, useValue: helpIconSpy },
        { provide: HelpPopoverService, useValue: helpPopoverSpy },
      ]
    });

    helpErrorService = TestBed.inject<HelpErrorService>(HelpErrorService);
    helpIconServiceSpy = TestBed.inject(HelpIconService) as jasmine.SpyObj<HelpIconService>;
    helpPopoverServiceSpy = TestBed.inject(HelpPopoverService) as jasmine.SpyObj<HelpPopoverService>;
  });

  describe('handleHelpError', () => {
    let config: IconPopoverConfig;
    let options: IEdcPopoverOptions;

    beforeEach(() => {
      config = new IconPopoverConfig();
      options = new EdcPopoverOptions();
      // Mock addLabels with system language - should set the given config labels
      helpPopoverServiceSpy.addLabels.and.callFake(() => {
        config.labels = DEFAULT_LABELS.get('en');
        return Promise.resolve(config);
      });
    });

    // ContentNotFoundError - default content
    it('should return a valid configuration', () => {
      // Given we have a ContentNotFoundError and a icon configuration
      const iconConfig = new IconConfig();
      iconConfig.icon.class = 'my other class';
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(iconConfig);
      const error: ContentNotFoundError = new ContentNotFoundError('myKey', 'mySubKey', 'en');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        expect(errorConfig).toBeDefined();
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        expect(errorConfig.iconConfig.icon.class).toEqual('my other class');
        // Default content should have been set - description coming soon message and no title
        expect(errorConfig.content.description).toEqual(DEFAULT_LABELS.get('en').comingSoon);
        expect(errorConfig.content.title).toBeFalsy();
      });
    });
    // Failbehavior : icon SHOWN, popover ERROR_SHOWN
    it('should return a configuration with icon SHOWN and popover ERROR_SHOWN', () => {
      // Given we have a ContentNotFoundError and fail behavior with IconBehavior.SHOWN && PopoverBehavior.ERROR_SHOWN
      expect(options.failBehavior.icon).toEqual(IconBehavior.SHOWN);
      options.failBehavior.popover = PopoverBehavior.ERROR_SHOWN;
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(new IconConfig());
      const error: ContentNotFoundError = new ContentNotFoundError('myKey', 'mySubKey', 'en');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        // Default content should have been set: icon class, description with failed data message and title with errorTitle
        expect(errorConfig.iconConfig.icon.class).toEqual(DEFAULT_ICON);
        expect(errorConfig.content.description).toEqual(DEFAULT_LABELS.get('en').errors.failedData);
        expect(errorConfig.content.title).toEqual(DEFAULT_LABELS.get('en').errorTitle);
      });
    });
    // Failbehavior : icon DISABLED, popover ERROR_SHOWN
    it('should return a configuration with icon DISABLED and popover ERROR_SHOWN', () => {
      // Given we have a ContentNotFoundError and fail behavior with IconBehavior.DISABLED && PopoverBehavior.ERROR_SHOWN
      options.failBehavior.icon = IconBehavior.DISABLED;
      options.failBehavior.popover = PopoverBehavior.ERROR_SHOWN;
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(new IconConfig());
      const error: ContentNotFoundError = new ContentNotFoundError('myKey', 'mySubKey', 'en');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        // Default content should have been set
        expect(errorConfig.content.description).toEqual(DEFAULT_LABELS.get('en').errors.failedData);
        expect(errorConfig.content.title).toEqual(DEFAULT_LABELS.get('en').errorTitle);
        expect(errorConfig.disablePopover).toBeTrue();
      });
    });
    // Failbehavior : icon ERROR, popover NO_POPOVER
    it('should return a configuration with icon ERROR and popover NO_POPOVER', () => {
      // Given we have a ContentNotFoundError and fail behavior with IconBehavior.ERROR && PopoverBehavior.NO_POPOVER
      options.failBehavior.icon = IconBehavior.ERROR;
      options.failBehavior.popover = PopoverBehavior.NO_POPOVER;
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(new IconConfig());
      const error: ContentNotFoundError = new ContentNotFoundError('myKey', 'mySubKey', 'en');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        // Default content should be null and disabledPopover should be true
        expect(errorConfig.content).toBeNull();
        expect(errorConfig.disablePopover).toBeTruthy();
      });
    });
    // Failbehavior : icon HIDDEN, popover FRIENDLY_MSG
    it('should return a configuration with icon HIDDEN and popover FRIENDLY_MSG', () => {
      // Given we have a ContentNotFoundError and fail behavior with IconBehavior.HIDDEN && PopoverBehavior.FRIENDLY_MSG
      options.failBehavior.icon = IconBehavior.HIDDEN;
      options.failBehavior.popover = PopoverBehavior.FRIENDLY_MSG;
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(new IconConfig());
      const error: ContentNotFoundError = new ContentNotFoundError('myKey', 'mySubKey', 'en');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        // Default content should be null and disabledPopover should be true
        expect(errorConfig.content).toBeNull();
        expect(errorConfig.disablePopover).toBeTruthy();
      });
    });

    // Other errors
    it('should return a configuration for the other errors', () => {
      // Given we have a simple Error and fail behavior with IconBehavior.SHOWN && PopoverBehavior.FRIENDLY_MSG
      options.failBehavior.icon = IconBehavior.SHOWN;
      options.failBehavior.popover = PopoverBehavior.FRIENDLY_MSG;
      helpIconServiceSpy.buildErrorIconConfig.and.returnValue(new IconConfig());
      const error: Error = new Error('An unlisted error appeared');

      // When calling handleHelpError
      helpErrorService.handleHelpError(error, options, 'en').then((errorConfig: IconPopoverConfig) => {
        // Labels should be defined
        expect(errorConfig.labels).toEqual(DEFAULT_LABELS.get('en'));
        // Icon config should have been set by helpIconService
        expect(helpIconServiceSpy.buildErrorIconConfig).toHaveBeenCalledWith(options, errorConfig.labels);
        // Default content description should be coming soon and no title should be set
        expect(errorConfig.content.description).toEqual(DEFAULT_LABELS.get('en').comingSoon);
        expect(errorConfig.content.title).toBeFalsy();
      });
    });
  });

});

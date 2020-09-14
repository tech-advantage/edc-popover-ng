import { HelpIconService } from './help-icon.service';
import { TestBed } from '@angular/core/testing';
import { PopoverLabel } from 'edc-client-js';
import { DEFAULT_LABELS } from '../translate/default-translations';
import { IconConfig } from '../config/icon-config';
import {
  DARK_CLASS_NAME,
  DEFAULT_ICON,
  ERROR_ICON,
  IconClass,
  IMAGE_BACKGROUND_SIZE,
  IMAGE_CLASS_NAME,
  IMAGE_HEIGHT
} from '../constants/style.constant';
import { PopoverIcon } from '../config/popover-icon';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { EdcPopoverOptions } from '../config/edc-popover-options';
import { IconBehavior } from '../config/fail-behavior';

describe('Help icon service', () => {

  let helpIconService: HelpIconService;

  let labels: PopoverLabel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpIconService
      ]
    });

    helpIconService = TestBed.inject<HelpIconService>(HelpIconService);
  });

  beforeEach(() => {
    labels = { ...DEFAULT_LABELS.get('en') };
  });

  describe('getTooltip', () => {

    it('should return the tooltip if display is true and labels are defined', () => {
      labels.iconAlt = 'My tooltip';
      expect(helpIconService.getTooltip(true, labels)).toEqual('My tooltip');
    });
    it('should return an empty string', () => {
      labels.iconAlt = 'My tooltip';
      expect(helpIconService.getTooltip(false, labels)).toEqual('');
      expect(helpIconService.getTooltip(false, null)).toEqual('');
      expect(helpIconService.getTooltip(true, null)).toEqual('');
    });
  });

  describe('getIconClasses', () => {
    let iconConfig: IconConfig;
    beforeEach(() => {
      iconConfig = new IconConfig();
    });
    it('should return icon classes', () => {
      // Given icon classes are present
      iconConfig.iconClasses = ['class1', 'class2'];
      iconConfig.errorClasses = [];

      // When calling getIconClasses()
      const classes = helpIconService.getIconClasses(iconConfig);

      // Then we should get all the classes
      expect(classes).toEqual(['class1', 'class2']);
    });
    it('should return icon classes with errors', () => {
      // Given icon classes are present
      iconConfig.iconClasses = ['class1', 'class2'];
      iconConfig.errorClasses = [IconClass.HIDDEN];

      // When calling getIconClasses()
      const classes = helpIconService.getIconClasses(iconConfig);

      // Then we should get all the classes
      expect(classes).toEqual(['class1', 'class2', IconClass.HIDDEN]);
    });
    it('should return error icon classes', () => {
      // Given icon classes are not defined but some error classes are
      iconConfig.iconClasses = undefined;
      iconConfig.errorClasses = [IconClass.DISABLED];

      // When calling getIconClasses()
      const classes = helpIconService.getIconClasses(iconConfig);

      // Then we should get the error classes
      expect(classes).toEqual([IconClass.DISABLED]);
    });
    it('should return empty string or array', () => {
      // Given icon classes are not defined
      iconConfig.iconClasses = undefined;
      iconConfig.errorClasses = undefined;

      // When calling getIconClasses() with undefined values
      expect(helpIconService.getIconClasses(undefined)).toEqual('');
      expect(helpIconService.getIconClasses(null)).toEqual('');
      expect(helpIconService.getIconClasses(iconConfig)).toEqual([]);
    });
  });

  describe('buildIconClasses', () => {
    let icon: PopoverIcon, options: IEdcPopoverOptions;

    beforeEach(() => {
      icon = PopoverIcon.create();
      options = new EdcPopoverOptions();
    });

    it('should build the default icon classes', () => {
      // Given icon and options are defined
      expect(icon.class).toEqual(DEFAULT_ICON);
      expect(icon.url).toBeFalsy();
      expect(options.dark).toBeFalse();

      // When calling buildIconClasses
      const classes = helpIconService.buildIconClasses(icon, options);

      // Then it should contain only the default icon class
      expect(classes).toEqual([DEFAULT_ICON]);
    });

    it('should add the dark class', () => {
      // Given we have a custom icon class and dark option is true
      icon.class = 'my-custom-icon-class';
      expect(icon.url).toBeFalsy();
      options.dark = true;

      // When calling buildIconClasses
      const classes = helpIconService.buildIconClasses(icon, options);

      // Then it should contain the default icon class and dark class names
      expect(classes).toContain('my-custom-icon-class', DARK_CLASS_NAME);
    });
    it('should include the url image class', () => {
      // Given class is not defined dark option is true
      icon.class = undefined;
      icon.url = 'myImageURL';
      options.dark = true;

      // When calling buildIconClasses
      const classes = helpIconService.buildIconClasses(icon, options);

      // Then it should contain the dark class and image class names, not the base icon class
      expect(classes).toContain(DARK_CLASS_NAME, IMAGE_CLASS_NAME);
    });
    it('should include the url image class even if class is defined', () => {
      // Given dark option is true
      expect(icon.class).toEqual(DEFAULT_ICON);
      icon.url = 'myImageURL';
      options.dark = true;

      // When calling buildIconClasses
      const classes = helpIconService.buildIconClasses(icon, options);

      // Then it should contain the dark class and image class names, not the base icon class
      expect(classes).toContain(DARK_CLASS_NAME, IMAGE_CLASS_NAME);
    });
  });

  describe('getIconImageStyle', () => {
    let icon: PopoverIcon;
    beforeEach(() => icon = PopoverIcon.create());
    it('should return the style', () => {
      // Given only the url is defined
      icon.url = 'imageUrl';
      expect(icon.height).toEqual(18);
      expect(icon.width).toBeUndefined();

      // When calling getIconImageStyle
      const style = helpIconService.getIconImageStyle(icon);

      // Then we should get the style with expected values
      expect(style).toEqual({
        background: 'url(imageUrl)',
        backgroundSize: IMAGE_BACKGROUND_SIZE,
        height: '18px',
        width: '18px'
      });
    });
    it('should return the style if width and height are not defined', () => {
      // Given only the url is defined
      icon.url = 'imageUrl';
      icon.height = undefined;
      icon.width = undefined;

      // When calling getIconImageStyle
      const style = helpIconService.getIconImageStyle(icon);

      // Then we should get the style with default values
      expect(style).toEqual({
        background: 'url(imageUrl)',
        backgroundSize: IMAGE_BACKGROUND_SIZE,
        height: '18px',
        width: '18px'
      });
    });
    it('should return the style based on height if width is not defined', () => {
      // Given only the url is defined
      icon.url = 'imageUrl';
      icon.height = 24;
      icon.width = undefined;

      // When calling getIconImageStyle
      const style = helpIconService.getIconImageStyle(icon);

      // Then we should get the style with width and height 24px
      expect(style).toEqual({
        background: 'url(imageUrl)',
        backgroundSize: IMAGE_BACKGROUND_SIZE,
        height: '24px',
        width: '24px'
      });
    });
    it('should return specific values for width and height', () => {
      // Given only the url is defined
      icon.url = 'imageUrl';
      icon.height = 24;
      icon.width = 28;

      // When calling getIconImageStyle
      const style = helpIconService.getIconImageStyle(icon);

      // Then we should get the style with width and height 24px
      expect(style).toEqual({
        background: 'url(imageUrl)',
        backgroundSize: IMAGE_BACKGROUND_SIZE,
        height: '24px',
        width: '28px'
      });
    });
  });

  describe('buildErrorIconConfig', () => {
    let options: EdcPopoverOptions;
    beforeEach(() => {
      options = new EdcPopoverOptions();
      options.icon = PopoverIcon.create();
    });

    it('should return the right icon configuration', () => {
      // Given Behavior is IconBehavior.SHOWN
      expect(options.failBehavior.icon).toEqual(IconBehavior.SHOWN);

      // When calling buildErrorIconConfig
      const iconConfig: IconConfig = helpIconService.buildErrorIconConfig(options, labels);

      // Then it should have the expected values
      const expectedConfig: IconConfig = new IconConfig();
      expectedConfig.iconClasses = [DEFAULT_ICON];
      expectedConfig.errorClasses = [];
      expectedConfig.icon = { ...iconConfig.icon };
      expect(iconConfig).toEqual(expectedConfig);
      expect(iconConfig.icon.class).toEqual(DEFAULT_ICON);
    });
    it('should return the hidden icon configuration', () => {
      // Given Behavior is IconBehavior.HIDDEN
      options.failBehavior.icon = IconBehavior.HIDDEN;

      // When calling buildErrorIconConfig
      const iconConfig: IconConfig = helpIconService.buildErrorIconConfig(options, labels);

      // Then it should have the expected values
      const expectedConfig: IconConfig = new IconConfig();
      expectedConfig.iconClasses = [DEFAULT_ICON];
      expectedConfig.errorClasses = [IconClass.HIDDEN];
      expectedConfig.icon = { ...iconConfig.icon };
      expect(iconConfig).toEqual(expectedConfig);
      expect(iconConfig.icon.class).toEqual(DEFAULT_ICON);
    });
    it('should return the error icon configuration', () => {
      // Given Behavior is IconBehavior.ERROR
      options.failBehavior.icon = IconBehavior.ERROR;

      // When calling buildErrorIconConfig
      const iconConfig: IconConfig = helpIconService.buildErrorIconConfig(options, labels);

      // Then it should have the error icon values
      const expectedConfig: IconConfig = new IconConfig();
      expectedConfig.iconClasses = [ERROR_ICON];
      expectedConfig.errorClasses = [IconClass.ERROR];
      expectedConfig.icon.class = ERROR_ICON;
      expectedConfig.icon = { ...iconConfig.icon };
      expect(iconConfig).toEqual(expectedConfig);
      expect(iconConfig.icon.class).toEqual(ERROR_ICON);
    });
    it('should overwrite the options and use default s for undefined properties', () => {
      // Given Behavior is IconBehavior.SHOWN and some icon property values are not defined
      const { icon } = options;
      icon.class = undefined;
      icon.width = 26;
      icon.height = undefined;
      // When calling buildErrorIconConfig
      const iconConfig: IconConfig = helpIconService.buildErrorIconConfig(options, labels);

      // Then it should have copied the source values, and used the default's for the undefined ones
      const expectedConfig: IconConfig = new IconConfig();
      expectedConfig.errorClasses = [];
      expectedConfig.icon.width = 26;
      // Should have set default height and icon
      expectedConfig.icon.height = IMAGE_HEIGHT;
      expectedConfig.icon.class = DEFAULT_ICON;
      expectedConfig.iconClasses = [DEFAULT_ICON];
      expectedConfig.icon = { ...iconConfig.icon };
      expect(iconConfig).toEqual(expectedConfig);
    });
  });

});

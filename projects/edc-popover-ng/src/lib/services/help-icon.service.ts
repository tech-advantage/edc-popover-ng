import { Injectable } from '@angular/core';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { PopoverLabels } from 'edc-popover-utils';
import { PopoverIcon } from '../config/popover-icon';
import {
  DARK_CLASS_NAME,
  DEFAULT_ICON,
  ERROR_ICON,
  IconClass,
  IMAGE_BACKGROUND_SIZE,
  IMAGE_CLASS_NAME,
  IMAGE_HEIGHT,
  IMAGE_WIDTH
} from '../constants/style.constant';
import { IconBehavior } from '../config/fail-behavior';
import { IconConfig } from '../config/icon-config';
import { copyDefinedProperties } from '../utils/global.utils';
import { PopoverLabel } from 'edc-client-js';

@Injectable()
export class HelpIconService {

  // Define the classes associated with each behavior:
  static readonly ERROR_ICON_CLASSES: Map<IconBehavior, IconClass> = new Map()
    .set(IconBehavior.SHOWN, IconClass.NONE)
    .set(IconBehavior.DISABLED, IconClass.DISABLED)
    .set(IconBehavior.HIDDEN, IconClass.HIDDEN)
    .set(IconBehavior.ERROR, IconClass.ERROR);

  /**
   * Builds the configuration for the popover icon, based on resolved options
   *
   * Generates:
   *      - icon: resolved icon properties from the options
   *      - iconTooltip: the icon tooltip
   *      - iconClasses: the icon main classes
   *
   * @param options the popover options from the received input
   * @param labels the popover labels
   */
  buildIconConfig(options: IEdcPopoverOptions, labels: PopoverLabel | null | undefined): IconConfig {
    const iconConfig: IconConfig = new IconConfig();
    // Get safe icon properties
    iconConfig.icon = this.buildPopoverIcon(options);
    // Add icon tooltip if displayTooltip is true
    iconConfig.iconTooltip = this.getTooltip(options && options.displayTooltip, labels);
    // Create the icon classes that will be used in the component
    iconConfig.iconClasses = this.buildIconClasses(iconConfig.icon, options);
    // Check for any provided url
    if (iconConfig.icon.url) {
      // Update icon config with the css style declaration
      iconConfig.imageStyle = this.getIconImageStyle(iconConfig.icon);
    }
    return iconConfig;
  }

  /**
   * Returns the tooltip for the icon, on hover
   * Uses the 'iconAlt' property from the translated popover labels,
   * provided by the the edc-client-js instance
   *
   * returns an empty string if displayTooltip option is false,
   * or if labels were not found
   *
   * @param displayTooltip true if tooltip should be displayed (from the popover options)
   * @param labels the translated labels containing the text for the tooltip
   */
  getTooltip(displayTooltip: boolean | undefined, labels: PopoverLabels | null | undefined): string {
    return (displayTooltip && !!labels && !!labels.iconAlt) ? labels.iconAlt : '';
  }

  /**
   * Returns an array containing the class names for the icon,
   * to pass to the angular ngClass directive
   *
   * Looks for loaded classes in the icon configuration object
   * Adds the error classes if this is a error popover
   *
   * If no configuration was found, return an empty string
   *
   * @param iconConfig the icon configuration
   */
  getIconClasses(iconConfig: IconConfig | undefined): string | string[] {
    if (!iconConfig) {
      return '';
    }
    const classes = [];
    if (iconConfig.iconClasses && iconConfig.iconClasses.length) {
      classes.push(...iconConfig.iconClasses);
    }
    if (iconConfig.errorClasses && iconConfig.errorClasses.length) {
      classes.push(...iconConfig.errorClasses);
    }
    return classes;
  }

  /**
   * Builds the icon classes from the popover options and icon properties
   *
   * Icon can be set either from a css class (ie font-awesome: 'fa fa-question-circle-o'),
   * or from an url.
   * First checks if url is provided, and if it is use it to define the icon
   * Only uses class if no url was found. That means that if both were provided,
   * only the url will be used.
   *
   * Will also set the dark mode adding it to the class list if dark option is true
   *
   * @param icon the given icon
   * @param options the popover options object, containing the options for the icon
   */
  buildIconClasses(icon: PopoverIcon, options: IEdcPopoverOptions | undefined): string[] {
    const classes = [];
    // Set dark class
    if (options && options.dark) {
      classes.push(DARK_CLASS_NAME);
    }
    // First check if url is present, and set icon as image if it is
    if (icon && icon.url) {
      classes.push(IMAGE_CLASS_NAME);
    } else if (icon.class) {
      // Only use class for defining the icon if an url was not provided
      classes.push(icon.class);
    }
    return classes;
  }

  /**
   * Returns the css style declaration for the given icon image:
   *    - Sets the background image from url
   *    - Sets the width and height from the icon properties
   *      If width is not defined, uses height
   *      Uses Default values for properties if not defined
   *
   * @param icon the icon image to style
   */
  getIconImageStyle(icon: PopoverIcon): Partial<CSSStyleDeclaration> | null {
    if (!icon || !icon.url) {
      return null;
    }
    // Set given image url as background, and width and height from the icon properties
    return {
      background: `url(${icon.url})`,
      backgroundSize: IMAGE_BACKGROUND_SIZE,
      height: `${icon.height || IMAGE_HEIGHT}px`,
      width: `${icon.width || icon.height || IMAGE_WIDTH}px`,
    };
  }

  /**
   * Builds a icon configuration for an error, based on the given options
   *
   * Adjusts all the configuration values associated with the given icon behavior.
   *
   * Behavior will define:
   *    icon: use the Error icon if Error behavior was set, else try to use the original icon's
   *    and if not present use default
   *
   *    icon style: - Shown: will display the normal icon
   *                - Error: will add the edc-icon-error class
   *                - Hidden: will add the edc-icon-hidden class
   *                - DISABLED: will add the edc-icon-disabled class
   *
   * @param options the popover options
   * @param labels the labels
   */
  buildErrorIconConfig(options: IEdcPopoverOptions, labels: PopoverLabel | null | undefined): IconConfig {
    // Build common icon config
    const { icon: iconBehavior } = options.failBehavior ?? {};
    // If behavior for the icon is to display an error icon, update its class
    if (iconBehavior === IconBehavior.ERROR && options.icon) {
      options.icon.class = ERROR_ICON;
    }
    // Start building the main icon configuration
    const iconConfig = this.buildIconConfig(options, labels);
    let errorClass: IconClass[] = [];
    if (iconBehavior) {
      const errClass = HelpIconService.ERROR_ICON_CLASSES.get(iconBehavior);
      // Any specific error class to be added, according to the defined behavior
      errorClass = errClass ? [errClass] : [];
    }
    iconConfig.errorClasses = errorClass;
    return iconConfig;
  }

  /**
   * Builds the icon options
   *
   * Checks if at least one of the class or url properties should be defined
   * If not, use default icon class
   *
   * returns a safe PopoverIcon
   * @param options the popover options
   * @private
   */
  private buildPopoverIcon(options: IEdcPopoverOptions | undefined): PopoverIcon {
    const defaultIcon = PopoverIcon.create();
    if (!options || !options.icon) {
      return defaultIcon;
    }
    // Make a safe copy from default icon values
    const mergedIcons = copyDefinedProperties<PopoverIcon>(defaultIcon, options.icon);
    if (!mergedIcons) {
      return defaultIcon;
    }
    // Check consistency and clean invalid properties
    if (!mergedIcons.url || !mergedIcons.url.trim()) {
      // url property must be null or undefined if not valid
      mergedIcons.url = null;
    }
    if (!mergedIcons.class || !mergedIcons.class.trim()) {
      // At least one of the class or url properties must be defined, use default values if not
      mergedIcons.class = mergedIcons.url ? null : DEFAULT_ICON;
    }
    return mergedIcons;
  }
}

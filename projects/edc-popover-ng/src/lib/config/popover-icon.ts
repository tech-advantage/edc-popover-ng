import { DEFAULT_ICON } from '../constants/style.constant';

/**
 * Input icon properties received with the options
 *
 *    - class: the class name for the icon
 *    - url: image URL - if present, the class property will be ignored
 *    - height: url image Height in pixels, (for url images only)
 *    - width: Width in pixels: if height is not defined, height value will be applied
 *    - errorClass: Classes to use if an error occurred
 *
 */
export class PopoverIcon {
  class?: string;
  url?: string;
  height = 18;
  width?;
  errorClass?: string[] = [];

  /**
   * Creates a popover icon with default values
   */
  static create(): PopoverIcon {
    const icon = new PopoverIcon();
    icon.class = DEFAULT_ICON;
    return icon;
  }
}

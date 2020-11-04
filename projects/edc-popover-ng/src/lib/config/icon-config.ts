import { PopoverIcon } from './popover-icon';
import { IconClass } from '../constants/style.constant';
import { DEFAULT_LABELS } from '../translate/default-translations';
import { SYS_LANG } from '../translate/language-codes';

/**
 * Holds the configuration for the target:
 *    - icon: configuration for the popover icon (also referred as the target)
 *    - iconTooltip: Tooltip to show on hover over the icon
 *    - iconClasses: Array that holds the class names to apply to the icon
 *    - imageStyle: CSS style to apply to the icon element
 *    - errorClasses: the classes to attach to the icon if an error occurred
 */
export class IconConfig {
  icon: PopoverIcon;
  iconTooltip = DEFAULT_LABELS.get(SYS_LANG).iconAlt;
  iconClasses: string[] = [];
  imageStyle: Partial<CSSStyleDeclaration>;
  errorClasses: IconClass[] = [];

  constructor() {
    this.icon = PopoverIcon.create();
  }
}

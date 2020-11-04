import { PopoverOptions } from 'edc-popover-utils';
import { IEdcPopoverOptions } from './edc-popover-options.interface';
import { FailBehavior } from './fail-behavior';
import { PopoverIcon } from './popover-icon';

/**
 * Options for the angular-ng popover, extending edc-popover-utils options
 *
 * failBehavior: icon and popover behavior when an error occurs
 * dark: dark mode
 * icon: properties for the popover icon
 *
 */
export class EdcPopoverOptions extends PopoverOptions implements IEdcPopoverOptions {
  failBehavior: FailBehavior = new FailBehavior();
  dark = false;
  icon: PopoverIcon = new PopoverIcon();
}

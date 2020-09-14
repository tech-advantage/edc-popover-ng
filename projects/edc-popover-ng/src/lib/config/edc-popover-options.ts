import { PopoverOptions } from 'edc-popover-js';
import { IEdcPopoverOptions } from './edc-popover-options.interface';
import { FailBehavior } from './fail-behavior';
import { PopoverIcon } from './popover-icon';

/**
 * Options for the angular-ng popover, extending edc-popover-js options
 *
 * failBehavior: icon and popover behavior when an error occurs
 * icon: properties for the popover icon
 *
 */
export class EdcPopoverOptions extends PopoverOptions implements IEdcPopoverOptions {
  failBehavior: FailBehavior = new FailBehavior();
  icon: PopoverIcon = new PopoverIcon();
}

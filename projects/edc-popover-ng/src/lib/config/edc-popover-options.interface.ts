import { IPopoverOptions } from 'edc-popover-js';
import { FailBehavior } from './fail-behavior';
import { PopoverIcon } from './popover-icon';

export interface IEdcPopoverOptions extends IPopoverOptions {
  icon?: PopoverIcon;
  failBehavior?: FailBehavior;
}

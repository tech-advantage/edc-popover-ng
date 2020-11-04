export enum PopoverBehavior {
  FRIENDLY_MSG = 'friendlyMsg',
  ERROR_SHOWN = 'errorShown',
  NO_POPOVER = 'noPopover'
}

export enum IconBehavior {
  SHOWN = 'shown',
  DISABLED = 'disabled',
  HIDDEN = 'hidden',
  ERROR = 'error'
}

export class FailBehavior {
  popover: PopoverBehavior = PopoverBehavior.FRIENDLY_MSG;
  icon: IconBehavior = IconBehavior.SHOWN;
}

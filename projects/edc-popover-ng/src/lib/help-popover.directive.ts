import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Popover } from 'edc-popover-js';
import { IconPopoverConfig } from './config/icon-popover-config';
import { isFalse } from './utils/global.utils';

@Directive({ selector: '[edcHelpPopover]' })
export class HelpPopoverDirective implements OnChanges, OnDestroy {

  popover: Popover;

  @Input() config: IconPopoverConfig;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.loadPopover();
    }
  }

  ngOnDestroy(): void {
    this.removePopover();
  }

  private loadPopover(): void {
    if (this.config && isFalse(this.config.disablePopover) && this.elementRef && this.elementRef.nativeElement) {
      this.config.target = this.elementRef.nativeElement;
      if (!this.popover) {
        this.popover = new Popover();
      }
      this.popover.buildPopover(this.config);
    } else {
      this.removePopover();
    }
  }

  private removePopover(): void {
    // Clean any previous instance
    if (this.popover && this.popover.instance &&
      typeof this.popover.instance.destroy === 'function') {
      this.popover.instance.destroy();
    }
  }
}

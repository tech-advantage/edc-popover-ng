import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Popover, PopoverConfig } from 'edc-popover-js';

@Directive({ selector: '[edcHelpPopover]' })
export class HelpPopoverDirective implements OnChanges, OnDestroy {

  popoverInstance;

  @Input() config: PopoverConfig;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPopover();
  }

  ngOnDestroy(): void {
    this.removePopovers();
  }

  private loadPopover(): void {
    if (this.config && this.elementRef && this.elementRef.nativeElement) {
      this.config.target = this.elementRef.nativeElement;
      this.removePopovers();
      this.popoverInstance = new Popover(this.config);
    }
  }

  private removePopovers(): void {
    // Clean any previous instance
    if (this.popoverInstance && this.popoverInstance.instance &&
      typeof this.popoverInstance.instance.destroy === 'function') {
      this.popoverInstance.instance.destroy();
    }
  }
}

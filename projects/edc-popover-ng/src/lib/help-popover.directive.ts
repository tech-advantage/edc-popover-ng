import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Popover, PopoverConfig } from 'edc-popover-js';

@Directive({ selector: '[edcHelpPopover]' })
export class HelpPopoverDirective implements OnChanges {

  popoverInstance;

  @Input() config: PopoverConfig;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPopover();
  }

  private loadPopover(): void {
    if (this.config && this.elementRef && this.elementRef.nativeElement) {
      this.config.target = this.elementRef.nativeElement;
      this.popoverInstance = new Popover(this.config);
    }
  }
}

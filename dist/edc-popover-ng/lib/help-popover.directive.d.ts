import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { PopoverConfig } from 'edc-popover-js';
export declare class HelpPopoverDirective implements OnChanges {
    private elementRef;
    popoverInstance: any;
    config: PopoverConfig;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    private loadPopover;
}

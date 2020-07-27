import { Directive, ElementRef, Input } from '@angular/core';
import { Popover, PopoverConfig } from 'edc-popover-js';
export class HelpPopoverDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnChanges(changes) {
        this.loadPopover();
    }
    loadPopover() {
        if (this.config && this.elementRef && this.elementRef.nativeElement) {
            this.config.target = this.elementRef.nativeElement;
            this.popoverInstance = new Popover(this.config);
        }
    }
}
HelpPopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[edcHelpPopover]' },] }
];
HelpPopoverDirective.ctorParameters = () => [
    { type: ElementRef }
];
HelpPopoverDirective.propDecorators = {
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1wb3BvdmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2VkYy1wb3BvdmVyLW5nL3NyYy9saWIvaGVscC1wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEQsTUFBTSxPQUFPLG9CQUFvQjtJQU0vQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQzFDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1lBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7O1lBbkJGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTs7O1lBSHZCLFVBQVU7OztxQkFRM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlciwgUG9wb3ZlckNvbmZpZyB9IGZyb20gJ2VkYy1wb3BvdmVyLWpzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2VkY0hlbHBQb3BvdmVyXScgfSlcbmV4cG9ydCBjbGFzcyBIZWxwUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgcG9wb3Zlckluc3RhbmNlO1xuXG4gIEBJbnB1dCgpIGNvbmZpZzogUG9wb3ZlckNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRQb3BvdmVyKCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRQb3BvdmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmVsZW1lbnRSZWYgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRhcmdldCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5wb3BvdmVySW5zdGFuY2UgPSBuZXcgUG9wb3Zlcih0aGlzLmNvbmZpZyk7XG4gICAgfVxuICB9XG59XG4iXX0=
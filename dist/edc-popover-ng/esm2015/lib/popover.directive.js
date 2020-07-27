import { Directive, ElementRef, Input } from '@angular/core';
import { Popover, PopoverConfig } from 'edc-popover-js';
export class PopoverDirective {
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
PopoverDirective.decorators = [
    { type: Directive, args: [{ selector: '[edcPopover]' },] }
];
PopoverDirective.ctorParameters = () => [
    { type: ElementRef }
];
PopoverDirective.propDecorators = {
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4RCxNQUFNLE9BQU8sZ0JBQWdCO0lBTTNCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDMUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7WUFuQkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTs7O1lBSG5CLFVBQVU7OztxQkFRM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlciwgUG9wb3ZlckNvbmZpZyB9IGZyb20gJ2VkYy1wb3BvdmVyLWpzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2VkY1BvcG92ZXJdJyB9KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIHBvcG92ZXJJbnN0YW5jZTtcblxuICBASW5wdXQoKSBjb25maWc6IFBvcG92ZXJDb25maWc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkUG9wb3ZlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUG9wb3ZlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5lbGVtZW50UmVmICYmIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmNvbmZpZy50YXJnZXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMucG9wb3Zlckluc3RhbmNlID0gbmV3IFBvcG92ZXIodGhpcy5jb25maWcpO1xuICAgIH1cbiAgfVxufVxuIl19
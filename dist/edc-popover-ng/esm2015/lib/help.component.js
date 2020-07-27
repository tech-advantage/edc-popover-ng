import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HelpConfigService } from './config/help-config.service';
export class HelpComponent {
    constructor(helpConfigService) {
        this.helpConfigService = helpConfigService;
        this.DEFAULT_PLACEMENT = 'bottom';
    }
    ngOnInit() {
        this.iconCss = this.helpConfigService.getIcon();
    }
    ngOnChanges(changes) {
        // When at least one of the inputs related to content changes, the configuration must be rebuild
        const contentTriggers = ['pluginId', 'mainKey', 'subKey', 'lang'];
        // Those only require to update the configuration options attribute
        const optionsTriggers = ['placement', 'customClass'];
        if (contentTriggers.some(prop => changes[prop])) {
            this.buildPopoverConfig();
        }
        else if (optionsTriggers.some(prop => changes[prop])) {
            this.config = this.helpConfigService.updateOptions(this.config, this.placement, this.customClass);
        }
    }
    getIconClasses() {
        const classes = [];
        if (this.iconCss) {
            classes.push(this.iconCss);
        }
        // Set dark class
        if (this.dark) {
            classes.push('on-dark');
        }
        return classes;
    }
    buildPopoverConfig() {
        const placement = this.placement || this.DEFAULT_PLACEMENT;
        this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, placement, this.customClass)
            .then((config) => {
            this.config = config;
        });
    }
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'edc-help',
                template: `
    <i class="fa help-icon" [ngClass]="this.getIconClasses()" edcHelpPopover [config]="config"></i>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: ["edc-help{font-size:16px;line-height:34px;padding-right:5px}edc-help .help-icon{color:#d3d3d3;cursor:pointer}edc-help .help-icon:hover{color:#3c8dbc}edc-help .help-icon.on-dark{color:rgba(0,0,0,.3)}edc-help .help-icon.on-dark:hover{color:#fff}"]
            },] }
];
HelpComponent.ctorParameters = () => [
    { type: HelpConfigService }
];
HelpComponent.propDecorators = {
    pluginId: [{ type: Input }],
    mainKey: [{ type: Input }],
    subKey: [{ type: Input }],
    placement: [{ type: Input }],
    dark: [{ type: Input }],
    lang: [{ type: Input }],
    customClass: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVdqRSxNQUFNLE9BQU8sYUFBYTtJQWlCeEIsWUFBNkIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFmeEQsc0JBQWlCLEdBQUcsUUFBUSxDQUFDO0lBZ0J0QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsZ0dBQWdHO1FBQ2hHLE1BQU0sZUFBZSxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEUsbUVBQW1FO1FBQ25FLE1BQU0sZUFBZSxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkc7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7UUFDRCxpQkFBaUI7UUFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDeEgsSUFBSSxDQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBOURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFFcEIsUUFBUSxFQUFFOztHQUVUO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBVlEsaUJBQWlCOzs7dUJBb0J2QixLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJ2VkYy1wb3BvdmVyLWpzJztcbmltcG9ydCB7IEhlbHBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcvaGVscC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tICd0aXBweS5qcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbJ2hlbHAubGVzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIGNsYXNzPVwiZmEgaGVscC1pY29uXCIgW25nQ2xhc3NdPVwidGhpcy5nZXRJY29uQ2xhc3NlcygpXCIgZWRjSGVscFBvcG92ZXIgW2NvbmZpZ109XCJjb25maWdcIj48L2k+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICByZWFkb25seSBERUZBVUxUX1BMQUNFTUVOVCA9ICdib3R0b20nO1xuXG4gIGhlbHBlcjogSGVscGVyO1xuICBpY29uQ3NzOiBzdHJpbmc7XG5cbiAgY29uZmlnOiBQb3BvdmVyQ29uZmlnO1xuXG4gIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7IC8vIGlmIGRlZmluZWQsIHRoZSBwbHVnaW4gaWRlbnRpZmllciB0byB1c2UgZm9yIGZldGNoaW5nIGhlbHAgY29udGVudFxuICBASW5wdXQoKSBtYWluS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN1YktleTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudDtcbiAgQElucHV0KCkgZGFyazogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFuZzogc3RyaW5nO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaGVscENvbmZpZ1NlcnZpY2U6IEhlbHBDb25maWdTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmljb25Dc3MgPSB0aGlzLmhlbHBDb25maWdTZXJ2aWNlLmdldEljb24oKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAvLyBXaGVuIGF0IGxlYXN0IG9uZSBvZiB0aGUgaW5wdXRzIHJlbGF0ZWQgdG8gY29udGVudCBjaGFuZ2VzLCB0aGUgY29uZmlndXJhdGlvbiBtdXN0IGJlIHJlYnVpbGRcbiAgICBjb25zdCBjb250ZW50VHJpZ2dlcnMgPSBbJ3BsdWdpbklkJywgJ21haW5LZXknLCAnc3ViS2V5JywgJ2xhbmcnXTtcbiAgICAvLyBUaG9zZSBvbmx5IHJlcXVpcmUgdG8gdXBkYXRlIHRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgYXR0cmlidXRlXG4gICAgY29uc3Qgb3B0aW9uc1RyaWdnZXJzID0gWydwbGFjZW1lbnQnLCAnY3VzdG9tQ2xhc3MnXTtcbiAgICBpZiAoY29udGVudFRyaWdnZXJzLnNvbWUocHJvcCA9PiBjaGFuZ2VzW3Byb3BdKSkge1xuICAgICAgdGhpcy5idWlsZFBvcG92ZXJDb25maWcoKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnNUcmlnZ2Vycy5zb21lKHByb3AgPT4gY2hhbmdlc1twcm9wXSkpIHtcbiAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5oZWxwQ29uZmlnU2VydmljZS51cGRhdGVPcHRpb25zKHRoaXMuY29uZmlnLCB0aGlzLnBsYWNlbWVudCwgdGhpcy5jdXN0b21DbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbkNsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICBpZiAodGhpcy5pY29uQ3NzKSB7XG4gICAgICBjbGFzc2VzLnB1c2godGhpcy5pY29uQ3NzKTtcbiAgICB9XG4gICAgLy8gU2V0IGRhcmsgY2xhc3NcbiAgICBpZiAodGhpcy5kYXJrKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ29uLWRhcmsnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUG9wb3ZlckNvbmZpZygpOiB2b2lkIHtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudCB8fCB0aGlzLkRFRkFVTFRfUExBQ0VNRU5UO1xuICAgIHRoaXMuaGVscENvbmZpZ1NlcnZpY2UuYnVpbGRQb3BvdmVyQ29uZmlnKHRoaXMubWFpbktleSwgdGhpcy5zdWJLZXksIHRoaXMucGx1Z2luSWQsIHRoaXMubGFuZywgcGxhY2VtZW50LCB0aGlzLmN1c3RvbUNsYXNzKVxuICAgICAgLnRoZW4oKGNvbmZpZzogUG9wb3ZlckNvbmZpZykgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=
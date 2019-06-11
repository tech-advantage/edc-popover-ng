/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
export class HelpComponent {
    /**
     * @param {?} helpService
     */
    constructor(helpService) {
        this.helpService = helpService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.key && this.subKey) {
            setTimeout(() => {
                // set timeout because popover content loading is not top priority.
                this.helpService.getHelp(this.key, this.subKey, this.pluginId)
                    .then((helper) => this.helper = helper, (err) => console.warn('Contextual Help not found : ', err));
            }, 2000);
        }
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    goToArticle(index) {
        /** @type {?} */
        const basePath = this.helpService.getHelpPath();
        /** @type {?} */
        const pluginId = this.pluginId || this.helpService.getPluginId();
        /** @type {?} */
        let url = `${basePath}/context/`;
        if (pluginId) {
            url += `${pluginId}/`;
        }
        else {
            console.warn('Please check if plugin Id was correctly set in the edc-popover-ng configuration handler');
        }
        url += `${this.key}/${this.subKey}/en/${index}`;
        this.open(url);
    }
    /**
     * @param {?} link
     * @return {?}
     */
    goToLink(link) {
        /** @type {?} */
        const basePath = this.helpService.getHelpPath();
        /** @type {?} */
        const url = `${basePath}/doc/${link.id}`;
        this.open(url);
    }
    /**
     * @return {?}
     */
    getPlacement() {
        return this.placement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    cancelClick($event) {
        $event.preventDefault();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    open(url) {
        window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
    }
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'edc-help',
                template: `
    <!-- Popover template -->
    <ng-template #popTemplate>
      <div class="edc-popover-container" (click)="$event.stopPropagation()">
        <article class="popover-article">{{ helper?.description }}</article>
        <div class="see-also">
          <div *ngIf="helper?.articles.length">
            <h6><strong><span>Need more...</span></strong></h6>
            <ul class="list-unstyled see-also-list">
              <li *ngFor="let article of helper.articles; let key = index" class="see-also-item"
                  (click)="goToArticle(key)">
                <div class="article-link">-{{article.label}}</div>
              </li>
            </ul>
          </div>
          <div *ngIf="helper?.links.length">
            <h6><strong><span>Related Topics</span></strong></h6>
            <ul class="list-unstyled see-also-list">
              <li *ngFor="let link of helper.links" class="see-also-item" (click)="goToLink(link)">
                <div class="article-link">-{{link.label}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ng-template>


    <!-- app-help template -->
    <i class="fa help-icon {{ iconCss }}"
    [popover]="helper ? popTemplate : comingSoon"
    [popoverTitle]="helper?.label"
    [placement]="getPlacement()"
    [ngClass]="{'on-dark': dark }"
    [container]="container"
    [outsideClick]="true"
    (click)="cancelClick($event)">
    </i>
  `,
                styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px;padding-left:20px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}"]
            }] }
];
/** @nocollapse */
HelpComponent.ctorParameters = () => [
    { type: HelpService }
];
HelpComponent.propDecorators = {
    pluginId: [{ type: Input }],
    key: [{ type: Input }],
    subKey: [{ type: Input }],
    placement: [{ type: Input }],
    dark: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    HelpComponent.prototype.helper;
    /** @type {?} */
    HelpComponent.prototype.container;
    /** @type {?} */
    HelpComponent.prototype.iconCss;
    /** @type {?} */
    HelpComponent.prototype.comingSoon;
    /** @type {?} */
    HelpComponent.prototype.pluginId;
    /** @type {?} */
    HelpComponent.prototype.key;
    /** @type {?} */
    HelpComponent.prototype.subKey;
    /** @type {?} */
    HelpComponent.prototype.placement;
    /** @type {?} */
    HelpComponent.prototype.dark;
    /** @type {?} */
    HelpComponent.prototype.helpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUE4Q2pELE1BQU07Ozs7SUFZSixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTswQkFSL0IsYUFBYSxDQUFDLG1CQUFtQjt5QkFLekIsUUFBUTtLQUdtQjs7OztJQUVoRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7cUJBQzNELElBQUksQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQzVDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDakUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNsRDs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBYTs7UUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNqRSxJQUFJLEdBQUcsR0FBRyxHQUFHLFFBQVEsV0FBVyxDQUFDO1FBQ2pDLElBQUksUUFBUSxFQUFFO1lBQ1osR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUM7U0FDdkI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMseUZBQXlGLENBQUMsQ0FBQztTQUN6RztRQUNELEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCOzs7OztJQUVELFFBQVEsQ0FBQyxJQUFVOztRQUNqQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNoRCxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsUUFBUSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQWE7UUFDdkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3pCOzs7OztJQUVPLElBQUksQ0FBQyxHQUFXO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxnREFBZ0QsQ0FBQyxDQUFDOzs7O1lBakc5RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBRXBCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7O2FBQ0Y7Ozs7WUE5Q1EsV0FBVzs7O3VCQXFEakIsS0FBSztrQkFDTCxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlZGMtaGVscCcsXG4gIHN0eWxlVXJsczogWyAnaGVscC5sZXNzJyBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gUG9wb3ZlciB0ZW1wbGF0ZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImVkYy1wb3BvdmVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwb3BvdmVyLWFydGljbGVcIj57eyBoZWxwZXI/LmRlc2NyaXB0aW9uIH19PC9hcnRpY2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VlLWFsc29cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5hcnRpY2xlcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPk5lZWQgbW9yZS4uLjwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC11bnN0eWxlZCBzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYXJ0aWNsZSBvZiBoZWxwZXIuYXJ0aWNsZXM7IGxldCBrZXkgPSBpbmRleFwiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ29Ub0FydGljbGUoa2V5KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj4te3thcnRpY2xlLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImhlbHBlcj8ubGlua3MubGVuZ3RoXCI+XG4gICAgICAgICAgICA8aDY+PHN0cm9uZz48c3Bhbj5SZWxhdGVkIFRvcGljczwvc3Bhbj48L3N0cm9uZz48L2g2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC11bnN0eWxlZCBzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGluayBvZiBoZWxwZXIubGlua3NcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xpbmsobGluaylcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+LXt7bGluay5sYWJlbH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDwhLS0gYXBwLWhlbHAgdGVtcGxhdGUgLS0+XG4gICAgPGkgY2xhc3M9XCJmYSBoZWxwLWljb24ge3sgaWNvbkNzcyB9fVwiXG4gICAgW3BvcG92ZXJdPVwiaGVscGVyID8gcG9wVGVtcGxhdGUgOiBjb21pbmdTb29uXCJcbiAgICBbcG9wb3ZlclRpdGxlXT1cImhlbHBlcj8ubGFiZWxcIlxuICAgIFtwbGFjZW1lbnRdPVwiZ2V0UGxhY2VtZW50KClcIlxuICAgIFtuZ0NsYXNzXT1cInsnb24tZGFyayc6IGRhcmsgfVwiXG4gICAgW2NvbnRhaW5lcl09XCJjb250YWluZXJcIlxuICAgIFtvdXRzaWRlQ2xpY2tdPVwidHJ1ZVwiXG4gICAgKGNsaWNrKT1cImNhbmNlbENsaWNrKCRldmVudClcIj5cbiAgICA8L2k+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGhlbHBlcjogSGVscGVyO1xuICBjb250YWluZXI6IHN0cmluZztcbiAgaWNvbkNzczogc3RyaW5nO1xuICBjb21pbmdTb29uID0gSGVscENvbnN0YW50cy5NRVNTQUdFX0NPTUlOR19TT09OO1xuXG4gIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7IC8vIGlmIGRlZmluZWQsIHRoZSBwbHVnaW4gaWRlbnRpZmllciB0byB1c2UgZm9yIGZldGNoaW5nIGhlbHAgY29udGVudFxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcbiAgQElucHV0KCkgc3ViS2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlbWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSBkYXJrOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleSAmJiB0aGlzLnN1YktleSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHNldCB0aW1lb3V0IGJlY2F1c2UgcG9wb3ZlciBjb250ZW50IGxvYWRpbmcgaXMgbm90IHRvcCBwcmlvcml0eS5cbiAgICAgICAgdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHRoaXMua2V5LCB0aGlzLnN1YktleSwgdGhpcy5wbHVnaW5JZClcbiAgICAgICAgICAudGhlbigoaGVscGVyOiBIZWxwZXIpID0+IHRoaXMuaGVscGVyID0gaGVscGVyLFxuICAgICAgICAgICAgKGVycikgPT4gY29uc29sZS53YXJuKCdDb250ZXh0dWFsIEhlbHAgbm90IGZvdW5kIDogJywgZXJyKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgdGhpcy5pY29uQ3NzID0gdGhpcy5oZWxwU2VydmljZS5nZXRJY29uKCk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRhaW5lcigpO1xuICB9XG5cbiAgZ29Ub0FydGljbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwUGF0aCgpO1xuICAgIGNvbnN0IHBsdWdpbklkID0gdGhpcy5wbHVnaW5JZCB8fCB0aGlzLmhlbHBTZXJ2aWNlLmdldFBsdWdpbklkKCk7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VQYXRofS9jb250ZXh0L2A7XG4gICAgaWYgKHBsdWdpbklkKSB7XG4gICAgICB1cmwgKz0gYCR7cGx1Z2luSWR9L2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIGNoZWNrIGlmIHBsdWdpbiBJZCB3YXMgY29ycmVjdGx5IHNldCBpbiB0aGUgZWRjLXBvcG92ZXItbmcgY29uZmlndXJhdGlvbiBoYW5kbGVyJyk7XG4gICAgfVxuICAgIHVybCArPSBgJHt0aGlzLmtleX0vJHt0aGlzLnN1YktleX0vZW4vJHtpbmRleH1gO1xuICAgIHRoaXMub3Blbih1cmwpO1xuICB9XG5cbiAgZ29Ub0xpbmsobGluazogTGluayk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwUGF0aCgpO1xuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VQYXRofS9kb2MvJHtsaW5rLmlkfWA7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnZXRQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBjYW5jZWxDbGljaygkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cub3Blbih1cmwsICdoZWxwJywgJ3Njcm9sbGJhcnM9MSxyZXNpemFibGU9MSxoZWlnaHQ9ODAwLHdpZHRoPTEyMDAnKTtcbiAgfVxufVxuIl19
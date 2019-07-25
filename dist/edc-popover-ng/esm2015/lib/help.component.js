import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { TranslateService } from '@ngx-translate/core';
import { isLanguageCodePresent } from './utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG } from './translate/language-codes';
let HelpComponent = class HelpComponent {
    constructor(helpService, translateService) {
        this.helpService = helpService;
        this.translateService = translateService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    ngOnInit() {
        if (this.key && this.subKey) {
            setTimeout(() => {
                this.helpService.getHelp(this.key, this.subKey, this.pluginId)
                    .then((helper) => this.helper = helper, (err) => console.warn('Contextual Help not found : ', err));
            }, 2000);
        }
        this.translateService.setDefaultLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    ngOnChanges(changes) {
        if (changes['lang'] && isLanguageCodePresent(changes['lang'].currentValue, LANGUAGE_CODES)) {
            this.translateService.use(this.lang);
            this.helpService.setCurrentLanguage(this.lang);
        }
    }
    goToArticle(index) {
        const articleUrl = this.helpService.getContextUrl(this.key, this.subKey, this.lang, index);
        this.open(articleUrl);
    }
    goToLink(link) {
        const url = this.helpService.getDocumentationUrl(link.id);
        this.open(url);
    }
    getPlacement() {
        return this.placement;
    }
    cancelClick($event) {
        $event.preventDefault();
    }
    open(url) {
        window.open(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "pluginId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "subKey", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HelpComponent.prototype, "placement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], HelpComponent.prototype, "dark", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HelpComponent.prototype, "lang", void 0);
HelpComponent = tslib_1.__decorate([
    Component({
        selector: 'edc-help',
        template: `
    <!-- Popover template -->
    <ng-template #popTemplate>
      <div class="edc-popover-container" (click)="$event.stopPropagation()">
        <article class="popover-article">{{ helper?.description }}</article>
        <div class="see-also">
          <div *ngIf="helper?.articles.length">
            <h6><strong><span>{{ 'labels.articles' | translate }}</span></strong></h6>
            <ul class="see-also-list">
              <li *ngFor="let article of helper.articles; let key = index" class="see-also-item"
                  (click)="goToArticle(key)">
                <div class="article-link">{{article.label}}</div>
              </li>
            </ul>
          </div>
          <div *ngIf="helper?.links.length">
            <h6><strong><span>{{ 'labels.links' | translate }}</span></strong></h6>
            <ul class="see-also-list">
              <li *ngFor="let link of helper.links" class="see-also-item" (click)="goToLink(link)">
                <div class="article-link">{{link.label}}</div>
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
        styles: [":host{cursor:pointer;line-height:34px;font-size:16px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow::before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow::before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow::before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow::before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc}.edc-popover-container{min-width:150px;line-height:20px;display:flex;flex-direction:column;flex-grow:1}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{cursor:pointer;color:#0275d8;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
    }),
    tslib_1.__metadata("design:paramtypes", [HelpService, TranslateService])
], HelpComponent);
export { HelpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi9oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTZDdEUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQWF4QixZQUE2QixXQUF3QixFQUFtQixnQkFBa0M7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVQxRyxlQUFVLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBS3RDLGNBQVMsR0FBRyxRQUFRLENBQUM7SUFJK0UsQ0FBQztJQUU5RyxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztxQkFDM0QsSUFBSSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFDNUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUU7WUFDMUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVU7UUFDakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQWE7UUFDdkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxJQUFJLENBQUMsR0FBVztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsZ0RBQWdELENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0YsQ0FBQTtBQWxEVTtJQUFSLEtBQUssRUFBRTs7K0NBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzswQ0FBYTtBQUNaO0lBQVIsS0FBSyxFQUFFOzs2Q0FBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7Z0RBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzsyQ0FBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzsyQ0FBYztBQVhYLGFBQWE7SUEzQ3pCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBRXBCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7O0tBQ0YsQ0FBQzs2Q0FjMEMsV0FBVyxFQUFxQyxnQkFBZ0I7R0FiL0YsYUFBYSxDQXdEekI7U0F4RFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgaXNMYW5ndWFnZUNvZGVQcmVzZW50IH0gZnJvbSAnLi91dGlscy90cmFuc2xhdGUudXRpbHMnO1xuaW1wb3J0IHsgTEFOR1VBR0VfQ09ERVMsIFNZU19MQU5HIH0gZnJvbSAnLi90cmFuc2xhdGUvbGFuZ3VhZ2UtY29kZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlZGMtaGVscCcsXG4gIHN0eWxlVXJsczogWyAnaGVscC5sZXNzJyBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gUG9wb3ZlciB0ZW1wbGF0ZSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImVkYy1wb3BvdmVyLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwb3BvdmVyLWFydGljbGVcIj57eyBoZWxwZXI/LmRlc2NyaXB0aW9uIH19PC9hcnRpY2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VlLWFsc29cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5hcnRpY2xlcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMuYXJ0aWNsZXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYXJ0aWNsZSBvZiBoZWxwZXIuYXJ0aWNsZXM7IGxldCBrZXkgPSBpbmRleFwiIGNsYXNzPVwic2VlLWFsc28taXRlbVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ29Ub0FydGljbGUoa2V5KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpbmtcIj57e2FydGljbGUubGFiZWx9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGVscGVyPy5saW5rcy5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxoNj48c3Ryb25nPjxzcGFuPnt7ICdsYWJlbHMubGlua3MnIHwgdHJhbnNsYXRlIH19PC9zcGFuPjwvc3Ryb25nPjwvaDY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzZWUtYWxzby1saXN0XCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGluayBvZiBoZWxwZXIubGlua3NcIiBjbGFzcz1cInNlZS1hbHNvLWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xpbmsobGluaylcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saW5rXCI+e3tsaW5rLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgPCEtLSBhcHAtaGVscCB0ZW1wbGF0ZSAtLT5cbiAgICA8aSBjbGFzcz1cImZhIGhlbHAtaWNvbiB7eyBpY29uQ3NzIH19XCJcbiAgICBbcG9wb3Zlcl09XCJoZWxwZXIgPyBwb3BUZW1wbGF0ZSA6IGNvbWluZ1Nvb25cIlxuICAgIFtwb3BvdmVyVGl0bGVdPVwiaGVscGVyPy5sYWJlbFwiXG4gICAgW3BsYWNlbWVudF09XCJnZXRQbGFjZW1lbnQoKVwiXG4gICAgW25nQ2xhc3NdPVwieydvbi1kYXJrJzogZGFyayB9XCJcbiAgICBbY29udGFpbmVyXT1cImNvbnRhaW5lclwiXG4gICAgW291dHNpZGVDbGlja109XCJ0cnVlXCJcbiAgICAoY2xpY2spPVwiY2FuY2VsQ2xpY2soJGV2ZW50KVwiPlxuICAgIDwvaT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBoZWxwZXI6IEhlbHBlcjtcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGljb25Dc3M6IHN0cmluZztcbiAgY29taW5nU29vbiA9IEhlbHBDb25zdGFudHMuTUVTU0FHRV9DT01JTkdfU09PTjtcblxuICBASW5wdXQoKSBwbHVnaW5JZDogc3RyaW5nOyAvLyBpZiBkZWZpbmVkLCB0aGUgcGx1Z2luIGlkZW50aWZpZXIgdG8gdXNlIGZvciBmZXRjaGluZyBoZWxwIGNvbnRlbnRcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN1YktleTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgQElucHV0KCkgZGFyazogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFuZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gc2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgdG9wIHByaW9yaXR5LlxuICAgICAgICB0aGlzLmhlbHBTZXJ2aWNlLmdldEhlbHAodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLnBsdWdpbklkKVxuICAgICAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4gdGhpcy5oZWxwZXIgPSBoZWxwZXIsXG4gICAgICAgICAgICAoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0NvbnRleHR1YWwgSGVscCBub3QgZm91bmQgOiAnLCBlcnIpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uuc2V0RGVmYXVsdExhbmcoU1lTX0xBTkcpO1xuICAgIHRoaXMuaWNvbkNzcyA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0SWNvbigpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250YWluZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snbGFuZyddICYmIGlzTGFuZ3VhZ2VDb2RlUHJlc2VudChjaGFuZ2VzWydsYW5nJ10uY3VycmVudFZhbHVlLCBMQU5HVUFHRV9DT0RFUykpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UodGhpcy5sYW5nKTtcbiAgICAgIHRoaXMuaGVscFNlcnZpY2Uuc2V0Q3VycmVudExhbmd1YWdlKHRoaXMubGFuZyk7XG4gICAgfVxuICB9XG5cbiAgZ29Ub0FydGljbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFydGljbGVVcmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRleHRVcmwodGhpcy5rZXksIHRoaXMuc3ViS2V5LCB0aGlzLmxhbmcsIGluZGV4KTtcbiAgICB0aGlzLm9wZW4oYXJ0aWNsZVVybCk7XG4gIH1cblxuICBnb1RvTGluayhsaW5rOiBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXREb2N1bWVudGF0aW9uVXJsKGxpbmsuaWQpO1xuICAgIHRoaXMub3Blbih1cmwpO1xuICB9XG5cbiAgZ2V0UGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VtZW50O1xuICB9XG5cbiAgY2FuY2VsQ2xpY2soJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgd2luZG93Lm9wZW4odXJsLCAnaGVscCcsICdzY3JvbGxiYXJzPTEscmVzaXphYmxlPTEsaGVpZ2h0PTgwMCx3aWR0aD0xMjAwJyk7XG4gIH1cbn1cbiJdfQ==
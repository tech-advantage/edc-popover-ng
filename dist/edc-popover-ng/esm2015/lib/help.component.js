import { Component, Input } from '@angular/core';
import { HelpService } from './help.service';
import { HelpConstants } from './help.constants';
import { SYS_LANG } from './translate/language-codes';
import { EdcTranslationService } from './translate/edc-translation.service';
export class HelpComponent {
    constructor(helpService, translationService) {
        this.helpService = helpService;
        this.translationService = translationService;
        this.comingSoon = HelpConstants.MESSAGE_COMING_SOON;
        this.placement = 'bottom';
    }
    ngOnInit() {
        // If a lang input was provided, helper is already being loaded from ngOnChanges
        if (this.langLoading === undefined) {
            // No helper loading in progress from ngOnChanges, so initialize helper
            this.initHelper();
        }
        this.translationService.setLang(SYS_LANG);
        this.iconCss = this.helpService.getIcon();
        this.container = this.helpService.getContainer();
    }
    ngOnChanges(changes) {
        if (changes['lang'] && changes['lang'].currentValue !== this.langLoading) {
            this.initHelper();
        }
    }
    initHelper() {
        if (this.key && this.subKey) {
            this.langLoading = this.lang || null;
            if (this.helper) {
                // This is not the first initialization, just an update, skip timeout
                this.loadHelper();
            }
            else {
                // Set timeout because popover content loading is not a bootstrap top priority.
                setTimeout(this.loadHelper.bind(this), 2000);
            }
        }
    }
    loadHelper() {
        this.helpService.getHelp(this.key, this.subKey, this.pluginId, this.lang)
            .then((helper) => {
            if (!helper) {
                throw new Error(`Could not load Helper for the key ${this.key} and subKey ${this.subKey}`);
            }
            this.helper = helper;
            const { language: resolvedLanguage } = helper;
            if (resolvedLanguage !== this.lang) {
                console.warn(`Requested language ${this.lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
                this.lang = resolvedLanguage;
            }
            // Set translation language for the labels
            this.translationService.setLang(this.lang);
            this.langLoading = null;
        })
            .catch((err) => {
            console.error(err);
            this.langLoading = null;
        });
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
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'edc-help',
                template: `<i class="fa help-icon {{ iconCss }}"></i>`,
                styles: [":host{cursor:pointer;font-size:16px;line-height:34px;padding-right:5px}:host .help-icon{color:#d3d3d3}:host .help-icon:hover{color:#3c8dbc}:host .help-icon.on-dark{color:rgba(0,0,0,.3)}:host .help-icon.on-dark:hover{color:#fff}/deep/ popover-container.popover{border-color:#3c8dbc}/deep/ popover-container.popover.top>div.arrow:before{border-top-color:#3c8dbc}/deep/ popover-container.popover.bottom>div.arrow:before{border-bottom-color:#3c8dbc}/deep/ popover-container.popover.left>div.arrow:before{border-left-color:#3c8dbc}/deep/ popover-container.popover.right>div.arrow:before{border-right-color:#3c8dbc}/deep/ popover-container.popover .popover-title{border-bottom-color:#3c8dbc;font-weight:700}.edc-popover-container{display:flex;flex-direction:column;flex-grow:1;line-height:20px;min-width:150px}.edc-popover-container .popover-article{font-size:14px;padding-bottom:10px}.edc-popover-container .see-also-item{font-size:15px}.edc-popover-container .see-also-item .article-link{color:#0275d8;cursor:pointer;text-decoration:underline}.edc-popover-container ul{list-style-type:disc}"]
            },] }
];
HelpComponent.ctorParameters = () => [
    { type: HelpService },
    { type: EdcTranslationService }
];
HelpComponent.propDecorators = {
    pluginId: [{ type: Input }],
    key: [{ type: Input }],
    subKey: [{ type: Input }],
    placement: [{ type: Input }],
    dark: [{ type: Input }],
    lang: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU81RSxNQUFNLE9BQU8sYUFBYTtJQWN4QixZQUE2QixXQUF3QixFQUFtQixrQkFBeUM7UUFBcEYsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBbUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQVZqSCxlQUFVLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBTXRDLGNBQVMsR0FBRyxRQUFRLENBQUM7SUFLOUIsQ0FBQztJQUVELFFBQVE7UUFDTixnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNsQyx1RUFBdUU7WUFDdkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFP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Ozs7WUFqR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUVwQixRQUFRLEVBQUUsNENBQTRDOzthQUN2RDs7O1lBVFEsV0FBVztZQUdYLHFCQUFxQjs7O3VCQWMzQixLQUFLO2tCQUNMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxwZXIsIExpbmsgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscENvbnN0YW50cyB9IGZyb20gJy4vaGVscC5jb25zdGFudHMnO1xuaW1wb3J0IHsgU1lTX0xBTkcgfSBmcm9tICcuL3RyYW5zbGF0ZS9sYW5ndWFnZS1jb2Rlcyc7XG5pbXBvcnQgeyBFZGNUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL3RyYW5zbGF0ZS9lZGMtdHJhbnNsYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkYy1oZWxwJyxcbiAgc3R5bGVVcmxzOiBbJ2hlbHAubGVzcyddLFxuICB0ZW1wbGF0ZTogYDxpIGNsYXNzPVwiZmEgaGVscC1pY29uIHt7IGljb25Dc3MgfX1cIj48L2k+YFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBoZWxwZXI6IEhlbHBlcjtcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGljb25Dc3M6IHN0cmluZztcbiAgY29taW5nU29vbiA9IEhlbHBDb25zdGFudHMuTUVTU0FHRV9DT01JTkdfU09PTjtcbiAgbGFuZ0xvYWRpbmc6IHN0cmluZzsgLy8gVGhlIGxhbmcgaW4gdXNlIHRvIGxvYWQgdGhlIGhlbHBlciAtIGZvciByYWNlIGNvbmRpdGlvbnNcblxuICBASW5wdXQoKSBwbHVnaW5JZDogc3RyaW5nOyAvLyBpZiBkZWZpbmVkLCB0aGUgcGx1Z2luIGlkZW50aWZpZXIgdG8gdXNlIGZvciBmZXRjaGluZyBoZWxwIGNvbnRlbnRcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN1YktleTogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgQElucHV0KCkgZGFyazogYm9vbGVhbjtcbiAgQElucHV0KCkgbGFuZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaGVscFNlcnZpY2U6IEhlbHBTZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0aW9uU2VydmljZTogRWRjVHJhbnNsYXRpb25TZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBJZiBhIGxhbmcgaW5wdXQgd2FzIHByb3ZpZGVkLCBoZWxwZXIgaXMgYWxyZWFkeSBiZWluZyBsb2FkZWQgZnJvbSBuZ09uQ2hhbmdlc1xuICAgIGlmICh0aGlzLmxhbmdMb2FkaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIE5vIGhlbHBlciBsb2FkaW5nIGluIHByb2dyZXNzIGZyb20gbmdPbkNoYW5nZXMsIHNvIGluaXRpYWxpemUgaGVscGVyXG4gICAgICB0aGlzLmluaXRIZWxwZXIoKTtcbiAgICB9XG4gICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2Uuc2V0TGFuZyhTWVNfTEFORyk7XG4gICAgdGhpcy5pY29uQ3NzID0gdGhpcy5oZWxwU2VydmljZS5nZXRJY29uKCk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldENvbnRhaW5lcigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydsYW5nJ10gJiYgY2hhbmdlc1snbGFuZyddLmN1cnJlbnRWYWx1ZSAhPT0gdGhpcy5sYW5nTG9hZGluZykge1xuICAgICAgdGhpcy5pbml0SGVscGVyKCk7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGluaXRIZWxwZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5ICYmIHRoaXMuc3ViS2V5KSB7XG4gICAgICB0aGlzLmxhbmdMb2FkaW5nID0gdGhpcy5sYW5nIHx8IG51bGw7XG4gICAgICBpZiAodGhpcy5oZWxwZXIpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBub3QgdGhlIGZpcnN0IGluaXRpYWxpemF0aW9uLCBqdXN0IGFuIHVwZGF0ZSwgc2tpcCB0aW1lb3V0XG4gICAgICAgIHRoaXMubG9hZEhlbHBlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IHRpbWVvdXQgYmVjYXVzZSBwb3BvdmVyIGNvbnRlbnQgbG9hZGluZyBpcyBub3QgYSBib290c3RyYXAgdG9wIHByaW9yaXR5LlxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMubG9hZEhlbHBlci5iaW5kKHRoaXMpLCAyMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2FkSGVscGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaGVscFNlcnZpY2UuZ2V0SGVscCh0aGlzLmtleSwgdGhpcy5zdWJLZXksIHRoaXMucGx1Z2luSWQsIHRoaXMubGFuZylcbiAgICAgIC50aGVuKChoZWxwZXI6IEhlbHBlcikgPT4ge1xuICAgICAgICBpZiAoIWhlbHBlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGxvYWQgSGVscGVyIGZvciB0aGUga2V5ICR7dGhpcy5rZXl9IGFuZCBzdWJLZXkgJHt0aGlzLnN1YktleX1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlbHBlciA9IGhlbHBlcjtcbiAgICAgICAgY29uc3QgeyBsYW5ndWFnZTogcmVzb2x2ZWRMYW5ndWFnZSB9ID0gaGVscGVyO1xuICAgICAgICBpZiAocmVzb2x2ZWRMYW5ndWFnZSAhPT0gdGhpcy5sYW5nKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBSZXF1ZXN0ZWQgbGFuZ3VhZ2UgJHt0aGlzLmxhbmd9IGNvdWxkIG5vdCBiZSBsb2FkZWQsXG4gICAgICAgICAgIGNvbnRlbnQgd2lsbCBiZSB1c2luZyBkZWZhdWx0IGxhbmd1YWdlICR7aGVscGVyLmxhbmd1YWdlfSBpbnN0ZWFkYCk7XG4gICAgICAgICAgdGhpcy5sYW5nID0gcmVzb2x2ZWRMYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdHJhbnNsYXRpb24gbGFuZ3VhZ2UgZm9yIHRoZSBsYWJlbHNcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2Uuc2V0TGFuZyh0aGlzLmxhbmcpO1xuXG4gICAgICAgIHRoaXMubGFuZ0xvYWRpbmcgPSBudWxsO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMubGFuZ0xvYWRpbmcgPSBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICBnb1RvQXJ0aWNsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYXJ0aWNsZVVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGV4dFVybCh0aGlzLmtleSwgdGhpcy5zdWJLZXksIHRoaXMubGFuZywgaW5kZXgpO1xuICAgIHRoaXMub3BlbihhcnRpY2xlVXJsKTtcbiAgfVxuXG4gIGdvVG9MaW5rKGxpbms6IExpbmspOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmhlbHBTZXJ2aWNlLmdldERvY3VtZW50YXRpb25VcmwobGluay5pZCk7XG4gICAgdGhpcy5vcGVuKHVybCk7XG4gIH1cblxuICBnZXRQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gIH1cblxuICBjYW5jZWxDbGljaygkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW4odXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cub3Blbih1cmwsICdoZWxwJywgJ3Njcm9sbGJhcnM9MSxyZXNpemFibGU9MSxoZWlnaHQ9ODAwLHdpZHRoPTEyMDAnKTtcbiAgfVxufVxuIl19
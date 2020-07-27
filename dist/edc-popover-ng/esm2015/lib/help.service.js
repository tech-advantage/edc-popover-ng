import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
import { SYS_LANG } from './translate/language-codes';
export class HelpService {
    constructor(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), configurationHandler.getHelpPath(), configurationHandler.getPluginId(), true, // Context only, don't load the whole doc
        configurationHandler.getI18nPath());
    }
    getHelp(primaryKey, subKey, pluginId, lang) {
        const pluginIdentifier = pluginId || this.configurationHandler.getPluginId();
        return this.edcClient.getHelper(primaryKey, subKey, pluginIdentifier, lang);
    }
    getContextUrl(mainKey, subKey, languageCode, articleIndex, pluginId) {
        return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
    }
    getDocumentationUrl(docId) {
        return this.edcClient.getDocumentationWebHelpUrl(docId);
    }
    getI18nUrl() {
        return this.edcClient.getPopoverI18nUrl();
    }
    getPluginId() {
        return this.configurationHandler.getPluginId();
    }
    getIcon() {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    }
    getContainer() {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    }
    getDefaultLanguage() {
        return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
    }
    isLanguagePresent(langCode) {
        return this.edcClient.isLanguagePresent(langCode);
    }
}
HelpService.decorators = [
    { type: Injectable }
];
HelpService.ctorParameters = () => [
    { type: PopoverConfigurationHandler }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZWRjLXBvcG92ZXItbmcvc3JjL2xpYi9oZWxwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd0RCxNQUFNLE9BQU8sV0FBVztJQUl0QixZQUFvQixvQkFBaUQ7UUFBakQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUNuRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxFQUM5RCxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsRUFDbEMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEVBQ2xDLElBQUksRUFBRSx5Q0FBeUM7UUFDL0Msb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQWtCLEVBQUUsTUFBYyxFQUFFLFFBQWlCLEVBQUUsSUFBYTtRQUMxRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxZQUFvQixFQUFFLFlBQW9CLEVBQUUsUUFBaUI7UUFDMUcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYTtRQUMvQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLElBQUksc0JBQXNCLENBQUM7SUFDdkUsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUNsSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBZ0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7OztZQWpERixVQUFVOzs7WUFIRiwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGNDbGllbnQsIEhlbHBlciB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9jb25maWcvcG9wb3Zlci1jb25maWd1cmF0aW9uLWhhbmRsZXInO1xuaW1wb3J0IHsgU1lTX0xBTkcgfSBmcm9tICcuL3RyYW5zbGF0ZS9sYW5ndWFnZS1jb2Rlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlZGNDbGllbnQ6IEVkY0NsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25IYW5kbGVyOiBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmVkY0NsaWVudCA9IG5ldyBFZGNDbGllbnQoY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0RG9jUGF0aCgpLFxuICAgICAgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SGVscFBhdGgoKSxcbiAgICAgIGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCksXG4gICAgICB0cnVlLCAvLyBDb250ZXh0IG9ubHksIGRvbid0IGxvYWQgdGhlIHdob2xlIGRvY1xuICAgICAgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0STE4blBhdGgoKVxuICAgICk7XG4gIH1cblxuICBnZXRIZWxwKHByaW1hcnlLZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIHBsdWdpbklkPzogc3RyaW5nLCBsYW5nPzogc3RyaW5nKTogUHJvbWlzZTxIZWxwZXI+IHtcbiAgICBjb25zdCBwbHVnaW5JZGVudGlmaWVyID0gcGx1Z2luSWQgfHwgdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpO1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXRIZWxwZXIocHJpbWFyeUtleSwgc3ViS2V5LCBwbHVnaW5JZGVudGlmaWVyLCBsYW5nKTtcbiAgfVxuXG4gIGdldENvbnRleHRVcmwobWFpbktleTogc3RyaW5nLCBzdWJLZXk6IHN0cmluZywgbGFuZ3VhZ2VDb2RlOiBzdHJpbmcsIGFydGljbGVJbmRleDogbnVtYmVyLCBwbHVnaW5JZD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldENvbnRleHRXZWJIZWxwVXJsKG1haW5LZXksIHN1YktleSwgbGFuZ3VhZ2VDb2RlLCBhcnRpY2xlSW5kZXgsIHBsdWdpbklkKTtcbiAgfVxuXG4gIGdldERvY3VtZW50YXRpb25VcmwoZG9jSWQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldERvY3VtZW50YXRpb25XZWJIZWxwVXJsKGRvY0lkKTtcbiAgfVxuXG4gIGdldEkxOG5VcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0UG9wb3ZlckkxOG5VcmwoKTtcbiAgfVxuXG4gIGdldFBsdWdpbklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKTtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRJY29uKCkgfHwgJ2ZhLXF1ZXN0aW9uLWNpcmNsZS1vJztcbiAgfVxuXG4gIGdldENvbnRhaW5lcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmlzQXBwZW5kVG9Cb2R5KCkgPyAnYm9keScgOiAnJztcbiAgfVxuXG4gIGdldERlZmF1bHRMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5lZGNDbGllbnQgJiYgdGhpcy5lZGNDbGllbnQuZ2V0RGVmYXVsdExhbmd1YWdlICYmIHRoaXMuZWRjQ2xpZW50LmdldERlZmF1bHRMYW5ndWFnZSgpKSB8fCBTWVNfTEFORztcbiAgfVxuXG4gIGlzTGFuZ3VhZ2VQcmVzZW50KGxhbmdDb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuaXNMYW5ndWFnZVByZXNlbnQobGFuZ0NvZGUpO1xuICB9XG59XG4iXX0=
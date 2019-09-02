import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
import { SYS_LANG } from './translate/language-codes';
let HelpService = class HelpService {
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
    setCurrentLanguage(languageCode) {
        return this.edcClient.changeCurrentLanguage(languageCode);
    }
    isLanguagePresent(langCode) {
        return this.edcClient.isLanguagePresent(langCode);
    }
};
HelpService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [PopoverConfigurationHandler])
], HelpService);
export { HelpService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWRjLXBvcG92ZXItbmcvIiwic291cmNlcyI6WyJsaWIvaGVscC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3RELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFJdEIsWUFBb0Isb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsRUFDOUQsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEVBQ2xDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLEVBQUUseUNBQXlDO1FBQy9DLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFrQixFQUFFLE1BQWMsRUFBRSxRQUFpQixFQUFFLElBQWE7UUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsWUFBb0IsRUFBRSxZQUFvQixFQUFFLFFBQWlCO1FBQzFHLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLHNCQUFzQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDbEgsQ0FBQztJQUVELGtCQUFrQixDQUFDLFlBQW9CO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBZ0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBO0FBckRZLFdBQVc7SUFEdkIsVUFBVSxFQUFFOzZDQUsrQiwyQkFBMkI7R0FKMUQsV0FBVyxDQXFEdkI7U0FyRFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVkY0NsaWVudCB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9jb25maWcvcG9wb3Zlci1jb25maWd1cmF0aW9uLWhhbmRsZXInO1xuaW1wb3J0IHsgU1lTX0xBTkcgfSBmcm9tICcuL3RyYW5zbGF0ZS9sYW5ndWFnZS1jb2Rlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlZGNDbGllbnQ6IEVkY0NsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25IYW5kbGVyOiBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmVkY0NsaWVudCA9IG5ldyBFZGNDbGllbnQoY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0RG9jUGF0aCgpLFxuICAgICAgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SGVscFBhdGgoKSxcbiAgICAgIGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCksXG4gICAgICB0cnVlLCAvLyBDb250ZXh0IG9ubHksIGRvbid0IGxvYWQgdGhlIHdob2xlIGRvY1xuICAgICAgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0STE4blBhdGgoKVxuICAgICk7XG4gIH1cblxuICBnZXRIZWxwKHByaW1hcnlLZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIHBsdWdpbklkPzogc3RyaW5nLCBsYW5nPzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwbHVnaW5JZGVudGlmaWVyID0gcGx1Z2luSWQgfHwgdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpO1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXRIZWxwZXIocHJpbWFyeUtleSwgc3ViS2V5LCBwbHVnaW5JZGVudGlmaWVyLCBsYW5nKTtcbiAgfVxuXG4gIGdldENvbnRleHRVcmwobWFpbktleTogc3RyaW5nLCBzdWJLZXk6IHN0cmluZywgbGFuZ3VhZ2VDb2RlOiBzdHJpbmcsIGFydGljbGVJbmRleDogbnVtYmVyLCBwbHVnaW5JZD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldENvbnRleHRXZWJIZWxwVXJsKG1haW5LZXksIHN1YktleSwgbGFuZ3VhZ2VDb2RlLCBhcnRpY2xlSW5kZXgsIHBsdWdpbklkKTtcbiAgfVxuXG4gIGdldERvY3VtZW50YXRpb25VcmwoZG9jSWQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldERvY3VtZW50YXRpb25XZWJIZWxwVXJsKGRvY0lkKTtcbiAgfVxuXG4gIGdldEkxOG5VcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0UG9wb3ZlckkxOG5VcmwoKTtcbiAgfVxuXG4gIGdldFBsdWdpbklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKTtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRJY29uKCkgfHwgJ2ZhLXF1ZXN0aW9uLWNpcmNsZS1vJztcbiAgfVxuXG4gIGdldENvbnRhaW5lcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmlzQXBwZW5kVG9Cb2R5KCkgPyAnYm9keScgOiAnJztcbiAgfVxuXG4gIGdldERlZmF1bHRMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5lZGNDbGllbnQgJiYgdGhpcy5lZGNDbGllbnQuZ2V0RGVmYXVsdExhbmd1YWdlICYmIHRoaXMuZWRjQ2xpZW50LmdldERlZmF1bHRMYW5ndWFnZSgpKSB8fCBTWVNfTEFORztcbiAgfVxuXG4gIHNldEN1cnJlbnRMYW5ndWFnZShsYW5ndWFnZUNvZGU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmNoYW5nZUN1cnJlbnRMYW5ndWFnZShsYW5ndWFnZUNvZGUpO1xuICB9XG5cbiAgaXNMYW5ndWFnZVByZXNlbnQobGFuZ0NvZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5pc0xhbmd1YWdlUHJlc2VudChsYW5nQ29kZSk7XG4gIH1cbn1cbiJdfQ==
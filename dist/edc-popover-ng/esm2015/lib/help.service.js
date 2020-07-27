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
    getPopoverTranslation(langCode) {
        return this.edcClient.getPopoverLabels(langCode);
    }
}
HelpService.decorators = [
    { type: Injectable }
];
HelpService.ctorParameters = () => [
    { type: PopoverConfigurationHandler }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZWRjLXBvcG92ZXItbmcvc3JjL2xpYi9oZWxwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdEQsTUFBTSxPQUFPLFdBQVc7SUFJdEIsWUFBb0Isb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsRUFDOUQsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEVBQ2xDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUNsQyxJQUFJLEVBQUUseUNBQXlDO1FBQy9DLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFrQixFQUFFLE1BQWMsRUFBRSxRQUFpQixFQUFFLElBQWE7UUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsWUFBb0IsRUFBRSxZQUFvQixFQUFFLFFBQWlCO1FBQzFHLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLHNCQUFzQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDbEgsQ0FBQztJQUVELGlCQUFpQixDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUJBQXFCLENBQUMsUUFBZ0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7OztZQXJERixVQUFVOzs7WUFIRiwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGNDbGllbnQsIEhlbHBlciwgUG9wb3ZlckxhYmVsIH0gZnJvbSAnZWRjLWNsaWVudC1qcyc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIgfSBmcm9tICcuL2NvbmZpZy9wb3BvdmVyLWNvbmZpZ3VyYXRpb24taGFuZGxlcic7XG5pbXBvcnQgeyBTWVNfTEFORyB9IGZyb20gJy4vdHJhbnNsYXRlL2xhbmd1YWdlLWNvZGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlbHBTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVkY0NsaWVudDogRWRjQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhdGlvbkhhbmRsZXI6IFBvcG92ZXJDb25maWd1cmF0aW9uSGFuZGxlcikge1xuICAgIHRoaXMuZWRjQ2xpZW50ID0gbmV3IEVkY0NsaWVudChjb25maWd1cmF0aW9uSGFuZGxlci5nZXREb2NQYXRoKCksXG4gICAgICBjb25maWd1cmF0aW9uSGFuZGxlci5nZXRIZWxwUGF0aCgpLFxuICAgICAgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKSxcbiAgICAgIHRydWUsIC8vIENvbnRleHQgb25seSwgZG9uJ3QgbG9hZCB0aGUgd2hvbGUgZG9jXG4gICAgICBjb25maWd1cmF0aW9uSGFuZGxlci5nZXRJMThuUGF0aCgpXG4gICAgKTtcbiAgfVxuXG4gIGdldEhlbHAocHJpbWFyeUtleTogc3RyaW5nLCBzdWJLZXk6IHN0cmluZywgcGx1Z2luSWQ/OiBzdHJpbmcsIGxhbmc/OiBzdHJpbmcpOiBQcm9taXNlPEhlbHBlcj4ge1xuICAgIGNvbnN0IHBsdWdpbklkZW50aWZpZXIgPSBwbHVnaW5JZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCk7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldEhlbHBlcihwcmltYXJ5S2V5LCBzdWJLZXksIHBsdWdpbklkZW50aWZpZXIsIGxhbmcpO1xuICB9XG5cbiAgZ2V0Q29udGV4dFVybChtYWluS2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBsYW5ndWFnZUNvZGU6IHN0cmluZywgYXJ0aWNsZUluZGV4OiBudW1iZXIsIHBsdWdpbklkPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0Q29udGV4dFdlYkhlbHBVcmwobWFpbktleSwgc3ViS2V5LCBsYW5ndWFnZUNvZGUsIGFydGljbGVJbmRleCwgcGx1Z2luSWQpO1xuICB9XG5cbiAgZ2V0RG9jdW1lbnRhdGlvblVybChkb2NJZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0RG9jdW1lbnRhdGlvbldlYkhlbHBVcmwoZG9jSWQpO1xuICB9XG5cbiAgZ2V0STE4blVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXRQb3BvdmVySTE4blVybCgpO1xuICB9XG5cbiAgZ2V0UGx1Z2luSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpO1xuICB9XG5cbiAgZ2V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldEljb24oKSB8fCAnZmEtcXVlc3Rpb24tY2lyY2xlLW8nO1xuICB9XG5cbiAgZ2V0Q29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuaXNBcHBlbmRUb0JvZHkoKSA/ICdib2R5JyA6ICcnO1xuICB9XG5cbiAgZ2V0RGVmYXVsdExhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmVkY0NsaWVudCAmJiB0aGlzLmVkY0NsaWVudC5nZXREZWZhdWx0TGFuZ3VhZ2UgJiYgdGhpcy5lZGNDbGllbnQuZ2V0RGVmYXVsdExhbmd1YWdlKCkpIHx8IFNZU19MQU5HO1xuICB9XG5cbiAgaXNMYW5ndWFnZVByZXNlbnQobGFuZ0NvZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5pc0xhbmd1YWdlUHJlc2VudChsYW5nQ29kZSk7XG4gIH1cblxuICBnZXRQb3BvdmVyVHJhbnNsYXRpb24obGFuZ0NvZGU6IHN0cmluZyk6IFByb21pc2U8UG9wb3ZlckxhYmVsPiB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldFBvcG92ZXJMYWJlbHMobGFuZ0NvZGUpO1xuICB9XG59XG4iXX0=
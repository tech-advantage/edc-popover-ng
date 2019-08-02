import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
import { SYS_LANG } from './translate/language-codes';
var HelpService = /** @class */ (function () {
    function HelpService(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), configurationHandler.getHelpPath(), configurationHandler.getPluginId(), true, // Context only, don't load the whole doc
        configurationHandler.getI18nPath());
    }
    HelpService.prototype.getHelp = function (primaryKey, subKey, pluginId, lang) {
        return this.edcClient.getHelper(primaryKey, subKey, pluginId || this.configurationHandler.getPluginId(), lang);
    };
    HelpService.prototype.getContextUrl = function (mainKey, subKey, languageCode, articleIndex, pluginId) {
        return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
    };
    HelpService.prototype.getDocumentationUrl = function (docId) {
        return this.edcClient.getDocumentationWebHelpUrl(docId);
    };
    HelpService.prototype.getI18nUrl = function () {
        return this.edcClient.getI18nUrl();
    };
    HelpService.prototype.getPluginId = function () {
        return this.configurationHandler.getPluginId();
    };
    HelpService.prototype.getIcon = function () {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    };
    HelpService.prototype.getContainer = function () {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    };
    HelpService.prototype.getDefaultLanguage = function () {
        return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
    };
    HelpService.prototype.setCurrentLanguage = function (languageCode) {
        return this.edcClient.setCurrentLanguage(languageCode);
    };
    HelpService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [PopoverConfigurationHandler])
    ], HelpService);
    return HelpService;
}());
export { HelpService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWRjLXBvcG92ZXItbmcvIiwic291cmNlcyI6WyJsaWIvaGVscC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3REO0lBSUUscUJBQW9CLG9CQUFpRDtRQUFqRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEVBQzlELG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUNsQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsRUFDbEMsSUFBSSxFQUFFLHlDQUF5QztRQUMvQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsVUFBa0IsRUFBRSxNQUFjLEVBQUUsUUFBaUIsRUFBRSxJQUFhO1FBQzFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsT0FBZSxFQUFFLE1BQWMsRUFBRSxZQUFvQixFQUFFLFlBQW9CLEVBQUUsUUFBaUI7UUFDMUcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQseUNBQW1CLEdBQW5CLFVBQW9CLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxnQ0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxzQkFBc0IsQ0FBQztJQUN2RSxDQUFDO0lBRUQsa0NBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQsd0NBQWtCLEdBQWxCO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDbEgsQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixZQUFvQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQS9DVSxXQUFXO1FBRHZCLFVBQVUsRUFBRTtpREFLK0IsMkJBQTJCO09BSjFELFdBQVcsQ0FnRHZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQWhEWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWRjQ2xpZW50LCBIZWxwZXIgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IFBvcG92ZXJDb25maWd1cmF0aW9uSGFuZGxlciB9IGZyb20gJy4vY29uZmlnL3BvcG92ZXItY29uZmlndXJhdGlvbi1oYW5kbGVyJztcbmltcG9ydCB7IFNZU19MQU5HIH0gZnJvbSAnLi90cmFuc2xhdGUvbGFuZ3VhZ2UtY29kZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVscFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWRjQ2xpZW50OiBFZGNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uSGFuZGxlcjogUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyKSB7XG4gICAgdGhpcy5lZGNDbGllbnQgPSBuZXcgRWRjQ2xpZW50KGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldERvY1BhdGgoKSxcbiAgICAgIGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldEhlbHBQYXRoKCksXG4gICAgICBjb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpLFxuICAgICAgdHJ1ZSwgLy8gQ29udGV4dCBvbmx5LCBkb24ndCBsb2FkIHRoZSB3aG9sZSBkb2NcbiAgICAgIGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldEkxOG5QYXRoKClcbiAgICApO1xuICB9XG5cbiAgZ2V0SGVscChwcmltYXJ5S2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBwbHVnaW5JZD86IHN0cmluZywgbGFuZz86IHN0cmluZyk6IFByb21pc2U8SGVscGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldEhlbHBlcihwcmltYXJ5S2V5LCBzdWJLZXksIHBsdWdpbklkIHx8IHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKSwgbGFuZyk7XG4gIH1cblxuICBnZXRDb250ZXh0VXJsKG1haW5LZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIGxhbmd1YWdlQ29kZTogc3RyaW5nLCBhcnRpY2xlSW5kZXg6IG51bWJlciwgcGx1Z2luSWQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXRDb250ZXh0V2ViSGVscFVybChtYWluS2V5LCBzdWJLZXksIGxhbmd1YWdlQ29kZSwgYXJ0aWNsZUluZGV4LCBwbHVnaW5JZCk7XG4gIH1cblxuICBnZXREb2N1bWVudGF0aW9uVXJsKGRvY0lkOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkY0NsaWVudC5nZXREb2N1bWVudGF0aW9uV2ViSGVscFVybChkb2NJZCk7XG4gIH1cblxuICBnZXRJMThuVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldEkxOG5VcmwoKTtcbiAgfVxuXG4gIGdldFBsdWdpbklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKTtcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRJY29uKCkgfHwgJ2ZhLXF1ZXN0aW9uLWNpcmNsZS1vJztcbiAgfVxuXG4gIGdldENvbnRhaW5lcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmlzQXBwZW5kVG9Cb2R5KCkgPyAnYm9keScgOiAnJztcbiAgfVxuXG4gIGdldERlZmF1bHRMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5lZGNDbGllbnQgJiYgdGhpcy5lZGNDbGllbnQuZ2V0RGVmYXVsdExhbmd1YWdlICYmIHRoaXMuZWRjQ2xpZW50LmdldERlZmF1bHRMYW5ndWFnZSgpKSB8fCBTWVNfTEFORztcbiAgfVxuXG4gIHNldEN1cnJlbnRMYW5ndWFnZShsYW5ndWFnZUNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LnNldEN1cnJlbnRMYW5ndWFnZShsYW5ndWFnZUNvZGUpO1xuICB9XG59XG4iXX0=
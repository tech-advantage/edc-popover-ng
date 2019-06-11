/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
var HelpService = /** @class */ (function () {
    function HelpService(configurationHandler) {
        this.configurationHandler = configurationHandler;
        this.helpPath = configurationHandler.getHelpPath();
        // Edc-popover only uses contextual help, instantiate client with contextualOnly parameter set to true
        this.edcClient = new EdcClient(configurationHandler.getDocPath(), '', configurationHandler.getPluginId(), true);
    }
    /**
     * @param {?} primaryKey
     * @param {?} subKey
     * @param {?=} pluginId
     * @return {?}
     */
    HelpService.prototype.getHelp = /**
     * @param {?} primaryKey
     * @param {?} subKey
     * @param {?=} pluginId
     * @return {?}
     */
    function (primaryKey, subKey, pluginId) {
        return this.edcClient.getHelper(primaryKey, subKey, pluginId || this.configurationHandler.getPluginId());
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getHelpPath = /**
     * @return {?}
     */
    function () {
        return this.helpPath;
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getPluginId = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.getPluginId();
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getIcon = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    };
    /**
     * @return {?}
     */
    HelpService.prototype.getContainer = /**
     * @return {?}
     */
    function () {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    };
    HelpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HelpService.ctorParameters = function () { return [
        { type: PopoverConfigurationHandler }
    ]; };
    return HelpService;
}());
export { HelpService };
if (false) {
    /** @type {?} */
    HelpService.prototype.edcClient;
    /** @type {?} */
    HelpService.prototype.helpPath;
    /** @type {?} */
    HelpService.prototype.configurationHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWRjLXBvcG92ZXItbmcvIiwic291cmNlcyI6WyJsaWIvaGVscC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0lBUW5GLHFCQUFvQixvQkFBaUQ7UUFBakQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUNuRSxJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUVuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqSDs7Ozs7OztJQUVELDZCQUFPOzs7Ozs7SUFBUCxVQUFRLFVBQWtCLEVBQUUsTUFBYyxFQUFFLFFBQWlCO1FBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDMUc7Ozs7SUFFRCxpQ0FBVzs7O0lBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7SUFFRCxpQ0FBVzs7O0lBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNoRDs7OztJQUVELDZCQUFPOzs7SUFBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLHNCQUFzQixDQUFDO0tBQ3RFOzs7O0lBRUQsa0NBQVk7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2pFOztnQkE5QkYsVUFBVTs7OztnQkFGRiwyQkFBMkI7O3NCQUZwQzs7U0FLYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWRjQ2xpZW50LCBIZWxwZXIgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IFBvcG92ZXJDb25maWd1cmF0aW9uSGFuZGxlciB9IGZyb20gJy4vY29uZmlnL3BvcG92ZXItY29uZmlndXJhdGlvbi1oYW5kbGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlbHBTZXJ2aWNlIHtcblxuICBwcml2YXRlIGVkY0NsaWVudDogRWRjQ2xpZW50O1xuICBwcml2YXRlIGhlbHBQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmF0aW9uSGFuZGxlcjogUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyKSB7XG4gICAgdGhpcy5oZWxwUGF0aCA9IGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldEhlbHBQYXRoKCk7XG4gICAgLy8gRWRjLXBvcG92ZXIgb25seSB1c2VzIGNvbnRleHR1YWwgaGVscCwgaW5zdGFudGlhdGUgY2xpZW50IHdpdGggY29udGV4dHVhbE9ubHkgcGFyYW1ldGVyIHNldCB0byB0cnVlXG4gICAgdGhpcy5lZGNDbGllbnQgPSBuZXcgRWRjQ2xpZW50KGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldERvY1BhdGgoKSwgJycsIGNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCksIHRydWUpO1xuICB9XG5cbiAgZ2V0SGVscChwcmltYXJ5S2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBwbHVnaW5JZD86IHN0cmluZyk6IFByb21pc2U8SGVscGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZWRjQ2xpZW50LmdldEhlbHBlcihwcmltYXJ5S2V5LCBzdWJLZXksIHBsdWdpbklkIHx8IHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKSk7XG4gIH1cblxuICBnZXRIZWxwUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmhlbHBQYXRoO1xuICB9XG5cbiAgZ2V0UGx1Z2luSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpO1xuICB9XG5cbiAgZ2V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldEljb24oKSB8fCAnZmEtcXVlc3Rpb24tY2lyY2xlLW8nO1xuICB9XG5cbiAgZ2V0Q29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuaXNBcHBlbmRUb0JvZHkoKSA/ICdib2R5JyA6ICcnO1xuICB9XG59XG4iXX0=
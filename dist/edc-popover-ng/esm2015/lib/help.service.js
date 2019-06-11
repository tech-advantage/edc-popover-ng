/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
export class HelpService {
    /**
     * @param {?} configurationHandler
     */
    constructor(configurationHandler) {
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
    getHelp(primaryKey, subKey, pluginId) {
        return this.edcClient.getHelper(primaryKey, subKey, pluginId || this.configurationHandler.getPluginId());
    }
    /**
     * @return {?}
     */
    getHelpPath() {
        return this.helpPath;
    }
    /**
     * @return {?}
     */
    getPluginId() {
        return this.configurationHandler.getPluginId();
    }
    /**
     * @return {?}
     */
    getIcon() {
        return this.configurationHandler.getIcon() || 'fa-question-circle-o';
    }
    /**
     * @return {?}
     */
    getContainer() {
        return this.configurationHandler.isAppendToBody() ? 'body' : '';
    }
}
HelpService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HelpService.ctorParameters = () => [
    { type: PopoverConfigurationHandler }
];
if (false) {
    /** @type {?} */
    HelpService.prototype.edcClient;
    /** @type {?} */
    HelpService.prototype.helpPath;
    /** @type {?} */
    HelpService.prototype.configurationHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWRjLXBvcG92ZXItbmcvIiwic291cmNlcyI6WyJsaWIvaGVscC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHckYsTUFBTTs7OztJQUtKLFlBQW9CLG9CQUFpRDtRQUFqRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBRW5ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2pIOzs7Ozs7O0lBRUQsT0FBTyxDQUFDLFVBQWtCLEVBQUUsTUFBYyxFQUFFLFFBQWlCO1FBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDMUc7Ozs7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7O0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2hEOzs7O0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLHNCQUFzQixDQUFDO0tBQ3RFOzs7O0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNqRTs7O1lBOUJGLFVBQVU7Ozs7WUFGRiwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGNDbGllbnQsIEhlbHBlciB9IGZyb20gJ2VkYy1jbGllbnQtanMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZ3VyYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9jb25maWcvcG9wb3Zlci1jb25maWd1cmF0aW9uLWhhbmRsZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVscFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgZWRjQ2xpZW50OiBFZGNDbGllbnQ7XG4gIHByaXZhdGUgaGVscFBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYXRpb25IYW5kbGVyOiBQb3BvdmVyQ29uZmlndXJhdGlvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhlbHBQYXRoID0gY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SGVscFBhdGgoKTtcbiAgICAvLyBFZGMtcG9wb3ZlciBvbmx5IHVzZXMgY29udGV4dHVhbCBoZWxwLCBpbnN0YW50aWF0ZSBjbGllbnQgd2l0aCBjb250ZXh0dWFsT25seSBwYXJhbWV0ZXIgc2V0IHRvIHRydWVcbiAgICB0aGlzLmVkY0NsaWVudCA9IG5ldyBFZGNDbGllbnQoY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0RG9jUGF0aCgpLCAnJywgY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0UGx1Z2luSWQoKSwgdHJ1ZSk7XG4gIH1cblxuICBnZXRIZWxwKHByaW1hcnlLZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIHBsdWdpbklkPzogc3RyaW5nKTogUHJvbWlzZTxIZWxwZXI+IHtcbiAgICByZXR1cm4gdGhpcy5lZGNDbGllbnQuZ2V0SGVscGVyKHByaW1hcnlLZXksIHN1YktleSwgcGx1Z2luSWQgfHwgdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5nZXRQbHVnaW5JZCgpKTtcbiAgfVxuXG4gIGdldEhlbHBQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGVscFBhdGg7XG4gIH1cblxuICBnZXRQbHVnaW5JZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25IYW5kbGVyLmdldFBsdWdpbklkKCk7XG4gIH1cblxuICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbkhhbmRsZXIuZ2V0SWNvbigpIHx8ICdmYS1xdWVzdGlvbi1jaXJjbGUtbyc7XG4gIH1cblxuICBnZXRDb250YWluZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uSGFuZGxlci5pc0FwcGVuZFRvQm9keSgpID8gJ2JvZHknIDogJyc7XG4gIH1cbn1cbiJdfQ==
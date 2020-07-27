import { Injectable } from '@angular/core';
import { HelpService } from '../help.service';
import { EdcTranslationService } from '../translate/edc-translation.service';
import { PopoverConfig, PopoverContent, PopoverOptions } from 'edc-popover-js';
export class HelpConfigService {
    constructor(helpService, translationService) {
        this.helpService = helpService;
        this.translationService = translationService;
    }
    buildPopoverConfig(primaryKey, subKey, pluginId, lang, placement = 'bottom', customClass) {
        // Get the helper
        return this.helpService.getHelp(primaryKey, subKey, pluginId, lang)
            .then((helper) => this.addContent(helper, primaryKey, subKey, lang))
            .then((config) => this.addLabels(config))
            .then((config) => this.addOptions(config, placement, customClass))
            .catch((err) => {
            console.error(err);
        });
    }
    getIcon() {
        return this.helpService.getIcon();
    }
    updateOptions(config, placement, customClass) {
        if (!config) {
            return null;
        }
        config.options.placement = placement;
        config.options.customClass = customClass;
        return config;
    }
    addContent(helper, primaryKey, subKey, lang) {
        const config = new PopoverConfig();
        if (helper) {
            const { language: resolvedLanguage } = helper;
            if (resolvedLanguage !== lang) {
                console.warn(`Requested language ${lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
            }
            // Set translation language for the labels
            this.translationService.setLang(resolvedLanguage);
            const { label: title, description, articles, links } = helper;
            config.content = Object.assign(new PopoverContent(), {
                title, description, articles, links
            });
            // Parse article and links urls
            this.parseUrls(config, primaryKey, subKey, resolvedLanguage, helper.exportId);
        }
        else {
            console.error(`Could not load Helper for the key ${primaryKey} and subKey ${subKey}`);
        }
        return config;
    }
    parseUrls(config, primaryKey, subKey, lang, pluginId) {
        if (!config || !config.content) {
            return;
        }
        const articles = config.content.articles || [];
        const links = config.content.links || [];
        articles.forEach((article, index) => article.url = this.helpService.getContextUrl(primaryKey, subKey, lang, index, pluginId));
        links.forEach((link) => link.url = this.helpService.getDocumentationUrl(link.id));
    }
    addLabels(config) {
        return this.translationService.getTranslation()
            .then((translations) => {
            config.labels = translations;
            return config;
        })
            .catch(() => config);
    }
    addOptions(config, placement, customClass) {
        config.options = Object.assign(new PopoverOptions(), { placement, customClass });
        const container = this.helpService.getContainer();
        if (container && container !== 'body') {
            config.options.appendTo = 'parent';
        }
        else {
            config.options.appendTo = () => document.body;
        }
        return config;
    }
}
HelpConfigService.decorators = [
    { type: Injectable }
];
HelpConfigService.ctorParameters = () => [
    { type: HelpService },
    { type: EdcTranslationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VkYy1wb3BvdmVyLW5nL3NyYy9saWIvY29uZmlnL2hlbHAtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJL0UsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixZQUE2QixXQUF3QixFQUN4QixrQkFBeUM7UUFEekMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtJQUN0RSxDQUFDO0lBRUQsa0JBQWtCLENBQUMsVUFBa0IsRUFDbEIsTUFBYyxFQUNkLFFBQWlCLEVBQ2pCLElBQWEsRUFDYixTQUFTLEdBQUcsUUFBUSxFQUNwQixXQUFvQjtRQUNyQyxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7YUFDaEUsSUFBSSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNFLElBQUksQ0FBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkQsSUFBSSxDQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsSUFB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Q3JDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTthQUM1QyxJQUFJLENBQUMsQ0FBQyxZQUEwQixFQUFFLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDN0IsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyxVQUFVLENBQUMsTUFBcUIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO1FBQzlFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFNBQVMsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztTQUMvQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OztZQXZGRixVQUFVOzs7WUFORixXQUFXO1lBRVgscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXJ0aWNsZSwgSGVscGVyLCBMaW5rLCBQb3BvdmVyTGFiZWwgfSBmcm9tICdlZGMtY2xpZW50LWpzJztcbmltcG9ydCB7IEVkY1RyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3RyYW5zbGF0ZS9lZGMtdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlnLCBQb3BvdmVyQ29udGVudCwgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICdlZGMtcG9wb3Zlci1qcyc7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tICd0aXBweS5qcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWxwQ29uZmlnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBoZWxwU2VydmljZTogSGVscFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNsYXRpb25TZXJ2aWNlOiBFZGNUcmFuc2xhdGlvblNlcnZpY2UpIHtcbiAgfVxuXG4gIGJ1aWxkUG9wb3ZlckNvbmZpZyhwcmltYXJ5S2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBzdWJLZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgIHBsdWdpbklkPzogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgbGFuZz86IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQgfCBQb3BvdmVyQ29uZmlnPiB7XG4gICAgLy8gR2V0IHRoZSBoZWxwZXJcbiAgICByZXR1cm4gdGhpcy5oZWxwU2VydmljZS5nZXRIZWxwKHByaW1hcnlLZXksIHN1YktleSwgcGx1Z2luSWQsIGxhbmcpXG4gICAgICAudGhlbigoaGVscGVyOiBIZWxwZXIpID0+IHRoaXMuYWRkQ29udGVudChoZWxwZXIsIHByaW1hcnlLZXksIHN1YktleSwgbGFuZykpXG4gICAgICAudGhlbigoY29uZmlnOiBQb3BvdmVyQ29uZmlnKSA9PiB0aGlzLmFkZExhYmVscyhjb25maWcpKVxuICAgICAgLnRoZW4oKGNvbmZpZzogUG9wb3ZlckNvbmZpZykgPT4gdGhpcy5hZGRPcHRpb25zKGNvbmZpZywgcGxhY2VtZW50LCBjdXN0b21DbGFzcykpXG4gICAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGVscFNlcnZpY2UuZ2V0SWNvbigpO1xuICB9XG5cbiAgdXBkYXRlT3B0aW9ucyhjb25maWc6IFBvcG92ZXJDb25maWcsIHBsYWNlbWVudDogUGxhY2VtZW50LCBjdXN0b21DbGFzczogc3RyaW5nKTogUG9wb3ZlckNvbmZpZyB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25maWcub3B0aW9ucy5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgY29uZmlnLm9wdGlvbnMuY3VzdG9tQ2xhc3MgPSBjdXN0b21DbGFzcztcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb250ZW50KGhlbHBlcjogSGVscGVyLCBwcmltYXJ5S2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBQb3BvdmVyQ29uZmlnIHtcbiAgICBjb25zdCBjb25maWcgPSBuZXcgUG9wb3ZlckNvbmZpZygpO1xuICAgIGlmIChoZWxwZXIpIHtcbiAgICAgIGNvbnN0IHsgbGFuZ3VhZ2U6IHJlc29sdmVkTGFuZ3VhZ2UgfSA9IGhlbHBlcjtcbiAgICAgIGlmIChyZXNvbHZlZExhbmd1YWdlICE9PSBsYW5nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgUmVxdWVzdGVkIGxhbmd1YWdlICR7bGFuZ30gY291bGQgbm90IGJlIGxvYWRlZCxcbiAgICAgICAgICAgY29udGVudCB3aWxsIGJlIHVzaW5nIGRlZmF1bHQgbGFuZ3VhZ2UgJHtoZWxwZXIubGFuZ3VhZ2V9IGluc3RlYWRgKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCB0cmFuc2xhdGlvbiBsYW5ndWFnZSBmb3IgdGhlIGxhYmVsc1xuICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2Uuc2V0TGFuZyhyZXNvbHZlZExhbmd1YWdlKTtcbiAgICAgIGNvbnN0IHsgbGFiZWw6IHRpdGxlLCBkZXNjcmlwdGlvbiwgYXJ0aWNsZXMsIGxpbmtzIH0gPSBoZWxwZXI7XG4gICAgICBjb25maWcuY29udGVudCA9IE9iamVjdC5hc3NpZ24obmV3IFBvcG92ZXJDb250ZW50KCksIHtcbiAgICAgICAgdGl0bGUsIGRlc2NyaXB0aW9uLCBhcnRpY2xlcywgbGlua3NcbiAgICAgIH0pO1xuICAgICAgLy8gUGFyc2UgYXJ0aWNsZSBhbmQgbGlua3MgdXJsc1xuICAgICAgdGhpcy5wYXJzZVVybHMoY29uZmlnLCBwcmltYXJ5S2V5LCBzdWJLZXksIHJlc29sdmVkTGFuZ3VhZ2UsIGhlbHBlci5leHBvcnRJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBsb2FkIEhlbHBlciBmb3IgdGhlIGtleSAke3ByaW1hcnlLZXl9IGFuZCBzdWJLZXkgJHtzdWJLZXl9YCk7XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVXJscyhjb25maWc6IFBvcG92ZXJDb25maWcsIHByaW1hcnlLZXk6IHN0cmluZywgc3ViS2V5OiBzdHJpbmcsIGxhbmc6IHN0cmluZywgcGx1Z2luSWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLmNvbnRlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYXJ0aWNsZXMgPSBjb25maWcuY29udGVudC5hcnRpY2xlcyB8fCBbXTtcbiAgICBjb25zdCBsaW5rcyA9IGNvbmZpZy5jb250ZW50LmxpbmtzIHx8IFtdO1xuICAgIGFydGljbGVzLmZvckVhY2goKGFydGljbGU6IEFydGljbGUsIGluZGV4OiBudW1iZXIpID0+XG4gICAgICBhcnRpY2xlLnVybCA9IHRoaXMuaGVscFNlcnZpY2UuZ2V0Q29udGV4dFVybChwcmltYXJ5S2V5LCBzdWJLZXksIGxhbmcsIGluZGV4LCBwbHVnaW5JZCkpO1xuICAgIGxpbmtzLmZvckVhY2goKGxpbms6IExpbmspID0+IGxpbmsudXJsID0gdGhpcy5oZWxwU2VydmljZS5nZXREb2N1bWVudGF0aW9uVXJsKGxpbmsuaWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTGFiZWxzKGNvbmZpZzogUG9wb3ZlckNvbmZpZyk6IFByb21pc2U8UG9wb3ZlckNvbmZpZz4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5nZXRUcmFuc2xhdGlvbigpXG4gICAgICAudGhlbigodHJhbnNsYXRpb25zOiBQb3BvdmVyTGFiZWwpID0+IHtcbiAgICAgICAgY29uZmlnLmxhYmVscyA9IHRyYW5zbGF0aW9ucztcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4gY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkT3B0aW9ucyhjb25maWc6IFBvcG92ZXJDb25maWcsIHBsYWNlbWVudDogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nKTogUG9wb3ZlckNvbmZpZyB7XG4gICAgY29uZmlnLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG5ldyBQb3BvdmVyT3B0aW9ucygpLCB7IHBsYWNlbWVudCwgY3VzdG9tQ2xhc3MgfSk7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5oZWxwU2VydmljZS5nZXRDb250YWluZXIoKTtcbiAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lciAhPT0gJ2JvZHknKSB7XG4gICAgICBjb25maWcub3B0aW9ucy5hcHBlbmRUbyA9ICdwYXJlbnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcub3B0aW9ucy5hcHBlbmRUbyA9ICgpID0+IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH1cbn1cbiJdfQ==
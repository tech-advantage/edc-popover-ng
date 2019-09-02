import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
export declare class HelpService {
    private configurationHandler;
    private readonly edcClient;
    constructor(configurationHandler: PopoverConfigurationHandler);
    getHelp(primaryKey: string, subKey: string, pluginId?: string, lang?: string): any;
    getContextUrl(mainKey: string, subKey: string, languageCode: string, articleIndex: number, pluginId?: string): string;
    getDocumentationUrl(docId: number): string;
    getI18nUrl(): string;
    getPluginId(): string;
    getIcon(): string;
    getContainer(): string;
    getDefaultLanguage(): string;
    setCurrentLanguage(languageCode: string): any;
    isLanguagePresent(langCode: string): boolean;
}

import { Helper } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
export declare class HelpService {
    private configurationHandler;
    private readonly edcClient;
    constructor(configurationHandler: PopoverConfigurationHandler);
    getHelp(primaryKey: string, subKey: string, pluginId?: string): Promise<Helper>;
    getContextUrl(mainKey: string, subKey: string, languageCode: string, articleIndex: number, pluginId?: string): string;
    getDocumentationUrl(docId: number): string;
    getI18nUrl(): string;
    getPluginId(): string;
    getIcon(): string;
    getContainer(): string;
    getDefaultLanguage(): string;
    setCurrentLanguage(languageCode: string): void;
}

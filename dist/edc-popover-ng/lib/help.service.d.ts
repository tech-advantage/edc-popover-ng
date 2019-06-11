import { Helper } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
export declare class HelpService {
    private configurationHandler;
    private edcClient;
    private helpPath;
    constructor(configurationHandler: PopoverConfigurationHandler);
    getHelp(primaryKey: string, subKey: string, pluginId?: string): Promise<Helper>;
    getHelpPath(): string;
    getPluginId(): string;
    getIcon(): string;
    getContainer(): string;
}

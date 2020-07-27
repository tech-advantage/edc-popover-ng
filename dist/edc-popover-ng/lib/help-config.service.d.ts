import { HelpService } from './help.service';
import { TranslateService } from './translate/translate-service';
import { PopoverConfig } from 'edc-popover-js';
import { Placement } from 'tippy.js';
export declare class HelpConfigService {
    private readonly helpService;
    private readonly translateService;
    constructor(helpService: HelpService, translateService: TranslateService);
    buildPopoverConfig(primaryKey: string, subKey: string, pluginId?: string, lang?: string, placement?: string, customClass?: string): Promise<void | PopoverConfig>;
    updateOptions(config: PopoverConfig, placement: Placement, customClass: string): PopoverConfig;
    private addContent;
    private parseUrls;
    private addLabels;
    private addOptions;
}

import { HelpService } from '../help.service';
import { EdcTranslationService } from '../translate/edc-translation.service';
import { PopoverConfig } from 'edc-popover-js';
import { Placement } from 'tippy.js';
export declare class HelpConfigService {
    private readonly helpService;
    private readonly translationService;
    constructor(helpService: HelpService, translationService: EdcTranslationService);
    buildPopoverConfig(primaryKey: string, subKey: string, pluginId?: string, lang?: string, placement?: string, customClass?: string): Promise<void | PopoverConfig>;
    getIcon(): string;
    updateOptions(config: PopoverConfig, placement: Placement, customClass: string): PopoverConfig;
    private addContent;
    private parseUrls;
    private addLabels;
    private addOptions;
}

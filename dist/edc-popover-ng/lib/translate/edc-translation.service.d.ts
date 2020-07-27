import { HelpService } from '../help.service';
import { PopoverLabel } from 'edc-client-js';
export declare class EdcTranslationService {
    private readonly helpService;
    defaultLanguage: string;
    lang: string;
    constructor(helpService: HelpService);
    getLang(): string;
    setLang(lang: string): void;
    getTranslation(lang?: string): Promise<PopoverLabel>;
    /**
     * Load default popover labels on error
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    loadDefaultLabels(lang: string, defaultLanguage?: string): Promise<PopoverLabel>;
}

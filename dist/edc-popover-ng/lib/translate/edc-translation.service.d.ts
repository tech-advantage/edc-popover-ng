import { HelpService } from '../help.service';
export declare class EdcTranslationService {
    private readonly helpService;
    defaultLanguage: string;
    lang: string;
    constructor(helpService: HelpService);
    getLang(): string;
    setLang(lang: string): void;
}

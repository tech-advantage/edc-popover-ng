import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelpService } from '../help.service';
export declare function HttpLoaderFactory(http: HttpClient, helpService: HelpService): TranslateLoader;
export declare class TranslateLoader {
    private readonly http;
    private readonly defaultLanguage;
    private prefix;
    private suffix;
    constructor(http: HttpClient, defaultLanguage?: string, prefix?: string, suffix?: string);
    getTranslation(lang?: string): Observable<any>;
    /**
     * Get the i18n json file for the requested lang
     * Will be called if no i18n file was found on server for this lang
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    getTranslationFile(lang: string, defaultLanguage?: string): Observable<any>;
}

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { HelpService } from '../help.service';
import { isLanguageCodePresent } from '../utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG, localTranslations } from './language-codes';

export class TranslateLoader {

  constructor(private readonly http: HttpClient,
              private readonly defaultLanguage = SYS_LANG,
              private prefix = '',
              private suffix = '.json') {}

  getTranslation(lang: string = SYS_LANG): Observable<any> {
    const langToUse = isLanguageCodePresent(lang, LANGUAGE_CODES) ? lang : this.defaultLanguage;
    return this.http.get(`${this.prefix}/${langToUse}${this.suffix}`).pipe(
      catchError(() => this.getTranslationFile(lang))
    );
  }

  /**
   * Get the i18n json file for the requested lang
   * Will be called if no i18n file was found on server for this lang
   *
   * @param lang the lang code
   * @param defaultLanguage default lang code
   */
  getTranslationFile(lang: string, defaultLanguage: string = this.defaultLanguage): Observable<any> {
    const translationFile = (lang && localTranslations[lang]) ||
      (defaultLanguage && localTranslations[defaultLanguage]) ||
      localTranslations[SYS_LANG];
    return of(translationFile);
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient, helpService: HelpService) {
  const defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
  const i18nUrl = helpService.getI18nUrl();
  return new TranslateLoader(http, defaultLanguage, i18nUrl);
}

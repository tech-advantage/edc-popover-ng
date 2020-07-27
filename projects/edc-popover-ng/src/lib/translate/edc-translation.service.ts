import { HelpService } from '../help.service';
import { SYS_LANG } from './language-codes';
import { Injectable } from '@angular/core';
import { DEFAULT_LABELS } from './default-translations';
import { PopoverLabel } from 'edc-client-js';

@Injectable()
export class EdcTranslationService {

  defaultLanguage = SYS_LANG;
  lang = SYS_LANG;

  constructor(private readonly helpService: HelpService) {
  }

  getLang(): string {
    return this.lang;
  }

  setLang(lang: string): void {
    this.lang = lang;
  }

  getTranslation(lang: string = this.lang): Promise<PopoverLabel> {
    const langToUse = this.helpService.isLanguagePresent(lang) ? lang : this.defaultLanguage;
    return this.helpService.getPopoverTranslation(langToUse)
      .catch(() => this.loadDefaultLabels(lang));
  }

  /**
   * Load default popover labels on error
   *
   * @param lang the lang code
   * @param defaultLanguage default lang code
   */
  loadDefaultLabels(lang: string, defaultLanguage: string = this.defaultLanguage): Promise<PopoverLabel> {
    const labelTranslation = DEFAULT_LABELS.get(lang) || DEFAULT_LABELS.get(this.defaultLanguage)
    || DEFAULT_LABELS.get(SYS_LANG);

    return Promise.resolve(labelTranslation);
  }
}

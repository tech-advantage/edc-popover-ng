import { Injectable } from '@angular/core';
import { SYS_LANG } from '../translate/language-codes';
import { HelpService } from './help.service';
import { PopoverLabel } from 'edc-client-js';
import { DEFAULT_LABELS } from '../translate/default-translations';

@Injectable()
export class EdcTranslationService {

  lang = SYS_LANG;

  constructor(private readonly helpService: HelpService) {
  }

  getLang(): string {
    return this.lang;
  }

  setLang(lang: string): void {
    this.lang = lang;
  }

  /**
   * Returns the popover labels from the i18n files in the publication export
   *
   * If an error occurred or no translations were returned, returns default labels
   *
   * @param lang the language to use
   */
  getPopoverLabels(lang: string = this.lang): Promise<PopoverLabel> {
    const langToUse = this.helpService.isLanguagePresent(lang) ? lang : SYS_LANG;
    return this.helpService.getPopoverLabels(langToUse)
      .then((translations: PopoverLabel) => translations || this.loadDefaultLabels(lang))
      .catch(() => this.loadDefaultLabels(lang));
  }

  /**
   * Load default popover labels on error
   *
   * @param lang the lang code
   */
  loadDefaultLabels(lang: string): Promise<PopoverLabel> {
    const labelTranslation = DEFAULT_LABELS.get(lang) || DEFAULT_LABELS.get(SYS_LANG);

    return Promise.resolve(labelTranslation);
  }
}

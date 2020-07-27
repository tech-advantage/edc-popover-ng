import { HelpService } from '../help.service';
import { SYS_LANG } from './language-codes';
import { Injectable } from '@angular/core';

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
}

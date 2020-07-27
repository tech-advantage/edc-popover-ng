import { Component } from '@angular/core';
import {
  LANGUAGE_CODES,
  DEFINED_TRANSLATION_CODES
} from '../../projects/edc-popover-ng/src/lib/translate/language-codes';

@Component({
  selector: 'edc-root',
  template: `
      <div>
          <h1 class="title-container">
              Welcome to {{title}}!
              <edc-help class="help-icon"
                        [mainKey]="'fr.techad.edc.configuration'"
                        [subKey]="'products'"
                        [placement]="'bottom'"
                        [dark]="false"
                        customClass="my-popover"
                        [lang]="lang"></edc-help>
          </h1>
          <div class="title-container">
              <h5>Click on the help icon to display help contents.</h5>
              <div>Change the language to use with the popover (labels)</div>
              <span>(Options with green background are provided by default)</span>
              <select id="lang" class="form-group" [(ngModel)]="lang">
                  <option *ngFor="let language of languages"
                          [value]="language"
                          [ngClass]="{'translation-defined': isTranslationDefined(language)}">
                      {{ language | uppercase }}
                  </option>
              </select>
              <edc-help class="help-icon"
                        [mainKey]="'fr.techad.edc.configuration2'"
                        [subKey]="'products'"
                        [placement]="'bottom-start'"
                        [dark]="false"
                        customClass="my-popover"
                        [lang]="lang"></edc-help>
              <div>More translations can be added:</div>
              <div>Just include your own i18n json files on the default location (doc/i18n/)</div>
              <div>You can also change location by defining a new path in the popover config handler (getI18nPath())
              </div>
          </div>
      </div>
  `,
  styleUrls: [ './app.component.less' ]
})
export class AppComponent {
  title = 'edc-popover-ng demo';
  lang = 'en';
  languages = LANGUAGE_CODES;

  isTranslationDefined(language: string): boolean {
    return DEFINED_TRANSLATION_CODES.indexOf(language) > -1;
  }
}

import { Component } from '@angular/core';
import {
  Animation,
  AnimationType,
  DEFINED_TRANSLATION_CODES,
  IconBehavior,
  IEdcPopoverOptions,
  LANGUAGE_CODES,
  PopoverBehavior
} from 'edc-popover-ng';

@Component({
  selector: 'edc-root',
  template: `
    <div class="main-container">
      <h1 class="title-container">
        Welcome to {{title}}!
        <edc-help class="help-icon" [mainKey]="'fr.techad.edc'" [subKey]="'help.center'" [lang]="lang"></edc-help>
      </h1>
      <div class="lang-option">
        <h3>Click on the help icon to display help contents.</h3>
        <div class="options-group">
          <div>Select the language</div>
          <select id="lang" class="form-group" [(ngModel)]="lang">
            <option *ngFor="let language of languages"
                    [value]="language"
                    [ngClass]="{'translation-defined': isTranslationDefined(language)}">
              {{ language | uppercase }}
            </option>
          </select>
          <edc-help class="help-icon" [mainKey]="'fr.techad.edc'" [subKey]="'documentation_type'"
                    [lang]="lang"></edc-help>
        </div>
        <div>If content for the selected language is not available in the exported documentation, it will load default</div>
      </div>
      <h3>Many options available!</h3>
      <div class="options-group">
        <div class="error-group">
          <div>Icon from: URL</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'"
                    [subKey]="'documentation_type'"
                    [lang]="lang"
                    [options]="{ icon: { url: 'assets/images/icon.png', height: 32 }, placement: 'bottom' }"></edc-help>
          <div>Custom class name:</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'"
                    [subKey]="'documentation_type'"
                    [lang]="lang"
                    [options]="{ icon: { class: 'fa fa-book' }, placement: 'top' }"></edc-help>
        </div>
      </div>
      <div class="options-group dark-mode">
        <div>Dark mode</div>
        <edc-help class="help-icon" [mainKey]="'fr.techad.edc'" [subKey]="'documentation_type'"
                  [lang]="lang"
                  [options]="{ dark: true, placement: 'top' }"></edc-help>
      </div>
      <div class="options-group">
        <div>Open on hover, with some delay</div>
        <edc-help class="help-icon"
                  [mainKey]="'fr.techad.edc'"
                  [subKey]="'documentation_type'"
                  [lang]="lang"
                  [options]="{ trigger: 'mouseenter', delay: [200, 500], displayTooltip: false }"></edc-help>
      </div>
      <div class="options-group">
        <div>Animations</div>
        <select id="animation" class="form-group" [(ngModel)]="animation">
          <option *ngFor="let animation of animations"
                  [value]="animation">
            {{ animation | uppercase }}
          </option>
        </select>
        <edc-help class="help-icon"
                  [mainKey]="'fr.techad.edc'" [subKey]="'documentation_type'"
                  [lang]="lang"
                  [options]="{ animation: animation, placement: 'right', trigger: 'mouseenter' }"></edc-help>
      </div>
      <h3>Error state options</h3>
      <div>Change the icon and popover appearance, content and behavior on error</div>
      <div class="options-group">
        <div class="error-group">
          <div>Friendly message</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'" [subKey]="'wrong_key'"
                    [lang]="lang"
                    [options]="friendlyMessage"></edc-help>
          <div>Error message</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'" [subKey]="'wrong_key'"
                    [lang]="lang"
                    [options]="failOptionsErrorIcon"></edc-help>
          <div>No popover</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'" [subKey]="'wrong_key'"
                    [lang]="lang"
                    [options]="failOptionsHidden"></edc-help>
          <div>Hidden icon</div>
          <edc-help class="help-icon"
                    [mainKey]="'fr.techad.edc'" [subKey]="'wrong_key'"
                    [lang]="lang"
                    [options]="{ failBehavior: {  icon: iconBehavior.HIDDEN, popover: popoverBehavior.ERROR_SHOWN} }"></edc-help>
        </div>
      </div>
      <h3>More options at <a href="https://github.com/tech-advantage/edc-popover-ng">edc-popover-ng</a></h3>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'edc-popover-ng demo';
  lang = 'en';

  languages = LANGUAGE_CODES;
  animation: Animation = AnimationType.SHIFT_AWAY_EXTREME;
  animations = Object.values(AnimationType);
  iconBehavior = IconBehavior;
  popoverBehavior = PopoverBehavior;

  friendlyMessage: IEdcPopoverOptions = {
    placement: 'bottom-start',
    customClass: 'my-popover',
    failBehavior: {
      icon: IconBehavior.SHOWN,
      popover: PopoverBehavior.ERROR_SHOWN
    },
    animation: AnimationType.SHIFT_AWAY_EXTREME
  };

  failOptions2: IEdcPopoverOptions = {
    placement: 'bottom-start',
    customClass: 'my-popover',
    dark: true,
    failBehavior: {
      icon: IconBehavior.SHOWN,
      popover: PopoverBehavior.FRIENDLY_MSG
    }
  };

  failOptionsErrorIcon: IEdcPopoverOptions = {
    placement: 'bottom-start',
    customClass: 'my-popover',
    dark: true,
    failBehavior: {
      icon: IconBehavior.ERROR,
      popover: PopoverBehavior.ERROR_SHOWN
    }
  };

  failOptionsHidden: IEdcPopoverOptions = {
    placement: 'bottom-start',
    failBehavior: {
      icon: IconBehavior.SHOWN,
      popover: PopoverBehavior.NO_POPOVER
    }
  };

  isTranslationDefined(language: string): boolean {
    return DEFINED_TRANSLATION_CODES.indexOf(language) > -1;
  }
}

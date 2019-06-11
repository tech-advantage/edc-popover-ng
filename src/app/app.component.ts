import { Component } from '@angular/core';

@Component({
  selector: 'edc-root',
  template: `
    <div>
      <h1 class="title-container">
        Welcome to {{title}}!
        <edc-help [key]="'fr.techad.edc'" [subKey]="'help.center'" [placement]="'bottom'" [dark]="false" class="help-icon"></edc-help>
      </h1>
      <h5 class="title-container">Click on the help icon to display help content.</h5>
    </div>
  `,
  styleUrls: [ './app.component.less' ]
})
export class AppComponent {
  title = 'edc-popover-ng demo';
}


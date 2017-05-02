## edc-popover-ng

[![Build Status](https://travis-ci.org/tech-advantage/edc-popover-ng.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-ng)
[![npm version](https://badge.fury.io/js/edc-popover-ng.svg)](https://badge.fury.io/js/edc-popover-ng)

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

The only required dependencies are:

- Angular (requires Angular version 2 or higher, tested with 2.4.5)
- Bootstrap CSS (tested with 3.3.7 and 4.0.0-alpha.6)


## Importing the help component


You can import your library with NPM in any Angular application by running:

```bash
$ npm install edc-popover-ng --save
```

with YARN, use:

```bash
$ yarn add edc-popover-ng
```

## Add Bootstrap and FontAwesome styles

In your main style file (e.g. _style.less_) :

```css
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/less/font-awesome.less";
```

## Consuming the help component


From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the edc-popover-ng library.
import { HelpModule } from 'edc-popover-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Specify the edc-help module as an import, and set basic configuration (see HelpModuleConfig).
    HelpModule.forRoot({
    	helpPath: '/pathToHelp',
        docPath: '/pathToDoc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use the Help component in your Angular application:

```html
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
  <edc-help [key]="key" [subKey]="subkey" [placement]="bottom"></edc-help>
</h1>
```
## Setting up the component

The `edc-help` component can take multiple inputs :

| Name | Type | Default | Description | Optional |
|---|---|---|---|---|
| key | string | '' | The edc documentation main key | no |
| subKey |  string | '' | The edc documentation sub key | no |
| placement | string | 'bottom' | How to position the popover - top \| bottom \| left \| right | true |
| dark | boolean | false | Should be true if icon is on dark background | true |
| append-to-body | boolean | false | Appends the popover to body | true

_Coming soon :_

| Name | Type | Default | Description | Optional |
|---|---|---|---|---|
| color | string | '#D3D3D3' | The help icon color | true |
| colorHv | string | '#3C8DBC' | The help icon color on hover | true |
| icon |  string | 'fa-question-circle-o' | Choose you font-awesome icon | true |
| customClass | string | '' | Set a custom CSS class  | true |
| trigger | string | 'click' | How popover is triggered - click \| hover \| focus \| manual | true |

## License

MIT [TECH'advantage](mailto:contact@tech-advantage.com)

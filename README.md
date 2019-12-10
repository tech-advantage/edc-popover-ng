## edc-popover-ng

[![Build Status](https://travis-ci.org/tech-advantage/edc-popover-ng.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-ng)
[![npm version](https://badge.fury.io/js/edc-popover-ng.svg)](https://badge.fury.io/js/edc-popover-ng)

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## edc Version

Current release targets edc v2.7.0.

## Dependencies

The only required dependencies are:

- Angular (requires Angular version 6 or higher, tested with 7)
- Bootstrap CSS (tested with 3.3.7 and 4.0.0-alpha.6)
- tested with ngx-bootstrap 3.0.1


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


### Create a configuration service

This module needs a basic configuration. 

To provide this configuration, first create a new Service implementing PopoverConfigurationHandler.

Methods to implement are : 

| Method | Return type | Description |
|---|---|---|
| getPluginId | string | The identifier of the target plugin documentation export |
| getHelpPath | string | The path to edc-help-ng application |
| getDocPath  | string | The path to exported documentation |
| getI18nPath | string | The path to translation json files |
| getIcon | string | The font awesome icon |
| isAppendToBody | boolean | Appends the popover to body |

Example : 
```typescript
import { Injectable } from '@angular/core';
import { PopoverConfiguration, PopoverConfigurationHandler } from 'edc-popover-ng';

@Injectable()
export class YourService implements PopoverConfigurationHandler {

  getPluginId(): string {
    return 'edchelp';
  }
  
  getHelpPath(): string {
    return '/help';
  }
  
  getDocPath(): string {
    return '/doc';
  }

  getI18nPath(): string {
    return '/doc/my-i18n-directory';
  }

  getIcon() {
    return 'fa-question-circle-o';
  }

  isAppendToBody(): boolean {
    return true;
  }
}
```


N.B : The choice to provide a service instead of an object has been made to be more dynamic.

For instance you could inject the `Http` service in `YourService` to get configuration from remote (see also : https://aclottan.wordpress.com/2016/12/30/load-configuration-from-external-file/).


### Import HelpModule

In your main application module, for example `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import edc-popover-ng library elements.
import { HelpModule, PopoverConfigurationHandler } from 'edc-popover-ng';

// Import your service implementing PopoverConfigurationHandler.
import { YourService } from './path.to.your.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Specify the edc-help module as an import, and provide service implementing PopoverConfigurationHandler.
    HelpModule.forRoot({
      configLoader: {provide: PopoverConfigurationHandler, useClass: YourService}
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You are now able to use the Help component in your Angular application :

```html
<h1>
  {{title}}
  <edc-help [key]="my.key" [subKey]="my.subkey" [placement]="'bottom'" [dark]="true" [lang]="'en'"></edc-help>
</h1>
```
## If your application is covered by more than one documentation
Wherever your application is not covered by the main documentation (the one whose plugin Id is set in the default configuration file), 
you can specify a custom documentation plugin Id using the optional 'pluginId' attribute of the edc-help component.

```html
<h1>
  {{title}}
  <edc-help [pluginId]="my.specificPluginId" [key]="my.key" [subKey]="my.subkey" [placement]="'bottom'" [dark]="true"></edc-help>
</h1>
```

## Setting up the component

The `edc-help` component can take multiple inputs :

| Name       |   Type   |       Default      |                                 Description                                 | Optional |
|------------|----------|--------------------|-----------------------------------------------------------------------------|----------|
| pluginId   |  string  |         ''         | The edc plugin Id if different from the one configured in the main settings |   yes    |
| key        |  string  |         ''         | The edc documentation main key                                              |    no    |
| subKey     |  string  |         ''         | The edc documentation sub key                                               |    no    |
| placement  |  string  |      'bottom'      | How to position the popover - top \| bottom \| left \| right                |   yes    |
| dark       |  boolean |        false       | Should be true if icon is on dark background                                |   yes    |
| lang       |  string  |       default      | The language to use, for labels and contents, identified by the 2 letters   |   yes    |
|                                            | from ISO639-1. Will use documentation's default if no value is present      |          |

## Providing your own translations for popover labels

You can set additional translations (or replace the existing ones) by adding i18n json files to the documentation export.

Please note that one file is required per language (see file example below), and should be named following the ISO639-1 two letters standards 
(ie en.json, it.json...).

By default, edc-popover-ng will be looking for the files in [yourDocPath]/i18n/ (*.json), but you can change this path by modifying 
getI18nPath() in your PopoverConfigurationHandler.

edc-popover-ng comes with English, French, Chinese, Russian and Vietnamese translations, and supports up to 36 languages.
Full list can be found in constant LANGUAGE_CODES exported from src/lib/translate/language-codes.ts.

##### JSON file structure

As an example, here is the en.json file used by default:

```json
{
  "labels": {
    "articles": "Need more...",
    "links": "Related topics"
  }
}
```

## Coming soon

* Customize help icon color (currently gray).
* Customize help icon color on hover (currently blue).
* Add a custom CSS class to popover.
* Choose popover trigger (focus, hover, click, etc...)


## License

MIT [TECH'advantage](mailto:contact@tech-advantage.com)

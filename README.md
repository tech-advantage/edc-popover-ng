## edc-popover-ng

[![Build Status](https://travis-ci.org/tech-advantage/edc-popover-ng.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-ng)
[![npm version](https://badge.fury.io/js/edc-popover-ng.svg)](https://badge.fury.io/js/edc-popover-ng)

Angular popover component to display a contextual help.

_This project is part of **easy doc contents** [(edc)](https://www.easydoccontents.com)._

edc is a simple yet powerful tool for agile-like documentation management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Compatibility

| Version | Angular  |
| ------- | -------- |
| 5.1.1   | v7 - v10 |
| 5.2.0   | v11      |
| 5.3.0   | v12      |
| 5.4.2   | v13      |
| 5.5.0   | v14      |
| 5.6.0   | v15      |
| 5.7.0   | v16      |

## Dependencies

Required dependencies:

- [Angular](https://angular.io/) (v16)
- [FontAwesome](https://www.npmjs.com/package/font-awesome) >= 4.7.0

## How to use

### Import

You can import this module with `npm` by running:
```bash
npm install edc-popover-ng --save
```

Or with `yarn`:
```bash
yarn add edc-popover-ng
```

Add [font-awesome](https://fontawesome.com/v4.7.0/get-started/) as a dependency

```bash
npm install font-awesome --save
```
In your main style file (e.g. _style.less_) :

```css
@import "~font-awesome/less/font-awesome.less";
```

### Setup

#### Provide a service implementing PopoverConfigurationHandler

Edc Help module needs a basic configuration. 

To provide this configuration, first create a new Service implementing [PopoverConfigurationHandler](./projects/edc-popover-ng/src/lib/config/popover-configuration-handler.ts).

Methods to implement are : 

| Method | Return type | Description |
|---|---|---|
| getPluginId | string | The identifier of the target plugin documentation export |
| getHelpPath | string | The path to edc-help-ng application |
| getDocPath  | string | The path to exported documentation |
| getI18nPath | string | The path to translation json files |getPopoverOptions
| getPopoverOptions | [IEdcPopoverOptions](./projects/edc-popover-ng/src/lib/config/edc-popover-options.interface.ts) | Options for the popover |

Example : 
```typescript
import { Injectable } from '@angular/core';
import { EdcPopoverConfiguration, PopoverConfigurationHandler } from 'edc-popover-ng';

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

  getPopoverOptions(): IEdcPopoverOptions {
    // return the global scope options. They can be overwritten at component level.
    return {
        placement: 'left'
    };
  }
}
```


N.B : The choice to provide a service instead of an object has been made to be more dynamic.

For instance you could inject the `Http` service in `YourService` to get configuration from remote (see also : https://aclottan.wordpress.com/2016/12/30/load-configuration-from-external-file/).


#### Import HelpModule

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

You can now use the Help component in your Angular application :

```html
<h1>
  {{title}}
  <edc-help [mainKey]="'my.mainKey'" [subKey]="'my.subkey'" [placement]="'bottom'" [lang]="'en'"></edc-help>
</h1>
```

## If your application uses more than one documentation
Your application might rely on more than one documentation.
You can then specify a custom documentation plugin Id using the optional `pluginId` attribute in the edc-help component.

```html
<h1>
  {{title}}
  <edc-help [pluginId]="'my.specificPluginId'" [mainKey]="'my.mainKey'" [subKey]="'my.subkey'">edc-help>
</h1>
```


## Inputs and options

#### Mandatory inputs
Mandatory inputs or the `EdcHelp` (see [HelpComponent](./projects/edc-popover-ng/src/lib/help.component.ts)):

| Prop | Type | Description |
|---|---|---|
| mainKey | `string` | The main key of the contextual help |
| subKey | `string` | The sub key of the contextual help |


#### Optional inputs
Optional inputs for the component:

| Input Name | Return type | Description | Default value |
|---|---|---|---|
| pluginId | `string` | A different pluginId from the one defined in the main service | `undefined` |
| lang | `string` | The language to use, for labels and contents, identified by the 2 letters from the [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) standard. Will use documentation's default if no value is provided  | `undefined` |
| options | [EdcPopoverOptions](./projects/edc-popover-ng/src/lib/config/edc-popover-options.ts) | Options for this popover - will overwrite global options | `undefined` |

Available options [(EdcPopoverOptions)](./projects/edc-popover-ng/src/lib/config/edc-popover-options.ts):

| Property | Type | Description | Default |
|---|---|---|---|
| icon | `PopoverIcon` | Icon settings, see [Icon](#Icon) | [PopoverIcon](./projects/edc-popover-ng/src/lib/config/popover-icon.ts) |
| failBehavior | `FailBehavior` | Icon and popover behavior on error, see [Fail Behavior](#fail-behavior)  | [FailBehavior](./projects/edc-popover-ng/src/lib/config/fail-behavior.ts) |
| placement | popper.js `Placement` | Popover positioning relatively to the icon | `bottom` |
| hideOnClick | `boolean` | If true, any click outside of the popover will close it (inside too if interactive is false) | `true` |
| interactive | `boolean` | Determine if we can interact with the popover content | `true` |
| trigger | `string` | Event that will trigger the popover: `click` `mouseenter` `focus` | `click` |
| customClass | `string` | class name that will be added to the main popover container | undefined |
| dark | `boolean` | Dark mode | `false` |
| theme | `string` | Popover's theme name | `undefined` |
| displayPopover | `boolean` | Show the popover / Go directly to the web help viewer on click | `true` |
| displaySeparator | `boolean` | Show / Hide the separator between header and body | `true` |
| displayTitle | `boolean` | Show / Hide the header containing the title | `true` |
| displayArticles | `boolean` | Show / Hide the articles section | `true` |
| displayRelatedTopics | `boolean` | Show / Hide the related Topics (aka Links) section | `true` |
| displayTooltip | `boolean` | Show / Hide the icon tooltip | `true` |
| delay | `number | [number, number]` | Delay in milliseconds before showing the popover - if array, delay for opening and closing respectively | `undefined` |
| animation | `Animation` | Animation when opening / closing the popover | `undefined` |
| appendTo | `'parent' | Element | (() => Element)` | The element to which append the popover to | `(() => documentation.body)` |

#### Icon
[PopoverIcon](./projects/edc-popover-ng/src/lib/config/popover-icon.ts) contains the options for the icon.

| Property | Type | Description | Default |
|---|---|---|---|
| class | `string` | Class name for the icon. [Font awesome icon classes](https://fontawesome.com/v4.7.0/cheatsheet/) are handled natively | `'fa fa-question-circle-o'` |
| url | `string` | Image url, size is determined by height, and width properties | `undefined` |
| height | `number` | Image height in pixels (for url images only) | `18` |
| width | `number` | Image width in pixels (for url images only). Will take height value if none is provided | `18` |

If `class` property is provided, it will overwrite the default class `'fa fa-question-circle-o'`.
If `url` is defined, it will override the class property, even if `class` is defined.

#### Fail behavior
If the help content failed to be loaded - or any other error occured, the icon and the popover will look for the [FailBehavior](./projects/edc-popover-ng/src/lib/config/fail-behavior.ts) options to define their style and content.

There are separate behaviors for the help icon, and the popover itself.

For the help icon when an error occurs, it adds the following css selector.
 
| Behavior | Description | CSS selector |
|---|---|---|
| `SHOWN` | The help icon is shown as usual (default) | `.edc-help-icon` |
| `DISABLED` | The help icon is greyed out | `.edc-icon-disabled` |
| `HIDDEN` | The help icon is completely hidden (but stays in DOM to avoid breaking the UI) | `.edc-icon-hidden` |
| `ERROR` | The help icon is replaced by an exclamation point | `.edc-icon-error` |

Default values are in file [help.less](./projects/edc-popover-ng/src/lib/help.less)

For the popover when an error occurs:
 - `ERROR_SHOWN` An error message is shown in the popover
 - `FRIENDLY_MSG` A friendly and translated message is shown in the popover
 - `NO_POPOVER` No popover appears when the help icon is triggered

By default, the icon is `SHOWN` and the popover is set to `FRIENDLY_MSG`.

## Customization

### CSS

#### Global

When dark-mode is enabled, the CSS class `edc-on-dark` is applied to the help icon.

#### Popover

You can customize the popover with CSS classes as described below :

![CSS Classes](./CSSClasses.png)

For more control, the `customClass` option will add the given class name to the popover container `.edc-popover-container`.
You can then override the main classes.

For example, if you'd like to change the background color of the popover
```css
.my-custom-class {
    background-color: lightgreen;
}
/* or the title font-size */
.my-custom-class .edc-popover-title {
    font-size: 18px;
}
```

## Providing your own translations for the popover labels

You can set additional translations (or replace the existing ones) by adding i18n json files to the documentation folder.

Please note that one file is required per language (see file example below), and should be named following the ISO639-1 two letters standards 
(ie en.json, it.json...).

By default, edc-popover-ng will be looking for the files in [yourDocPath]/popover/i18n/ (*.json), but you can change this path by modifying 
getI18nPath() in your PopoverConfigurationHandler.

edc-popover-ng comes with English and French translations, and supports up to 36 languages.
For the full list, please refer to [LANGUAGE_CODES](https://github.com/tech-advantage/edc-popover-ng/src/lib/translate/language-codes.ts).

##### JSON file structure

Here is the en.json file used by default:

```json
{
  "labels": {
  "articles": "Need more...",
  "links": "Related topics",
  "iconAlt": "Help",
  "comingSoon": "Contextual help is coming soon.",
  "errorTitle":  "Error",
  "errors": {
    "failedData": "An error occurred when fetching data !\nCheck the brick keys provided to the EdcHelp component."
  },
  "content": null,
  "url": "",
  "exportId": ""
  }
}
```

### Customization

You can customize the popover with CSS classes as described below :

![CSS Classes](./CSSClasses.png)

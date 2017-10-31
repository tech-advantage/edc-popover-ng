## edc-popover-ng

[![Build Status](https://travis-ci.org/tech-advantage/edc-popover-ng.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-ng)
[![npm version](https://badge.fury.io/js/edc-popover-ng.svg)](https://badge.fury.io/js/edc-popover-ng)

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation
management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

The only required dependencies are:

- Angular (requires Angular version 2 or higher, tested with 2.4.5 and 4.0.3)
- Bootstrap CSS (tested with 3.3.7 and 4.0.0-alpha.6)
- tested with ngx-bootstrap 1.9.0


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
| getDocPath |  string | The path to exported documentation |
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
  <edc-help [key]="my.key" [subKey]="my.subkey" [placement]="'bottom'" [dark]="true"></edc-help>
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

| Name | Type | Default | Description | Optional |
|---|---|---|---|---|
| pluginId | string | '' | The edc plugin Id if different from the one configured in the main settings | yes |
| key | string | '' | The edc documentation main key | no |
| subKey |  string | '' | The edc documentation sub key | no |
| placement | string | 'bottom' | How to position the popover - top \| bottom \| left \| right | true |
| dark | boolean | false | Should be true if icon is on dark background | true |

## Coming soon

* Customize help icon color (currently gray).
* Customize help icon color on hover (currently blue).
* Add a custom CSS class to popover.
* Choose popover trigger (focus, hover, click, etc...)


## License

MIT [TECH'advantage](mailto:contact@tech-advantage.com)

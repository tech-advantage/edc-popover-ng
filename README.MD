# edc-popover-ng

## Installation

To install this library with NPM, run:

```bash
$ npm install edc-popover-ng --save
```

To install this library with YARN, run:

```bash
$ yarn add edc-popover-ng
```

## Consuming the library

You can import your library in any Angular application by running:

```bash
$ npm install edc-popover-ng
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { HelpModule } from 'edc-popover-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    HelpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its Help component in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<edc-help key="fr.my.key" subKey="theSubKey"></edc-help>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

Eclipse Public License - v 1.0 © [TECH'advantage](mailto:contact@tech-advantage.com)

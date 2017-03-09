# edc-popover-ng

## Dependencies

The only required dependencies are:

- Angular (requires Angular version 2 or higher, tested with 2.4.5)
- Bootstrap CSS (tested with 4.0.0-alpha.6)


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

- @import "~bootstrap/dist/css/bootstrap.css";
- @import "~font-awesome/less/font-awesome.less";


## Consuming the help component


From your Angular `AppModule`:

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

## License

Eclipse Public License - v 1.0 © [TECH'advantage](mailto:contact@tech-advantage.com)

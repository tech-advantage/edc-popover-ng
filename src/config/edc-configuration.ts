/**
 * Class representing the config.json object in assets folder.
 */

import { PopoverConfiguration } from 'projects/edc-popover-ng/src/lib/config/popover-configuration';

export class EdcConfiguration {
  popover: PopoverConfig;
}

export class PopoverConfig implements PopoverConfiguration {
  helpPath: string;     // The URL to the help web app.
  docPath: string;      // The URL to the HTTP served export.
  pluginId: string;     // Export plugin name for the edc documentation.
  body?: boolean;       // Append popover to body (see boostrap popover documentation).
  icon?: string;        // CSS font-awesome class (ex: "fa-question-circle-o").
  i18nPath?: string;    // Path for internationalization json files in host application
}

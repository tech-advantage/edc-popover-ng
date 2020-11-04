import { EdcPopoverConfiguration } from 'projects/edc-popover-ng/src/lib/config/edc-popover-configuration';
import { EdcPopoverOptions } from 'edc-popover-ng';

/**
 * Class representing the config.json object in assets folder.
 */
export class EdcConfiguration {
  popover: PopoverConfig;
}

export class PopoverConfig implements EdcPopoverConfiguration {
  helpPath: string;     // The URL to the help web app.
  docPath: string;      // The URL to the HTTP served export.
  pluginId: string;     // Export plugin name for the edc documentation.
  i18nPath?: string;    // Path for internationalization json files in host application
  options?: EdcPopoverOptions; // Popover options
}

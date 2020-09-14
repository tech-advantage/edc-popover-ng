import { IEdcPopoverOptions } from './edc-popover-options.interface';

/**
 * Popover global configuration, to provide when importing the edc help module
 *
 *    pluginId: URL to the help web app.
 *    helpPath: URL to the HTTP served export.
 *    docPath: Export plugin name for the edc documentation.
 *    i18nDirName: Path to the i18n files, containing the labels
 *    options: Popover global options, to apply to all popovers
 *
 */
export interface EdcPopoverConfiguration {
  pluginId: string;
  helpPath: string;
  docPath: string;
  i18nDirName?: string;
  options?: IEdcPopoverOptions;
}

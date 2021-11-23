import { Injectable } from '@angular/core';
import { HelpService } from './help.service';
import { Helper } from 'edc-client-js';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { EdcPopoverOptions } from '../config/edc-popover-options';
import { copyDefinedProperties } from '../utils/global.utils';
import { IconPopoverConfig } from '../config/icon-popover-config';
import { HelpIconService } from './help-icon.service';
import { IconConfig } from '../config/icon-config';
import { HelpPopoverService } from './help-popover.service';
import { HelpErrorService } from './help-error.service';
import { SYS_LANG } from '../translate/language-codes';

@Injectable()
export class HelpConfigService {

  static readonly KEYS_MISSING_ERROR_MESSAGE = 'Help keys must be defined';

  constructor(private readonly helpService: HelpService,
              private readonly helpIconService: HelpIconService,
              private readonly helpPopoverService: HelpPopoverService,
              private readonly helpErrorService: HelpErrorService) {
  }

  /**
   * Creates the popover configuration to generate the icon and the popover elements
   *
   * Relies on the edc-client-js to retrieve the help content and the labels from the export
   * Adds the given options (placement, style, behavior...)
   * Prepares the icon configuration
   *
   * If an error occurs, generates an error configuration for a icon / popover,
   * based on the fail behavior options.
   *
   * @param mainKey the brick primary key
   * @param subKey the brick sub key
   * @param pluginId the plugin Identifier
   * @param lang the lang to use
   * @param options the options for this popover
   */
  buildPopoverConfig(mainKey: string | undefined,
                     subKey: string | undefined,
                     pluginId?: string | undefined,
                     lang?: string,
                     options?: IEdcPopoverOptions): Promise<IconPopoverConfig> {
    if (!mainKey || !subKey) {
      return Promise.reject(HelpConfigService.KEYS_MISSING_ERROR_MESSAGE);
    }
    // Get the helper from edc-client-js
    return this.helpService.getHelp(mainKey, subKey, pluginId, lang)
      .then((helper: Helper | null) => this.helpPopoverService.addContent(helper, mainKey, subKey, lang))
      .then((config: IconPopoverConfig) => this.addOptions(config, options))
      .then((config: IconPopoverConfig) => this.helpPopoverService.addLabels(config))
      .then((config: IconPopoverConfig) => this.addIconToConfig(config))
      .catch((err: Error) => this.handleError(err, options, lang));
  }

  /**
   * Returns the classes to use for the popover icon
   *
   * @param config the popover configuration
   */
  getIconClasses(config: IconPopoverConfig | undefined): string | string[] {
    const iconConfig: IconConfig | undefined = config && config.iconConfig;
    return this.helpIconService.getIconClasses(iconConfig);
  }

  /**
   * Merges and saves options in the configuration respecting priorities from the different sources.
   * In order - higher levels will overwrite the lower ones :
   *    Default options < global options < single popover input options
   *
   * @param config the popover configuration
   * @param options the options for this popover
   */
  addOptions(config: IconPopoverConfig, options: IEdcPopoverOptions | undefined): IconPopoverConfig {
    // Update configuration with resolved options
    if (config) {
      config.options = this.resolveOptions(options);
    }
    return config;
  }

  /**
   * Intercepts help errors, from the client-js or from a content error
   *
   * Resolves options, and sends the error to the helpErrorService
   *
   * @param err the error
   * @param options the options initially passed to the popover
   * @param lang the language to use, for the labels
   * @private
   */
  private handleError(err: Error, options: IEdcPopoverOptions | undefined, lang: string = SYS_LANG): Promise<IconPopoverConfig> {
    // Process options before handing them to the error service
    const resolvedOptions = this.resolveOptions(options);
    return this.helpErrorService.handleHelpError(err, resolvedOptions, lang);
  }

  /**
   * Resolves the options to use, mixing the 3 levels:
   *      - Populate with default options
   *      - Overwrites with the global options properties, if defined
   *      - Overwrites with popover level options, passed to this particular popover instance
   *
   * Skip any undefined property
   *
   * @param options the Popover options
   * @private
   */
  private resolveOptions(options: IEdcPopoverOptions | undefined | null): IEdcPopoverOptions {
    // Start merging global options into default ones to make sure all required values are defined
    const globalOptions: IEdcPopoverOptions | null = copyDefinedProperties<IEdcPopoverOptions>(
      new EdcPopoverOptions(),
      this.helpService.getPopoverOptions()
    );
    // Then override with more specific options from the popover component and set it as config options
    return copyDefinedProperties<IEdcPopoverOptions>(globalOptions, options) ?? new EdcPopoverOptions();
  }

  /**
   * Builds the icon configuration from the given options
   *
   * @param config the popover configuration
   * @private
   */
  private addIconToConfig(config: IconPopoverConfig): IconPopoverConfig {
    if (config.options) {
      config.iconConfig = this.helpIconService.buildIconConfig(config.options, config.labels);
    }

    return config;
  }
}

import { Injectable } from '@angular/core';
import { PopoverContent } from 'edc-popover-js';
import { FailBehavior, IconBehavior, PopoverBehavior } from '../config/fail-behavior';
import { ContentNotFoundError } from '../errors/content-not-found.error';
import { IconPopoverConfig } from '../config/icon-popover-config';
import { HelpIconService } from './help-icon.service';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { PopoverIcon } from '../config/popover-icon';
import { PopoverLabel } from 'edc-client-js';
import { HelpPopoverService } from './help-popover.service';

@Injectable()
export class HelpErrorService {

  constructor(private readonly helpIconService: HelpIconService,
              private readonly helpPopoverService: HelpPopoverService) {
  }

  /**
   * Handles errors and build a popover containing the error messages
   *
   * @param err the error
   * @param options the options that were passed to the popover initially
   * @param lang the lang to use
   */
  handleHelpError(err: Error, options: IEdcPopoverOptions, lang: string): Promise<IconPopoverConfig> {
    // If error came when retrieving the labels, just use default and continue with loaded content
    if (err instanceof ContentNotFoundError) {
      return this.handleContentException(options, lang);
    }
    return this.handleOtherException(options);
  }

  /**
   * Handles errors of type content error
   * Creates the error popover, with labels and error
   *
   * @param options the options that were passed to the popover
   * @param lang the lang to use for the labels
   * @private
   */
  private handleContentException(options: IEdcPopoverOptions, lang?: string): Promise<IconPopoverConfig> {
    if (!options.failBehavior) {
      options.failBehavior = new FailBehavior();
    }
    if (!options.icon) {
      options.icon = PopoverIcon.create();
    }

    const errorConfig: IconPopoverConfig = new IconPopoverConfig();
    errorConfig.options = options;

    // Retrieve the labels and then create the error popover configuration
    return this.helpPopoverService.addLabels(errorConfig, lang)
      .then((config: IconPopoverConfig) => this.buildErrorConfig(config));
  }

  /**
   * Handles exceptions other than content exceptions
   *
   * @param options the options that were passed to the popover
   * @private
   */
  private handleOtherException(options: IEdcPopoverOptions): Promise<IconPopoverConfig> {
    // Use content exception handling as default for now
    return this.handleContentException(options);
  }

  /**
   * Builds the configuration object for the error popover
   *
   * @param config the configuration being created
   * @private
   */
  private buildErrorConfig(config: IconPopoverConfig): IconPopoverConfig {
    const options: IEdcPopoverOptions = config.options;
    config.iconConfig = this.helpIconService.buildErrorIconConfig(options, config.labels);

    // Popover content
    config.content = this.buildErrorContent(config.labels, options.failBehavior);
    if (!config.content) {
      config.disablePopover = true;
    }

    return config;
  }

  /**
   * Builds the content for the error popover
   * Based on fail behavior icon and popover options
   *
   * @param labels the popover labels
   * @param failBehavior the behavior options in case of error
   * @private
   */
  private buildErrorContent(labels: PopoverLabel, failBehavior: FailBehavior): PopoverContent {
    let content = new PopoverContent();
    // Icon behavior options - Hidden and Disabled don't need content
    if (failBehavior.icon === IconBehavior.HIDDEN || failBehavior.icon === IconBehavior.DISABLED) {
      return null;
    }
    // Popover behavior
    switch (failBehavior.popover) {
      case PopoverBehavior.NO_POPOVER:
        content = null;
        break;
      case PopoverBehavior.ERROR_SHOWN:
        content.title = labels.errorTitle;
        content.description = labels.errors.failedData;
        break;
      case PopoverBehavior.FRIENDLY_MSG:
        content.description = labels.comingSoon;
    }
    return content;
  }

}

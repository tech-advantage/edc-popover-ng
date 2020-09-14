import { IEdcPopoverOptions } from './edc-popover-options.interface';

export abstract class PopoverConfigurationHandler {

  abstract getPluginId(): string;

  abstract getHelpPath(): string;

  abstract getDocPath(): string;

  abstract getI18nPath(): string;

  abstract getPopoverOptions(): IEdcPopoverOptions;
}

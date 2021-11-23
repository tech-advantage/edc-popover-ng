import { Injectable } from '@angular/core';
import { ConfigService } from 'src/config/config.service';
import { EdcPopoverOptions, IEdcPopoverOptions, PopoverConfigurationHandler } from 'edc-popover-ng';

@Injectable()
export class PopoverConfigHandler implements PopoverConfigurationHandler {

  constructor(private configService: ConfigService) {}

  getHelpPath(): string {
    return this.configService.getConfiguration().popover.helpPath;
  }

  getDocPath(): string {
    return this.configService.getConfiguration().popover.docPath;
  }

  getPluginId(): string {
    return this.configService.getConfiguration().popover.pluginId;
  }

  getPopoverOptions(): IEdcPopoverOptions {
    return this.configService.getConfiguration().popover.options || new EdcPopoverOptions();
  }

  getI18nPath(): string {
    return this.configService.getConfiguration().popover.i18nPath ?? '';
  }
}

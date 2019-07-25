import { Injectable } from '@angular/core';
import { PopoverConfigurationHandler } from 'projects/edc-popover-ng/src/lib/config/popover-configuration-handler';
import { ConfigService } from 'src/config/config.service';

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

  getIcon() {
    return this.configService.getConfiguration().popover.icon;
  }

  isAppendToBody(): boolean {
    return this.configService.getConfiguration().popover.body;
  }

  getI18nPath(): string {
    return this.configService.getConfiguration().popover.i18nPath;
  }
}

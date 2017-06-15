import { Injectable } from '@angular/core';
import { EdcClient, Helper } from 'edc-client-js';
import { PopoverConfiguration } from './config/popover-configuration';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';

@Injectable()
export class HelpService {

  private edcClient: EdcClient;
  private helpPath: string;

  constructor(private configurationHandler: PopoverConfigurationHandler) {
    this.helpPath = configurationHandler.getHelpPath();
    this.edcClient = new EdcClient(configurationHandler.getDocPath());
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }

  getHelpPath(): string {
    return this.helpPath;
  }

  getIcon(): string {
    return this.configurationHandler.getIcon() || 'fa-question-circle-o';
  }

  getContainer(): string {
    return this.configurationHandler.isAppendToBody() ? 'body' : '';
  }
}

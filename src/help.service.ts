import { Injectable } from '@angular/core';
import { EdcClient, Helper } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';

@Injectable()
export class HelpService {

  private edcClient: EdcClient;
  private helpPath: string;

  constructor(private configurationHandler: PopoverConfigurationHandler) {
    this.helpPath = configurationHandler.getHelpPath();
    this.edcClient = new EdcClient(configurationHandler.getDocPath(), configurationHandler.getPluginId());
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey, this.configurationHandler.getPluginId());
  }

  getHelpPath(): string {
    return this.helpPath;
  }

  getPluginId(): string {
    return this.configurationHandler.getPluginId();
  }

  getIcon(): string {
    return this.configurationHandler.getIcon() || 'fa-question-circle-o';
  }

  getContainer(): string {
    return this.configurationHandler.isAppendToBody() ? 'body' : '';
  }
}

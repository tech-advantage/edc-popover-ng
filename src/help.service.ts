import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EdcClient, Helper } from 'edc-client-js';
import { HelpModuleConfig } from './help.config';

export let CONFIG = new InjectionToken<HelpModuleConfig>('app.config');

@Injectable()
export class HelpService {

  private edcClient: EdcClient;
  private config: HelpModuleConfig;

  constructor(@Inject(CONFIG) config: HelpModuleConfig) {
    this.config = config;
    this.edcClient = new EdcClient(config.docPath);
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }

  getHelpPath() {
    return this.config.helpPath;
  }
}

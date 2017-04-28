import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EdcClient, Helper } from 'edc-web-publishing-js';
import { HelpModuleConfig } from './help.config';

export let CONFIG = new InjectionToken<HelpModuleConfig>('app.config');

@Injectable()
export class HelpService {

  private edcClient: EdcClient;

  constructor(@Inject(CONFIG) config: HelpModuleConfig) {
    this.edcClient = new EdcClient(config.helpPath);
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }
}

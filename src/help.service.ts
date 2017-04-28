import { Inject, Injectable } from '@angular/core';
import { EdcClient, Helper } from 'edc-web-publishing-js';
import { CONFIG } from './help.module';
import { HelpModuleConfig } from './help.config';


@Injectable()
export class HelpService {

  private edcClient: EdcClient;

  constructor(@Inject(CONFIG) config: HelpModuleConfig) {
    this.edcClient = new EdcClient('/doc/');
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }
}

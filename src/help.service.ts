import { Injectable, InjectionToken } from '@angular/core';
import { EdcClient, Helper } from 'edc-web-publishing-js';

export const CONFIG = new InjectionToken('CONFIG');

@Injectable()
export class HelpService {

  private edcClient: EdcClient;

  constructor() {
    this.edcClient = new EdcClient('/doc/');
  }

  getHelp(primaryKey: string, subKey: string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }
}

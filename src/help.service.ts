import { Injectable } from '@angular/core';
import { EdcClient, Helper } from 'edc-web-publishing-js';
import { Promise } from 'es6-promise';

@Injectable()
export class HelpService {

  private edcClient: EdcClient;

  constructor() {
    this.edcClient = new EdcClient('/doc/');
  }

  getHelp(primaryKey: string, subKey:string): Promise<Helper> {
    return this.edcClient.getHelper(primaryKey, subKey);
  }
}

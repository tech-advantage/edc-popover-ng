import { Injectable } from '@angular/core';

@Injectable()
export class HelpService {

  getHelp() {
    return {
      title  : 'Message',
      seeAlso: [
        'labelEnDur1',
        'labelEnDur2'
      ],
      links  : [
        'linkEnDur1',
        'linklEnDur2'
      ]
    };
  }
}

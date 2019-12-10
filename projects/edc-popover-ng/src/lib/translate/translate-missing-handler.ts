import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class TranslateMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return '';
  }
}

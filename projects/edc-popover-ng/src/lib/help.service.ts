import { Injectable } from '@angular/core';
import { EdcClient } from 'edc-client-js';
import { PopoverConfigurationHandler } from './config/popover-configuration-handler';
import { SYS_LANG } from './translate/language-codes';

@Injectable()
export class HelpService {

  private readonly edcClient: EdcClient;

  constructor(private configurationHandler: PopoverConfigurationHandler) {
    this.edcClient = new EdcClient(configurationHandler.getDocPath(),
      configurationHandler.getHelpPath(),
      configurationHandler.getPluginId(),
      true, // Context only, don't load the whole doc
      configurationHandler.getI18nPath()
    );
  }

  getHelp(primaryKey: string, subKey: string, pluginId?: string, lang?: string): any {
    const pluginIdentifier = pluginId || this.configurationHandler.getPluginId();
    return this.edcClient.getHelper(primaryKey, subKey, pluginIdentifier, lang);
  }

  getContextUrl(mainKey: string, subKey: string, languageCode: string, articleIndex: number, pluginId?: string): string {
    return this.edcClient.getContextWebHelpUrl(mainKey, subKey, languageCode, articleIndex, pluginId);
  }

  getDocumentationUrl(docId: number): string {
    return this.edcClient.getDocumentationWebHelpUrl(docId);
  }

  getI18nUrl(): string {
    return this.edcClient.getPopoverI18nUrl();
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

  getDefaultLanguage(): string {
    return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
  }

  setCurrentLanguage(languageCode: string): any {
    return this.edcClient.changeCurrentLanguage(languageCode);
  }

  isLanguagePresent(langCode: string): boolean {
    return this.edcClient.isLanguagePresent(langCode);
  }
}

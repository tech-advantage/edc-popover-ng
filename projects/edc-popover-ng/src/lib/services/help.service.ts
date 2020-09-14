import { Injectable } from '@angular/core';
import { EdcClient, Helper, PopoverLabel } from 'edc-client-js';
import { PopoverConfigurationHandler } from '../config/popover-configuration-handler';
import { SYS_LANG } from '../translate/language-codes';
import { IEdcPopoverOptions } from '../config/edc-popover-options.interface';
import { EdcPopoverOptions } from '../config/edc-popover-options';

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

  getHelp(primaryKey: string, subKey: string, pluginId?: string, lang?: string): Promise<Helper> {
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

  getPopoverOptions(): IEdcPopoverOptions {
    return this.configurationHandler.getPopoverOptions() || new EdcPopoverOptions();
  }

  getDefaultLanguage(): string {
    return (this.edcClient && this.edcClient.getDefaultLanguage && this.edcClient.getDefaultLanguage()) || SYS_LANG;
  }

  isLanguagePresent(langCode: string): boolean {
    return this.edcClient.isLanguagePresent(langCode);
  }

  getPopoverLabels(langCode: string): Promise<PopoverLabel> {
    return this.edcClient.getPopoverLabels(langCode);
  }
}

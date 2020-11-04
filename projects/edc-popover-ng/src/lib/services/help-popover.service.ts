import { Injectable } from '@angular/core';
import { Article, Helper, Link, PopoverLabel } from 'edc-client-js';
import { IconPopoverConfig } from '../config/icon-popover-config';
import { ContentNotFoundError } from '../errors/content-not-found.error';
import { PopoverContent } from 'edc-popover-utils';
import { HelpService } from './help.service';
import { EdcTranslationService } from './edc-translation.service';

@Injectable()
export class HelpPopoverService {

  constructor(private readonly helpService: HelpService,
              private readonly translationService: EdcTranslationService) {
  }

  /**
   * Adds the popover content
   *
   * throws a ContentNotFoundError if helper is not defined
   *
   * @param helper the edc helper that will request the content using the edc-client-js instance
   * @param mainKey the brick primary key
   * @param subKey the brick sub key
   * @param lang the lang to use
   * @private
   */
  addContent(helper: Helper, mainKey: string, subKey: string, lang: string): IconPopoverConfig {
    const config = new IconPopoverConfig();
    if (!helper) {
      // The help client could not resolve any helper for the content, throw an error
      throw new ContentNotFoundError(mainKey, subKey, lang);
    }
    // Retrieve the language that the helper resolved, from the requested and the current export state
    const { language: resolvedLanguage } = helper;
    // Resolved language might be different from the requested, if content was not available in that language
    // Keep the language service up to date with the finally used language
    this.translationService.setLang(resolvedLanguage);
    // Extract and create the popover content
    const { label: title, description, articles, links } = helper;
    config.content = new PopoverContent(title, description, articles, links);
    // Parse articles and links urls
    this.parseUrls(config, mainKey, subKey, resolvedLanguage, helper.exportId);
    return config;
  }

  /**
   * Adds labels into the popover configuration
   *
   * @param config the popover configuration being created
   * @param lang the lang to use
   */
  addLabels(config: IconPopoverConfig, lang?: string): Promise<IconPopoverConfig> {
    return this.translationService.getPopoverLabels(lang)
      .then((translations: PopoverLabel) => {
        config.labels = translations;
        return config;
      });
  }

  /**
   * Sets the url attributes for links and articles to open in the web help explorer,
   * inserting the help path defined in the global configuration
   *
   * @param config the popover configuration
   * @param mainKey the brick primary key
   * @param subKey the brick sub key
   * @param lang the lang to use
   * @param pluginId the identifier of the published export the keys belong to
   * @private
   */
  private parseUrls(config: IconPopoverConfig, primaryKey: string, subKey: string, lang: string, pluginId?: string): void {
    if (!config || !config.content) {
      return;
    }
    const articles = config.content.articles || [];
    const links = config.content.links || [];
    articles.forEach((article: Article, index: number) =>
      article.url = this.helpService.getContextUrl(primaryKey, subKey, lang, index, pluginId));
    links.forEach((link: Link) => link.url = this.helpService.getDocumentationUrl(link.id));
  }
}

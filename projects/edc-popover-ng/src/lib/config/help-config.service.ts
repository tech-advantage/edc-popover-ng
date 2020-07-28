import { Injectable } from '@angular/core';
import { HelpService } from '../help.service';
import { Article, Helper, Link, PopoverLabel } from 'edc-client-js';
import { EdcTranslationService } from '../translate/edc-translation.service';
import { PopoverConfig, PopoverContent, PopoverOptions } from 'edc-popover-js';
import { Placement } from 'tippy.js';

@Injectable()
export class HelpConfigService {

  constructor(private readonly helpService: HelpService,
              private readonly translationService: EdcTranslationService) {
  }

  buildPopoverConfig(primaryKey: string,
                     subKey: string,
                     pluginId?: string,
                     lang?: string,
                     placement = 'bottom',
                     customClass?: string): Promise<void | PopoverConfig> {
    // Get the helper
    return this.helpService.getHelp(primaryKey, subKey, pluginId, lang)
      .then((helper: Helper) => this.addContent(helper, primaryKey, subKey, lang))
      .then((config: PopoverConfig) => this.addLabels(config))
      .then((config: PopoverConfig) => this.addOptions(config, placement, customClass))
      .catch((err: Error) => {
        console.error(err);
      });
  }

  getIcon(): string {
    return this.helpService.getIcon();
  }

  updateOptions(config: PopoverConfig, placement: Placement, customClass: string): PopoverConfig {
    if (!config) {
      return null;
    }
    config.options.placement = placement;
    config.options.customClass = customClass;
    return config;
  }

  private addContent(helper: Helper, primaryKey: string, subKey: string, lang: string): PopoverConfig {
    const config = new PopoverConfig();
    if (helper) {
      const { language: resolvedLanguage } = helper;
      if (resolvedLanguage !== lang) {
        console.warn(`Requested language ${lang} could not be loaded,
           content will be using default language ${helper.language} instead`);
      }
      // Set translation language for the labels
      this.translationService.setLang(resolvedLanguage);
      const { label: title, description, articles, links } = helper;
      config.content = Object.assign(new PopoverContent(), {
        title, description, articles, links
      });
      // Parse article and links urls
      this.parseUrls(config, primaryKey, subKey, resolvedLanguage, helper.exportId);
    } else {
      console.error(`Could not load Helper for the key ${primaryKey} and subKey ${subKey}`);
    }
    return config;
  }

  private parseUrls(config: PopoverConfig, primaryKey: string, subKey: string, lang: string, pluginId?: string): void {
    if (!config || !config.content) {
      return;
    }
    const articles = config.content.articles || [];
    const links = config.content.links || [];
    articles.forEach((article: Article, index: number) =>
      article.url = this.helpService.getContextUrl(primaryKey, subKey, lang, index, pluginId));
    links.forEach((link: Link) => link.url = this.helpService.getDocumentationUrl(link.id));
  }

  private addLabels(config: PopoverConfig): Promise<PopoverConfig> {
    return this.translationService.getTranslation()
      .then((translations: PopoverLabel) => {
        config.labels = translations;
        return config;
      })
      .catch(() => config);
  }

  private addOptions(config: PopoverConfig, placement: string, customClass: string): PopoverConfig {
    config.options = Object.assign(new PopoverOptions(), { placement, customClass });
    const container = this.helpService.getContainer();
    if (container && container !== 'body') {
      config.options.appendTo = 'parent';
    } else {
      config.options.appendTo = () => document.body;
    }
    return config;
  }
}

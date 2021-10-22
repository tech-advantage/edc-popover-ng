import { TestBed } from '@angular/core/testing';
import { HelpPopoverService } from './help-popover.service';
import { HelpService } from './help.service';
import { EdcTranslationService } from './edc-translation.service';
import { Article, Helper, Link, PopoverLabel } from 'edc-client-js';
import { mock, mockHelper } from '../utils/test-helpers';
import { DEFAULT_LABELS } from '../translate/default-translations';
import { SYS_LANG } from '../translate/language-codes';
import { IconPopoverConfig } from '../config/icon-popover-config';

describe('Help Popover service', () => {

  let helpPopoverService: HelpPopoverService;
  let helpServiceSpy: jasmine.SpyObj<HelpService>;
  let edcTranslationServiceSpy: { getPopoverLabels: jasmine.Spy, setLang: jasmine.Spy, getLang: jasmine.Spy, };

  // Mock objects
  let helper: Helper;

  beforeEach(() => {
    const helpSpy = jasmine.createSpyObj('HelpService', ['getHelp', 'getContextUrl', 'getDocumentationUrl', 'getContainer']);
    const translateSpy = jasmine.createSpyObj('EdcTranslationService', ['getLang', 'setLang', 'getPopoverLabels']);
    TestBed.configureTestingModule({
      providers: [
        HelpPopoverService,
        { provide: HelpService, useValue: helpSpy },
        { provide: EdcTranslationService, useValue: translateSpy },
      ]
    });

    helpPopoverService = TestBed.inject<HelpPopoverService>(HelpPopoverService);
    helpServiceSpy = TestBed.inject(HelpService) as jasmine.SpyObj<HelpService>;
    edcTranslationServiceSpy = TestBed.inject(EdcTranslationService) as jasmine.SpyObj<EdcTranslationService>;
  });

  beforeEach(() => {
    helper = mockHelper();
  });

  const initSpies = (helperToUse: Helper, labels: PopoverLabel | undefined = DEFAULT_LABELS.get(SYS_LANG)) => {
    helpServiceSpy.getHelp.and.returnValue(Promise.resolve(helperToUse));
    helpServiceSpy.getContextUrl
      .and.callFake((mainKey: string, subKey: string, languageCode: string, articleIndex: number) =>
      `articleUrl1/${mainKey}/${subKey}/${languageCode}/${articleIndex}/`);
    helpServiceSpy.getDocumentationUrl.and.callFake((docId: number) => `linkUrl1/${docId}/`);
    edcTranslationServiceSpy.getPopoverLabels.and.returnValue(Promise.resolve(labels));
    edcTranslationServiceSpy.setLang.and.stub();
  };

  describe('addContent', () => {

    it('should add content', () => {
      // Given the helper is set with base properties
      initSpies(helper);
      edcTranslationServiceSpy.getLang.and.returnValue('en');

      // When calling addContent
      const config: IconPopoverConfig = helpPopoverService.addContent(helper, 'myMainKey', 'mySubKey', 'en');

      // Then configuration and its main attributes should be defined
      expect(config).toBeDefined();
      expect(config.content).toBeDefined();
      const { title, description, articles, links } = config.content ?? {};
      expect(helpServiceSpy.getContextUrl).toHaveBeenCalledWith('myMainKey', 'mySubKey', 'en', 0, 'resolvedPluginId');
      expect(helpServiceSpy.getContextUrl).toHaveBeenCalledTimes(1);
      expect(title).toEqual('MyTitle');
      expect(description).toEqual('MyDescription');
      expect(articles?.length).toEqual(1);
      expect(articles).toContain(mock(Article, {
        label: 'articleLabel1',
        url: `articleUrl1/myMainKey/mySubKey/en/0/`
      }));
      expect(links?.length).toEqual(1);
      expect(helpServiceSpy.getDocumentationUrl).toHaveBeenCalledWith(7);
      expect(helpServiceSpy.getDocumentationUrl).toHaveBeenCalledTimes(1);
      expect(links).toContain(mock(Link, { id: 7, label: 'linkLabel1', url: `linkUrl1/7/` }));

    });
    // Description
    it('should return configuration if description is not defined', () => {
      // Given the helper is set with no description
      helper.description = null;
      initSpies(helper);

      // When calling addContent
      const config: IconPopoverConfig = helpPopoverService.addContent(helper, 'mainKey', 'subKey', 'en');

      // Then configuration and its main attributes should be defined, except for description
      const { title, description, articles, links } = config.content ?? {};
      expect(title).toEqual('MyTitle');
      expect(description).toBeFalsy();
      expect(articles?.length).toEqual(1);
      expect(links?.length).toEqual(1);
    });
    // Articles and links
    it('should return configuration if articles and links are empty', () => {
      // Given the helper is set with no articles and no links
      helper.articles = [];
      helper.links = [];
      initSpies(helper);

      // When calling addContent
      const config: IconPopoverConfig = helpPopoverService.addContent(helper, 'mainKey', 'subKey', 'en');

      // Then configuration and its main attributes should be defined, expect for articles and links
      const { title, description, articles, links } = config.content ?? {};
      expect(title).toEqual('MyTitle');
      expect(description).toEqual('MyDescription');
      expect(articles).toEqual([]);
      expect(links).toEqual([]);
    });

    // Language
    it('should add content', () => {
      // Given we call the helper for content in fr language but the helper came back with 'ru' as the resolved language
      helper.language = 'ru';
      edcTranslationServiceSpy.getLang.and.returnValue('ru');
      initSpies(helper);

      // When calling addContent
      helpPopoverService.addContent(helper, 'myMainKey', 'mySubKey', 'en');

      // Then translation service should be updated with the resolved language
      expect(edcTranslationServiceSpy.setLang).toHaveBeenCalledWith('ru');
      expect(helpServiceSpy.getContextUrl).toHaveBeenCalledWith('myMainKey', 'mySubKey', 'ru', 0, 'resolvedPluginId');
    });
  });

  describe('addLabels', () => {

    it('should return the translated labels', () => {
      // Given a custom label is return from the translation service
      const customLabels: PopoverLabel = {
        articles: 'Plus d\'info...',
        links: 'Sujets associés',
        iconAlt: 'Aide',
        comingSoon: 'Aide contextuelle à venir.',
        errors: {
          failedData: 'Une erreur est survenue lors de la récupération des données !' +
            '\\nVérifiez les clés de la brique fournies au composant EdcHelp.'
        },
        content: null,
        url: '',
        exportId: ''
      };
      initSpies(helper, customLabels);
      const config: IconPopoverConfig = new IconPopoverConfig();
      // When calling addLabels
      helpPopoverService.addLabels(config)
        .then((iPConfig: IconPopoverConfig) => {
          // Then popover labels should match
          expect(iPConfig.labels).toEqual(customLabels);
        });
    });

  });
});

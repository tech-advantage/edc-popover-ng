import { async, TestBed } from '@angular/core/testing';
import { HelpService } from '../help.service';
import { mock, mockService } from '../utils/test-helpers';
import { HelpConfigService } from './help-config.service';
import { PopoverConfig } from 'edc-popover-js';
import { EdcTranslationService } from '../translate/edc-translation.service';
import { Helper, Article, Link, PopoverLabel } from 'edc-client-js';
import { DEFAULT_LABELS } from '../translate/default-translations';
import { SYS_LANG } from '../translate/language-codes';

describe('Test Help Config service', () => {

  let helpConfigService: HelpConfigService;

  let helpServiceSpy: jasmine.SpyObj<HelpService>;
  let edcTranslationServiceSpy: { getTranslation: jasmine.Spy, setLang: jasmine.Spy, };

  // Mock objects
  let helper: Helper;

  beforeEach(() => {
    const helpSpy = jasmine.createSpyObj('HelpService', ['getHelp', 'getContextUrl', 'getDocumentationUrl', 'getContainer']);
    const configSpy = jasmine.createSpyObj('EdcTranslationService', ['setLang', 'getTranslation']);

    TestBed.configureTestingModule({
      providers: [
        HelpConfigService,
        { provide: HelpService, useValue: helpSpy },
        { provide: EdcTranslationService, useValue: configSpy },
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    helpConfigService = TestBed.inject<HelpConfigService>(HelpConfigService);
    helpServiceSpy = TestBed.inject(HelpService) as jasmine.SpyObj<HelpService>;
    edcTranslationServiceSpy = TestBed.inject(EdcTranslationService) as jasmine.SpyObj<EdcTranslationService>;
  });

  beforeEach(() => {
    helper = mock(Helper, {
      label: 'MyTitle',
      description: 'MyDescription',
      articles: [
        mock(Article, {
          label: 'articleLabel1',
          url: 'articleUrl1'
        })
      ],
      links: [
        mock(Link, {
          id: 7,
          label: 'linkLabel1',
          url: 'linkUrl1'
        })
      ],
      language: 'en',
      exportId: 'resolvedPlugindId'
    });

  });

  describe('buildPopoverConfig', () => {
    const initSpies = (helperToUse: Helper, labels: PopoverLabel = DEFAULT_LABELS.get(SYS_LANG)) => {
      helpServiceSpy.getHelp.and.returnValue(Promise.resolve(helperToUse));
      helpServiceSpy.getContextUrl
        .and.callFake((mainKey: string, subKey: string, languageCode: string, articleIndex: number) =>
        `articleUrl1/${mainKey}/${subKey}/${languageCode}/${articleIndex}/`);
      helpServiceSpy.getDocumentationUrl.and.callFake((docId: number) => `linkUrl1/${docId}/`);
      edcTranslationServiceSpy.getTranslation.and.returnValue(Promise.resolve(labels));
      edcTranslationServiceSpy.setLang.and.stub();
    };

    it('should build the popover configuration', () => {
      // Given we have the helper with common properties
      initSpies(helper);

      // When calling buildPopoverConfig
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: PopoverConfig) => {

          // Then configuration and its main attributes should be defined
          expect(config).toBeDefined();
          expect(config.content).toBeDefined();
          const { title, description, articles, links } = config.content;
          expect(helpServiceSpy.getContextUrl).toHaveBeenCalledWith('myMainKey', 'mySubKey', 'en', 0, 'resolvedPlugindId');
          expect(helpServiceSpy.getContextUrl).toHaveBeenCalledTimes(1);
          expect(title).toEqual('MyTitle');
          expect(description).toEqual('MyDescription');
          expect(articles.length).toEqual(1);
          expect(articles).toContain(mock(Article, {
            label: 'articleLabel1',
            url: `articleUrl1/myMainKey/mySubKey/en/0/`
          }));
          expect(links.length).toEqual(1);
          expect(helpServiceSpy.getDocumentationUrl).toHaveBeenCalledWith(7);
          expect(helpServiceSpy.getDocumentationUrl).toHaveBeenCalledTimes(1);
          expect(links).toContain(mock(Link, { id: 7, label: 'linkLabel1', url: `linkUrl1/7/` }));
        });
    });

    // Description
    it('should return configuration if description is not defined', () => {
      // Given we have the helper with no description
      helper.description = undefined;
      initSpies(helper);

      // When calling buildPopoverConfig
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: PopoverConfig) => {
          // Then configuration and its main attributes should be defined, except for description
          const { title, description, articles, links } = config.content;
          expect(title).toEqual('MyTitle');
          expect(description).toBeUndefined();
          expect(articles.length).toEqual(1);
          expect(links.length).toEqual(1);
        });
    });

    it('should return configuration if articles and links are not defined', () => {
      // Given we have the helper with no articles and no links
      helper.articles = undefined;
      helper.links = undefined;

      initSpies(helper);


      // When calling buildPopoverConfig
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: PopoverConfig) => {
          // Then configuration and its main attributes should be defined, expect for articles and links
          const { title, description, articles, links } = config.content;
          expect(title).toEqual('MyTitle');
          expect(description).toEqual('MyDescription');
          expect(articles).toBeUndefined();
          expect(links).toBeUndefined();
        });
    });


    // Labels
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

      // When calling buildPopoverConfig
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: PopoverConfig) => {
          // Then popover labels should match
          expect(config.labels).toEqual(customLabels);
        });
    });

    // Language
    it('should set the language resolved by the helper', () => {
      // Given we call the helper for content in fr language but the helper came back with 'ru' as the resolved language
      helper.language = 'ru';
      initSpies(helper);

      // When calling buildPopoverConfig requesting the content in french
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'fr')
        .then((config: PopoverConfig) => {
          // Then translation service should be updated with the resolved language
          expect(edcTranslationServiceSpy.setLang).toHaveBeenCalledWith('ru');
          // And the get context url too
          expect(helpServiceSpy.getContextUrl).toHaveBeenCalledWith('myMainKey', 'mySubKey', 'ru', 0, 'resolvedPlugindId');
        });
    });

    // Options
    it('should set the append to option to body and placement to bottom', () => {
      // Given set the append to option to ''
      helpServiceSpy.getContainer.and.returnValue(null);
      initSpies(helper);

      // When calling buildPopoverConfig requesting the content in french
      helpConfigService.buildPopoverConfig('myMainKey', 'mySubKey', 'myPluginId', 'en')
        .then((config: PopoverConfig) => {
          // Then append to option should be set as parent, via the function returning the body element
          expect(typeof config.options.appendTo).toEqual('function');
          // Bottom should be set from default value
          expect(config.options.placement).toEqual('bottom');
          expect(config.options.customClass).toBeUndefined();
        });
    });
    it('should set the append to option to parent and placement to top', () => {
      // Given set the append to option to 'parent'
      helpServiceSpy.getContainer.and.returnValue('parent');
      initSpies(helper);

      // When calling buildPopoverConfig requesting the content in french
      helpConfigService.buildPopoverConfig('myMainKey',
        'mySubKey',
        'myPluginId',
        'en',
        'top',
        'my-custom-class')
        .then((config: PopoverConfig) => {
          // Then append to option should be set as parent
          expect(config.options.appendTo).toEqual('parent');
          // Bottom should be set from default value
          expect(config.options.placement).toEqual('top');
          // Custom class should have been set to "my-custom-class"
          expect(config.options.customClass).toEqual('my-custom-class');
        });
    });

  });
});

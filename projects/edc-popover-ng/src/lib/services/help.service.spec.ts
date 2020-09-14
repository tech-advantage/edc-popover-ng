import { HelpService } from './help.service';
import { async, TestBed } from '@angular/core/testing';
import { PopoverConfigurationHandler } from '../config/popover-configuration-handler';
import { mockService } from '../utils/test-helpers';
import { EdcClient } from 'edc-client-js';

describe('Help Service Test', () => {

  let popoverConfigurationHandler: PopoverConfigurationHandler;
  let helpService: HelpService;

  // mock EdcClient
  beforeEach(() => {
    spyOn(EdcClient.prototype, 'getHelper').and.returnValue(Promise.resolve());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpService,
        mockService(PopoverConfigurationHandler, ['getHelpPath', 'getDocPath', 'getPluginId', 'isAppendToBody', 'getI18nPath'])
      ]
    });
  });

  beforeEach(() => {
    popoverConfigurationHandler = TestBed.inject<PopoverConfigurationHandler>(PopoverConfigurationHandler);
    helpService = TestBed.inject<HelpService>(HelpService);
  });

  beforeEach(() => {
    spyOn(popoverConfigurationHandler, 'getDocPath').and.returnValue('/doc');
    spyOn(popoverConfigurationHandler, 'getHelpPath').and.returnValue('/help');
    spyOn(popoverConfigurationHandler, 'getPluginId').and.returnValue('edchelp');
  });

  describe('getHelp', () => {

    it('should use "edchelp" as plugin identifier if getHelper is called with no defined pluginId parameter', async(() => {
      expect(popoverConfigurationHandler.getPluginId()).toEqual('edchelp');

      helpService.getHelp('mainKey', 'subKey').then(() => {
      });

      expect(EdcClient.prototype.getHelper).toHaveBeenCalledWith('mainKey', 'subKey', 'edchelp', undefined);
    }));

    it('should use "edchelp2" as plugin identifier', async(() => {
      expect(popoverConfigurationHandler.getPluginId()).toEqual('edchelp');

      helpService.getHelp('mainKey', 'subKey', 'edchelp2').then(() => {
      });

      expect(EdcClient.prototype.getHelper).toHaveBeenCalledWith('mainKey', 'subKey', 'edchelp2', undefined);
    }));
  });

});

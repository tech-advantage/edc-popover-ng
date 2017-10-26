import { HelpComponent } from './help.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { mockService, mock } from './utils/test-helpers';

describe('Help component', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let helpService: HelpService;
  let link: Link;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpComponent
      ],
      imports: [
        PopoverModule.forRoot()
      ],
      providers: [
        mockService(HelpService, ['getHelp', 'getHelpPath', 'getIcon', 'getContainer', 'getPluginId'])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    helpService = TestBed.get(HelpService);

    spyOn(helpService, 'getHelpPath').and.returnValue('/help/#');
  });

  describe('init', () => {
    it('should create', async(() => {
      expect(component).toBeTruthy();
    }));
  });

  describe('runtime', () => {

    describe('getPlacement', () => {

      beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should return bottom if placement is NOT defined', () => {
        // given placement is not set

        // when calling getPlacement()
        const testPlacement = component.getPlacement();

        // then returned value should be 'bottom'
        expect(testPlacement).toEqual('bottom');
      });

      it('should return placement if placement is defined', () => {
        // given placement value is 'up'
        component.placement = 'up';

        // when calling getPlacement()
        const testPlacement = component.getPlacement();

        // then returned value should be 'up'
        expect(testPlacement).toEqual('up');
      });
    });

    describe('goToArticle', () => {

      beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn(window, 'open');
      });

      it('should open a new window', () => {
        spyOn(helpService, 'getPluginId').and.returnValue('myPluginId');

        // given key value is 'myKey' and subKey value is 'mySubKey'
        component.key = 'myKey';
        component.subKey = 'mySubKey';

        // when calling goToArticle() with index 1
        const url = `/help/#/context/myPluginId/myKey/mySubKey/en/1`;
        component.goToArticle(1);

        // then window.open() should be called
        expect(window.open).toHaveBeenCalledWith(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
      });

      it('should show a warning in console if plugin in was not found', () => {
        spyOn(helpService, 'getPluginId').and.returnValue('');
        spyOn(console, 'warn');
        // given key value is 'myKey' and subKey value is 'mySubKey'
        component.key = 'myKey';
        component.subKey = 'mySubKey';

        // when calling goToArticle() with index 1
        const url = `/help/#/context/myKey/mySubKey/en/1`;
        component.goToArticle(1);

        expect(console.warn).toHaveBeenCalledWith(
          'Please check if plugin Id was correctly set in the edc-popover-ng configuration handler');

        // then window.open() should be called
        expect(window.open).toHaveBeenCalledWith(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
      });
    });

    describe('goToLink', () => {

      beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn(window, 'open');
      });

      it('should open a new window', () => {
        // given link is a Link with id value 1
        link = mock(Link, {id: 1});

        // when calling goToArticle() with link
        const url = `/help/#/doc/1`;
        component.goToLink(link);

        // then window.open() should be called
        expect(window.open).toHaveBeenCalledWith(url, 'help', 'scrollbars=1,resizable=1,height=800,width=1200');
      });

    });
  });
});

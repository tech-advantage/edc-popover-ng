import { HelpComponent } from './help.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HelpService } from './help.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockService } from './utils/test-helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('Help component', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpComponent
      ],
      imports: [
        NgbModule.forRoot()
      ],
      providers: [
        mockService(HelpService, ['getHelp'])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});

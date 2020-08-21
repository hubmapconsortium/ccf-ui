import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionSitesMenuComponent } from './extraction-sites-menu.component';

describe('ExtractionSitesMenuComponent', () => {
  let component: ExtractionSitesMenuComponent;
  let fixture: ComponentFixture<ExtractionSitesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractionSitesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionSitesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

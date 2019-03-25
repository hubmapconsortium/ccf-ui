import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissuesBrowserComponent } from './tissues-browser.component';

describe('TissuesBrowserComponent', () => {
  let component: TissuesBrowserComponent;
  let fixture: ComponentFixture<TissuesBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissuesBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissuesBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissuesBrowserGridPopoverContentComponent } from './tissues-browser-grid-popover-content.component';

describe('TissuesBrowserGridPopoverContentComponent', () => {
  let component: TissuesBrowserGridPopoverContentComponent;
  let fixture: ComponentFixture<TissuesBrowserGridPopoverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissuesBrowserGridPopoverContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissuesBrowserGridPopoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

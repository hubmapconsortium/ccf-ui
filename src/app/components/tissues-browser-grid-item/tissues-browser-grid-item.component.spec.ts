import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissuesBrowserGridItemComponent } from './tissues-browser-grid-item.component';

describe('TissuesBrowserGridItemComponent', () => {
  let component: TissuesBrowserGridItemComponent;
  let fixture: ComponentFixture<TissuesBrowserGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissuesBrowserGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissuesBrowserGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

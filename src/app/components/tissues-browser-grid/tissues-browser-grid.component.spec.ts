import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TissuesBrowserGridComponent } from './tissues-browser-grid.component';

describe('TissuesBrowserGridComponent', () => {
  let component: TissuesBrowserGridComponent;
  let fixture: ComponentFixture<TissuesBrowserGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissuesBrowserGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissuesBrowserGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfImageViewerComponent } from './ccf-image-viewer.component';

describe('CcfImageViewerComponent', () => {
  let component: CcfImageViewerComponent;
  let fixture: ComponentFixture<CcfImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcfImageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcfImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

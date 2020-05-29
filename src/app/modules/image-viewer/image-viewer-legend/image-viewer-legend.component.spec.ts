import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerLegendComponent } from './image-viewer-legend.component';

describe('ImageViewerLegendComponent', () => {
  let component: ImageViewerLegendComponent;
  let fixture: ComponentFixture<ImageViewerLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

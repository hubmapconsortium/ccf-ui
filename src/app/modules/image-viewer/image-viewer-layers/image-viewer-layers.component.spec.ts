import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerLayersComponent } from './image-viewer-layers.component';

describe('ImageViewerLayersComponent', () => {
  let component: ImageViewerLayersComponent;
  let fixture: ComponentFixture<ImageViewerLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

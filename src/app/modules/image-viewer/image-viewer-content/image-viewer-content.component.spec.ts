import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerContentComponent } from './image-viewer-content.component';

describe('ImageViewerContentComponent', () => {
  let component: ImageViewerContentComponent;
  let fixture: ComponentFixture<ImageViewerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

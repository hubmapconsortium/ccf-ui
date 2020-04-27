import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerPopoverComponent } from './image-viewer-popover.component';

describe('ImageViewerComponent', () => {
  let component: ImageViewerPopoverComponent;
  let fixture: ComponentFixture<ImageViewerPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

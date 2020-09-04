import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoModalLauncherComponent } from './video-modal-launcher.component';

describe('VideoModalLauncherComponent', () => {
  let component: VideoModalLauncherComponent;
  let fixture: ComponentFixture<VideoModalLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoModalLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

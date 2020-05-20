import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerLauncherComponent } from './color-picker-launcher.component';

describe('ColorPickerLauncherComponent', () => {
  let component: ColorPickerLauncherComponent;
  let fixture: ComponentFixture<ColorPickerLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

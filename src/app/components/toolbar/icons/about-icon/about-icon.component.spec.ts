import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIconComponent } from './about-icon.component';

describe('AboutIconComponent', () => {
  let component: AboutIconComponent;
  let fixture: ComponentFixture<AboutIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

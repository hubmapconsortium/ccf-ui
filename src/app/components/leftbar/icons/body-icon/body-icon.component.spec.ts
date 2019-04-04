import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyIconComponent } from './body-icon.component';

describe('BodyIconComponent', () => {
  let component: BodyIconComponent;
  let fixture: ComponentFixture<BodyIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

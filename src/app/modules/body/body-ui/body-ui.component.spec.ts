import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyUiComponent } from './body-ui.component';

describe('BodyUiComponent', () => {
  let component: BodyUiComponent;
  let fixture: ComponentFixture<BodyUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

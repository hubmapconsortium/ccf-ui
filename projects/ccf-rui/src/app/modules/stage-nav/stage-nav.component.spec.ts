import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageNavComponent } from './stage-nav.component';

describe('StageNavComponent', () => {
  let component: StageNavComponent;
  let fixture: ComponentFixture<StageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

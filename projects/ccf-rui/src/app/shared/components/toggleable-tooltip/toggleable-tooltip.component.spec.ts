import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleableTooltipComponent } from './toggleable-tooltip.component';

describe('ToggleableTooltipComponent', () => {
  let component: ToggleableTooltipComponent;
  let fixture: ComponentFixture<ToggleableTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleableTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleableTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

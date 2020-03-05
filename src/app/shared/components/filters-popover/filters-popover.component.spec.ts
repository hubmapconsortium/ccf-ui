import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPopoverComponent } from './filters-popover.component';

describe('FiltersPopoverComponent', () => {
  let component: FiltersPopoverComponent;
  let fixture: ComponentFixture<FiltersPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

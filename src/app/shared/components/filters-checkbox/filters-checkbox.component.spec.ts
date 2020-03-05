import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersCheckboxComponent } from './filters-checkbox.component';

describe('FiltersCheckboxComponent', () => {
  let component: FiltersCheckboxComponent;
  let fixture: ComponentFixture<FiltersCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

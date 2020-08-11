import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganSelectorComponent } from './organ-selector.component';

describe('OrganSelectorComponent', () => {
  let component: OrganSelectorComponent;
  let fixture: ComponentFixture<OrganSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganComponent } from './organ.component';

describe('OrganComponent', () => {
  let component: OrganComponent;
  let fixture: ComponentFixture<OrganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

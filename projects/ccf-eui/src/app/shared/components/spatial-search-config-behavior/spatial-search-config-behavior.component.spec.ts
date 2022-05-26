import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';

describe('SpatialSearchConfigBehaviorComponent', () => {
  let component: SpatialSearchConfigBehaviorComponent;
  let fixture: ComponentFixture<SpatialSearchConfigBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpatialSearchConfigBehaviorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialSearchConfigBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

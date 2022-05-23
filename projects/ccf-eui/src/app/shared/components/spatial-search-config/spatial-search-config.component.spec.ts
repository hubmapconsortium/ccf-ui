import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';

describe('SpatialSearchConfigComponent', () => {
  let component: SpatialSearchConfigComponent;
  let fixture: ComponentFixture<SpatialSearchConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpatialSearchConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialSearchConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

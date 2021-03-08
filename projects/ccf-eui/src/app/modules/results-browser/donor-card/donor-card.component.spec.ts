import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorCardComponent } from './donor-card.component';

describe('DonorCardComponent', () => {
  let component: DonorCardComponent;
  let fixture: ComponentFixture<DonorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

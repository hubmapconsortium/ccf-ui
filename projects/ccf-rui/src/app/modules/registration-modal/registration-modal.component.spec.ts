import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationModalComponent } from './registration-modal.component';

describe('RegistrationModalComponent', () => {
  let component: RegistrationModalComponent;
  let fixture: ComponentFixture<RegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

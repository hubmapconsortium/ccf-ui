import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMetadataComponent } from './registration-metadata.component';

describe('RegistrationMetadataComponent', () => {
  let component: RegistrationMetadataComponent;
  let fixture: ComponentFixture<RegistrationMetadataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationMetadataComponent]
    });
    fixture = TestBed.createComponent(RegistrationMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMetadataModuleComponent } from './registration-metadata-module.component';

describe('RegistrationMetadataModuleComponent', () => {
  let component: RegistrationMetadataModuleComponent;
  let fixture: ComponentFixture<RegistrationMetadataModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationMetadataModuleComponent]
    });
    fixture = TestBed.createComponent(RegistrationMetadataModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

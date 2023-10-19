import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';
import { RegistrationMetadataComponent } from './registration-metadata.component';

describe('RegistrationMetadataComponent', () => {
  let component: RegistrationMetadataComponent;
  let fixture: ComponentFixture<RegistrationMetadataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationMetadataComponent],
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([ModelState, GlobalConfigState, RegistrationState, PageState])
      ],
      providers: [
        ModelState,
        GlobalConfigState,
        RegistrationState,
        PageState
      ]
    });
    fixture = TestBed.createComponent(RegistrationMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

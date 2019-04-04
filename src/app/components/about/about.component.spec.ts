import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AboutModalService } from 'src/app/shared/services/about-modal.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutModalService: AboutModalService;
  const mockedAboutModalService = {
    closeAbout: (): void => undefined
  };

  beforeEach(async(() => {
    const mockProviders: Provider[] = [
      { provide: AboutModalService, useValue: mockedAboutModalService }
    ];
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: mockProviders,
      imports: [ MatIconModule, MatDialogModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    aboutModalService  = TestBed.get(AboutModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    spyOn(aboutModalService, 'closeAbout');
    component.close();
    expect(aboutModalService.closeAbout).toHaveBeenCalled();
  });
});

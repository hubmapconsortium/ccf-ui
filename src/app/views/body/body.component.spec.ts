import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { of as rxOf } from 'rxjs';
import { MockComponent } from 'ng-mocks';

import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { BodyComponent } from './body.component';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyComponent, MockComponent(RouterLink) ],
      providers: [
        { provide: BodyDataService,
          useValue: {
            getBodySourcePath: () => rxOf(''),
            getMetadata: () => rxOf({}),
            getBodyOverlays: () => rxOf([])
          }
        },
        { provide: NavigationService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

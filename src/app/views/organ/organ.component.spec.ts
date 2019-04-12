import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganComponent } from './organ.component';

describe('OrganComponent', () => {
  let component: OrganComponent;
  let fixture: ComponentFixture<OrganComponent>;
  const mockNavigationService = {};
  const mockOrganService = {
    getOrganSourcePath: (): Observable<string> => of('1', '2', '3', '4', '5')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganComponent, MockComponent(RouterLink)],
      providers: [
        { provide: OrganDataService, useValue: mockOrganService },
        { provide: NavigationService, useValue: mockNavigationService }
      ]
    }).compileComponents();
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

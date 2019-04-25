import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { MetadataComponent } from 'src/app/components/metadata/metadata.component';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganComponent } from './organ.component';
import { TissueSample } from 'src/app/shared/state/database/database.models';

describe('OrganComponent', () => {
  let component: OrganComponent;
  let fixture: ComponentFixture<OrganComponent>;
  const mockNavigationService = {
    createTissuePath: (a: string): [string, string] => ['/test', 'test']
  };
  const mockOrganService = {
    getOrganSourcePath: (): Observable<string> => of('5'),
    getAllTissueSamples: (): Observable<TissueSample[]> => of([{id: 'kidney'}] as TissueSample[])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganComponent, MockComponents(RouterLink, MetadataComponent)],
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

  it('should getOrganImageSourcePath', () => {
    component.getOrganImageSourcePath();
    expect(component.organImagePath).toEqual('5');
  });

  it('should getTissueSamples', () => {
    component.getTissueSamples();
    expect(component.tissueSamples).not.toBeUndefined();
  });

  it('should onTissueSampleMouseenter', () => {
    component.onTissueSampleMouseenter({'Age': '38'});
    expect(component.tissueSamples).not.toBeUndefined();
  });
});

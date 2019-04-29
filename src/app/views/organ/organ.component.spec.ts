import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { MetadataComponent } from 'src/app/components/metadata/metadata.component';
import { OrganDataService, CountMetadata } from 'src/app/shared/services/organ-data/organ-data.service';
import { TissueSample } from 'src/app/shared/state/database/database.models';

import { OrganComponent } from './organ.component';

describe('OrganComponent', () => {
  let component: OrganComponent;
  let fixture: ComponentFixture<OrganComponent>;
  const mockOrganService = {
    getOrganSourcePath: (): Observable<string> => of('5'),
    getAllTissueSamples: (): Observable<TissueSample[]> => of([{id: 'kidney'}] as TissueSample[]),
    getActiveOrgan: (): Observable<{id: string}> => of({id: 'kidney'}),
    getCounts: (): CountMetadata => ({cells: 0, patients: 0, tissueImages: 0, tissueSlices: 0, tissueSamples: 0})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganComponent, MockComponents(RouterLink, MetadataComponent)],
      providers: [
        { provide: OrganDataService, useValue: mockOrganService }
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
    component.getTissueSamples('kidney');
    expect(component.tissueSamples).not.toBeUndefined();
  });

  it('should onTissueSampleMouseenter', () => {
    component.onTissueSampleMouseenter({'Age': '38'});
    expect(component.tissueSamples).not.toBeUndefined();
  });
});

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockRender } from 'ng-mocks';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueComponent } from './tissue.component';
import { Subject } from 'rxjs';

describe('TissueComponent', () => {
  const mockedDataService = {
    getTissueSourcePath() {
      return mockedDataService.getTissueSourcePathSubject = new Subject();
    },
    getMetadata() {
      return mockedDataService.getMetadataSubject = new Subject();
    },

    getTissueSourcePathSubject: undefined as Subject<any>,
    getMetadataSubject: undefined as Subject<any>
  };

  let component: TissueComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ }>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TissueComponent],
      providers: [
        { provide: TissueDataService, useValue: mockedDataService }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-tissue></ccf-tissue>
    `, { });

    element = fixture.debugElement.query(By.directive(TissueComponent));
    component = element.componentInstance;
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('tissueMetadata', () => {
      const data = 'abcdef jklmno';

      beforeEach(() => {
        mockedDataService.getMetadataSubject.next(data);
      });

      it('sets data from the service', () => {
        expect(component.tissueMetadata).toEqual(data);
      });
    });

    describe('launchTissueViewer(path)', () => {
      const data = '/assets/path';
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = spyOn(component, 'launchTissueViewer');
      });

      beforeEach(() => {
        mockedDataService.getTissueSourcePathSubject.next(data);
      });

      it('is called when the source path is emitted', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('is called with the source path', () => {
        expect(spy).toHaveBeenCalledWith(data);
      });
    });
  });

  describe('dom', () => {
    describe('tissue-view', () => {
      let view: DebugElement;

      beforeEach(() => {
        view = element.query(By.css('#tissue-view'));
      });

      it('exists', () => {
        expect(view).toBeTruthy();
      });
    });
  });
});

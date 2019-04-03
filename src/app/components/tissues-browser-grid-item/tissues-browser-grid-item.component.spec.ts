import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockRender } from 'ng-mocks';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { OntologyNode } from '../../shared/state/ontology/ontology.model';
import { TissuesBrowserGridItemComponent } from './tissues-browser-grid-item.component';

describe('TissuesBrowserGridItemComponent', () => {
  let component: TissuesBrowserGridItemComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ item: OntologyNode }>;
  let item: OntologyNode;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TissuesBrowserGridItemComponent],
      providers: [
        { provide: NavigationService, useValue: { navigateToTissue: () => undefined } }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-tissues-browser-grid-item [item]="item">
      </ccf-tissues-browser-grid-item>
    `, {
      item: {
        id: 'test',
        tileUrl: 'anUrlButNotReally',
        description: 'abcdef'
      } as OntologyNode
    });

    element = fixture.debugElement.query(By.directive(TissuesBrowserGridItemComponent));
    component = element.componentInstance;
    item = fixture.componentInstance.item;
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('tileUrl', () => {
      it('is the same as the item\'s tileUrl', () => {
        expect(component.tileUrl).toEqual(item.tileUrl);
      });
    });

    describe('description', () => {
      it('is the same as the item\'s description', () => {
        expect(component.description).toEqual(item.description);
      });

      it('has a default', () => {
        fixture.componentInstance.item = { id: 'foo' } as any;
        expect(component.description).toBeTruthy();
      });
    });

    describe('navigateToTissue()', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        const service = TestBed.get(NavigationService);
        spy = spyOn(service, 'navigateToTissue');
      });

      beforeEach(() => {
        component.navigateToTissue();
      });

      it('calls the service to navigate', () => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('dom', () => {
    describe('tile', () => {
      let tile: DebugElement;

      beforeEach(() => {
        tile = element.query(By.css('.tile'));
      });

      it('exists', () => {
        expect(tile).toBeTruthy();
      });

      it('has the src attribute set', () => {
        expect(tile.attributes['src']).toBeTruthy();
      });

      it('has an alt attribute set', () => {
        expect(tile.attributes['alt']).toBeTruthy();
      });
    });
  });
});

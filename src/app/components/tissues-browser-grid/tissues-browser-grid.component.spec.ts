import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockModule, MockRender } from 'ng-mocks';
import { PopoverModule } from 'ngx-smart-popover';

import { TissuesBrowserGridItemModule } from '../tissues-browser-grid-item/tissues-browser-grid-item.module';
import {
  TissuesBrowserGridPopoverContentModule,
} from '../tissues-browser-grid-popover-content/tissues-browser-grid-popover-content.module';
import { TissuesBrowserGridComponent } from './tissues-browser-grid.component';

describe('TissuesBrowserGridComponent', () => {
  let component: TissuesBrowserGridComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ items: any[], numColumns: number }>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(PopoverModule),
        MockModule(TissuesBrowserGridItemModule),
        MockModule(TissuesBrowserGridPopoverContentModule)
      ],
      declarations: [
        TissuesBrowserGridComponent
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-tissues-browser-grid [items]="items" [numColumns]="numColumns">
      </ccf-tissues-browser-grid>
    `, {
      items: [1, 2, 3, 4],
      numColumns: 4
    });

    element = fixture.debugElement.query(By.directive(TissuesBrowserGridComponent));
    component = element.componentInstance;
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('itemWidthPercentage', () => {
      it('is a percentage', () => {
        expect(component.itemWidthPercentage).toMatch(/.*%/);
      });

      it('sets the width based on the number of columns', () => {
        expect(component.itemWidthPercentage).toEqual('25.00%');
      });
    });

    describe('setActivePopoverItem', () => {
      beforeEach(() => {
        component.setActivePopoverItem({ });
      });

      it('sets the active popover item', () => {
        expect(component.activePopoverItem).toBeDefined();
      });
    });

    describe('clearActivePopoverItem', () => {
      beforeEach(() => {
        component.setActivePopoverItem({ });
        component.clearActivePopoverItem();
      });

      it('clears the active popover item', () => {
        expect(component.activePopoverItem).toBeUndefined();
      });
    });
  });

  describe('dom', () => {
    describe('grid', () => {
      let grid: DebugElement;
      let items: DebugElement[];

      beforeEach(() => {
        grid = element.query(By.css('.grid'));
        items = element.queryAll(By.css('.item'));
      });

      it('exists', () => {
        expect(grid).toBeTruthy();
      });

      it('has items', () => {
        expect(items).toBeTruthy();
        expect(items.length).toBeGreaterThan(0);
      });

      it('has one item for each input value', () => {
        expect(items.length).toEqual(4);
      });

      it('sets the width on each item', () => {
        expect(items[0].styles).toEqual(jasmine.objectContaining({ width: '25.00%' }));
      });
    });

    describe('popover', () => {
      let popover: DebugElement;

      beforeEach(() => {
        popover = element.query(By.css('.popover-container'));
      });

      it('exists', () => {
        expect(popover).toBeTruthy();
      });
    });
  });
});

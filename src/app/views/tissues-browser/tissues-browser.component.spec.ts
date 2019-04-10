import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockModule, MockRender } from 'ng-mocks';
import { Subject, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { TissuesBrowserGridModule } from '../../components/tissues-browser-grid/tissues-browser-grid.module';
import { TissuesBrowserDataService } from '../../shared/services/tissues-browser-data/tissues-browser-data.service';
import { TissuesBrowserComponent } from './tissues-browser.component';

describe('TissuesBrowserComponent', () => {
  let component: TissuesBrowserComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockModule(TissuesBrowserGridModule)],
      declarations: [TissuesBrowserComponent],
      providers: [
        { provide: TissuesBrowserDataService, useValue: { data: new Subject() } }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-tissues-browser>
      </ccf-tissues-browser>
    `);

    element = fixture.debugElement.query(By.directive(TissuesBrowserComponent));
    component = element.componentInstance;
  });

  describe('component', () => {
    it('exists', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('dom', () => {
    describe('grid', () => {
      let grid: DebugElement;

      beforeEach(() => {
        grid = element.query(By.css('.grid'));
      });

      it('exists', () => {
        expect(grid).toBeTruthy();
      });
    });
  });
});

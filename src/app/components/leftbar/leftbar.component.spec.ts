import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockRender } from 'ng-mocks';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { LeftbarComponent } from './leftbar.component';
import { Subject } from 'rxjs';

describe('LeftbarComponent', () => {
  const mockedNavigationService = {
    organPath: new Subject(),
    tissuePath: new Subject()
  };

  let component: LeftbarComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ searchActive: boolean }>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MockModule(MatIconModule)],
      declarations: [LeftbarComponent],
      providers: [
        { provide: NavigationService, useValue: mockedNavigationService }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-leftbar [(searchActive)]="searchActive">
      </ccf-leftbar>
    `, {
      searchActive: false
    });

    element = fixture.debugElement.query(By.directive(LeftbarComponent));
    component = element.componentInstance;
  });

  describe('component', () => {
    it('creates', () => {
      expect(component).toBeTruthy();
    });

    describe('toggleSearchActive()', () => {
      let event: Promise<boolean>;

      beforeEach(() => {
        event = component.searchActiveChange.pipe(
          rxTake(1),
          rxTimeout(1000)
        ).toPromise();
      });

      beforeEach(() => {
        component.toggleSearchActive();
      });

      it('toggles the activeSearch value', () => {
        expect(component.searchActive).toBeTruthy();
      });

      it('emits values to activeSearchChange', async () => {
        expect(await event).toBeTruthy();
      });
    });
  });

  describe('dom', () => {
    function describeItem(cls: string, content?: string): void {
      if (content === undefined) { content = cls.toUpperCase(); }
      describe(cls, () => {
        let item: DebugElement;

        beforeEach(() => {
          item = element.query(By.css('.' + cls));
        });

        it('exists', () => {
          expect(item).toBeTruthy();
        });

        describe('icon', () => {
          let icon: DebugElement;

          beforeEach(() => {
            icon = item.query(By.css('.icon'));
          });

          it('exists', () => {
            expect(icon).toBeTruthy();
          });
        });

        describe('label', () => {
          let label: DebugElement;

          beforeEach(() => {
            label = item.query(By.css('.label'));
          });

          it('exists', () => {
            expect(label).toBeTruthy();
          });

          it('has the expected contents', () => {
            const actualContent: string = label.nativeElement.textContent;
            expect(actualContent.trim()).toEqual(content);
          });
        });
      });
    }

    describe('search', () => {
      let search: DebugElement;

      beforeEach(() => {
        search = element.query(By.css('.search'));
      });

      it('exists', () => {
        expect(search).toBeTruthy();
      });

      describe('.active', () => {
        it('does not have the class when searchActive === false', () => {
          expect(search.classes['active']).toBeFalsy();
        });

        it('has the class when searchActive === true', async () => {
          component.searchActive = true;
          fixture.detectChanges();
          expect(search.classes['active']).toBeTruthy();
        });
      });

      describe('onclick', () => {
        let spy: jasmine.Spy;

        beforeEach(() => {
          spy = spyOn(component, 'toggleSearchActive');
        });

        beforeEach(() => {
          search.triggerEventHandler('click', { });
        });

        it('calls toggleSearchActive', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describeItem('home');
    describeItem('body');
    describeItem('tissues-browser', 'TISSUE');
    describeItem('feedback', 'Comment');

    describe('disabled by default items', () => {
      beforeEach(() => {
        mockedNavigationService.organPath.next('a');
        mockedNavigationService.tissuePath.next('b');
        fixture.detectChanges();
      });

      describeItem('organ');
      describeItem('tissue', 'CELL');
    });
  });
});

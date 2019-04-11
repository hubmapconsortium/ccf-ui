import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockRender } from 'ng-mocks';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { TissueImage } from '../../shared/state/database/database.models';
import { TissuesBrowserGridItemComponent } from './tissues-browser-grid-item.component';

describe('TissuesBrowserGridItemComponent', () => {
  const mockedNavigationService = {
    createTissuePath: () => undefined
  };
  let component: TissuesBrowserGridItemComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ item: TissueImage }>;
  let item: TissueImage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TissuesBrowserGridItemComponent],
      providers: [
        { provide: NavigationService, useValue: mockedNavigationService }
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
        thumbnailUrl: 'anUrlButNotReally'
      } as TissueImage
    });

    element = fixture.debugElement.query(By.directive(TissuesBrowserGridItemComponent));
    component = element.componentInstance;
    item = fixture.componentInstance.item;
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('thumbnailUrl', () => {
      let spy: jasmine.Spy;
      let value: SafeStyle;

      beforeEach(() => {
        const sanitizer: DomSanitizer = TestBed.get(DomSanitizer);
        spy = spyOn(sanitizer, 'bypassSecurityTrustStyle').and.callThrough();
      });

      beforeEach(() => {
        value = component.thumbnailUrl;
      });

      it('has a value', () => {
        expect(value).toBeTruthy();
      });

      it('calls the sanitizer to produce a safe background url', () => {
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
    });
  });
});

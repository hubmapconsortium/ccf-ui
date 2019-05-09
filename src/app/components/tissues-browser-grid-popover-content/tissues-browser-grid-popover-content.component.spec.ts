import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { fromPairs as loFromPairs } from 'lodash';
import { MockModule, MockRender } from 'ng-mocks';

import { TissueImage } from '../../shared/state/database/database.models';
import { TissuesBrowserGridPopoverContentComponent } from './tissues-browser-grid-popover-content.component';

describe('TissuesBrowserGridPopoverContentComponent', () => {
  const thumbnailMetadataEntries: [string, any][] = [
    ['a', 'b'],
    ['c', 'd']
  ];

  let component: TissuesBrowserGridPopoverContentComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ item: TissueImage }>;
  let item: TissueImage;

  function clearItem(): void {
    fixture.componentInstance.item = undefined;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockModule(MatIconModule)],
      declarations: [TissuesBrowserGridPopoverContentComponent],
      providers: []
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`
      <ccf-tissues-browser-grid-popover-content [item]="item">
      </ccf-tissues-browser-grid-popover-content>
    `, {
      item: {
        id: 'foo',
        slice: {
          sample: {
            patient: {
              age: 12,
              gender: 'female'
            }
          }
        },
        thumbnailMetadata: loFromPairs(thumbnailMetadataEntries)
      } as TissueImage
    });

    element = fixture.debugElement.query(By.directive(TissuesBrowserGridPopoverContentComponent));
    component = element.componentInstance;
    item = fixture.componentInstance.item;
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('age', () => {
      it('is the same as the item\'s age value as a string', () => {
        expect(component.age).toEqual(String(item.slice.sample.patient.age));
      });

      it('provides a default', () => {
        clearItem();
        expect(component.age).toBeTruthy();
      });
    });

    describe('genderIcon', () => {
      it('is a reference to an icon', () => {
        expect(component.genderIcon).toMatch(/(\w+:)?\w+/);
      });

      it('is based on the item\'s gender value', () => {
        expect(component.genderIcon).toContain(item.slice.sample.patient.gender);
      });

      it('provides a default', () => {
        clearItem();
        expect(component.genderIcon).toBeTruthy();
      });
    });

    describe('metadata', () => {
      it('is the same as the item\'s thumbnailMetadata value', () => {
        expect(component.metadata).toEqual(jasmine.arrayContaining(thumbnailMetadataEntries));
      });

      it('provides a default', () => {
        expect(component.metadata).toBeTruthy();
      });
    });

    describe('trackByLabel(data)', () => {
      it('returns the label of the metadata item', () => {
        expect(component.trackByLabel(['abc', 'def'])).toEqual('abc');
      });
    });
  });

  describe('dom', () => {
    describe('header', () => {
      let header: DebugElement;

      beforeEach(() => {
        header = element.query(By.css('.header'));
      });

      it('exists', () => {
        expect(header).toBeTruthy();
      });

      describe('age', () => {
        let age: DebugElement;

        beforeEach(() => {
          age = header.query(By.css('.age'));
        });

        it('exists', () => {
          expect(age).toBeTruthy();
        });

        it('has content', () => {
          expect(age.nativeElement.textContent).toBeTruthy();
        });

        it('has content with the age', () => {
          expect(age.nativeElement.textContent).toContain(String(item.slice.sample.patient.age));
        });
      });

      describe('gender', () => {
        let gender: DebugElement;

        beforeEach(() => {
          gender = header.query(By.css('.gender'));
        });

        it('exists', () => {
          expect(gender).toBeTruthy();
        });
      });
    });

    describe('body', () => {
      let body: DebugElement;

      beforeEach(() => {
        body = element.query(By.css('.body'));
      });

      it('exists', () => {
        expect(body).toBeTruthy();
      });

      describe('metadata', () => {
        let metadatas: DebugElement[];
        let metadata1: DebugElement;

        beforeEach(() => {
          metadatas = body.queryAll(By.css('.metadata'));
          metadata1 = metadatas[0];
        });

        it('has one entry for each metadata value in the item', () => {
          expect(metadatas.length).toEqual(thumbnailMetadataEntries.length);
        });

        it('contains the label of the metadata', () => {
          expect(metadata1.nativeElement.textContent).toContain(thumbnailMetadataEntries[0][0]);
        });

        it('contains the data of the metadata', () => {
          expect(metadata1.nativeElement.textContent).toContain(String(thumbnailMetadataEntries[0][1]));
        });
      });
    });

    describe('footer', () => {
      let footer: DebugElement;

      beforeEach(() => {
        footer = element.query(By.css('.footer'));
      });

      it('exists', () => {
        expect(footer).toBeTruthy();
      });

      describe('download', () => {
        let download: DebugElement;

        beforeEach(() => {
          download = footer.query(By.css('.download'));
        });

        it('exists', () => {
          expect(download).toBeTruthy();
        });
      });
    });
  });
});

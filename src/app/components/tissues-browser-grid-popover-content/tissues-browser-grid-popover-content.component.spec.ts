import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockModule, MockRender } from 'ng-mocks';

import { OntologyNode } from '../../shared/state/ontology/ontology.model';
import { TissuesBrowserGridPopoverContentComponent } from './tissues-browser-grid-popover-content.component';

describe('TissuesBrowserGridPopoverContentComponent', () => {
  let component: TissuesBrowserGridPopoverContentComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<{ item: OntologyNode }>;
  let item: OntologyNode;

  function clearItem(): void {
    fixture.componentInstance.item = undefined;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockModule(MatIconModule)],
      declarations: [TissuesBrowserGridPopoverContentComponent]
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
        age: 77,
        gender: 'unknown',
        metadata: [['a value', 1.23], ['another value', 'qwerty']]
      } as OntologyNode
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
        expect(component.age).toEqual(String(item.age));
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
        expect(component.genderIcon).toContain(item.gender);
      });

      it('provides a default', () => {
        clearItem();
        expect(component.genderIcon).toBeTruthy();
      });
    });

    describe('data', () => {
      it('is the same as the item\'s metadata value', () => {
        expect(component.data).toEqual(item.metadata);
      });

      it('provides a default', () => {
        expect(component.data).toBeTruthy();
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
          expect(age.nativeElement.textContent).toContain(String(item.age));
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
          expect(metadatas.length).toEqual(item.metadata.length);
        });

        it('contains the label of the metadata', () => {
          expect(metadata1.nativeElement.textContent).toContain(item.metadata[0][0]);
        });

        it('contains the data of the metadata', () => {
          expect(metadata1.nativeElement.textContent).toContain(String(item.metadata[0][1]));
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

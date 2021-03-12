import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BodyUI } from 'ccf-body-ui';
import { Filter } from 'ccf-database';

import { DataState } from '../../../core/store/data/data.state';


@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit {
  /**
   * Allows the filters to be set from outside the component, and still render / function normally
   */
  @Input() filter: Filter;

  /**
   * Emits the current filters
   */
  @Output() filterChange = new EventEmitter<Filter>();

  @ViewChild('bodyCanvas', { read: ElementRef }) bodyCanvas: ElementRef<HTMLCanvasElement>;

  bodyUI: BodyUI;

  constructor(readonly data: DataState) { }

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.bodyCanvas.nativeElement;
    this.bodyUI = new BodyUI({ id: 'body-ui', canvas, legacyLighting: true });
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());
    await this.bodyUI.initialize();

    // TODO: Replace with a single @Input with scene provided by ngxs
    this.data.sceneData$.subscribe((scene) => this.bodyUI.setScene(scene));

    this.bodyUI.nodeClick$.subscribe(async ({node, ctrlClick}) => {
      switch (node['@id']) {
        case 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney':
          this.applyFilter({ontologyTerms: ['http://purl.obolibrary.org/obo/UBERON_0004539']});
          break;
        case 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney':
          this.applyFilter({ontologyTerms: ['http://purl.obolibrary.org/obo/UBERON_0004538']});
          break;
        case 'http://purl.org/ccf/latest/ccf.owl#VHSpleen':
        case 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC1':
        case 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC2':
        case 'http://purl.org/ccf/latest/ccf.owl#VHSpleenCC3':
          this.applyFilter({ontologyTerms: ['http://purl.obolibrary.org/obo/UBERON_0002106']});
          break;
        default:
          if (node.entityId) {
            const highlightedEntities = ctrlClick ? this.filter?.highlightedEntities ?? [] : [];
            if (highlightedEntities.length === 1 && highlightedEntities[0] === node.entityId) {
              this.applyFilter({highlightedEntities: []});
            } else {
              this.applyFilter({highlightedEntities: highlightedEntities.concat([node.entityId])});
            }
          }
          break;
      }
    });
  }

  private applyFilter(filter: Partial<Filter>): void {
    const newFilter = { ...this.filter, ...filter } as Filter;
    this.filter = newFilter;
    this.filterChange.emit(newFilter);
  }
}

import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NodeClickEvent, SpatialSceneNode } from 'ccf-body-ui';
import { Filter, SpatialEntity, TissueBlockResult } from 'ccf-database';
import { BodyUiComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganComponent implements AfterViewChecked, OnChanges {
  @Input() organ?: SpatialEntity;
  @Input() scene!: SpatialSceneNode[];
  @Input() organIri!: string;
  @Input() sex?: 'Male' | 'Female' | 'Both';
  @Input() side?: 'Left' | 'Right';
  @Input() blocks?: TissueBlockResult[];
  @Input() filter?: Filter;

  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();
  @Output() readonly nodeClick = new EventEmitter();

  @ViewChild('bodyUI', { static: true }) readonly bodyUI!: BodyUiComponent;

  highlightedNodeId!: string;
  filteredBlocks!: string[];

  constructor(readonly ga: GoogleAnalyticsService) { }

  ngAfterViewChecked(): void {
    this.updateHighlighting();
  }

  updateHighlighting(): void {
    const providerName = new Set<string>(this.filter?.tmc ?? []);
    this.filteredBlocks = this.blocks?.filter(block => providerName.has(block.donor.providerName)).map(block => block['@id']) ?? [];
    this.bodyUI.scene = this.bodyUI.scene.map((node): SpatialSceneNode =>
      ({
        ...node,
        color: node.entityId && this.highlightedNodeId === node['@id'] ?
          [30, 136, 229, 255] :
          this.filteredBlocks.includes(node.entityId ?? '') ? [173, 255, 47, 229.5] : [255, 255, 255, 229.5]
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bodyUI && 'organ' in changes) {
      this.zoomToFitOrgan();
    }
  }

  updateSex(selection?: 'Male' | 'Female'): void {
    this.sex = selection;
    this.sexChange.emit(this.sex);
  }

  updateSide(selection?: 'Left' | 'Right'): void {
    this.side = selection;
    this.sideChange.emit(this.side);
  }

  zoomToFitOrgan(): void {
    const { bodyUI, organ } = this;
    if (organ) {
      const { x_dimension: x, y_dimension: y, z_dimension: z } = organ;
      bodyUI.rotation = bodyUI.rotationX = 0;
      bodyUI.bounds = { x: 1.25 * x / 1000, y: 1.25 * y / 1000, z: 1.25 * z / 1000 };
      bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
    }
  }

  nodeClicked(event: NodeClickEvent): void {
    this.ga.event('node_click', 'organ', event.node['@id']);
    this.highlightedNodeId = this.highlightedNodeId && this.highlightedNodeId === event.node['@id'] ? '' : event.node['@id'];
    this.nodeClick.emit(event);
  }
}

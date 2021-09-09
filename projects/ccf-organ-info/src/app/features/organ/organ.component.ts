import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { SpatialSceneNode } from 'ccf-body-ui';
import { Filter } from 'ccf-database';
import { BodyUiComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

import { DataSourceService } from '../../core/services/data-source/data-source.service';


@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganComponent implements OnChanges {
  @ViewChild('bodyUI', { static: false }) bodyUI: BodyUiComponent;

  @Input() organIri: string;
  @Input() sex: 'Male' | 'Female';
  @Input() side?: 'Left' | 'Right';

  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();

  scene$: Observable<SpatialSceneNode[]>;

  private readonly referenceOrgans$ = this.source.getReferenceOrgans().pipe(shareReplay(1));

  constructor(readonly source: DataSourceService, readonly ga: GoogleAnalyticsService) { }

  ngOnChanges(): void {
    this.referenceOrgans$.pipe(take(1)).subscribe(referenceOrgans => {
      const organ = referenceOrgans.find(item => item.representation_of === this.organIri && item.sex === this.sex);
      if (organ) {
        this.resetView({ x: organ.x_dimension / 1000, y: organ.y_dimension / 1000, z: organ.z_dimension / 1000 });
        if (!organ.side) {
          this.side = undefined;
        }
      }
    });
    this.scene$ = this.source.getReferenceOrganScene(
      this.organIri, { sex: this.sex, ontologyTerms: [this.organIri] } as Filter
    );
  }

  resetView(bounds: { x: number; y: number; z: number }): void {
    const bodyUI = this.bodyUI;
    bodyUI.rotation = 0;
    bodyUI.rotationX = 0;
    bodyUI.bounds = { x: bounds.x * 1.25, y: bounds.y * 1.25, z: bounds.z * 1.25 };
    bodyUI.target = [bounds.x / 2, bounds.y / 2, bounds.z / 2];
  }

  updateSex(selection: 'Male' | 'Female'): void {
    this.sex = selection;
    this.sexChange.emit(this.sex);
  }

  updateSide(selection: 'Left' | 'Right'): void {
    this.side = selection;
    this.sideChange.emit(this.side);
  }
}

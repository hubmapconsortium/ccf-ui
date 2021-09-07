import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Filter, SpatialEntity } from 'ccf-database';
import { SpatialSceneNode } from 'ccf-body-ui';
import { Observable } from 'rxjs';
import { DataSourceService } from './data-source/data-source.service';

interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}


@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganComponent implements OnChanges {

  @Input() organIri: string;
  @Input() sex: 'Both' | 'Male' | 'Female';
  @Input() side?: 'Left' | 'Right';

  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();

  get filter(): Filter {
    return {
      sex: this.sex,
      ageRange: [1, 110],
      bmiRange: [13, 83],
      tmc: [],
      technologies: [],
      ontologyTerms: [this.organIri]
    };
  }

  get defaultPosition(): XYZTriplet {
    const dims = this.organDimensions;
    return { x: dims.x + 2 * 10, y: dims.y / 2, z: dims.z / 2};
  }

  scene: Observable<SpatialSceneNode[]>;

  referenceOrgans: SpatialEntity[];

  organDimensions: XYZTriplet;

  bounds: XYZTriplet;


  constructor(readonly source: DataSourceService) {
    this.source.getReferenceOrgans().subscribe(value => {
      this.referenceOrgans = value;
      this.organDimensions = this.getDimensions(this.organIri);
      this.bounds = this.getBounds(this.organDimensions);
    });
  }

  ngOnChanges(): void {
    this.scene = this.source.getScene(this.filter);
  }

  getDimensions(iri: string): XYZTriplet {
    const organ = this.referenceOrgans.find(item => item.representation_of === iri);
    if (organ) {
      return {x: organ.x_dimension, y: organ.y_dimension, z: organ.z_dimension};
    } else {
      return {x: 0, y: 0, z: 0};
    }
  }

  getBounds(dims: XYZTriplet): XYZTriplet {
    return {
      x: Math.max(dims.x, this.defaultPosition.x + 40) / 1000,
      y: Math.max(dims.y, this.defaultPosition.y + 40) / 1000,
      z: Math.max(dims.z, this.defaultPosition.z + 40) / 1000
    };
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

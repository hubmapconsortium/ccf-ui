import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { VisibilityItem } from '../visibility-menu/visibility-menu.component';

export interface ExtractionSet {
  name: string;
  organ: string;
  sites: VisibilityItem[];
}

@Component({
  selector: 'ccf-extraction-set-dropdown',
  templateUrl: './extraction-set-dropdown.component.html',
  styleUrls: ['./extraction-set-dropdown.component.scss']
})
export class ExtractionSetDropdownComponent {

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-extraction-set-dropdown';

  @Output() setChange = new EventEmitter<ExtractionSet>();

  sets: ExtractionSet[] = [
    {
      name: 'HuBMAP',
      organ: 'Heart',
      sites: [
        {id: 1, name: 'Left atrium, appendage', visible: false},
        {id: 2, name: 'Left atrium, PV inflow', visible: false},
        {id: 3, name: 'Left ventricle, apex', visible: false},
        {id: 4, name: 'Left ventricle, free wall 3cm from apex', visible: false},
        {id: 5, name: 'Septum, 3cm from apex including LAD', visible: false},
        {id: 6, name: 'Posterior, adjacent to coronary sinus', visible: false},
        {id: 7, name: 'Right atrium appendage', visible: false},
        {id: 8, name: 'Right atrium, AV(atrioventricular) node', visible: false},
        {id: 9, name: 'Right atrium, SA(sinoatrial) node', visible: false},
        {id: 10, name: 'Right ventricle, free wall 3cm from apex', visible: false}
      ]
    },
    {
      name: 'SPARC',
      organ: 'Heart',
      sites: [
        {id: 1, name: '1', visible: false},
        {id: 2, name: '2', visible: false},
        {id: 3, name: '3', visible: false},
        {id: 4, name: '4', visible: false},
        {id: 5, name: '5', visible: false},
        {id: 6, name: '6', visible: false},
        {id: 7, name: '7', visible: false},
        {id: 8, name: '8', visible: false},
        {id: 9, name: '9', visible: false},
        {id: 10, name: '10', visible: false},
        {id: 11, name: '11', visible: false},
        {id: 12, name: '12', visible: false},
        {id: 13, name: '13', visible: false},
        {id: 14, name: '14', visible: false},
        {id: 15, name: '15', visible: false},
      ]
    },
    {
      name: 'HCA',
      organ: 'Heart',
      sites: [
        {id: 1, name: '1', visible: false},
        {id: 2, name: '2', visible: false},
        {id: 3, name: '3', visible: false},
        {id: 4, name: '4', visible: false},
        {id: 5, name: '5', visible: false},
        {id: 6, name: '6', visible: false},
      ]
    }
  ];

  selected: ExtractionSet = this.sets[0];

  extractionSetChanged(value: ExtractionSet): void {
    this.selected = value;
    this.setChange.emit(value);
  }
}

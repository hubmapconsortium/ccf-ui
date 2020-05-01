import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() metadata: { label: string; value: string; }[];
  // = [
  //   {label: "UUID", value: "003d63df59a4975bbd680a1f6b706d67"},
  //   {label: "Group (TMC) Name", value: "TMC-Vanderbilt"},
  //   {label: "Entity Type", value: "Sample"},
  //   {label: "Display DOI", value: "HBM376.SGJZ.247"},
  //   {label: "Label", value: "VAN0012-RK-103-43: Female, Age 44"},
  //   {label: "Description", value: "10/24/19 - 2D sections: 75-80, imaging odd, MxIF even"},
  //   {label: "Short Info 0", value: "TMC-Vanderbilt"},
  //   {label: "Short Info 1", value: "10/24/19 - 2D sections: 75-80, imaging odd, MxIF even"},
  //   {label: "Short Info 2", value: "Sample"}
  // ];
}
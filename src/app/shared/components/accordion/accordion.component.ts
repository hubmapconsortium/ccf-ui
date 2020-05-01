import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() metadata: { label: string; value: string; }[];

}

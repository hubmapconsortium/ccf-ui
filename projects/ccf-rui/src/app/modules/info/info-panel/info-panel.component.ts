import { Component, OnInit, Input } from '@angular/core';
import { DocumentationContent } from '../../../core/models/documentation';

@Component({
  selector: 'ccf-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  /** Documentation content for each expansion panel. Contains the title
   * and the panel body content
   */
  @Input() content: DocumentationContent;

  /** Index tracker to always expand the first panel */
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}

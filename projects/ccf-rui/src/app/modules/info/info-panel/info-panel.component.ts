import { Component, OnInit, Input } from '@angular/core';
import { DocumentationContent } from '../../../core/models/documentation';

@Component({
  selector: 'ccf-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() content: DocumentationContent;

  constructor() { }

  ngOnInit(): void {
  }

}

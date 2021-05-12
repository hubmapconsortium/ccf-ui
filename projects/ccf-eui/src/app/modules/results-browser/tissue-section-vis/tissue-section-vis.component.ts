import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TissueBlockResult } from 'ccf-database';

@Component({
  selector: 'ccf-tissue-section-vis',
  templateUrl: './tissue-section-vis.component.html',
  styleUrls: ['./tissue-section-vis.component.scss']
})
export class TissueSectionVisComponent implements OnInit {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-tissue-section-vis';

  @Input() tissueBlock!: TissueBlockResult;

  ngOnInit(): void {
    console.log('tissueBlock: ', this.tissueBlock);
  }
}

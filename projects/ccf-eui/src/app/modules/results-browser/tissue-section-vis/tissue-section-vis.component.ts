import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TissueBlockResult, TissueSectionResult } from 'ccf-database';

@Component({
  selector: 'ccf-tissue-section-vis',
  templateUrl: './tissue-section-vis.component.html',
  styleUrls: ['./tissue-section-vis.component.scss']
})
export class TissueSectionVisComponent implements OnInit {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-tissue-section-vis';

  @Input() totalTissueSections!: number;
  @Input() tissueSections!: TissueSectionResult[];

  ngOnInit(): void {
    console.log('total sections:', this.totalTissueSections, '\ntissue sections: ', this.tissueSections);
  }

  tissueSectionExists(sectionNumber: number): boolean {
    if (this.tissueSections.filter(section => section.sectionNumber === sectionNumber).length > 0) {
      return true;
    }

    return false;
  }
}

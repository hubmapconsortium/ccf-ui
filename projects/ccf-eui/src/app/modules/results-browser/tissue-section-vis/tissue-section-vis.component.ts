import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TissueSectionResult } from 'ccf-database';

@Component({
  selector: 'ccf-tissue-section-vis',
  templateUrl: './tissue-section-vis.component.html',
  styleUrls: ['./tissue-section-vis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissueSectionVisComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-tissue-section-vis';

  /** The total numebr of tissue sections, used for end label */
  @Input() totalTissueSections!: number;

  /** Tissue section data, used to determine which tissues to color on the graph */
  @Input() tissueSections!: TissueSectionResult[];

  /** Returns whether or not the given section number exists in the tissueSection array */
  tissueSectionExists(sectionNumber: number): boolean {
    if (this.tissueSections.filter(section => section.sectionNumber === sectionNumber).length > 0) {
      return true;
    }

    return false;
  }
}

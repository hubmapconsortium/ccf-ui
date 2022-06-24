import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TissueBlockResult } from 'ccf-database';

const testBlock: TissueBlockResult = {
  '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#TissueBlock',
  '@type': 'Sample',
  sections: [],
  datasets: [
    {
      '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#Dataset',
      '@type': 'Dataset',
      label: 'Registered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
      thumbnail: 'assets/kpmp/thumbnails/kpmp-sample.jpg',
      technology: 'OTHER',
      description: 'Data/Assay Types: Cytometry',
      link: 'http://dx.doi.org/10.154016/j.trsl.2017.07.006'
    }
  ],
  label: 'Registered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
  description: '3.44 x 7.78 x 0.07 millimeter, 0.07 millimeter, nephrectomy, 0 Sections',
  link: 'http://dx.doi.org/10.103216/j.trsl.2017.07.006',
  donor: {
    '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#Donor',
    '@type': 'Donor',
    label: 'CoverNephrectomy',
    description: 'Entered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
    link: 'http://dx.doi.orgs/10.1016/j.trsl.2017.07.006',
    providerName: 'KPMP-IU/OSU'
  },
  spatialEntityId: 'http://purl.org/ccf/0.5/bd7a9bea-aaaa726-427a-8360-8a017ef8178d',
  sampleType: 'Tissue Block',
  sectionCount: 1,
  sectionSize: 0.07,
  sectionUnits: 'millimeter'
};

/**
 * Tissue block list in spatial search UI
 */
@Component({
  selector: 'ccf-tissue-block-list',
  templateUrl: './tissue-block-list.component.html',
  styleUrls: ['./tissue-block-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissueBlockListComponent {
  @HostBinding('class') readonly className = 'ccf-tissue-block-list';

  /**
   * Tissue blocks to be displayed
   */
  @Input() tissueBlocks: TissueBlockResult[] = [testBlock, testBlock, testBlock, testBlock, testBlock, testBlock, testBlock];

}

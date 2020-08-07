import { get, sortBy } from 'lodash';
import { DR1_VU_THUMBS, HuBMAPEntity, JsonDict } from './hubmap-data';


export function debugData(entities: HuBMAPEntity[]): void  {
  const data: JsonDict[] = [];
  for (const sample of sortBy(entities.concat(), ['groupName', 'data.hubmap_display_id'])) {
    const d: JsonDict = {
      UUID: sample.id,
      'Group Name': sample.groupName,
      'Entity Type': sample.entityType,
      'Sample ID': sample.data.hubmap_display_id,
      'Donor ID': sample.donor.display_doi,
      'Organ Sample ID': sample.organSample.display_doi,
      'Has Datasets': 'No',
      'Has TIFFs': '',
      'Has Thumbnails': '',
      'Dataset ID': '',
      'Data Type(s)': sample.dataTypes.join('|'),
      'Assay Type(s)': sample.assayTypes.join('|'),
      TIFFs: '',
      Thumbnails: ''
    };
    data.push(d);
    for (const dataset of sample.descendants.filter(f => f.entity_type === 'Dataset')) {
      d['Has Datasets'] = 'Yes';
      const tiffs = (get(dataset, 'metadata.files', []) as {rel_path: string}[])
          .filter(f => /\.(ome\.tif|ome\.tiff)$/.test(f.rel_path))
          .map(f => f.rel_path)
          .map(tiff => tiff.split('/').slice(-1)[0].split('?')[0]);
      const thumbnails: string[] = [];
      if (sample.groupUUID === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a') { // VU
        for (const tiff of tiffs) {
          const thumb = tiff.replace('.ome.tif', '_thumbnail.png');
          if (DR1_VU_THUMBS.has(thumb)) {
            thumbnails.push(thumb);
            d['Has Thumbnails'] = 'Yes';
          }
        }
      }
      if (tiffs.length > 0) {
        d['Has TIFFs'] = 'Yes';
      }
      const ds: JsonDict = Object.assign({}, d, {
        UUID: '',
        'Entity Type': dataset.entity_type,
        'Dataset ID': dataset.display_doi,
        'Data Type(s)': (dataset.data_types as JsonDict[] || []).join('|'),
        'Assay Type(s)': get(dataset, 'metaata.metadata.assay_type', ''),
        TIFFs: tiffs.join('|'),
        Thumbnails: thumbnails.join('|')
      });
      data.push(ds);
    }
  }
  console.log(data);
}

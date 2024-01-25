/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { parseCSV } from './parse-csv';


export async function processExtractionSites(sourceUrl: string, entities: SpatialEntityJsonLd[]): Promise<JsonLdObj[]> {
  const lookup = entities.reduce<Record<string, SpatialEntityJsonLd>>((acc, entity) => {
    acc[entity['@id']] = entity;
    return acc;
  }, {});
  const rows = await parseCSV(sourceUrl, 'extraction_set_for');
  const extractionSets: { [id: string]: JsonLdObj } = {};
  rows.forEach((row, rank) => {
    const entityId = `${row.source_spatial_entity}_${encodeURIComponent(row.node_name)}`;
    const entity = lookup[entityId];
    if (entity && row.extraction_set_for.trim().length > 0) {
      entity.extraction_set = row.extraction_set_id;
      entity.label = row.label.toLowerCase() || entity.label;
      entity.comment = row.tooltip || entity.comment;
      entity.rui_rank = rank * 10;

      if (!extractionSets[row.extraction_set_id]) {
        extractionSets[row.extraction_set_id] = {
          '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
          '@id': row.extraction_set_id,
          '@type': 'ExtractionSet',
          label: row.extraction_set_label,
          extraction_set_for: row.extraction_set_for,
          rui_rank: rank * 10 + 1
        };
      }
    }
  });
  return [ ...Object.values(extractionSets), ...entities ];
}

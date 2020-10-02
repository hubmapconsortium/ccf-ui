import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { parseCSV } from './parse-csv';


export async function processAnatomicalStructures(sourceUrl: string, entities: SpatialEntityJsonLd[]): Promise<SpatialEntityJsonLd[]> {
  const lookup = entities.reduce((acc, entity) => { acc[entity['@id']] = entity; return acc; }, {});
  const rows = await parseCSV(sourceUrl, 'anatomical_structure_of');
  rows.forEach( (row, rank) => {
    const entityId = `${row.source_spatial_entity}_${encodeURIComponent(row.node_name)}`;
    const entity = lookup[entityId] as SpatialEntityJsonLd;
    if (entity) {
      if (row.anatomical_structure_of) {
        entity.reference_organ = row.anatomical_structure_of;
      }
      entity.label = row.label || entity.label;
      entity.representation_of = row.representation_of || entity.representation_of;
      entity.rui_rank = rank * 10;
    }
  });
  return entities;
}

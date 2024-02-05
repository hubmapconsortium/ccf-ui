import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { parseCSV } from './parse-csv';

export async function processAnatomicalStructures(
  sourceUrl: string,
  entities: SpatialEntityJsonLd[]
): Promise<SpatialEntityJsonLd[]> {
  const lookup = entities.reduce<Record<string, SpatialEntityJsonLd>>(
    (acc, entity) => {
      acc[entity['@id']] = entity;
      return acc;
    },
    {}
  );
  const rows = await parseCSV(sourceUrl, 'anatomical_structure_of');
  rows.forEach((row, rank) => {
    const entityId = `${row.source_spatial_entity}_${encodeURIComponent(
      row.node_name
    )}`;
    const entity = lookup[entityId];
    if (
      entity &&
      row.anatomical_structure_of.trim().length > 0 &&
      row.representation_of.trim().length > 0
    ) {
      entity.reference_organ = row.anatomical_structure_of;
      entity.label = row.label.toLowerCase() || entity.label;
      entity.representation_of =
        row.representation_of || entity.representation_of;
      entity.rui_rank = rank * 10;
    }
  });
  return entities;
}

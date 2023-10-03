/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLdObj } from 'jsonld/jsonld-spec';
import uniqBy from 'lodash/uniqBy';

import { SpatialEntityJsonLd, SpatialPlacementJsonLd } from '../shared/ccf-spatial-jsonld';
import { parseCSV } from './parse-csv';
import { processAnatomicalStructures } from './process-anatomical-structures';
import { processExtractionSites } from './process-extraction-sites';
import { processSpatialEntities } from './process-spatial-entities';


export const referenceDataConfig = {
  extractionSitesUrl: 'http://localhost:8080/source_data/asct-b-3d-models-landmarks.csv',
  extractionSitesConfigUrl: 'http://localhost:8080/source_data/extraction-site-config.csv',
  anatomicalStructuresUrl: 'http://localhost:8080/source_data/asct-b-3d-models-crosswalk.csv',
  referenceOrganConfigUrl: 'http://localhost:8080/source_data/reference-organ-config.csv'
};

export async function processReferenceData(refEntities: SpatialEntityJsonLd[], config = referenceDataConfig): Promise<JsonLdObj[]> {
  const entities = refEntities.reduce<Record<string, SpatialEntityJsonLd>>((acc, e) => {
    acc[e['@id']] = e;
    return acc;
  }, {});
  const referenceOrgans = await parseCSV(config.referenceOrganConfigUrl, 'source');
  const refOrganSources = new Set(referenceOrgans.map(s => s.source));
  const goodRefOrgans = new Set(referenceOrgans.map(s => s['@id']));
  const extractionSiteObjects = await parseCSV(config.extractionSitesConfigUrl, 'source_spatial_entity');

  let spatialEntities =
    (await Promise.all(
      referenceOrgans.map(s =>
        processSpatialEntities(entities[s.source.split('_')[0]], s.object)
      )
    )).reduce((acc, e) => acc.concat(e), [])
      .concat((await Promise.all(
        extractionSiteObjects.map(s =>
          processSpatialEntities(entities[s.source_spatial_entity], s.object)
        )
      )).reduce((acc, e) => acc.concat(e), []));
  spatialEntities = uniqBy(spatialEntities, e => e['@id']);

  const jsonld = (await processExtractionSites(
    config.extractionSitesUrl,
    await processAnatomicalStructures(config.anatomicalStructuresUrl, spatialEntities)))
    .filter((entity: SpatialEntityJsonLd) =>
      (entity.reference_organ && goodRefOrgans.has(entity.reference_organ)) ||
      entity.extraction_set ||
      entity['@type'] === 'ExtractionSet' ||
      refOrganSources.has(entity['@id'])
    );
  const lookup = jsonld.reduce<Record<string, unknown>>((acc, e) => {
    if (e['@id']) {
      acc[e['@id']] = e;
    }
    return acc;
  }, {});

  for (const refOrgan of referenceOrgans) {
    const entity = (lookup[refOrgan.source] || {}) as SpatialEntityJsonLd;
    for (const key of Object.keys(refOrgan)) {
      if (key !== 'source' && key !== 'object' && refOrgan[key] !== '') {
        if (key === 'rui_rank') {
          entity[key] = +refOrgan[key];
        } else {
          entity[key] = refOrgan[key];
        }
      }
    }
    Object.assign(entity, refOrgan.entityOverrides);
    if (!entity.object) {
      console.log(refOrgan.source);
      continue;
    }
    entity.object['@id'] = entity['@id'] + 'Obj';
    entity.object.placement['@id'] = entity['@id'] + 'ObjPlacement';
    entity.object.placement.target = entity['@id'];

    if (Array.isArray(entity.placement)) {
      const bodyPlacement = entity.placement.find(p => p.target === '#VHFemale' || p.target === '#VHMale');
      const ruiPlacement: SpatialPlacementJsonLd = {
        ...bodyPlacement!,
        '@id': `${entity['@id']}_RUIPlacement`,
        x_rotation: 0,
        source: bodyPlacement?.target,
        target: entity['@id']
      };
      ruiPlacement.x_translation = -ruiPlacement.x_translation;
      ruiPlacement.y_translation = -ruiPlacement.y_translation;
      ruiPlacement.z_translation = -ruiPlacement.z_translation;
      jsonld.push(ruiPlacement);
    }
  }

  return jsonld;
}

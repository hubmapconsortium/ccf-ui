/* eslint-disable @typescript-eslint/naming-convention */
import { SpatialPlacementJsonLd } from './../shared/ccf-spatial-jsonld';
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { processAnatomicalStructures } from './process-anatomical-structures';
import { processExtractionSites } from './process-extraction-sites';
import { processSpatialEntities } from './process-spatial-entities';


export const referenceDataConfig = {
  extractionSitesUrl: 'https://docs.google.com/spreadsheets/d/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/export?format=csv&gid=1611777666',
  anatomicalStructuresUrl: 'https://docs.google.com/spreadsheets/d/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/export?format=csv&gid=1009850632',
  referenceOrgans: [
    {
      source: '#VHMaleOrgans_VHM_skin',
      entityOverrides: {
        '@id': '#VHMSkin',
        label: 'Visual Human Male Skin',
        sex: 'Male',
        rui_rank: 1
      }
    },
    {
      source: '#VHMaleOrgans_VHM_colon',
      entityOverrides: {
        '@id': '#VHMColon',
        label: 'Visual Human Male Colon',
        sex: 'Male',
        rui_rank: 10
      }
    },
    {
      source: '#VHMaleOrgans_VHM_heart',
      entityOverrides: {
        '@id': '#VHMHeart',
        label: 'Visual Human Male Heart',
        sex: 'Male',
        rui_rank: 20
      }
    },
    {
      source: '#VHMaleOrgans_VHM_kidney_left_kidney',
      entityOverrides: {
        '@id': '#VHMLeftKidney',
        label: 'Visual Human Male Left Kidney',
        sex: 'Male',
        side: 'Left',
        rui_rank: 30
      }
    },
    {
      source: '#VHMaleOrgans_VHM_kidney_right_kidney',
      entityOverrides: {
        '@id': '#VHMRightKidney',
        label: 'Visual Human Male Right Kidney',
        sex: 'Male',
        side: 'Right',
        rui_rank: 30
      }
    },
    {
      source: '#VHMaleOrgans_VHM_spleen',
      entityOverrides: {
        '@id': '#VHMSpleen',
        label: 'Visual Human Male Spleen',
        sex: 'Male',
        rui_rank: 40
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_skin',
      entityOverrides: {
        '@id': '#VHFSkin',
        label: 'Visual Human Female Skin',
        sex: 'Female',
        rui_rank: 1
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_colon',
      entityOverrides: {
        '@id': '#VHFColon',
        label: 'Visual Human Female Colon',
        sex: 'Female',
        rui_rank: 10
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_heart',
      entityOverrides: {
        '@id': '#VHFHeart',
        label: 'Visual Human Female Heart',
        sex: 'Female',
        rui_rank: 20
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_kidney_left_kidney',
      entityOverrides: {
        '@id': '#VHFLeftKidney',
        label: 'Visual Human Female Left Kidney',
        sex: 'Female',
        side: 'Left',
        rui_rank: 30
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_kidney_right_kidney',
      entityOverrides: {
        '@id': '#VHFRightKidney',
        label: 'Visual Human Female Right Kidney',
        sex: 'Female',
        side: 'Right',
        rui_rank: 30
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_spleen',
      entityOverrides: {
        '@id': '#VHFSpleen',
        label: 'Visual Human Female Spleen',
        sex: 'Female',
        rui_rank: 40
      }
    }
  ]
};

export async function processReferenceData(refEntities: SpatialEntityJsonLd[], config = referenceDataConfig): Promise<JsonLdObj[]> {
  const entities: {[id: string]: SpatialEntityJsonLd} = refEntities.reduce((acc, e) => {acc[e['@id']] = e; return acc;}, {});
  const refOrganSources = new Set(config.referenceOrgans.map(s => s.source));

  const goodRefOrgans = new Set(config.referenceOrgans.map(s => s.entityOverrides['@id']));

  const jsonld = (await processExtractionSites(config.extractionSitesUrl,
    await processAnatomicalStructures(config.anatomicalStructuresUrl, [
      ...(await processSpatialEntities(entities['#VHFemaleOrgans'])),
      ...(await processSpatialEntities(entities['#VHMaleOrgans']))
    ])))
    .filter((entity: SpatialEntityJsonLd) =>
      (entity.reference_organ && goodRefOrgans.has(entity.reference_organ)) || entity.extraction_set ||
      entity['@type'] === 'ExtractionSet' || refOrganSources.has(entity['@id'])
    );
  const lookup = jsonld.reduce((acc, e) => {acc[e['@id']!] = e; return acc;}, {} as Record<string, unknown>);

  for (const refOrgan of config.referenceOrgans) {
    const entity = (lookup[refOrgan.source] || {}) as SpatialEntityJsonLd;
    Object.assign(entity, refOrgan.entityOverrides);
    if (!entity.object) {
      console.log(refOrgan.source);
      continue;
    }
    entity.object.placement.target = entity['@id'];
  }

  return jsonld;
}

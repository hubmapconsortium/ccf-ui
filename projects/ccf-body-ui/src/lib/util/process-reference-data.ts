import { SpatialPlacementJsonLd } from './../shared/ccf-spatial-jsonld';
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { processAnatomicalStructures } from './process-anatomical-structures';
import { processExtractionSites } from './process-extraction-sites';
import { processSpatialEntities } from './process-spatial-entities';


export const referenceDataConfig = {
  extractionSitesUrl: 'https://asctb-data-miner.herokuapp.com/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/262433678',
  anatomicalStructuresUrl: 'https://asctb-data-miner.herokuapp.com/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/1313531900',
  referenceOrgans: [
    {
      source: '#VHMaleOrgans_VHM_Colon%20(1)',
      entityOverrides: {
        '@id': '#VHMColon',
        label: 'Visual Human Male Colon',
        sex: 'Male',
        rui_rank: 10
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHMColonRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHMaleOrgans_Heart',
      entityOverrides: {
        '@id': '#VHMHeart',
        label: 'Visual Human Male Heart',
        sex: 'Male',
        rui_rank: 20
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHMHeartRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHMaleOrgans_VHM_Kidney_L_Low',
      entityOverrides: {
        '@id': '#VHMLeftKidney',
        label: 'Visual Human Male Left Kidney',
        sex: 'Male',
        side: 'Left',
        rui_rank: 30
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHMLeftKidneyRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHMaleOrgans_VHM_Kidney_R_Low',
      entityOverrides: {
        '@id': '#VHMRightKidney',
        label: 'Visual Human Male Right Kidney',
        sex: 'Male',
        side: 'Right',
        rui_rank: 30
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHMRightKidneyRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHMaleOrgans_VHM_Spleen%20(1)',
      entityOverrides: {
        '@id': '#VHMSpleen',
        label: 'Visual Human Male Spleen',
        sex: 'Male',
        rui_rank: 40
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHMSpleenRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },

    {
      source: '#VHFemaleOrgans_VHF_Colon_Low',
      entityOverrides: {
        '@id': '#VHFColon',
        label: 'Visual Human Female Colon',
        sex: 'Female',
        rui_rank: 10
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHFColonRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHFemaleOrgans_Heart',
      entityOverrides: {
        '@id': '#VHFHeart',
        label: 'Visual Human Female Heart',
        sex: 'Female',
        rui_rank: 20
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHFHeartRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_Kidney_L_Low1',
      entityOverrides: {
        '@id': '#VHFLeftKidney',
        label: 'Visual Human Female Left Kidney',
        sex: 'Female',
        side: 'Left',
        rui_rank: 30
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHFLeftKidneyRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 30, y_rotation: 0, z_rotation: -23, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_Kidney_R_Low',
      entityOverrides: {
        '@id': '#VHFRightKidney',
        label: 'Visual Human Female Right Kidney',
        sex: 'Female',
        side: 'Right',
        rui_rank: 30
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHFRightKidneyRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_Spleen_Low',
      entityOverrides: {
        '@id': '#VHFSpleen',
        label: 'Visual Human Female Spleen',
        sex: 'Female',
        rui_rank: 40
      },
      ruiPlacement: {
        '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
        '@id': '#VHFSpleenRUIPlacement',
        '@type': 'SpatialPlacement',
        target: '#RUISpace',
        placement_date: '2020-09-25',
        x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
        x_rotation: 0, y_rotation: 0, z_rotation: 0, rotation_units: 'degree',
        x_translation: 0, y_translation: 0, z_translation: 0, translation_units: 'millimeter'
      }
    }
  ]
};

export async function processReferenceData(refEntities: SpatialEntityJsonLd[], config = referenceDataConfig): Promise<JsonLdObj[]> {
  const entities: {[id: string]: SpatialEntityJsonLd} = refEntities.reduce((acc, e) => {acc[e['@id']] = e; return acc;}, {});
  const refOrganSources = new Set(config.referenceOrgans.map(s => s.source));

  const jsonld = (await processExtractionSites(config.extractionSitesUrl,
    await processAnatomicalStructures(config.anatomicalStructuresUrl, [
      ...(await processSpatialEntities(entities['#VHFemaleOrgans'])),
      ...(await processSpatialEntities(entities['#VHMaleOrgans']))
    ])))
    .filter((entity: SpatialEntityJsonLd) =>
      entity.reference_organ || entity.extraction_set ||
      entity['@type'] === 'ExtractionSet' || refOrganSources.has(entity['@id'])
    );
  const lookup = jsonld.reduce((acc, e) => {acc[e['@id']] = e; return acc;}, {});

  for (const refOrgan of config.referenceOrgans) {
    const entity = (lookup[refOrgan.source] || {}) as SpatialEntityJsonLd;
    Object.assign(entity, refOrgan.entityOverrides);
    entity.object.placement.target = entity['@id'];

    if (refOrgan.ruiPlacement) {
      let placements: SpatialPlacementJsonLd[] = [refOrgan.ruiPlacement];
      if (Array.isArray(entity.placement)) {
        placements = placements.concat(entity.placement);
      } else if (entity.placement) {
        placements.push(entity.placement);
      }
      entity.placement = placements;
    }

    if (Array.isArray(entity.placement)) {
      const ruiPlacement = {
        ...entity.placement.find(p => p.target === '#VHBothSexes'),
        '@id': `${entity['@id']}_VHBothSexes_RUIPlacement`,
        x_rotation: 0,
        source: '#VHBothSexes',
        target: entity['@id']
      } as SpatialPlacementJsonLd;
      ruiPlacement.x_translation = -ruiPlacement.x_translation;
      ruiPlacement.y_translation = -ruiPlacement.y_translation;
      ruiPlacement.z_translation = -ruiPlacement.z_translation;
      jsonld.push(ruiPlacement);
    }
  }

  return jsonld;
}

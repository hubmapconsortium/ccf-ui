/* eslint-disable @typescript-eslint/naming-convention */
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { SpatialEntityJsonLd, SpatialPlacementJsonLd } from '../shared/ccf-spatial-jsonld';
import { processAnatomicalStructures } from './process-anatomical-structures';
import { processExtractionSites } from './process-extraction-sites';
import { processSpatialEntities } from './process-spatial-entities';


export const referenceDataConfig = {
  extractionSitesUrl: 'https://docs.google.com/spreadsheets/d/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/export?format=csv&gid=85031876',
  anatomicalStructuresUrl: 'https://docs.google.com/spreadsheets/d/14V1HfF9egFbht8rp_oicMZEesbHzXGvJ/export?format=csv&gid=1553361105',
  referenceOrgans: [
    {
      source: '#VHMaleOrgans_VHM_skin',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Skin.glb',
      entityOverrides: {
        '@id': '#VHMSkin',
        label: 'Skin',
        sex: 'Male',
        rui_rank: 10
      }
    },
    {
      source: '#VHMaleOrgans_VHM_colon',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/SBU_Intestine_Large.glb',
      entityOverrides: {
        '@id': '#VHMColon',
        label: 'Visual Human Male Colon',
        sex: 'Male',
        rui_rank: 20
      }
    },
    {
      source: '#VHMaleOrgans_VHM_heart',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Heart.glb',
      entityOverrides: {
        '@id': '#VHMHeart',
        label: 'Visual Human Male Heart',
        sex: 'Male',
        rui_rank: 30
      }
    },
    {
      source: '#VHMaleOrgans_VHM_left_kidney',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Kidney_Left.glb',
      entityOverrides: {
        '@id': '#VHMLeftKidney',
        label: 'Visual Human Male Left Kidney',
        sex: 'Male',
        side: 'Left',
        rui_rank: 40
      }
    },
    {
      source: '#VHMaleOrgans_VHM_right_kidney',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Kidney_Right.glb',
      entityOverrides: {
        '@id': '#VHMRightKidney',
        label: 'Visual Human Male Right Kidney',
        sex: 'Male',
        side: 'Right',
        rui_rank: 50
      }
    },
    {
      source: '#VHMaleOrgans_VHM_spleen',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Spleen.glb',
      entityOverrides: {
        '@id': '#VHMSpleen',
        label: 'Visual Human Male Spleen',
        sex: 'Male',
        rui_rank: 60
      }
    },
    {
      source: '#VHMaleOrgans_Allen_brain',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/Allen_M_Brain.glb',
      entityOverrides: {
        '@id': '#VHMAllenBrain',
        label: 'Visual Human Male Brain',
        sex: 'Male',
        rui_rank: 70
      }
    },
    {
      source: '#VHMaleOrgans_VHM_respiratory_system',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Lung.glb',
      entityOverrides: {
        '@id': '#VHMLung',
        label: 'Visual Human Male Lung',
        sex: 'Male',
        rui_rank: 80
      }
    },
    {
      source: '#VHMaleOrgans_Yao_lymph_node_a',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/NIH_M_Lymph_Node_Left.glb',
      entityOverrides: {
        '@id': '#VHMLeftLymphNode',
        label: 'Visual Human Male Left Lymph Node',
        sex: 'Male',
        side: 'Left',
        rui_rank: 90
      }
    },
    {
      source: '#VHMaleOrgans_Yao_lymph_node_b',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/NIH_M_Lymph_Node_Right.glb',
      entityOverrides: {
        '@id': '#VHMRightLymphNode',
        label: 'Visual Human Male Right Lymph Node',
        sex: 'Male',
        side: 'Right',
        rui_rank: 100
      }
    },
    {
      source: '#VHMaleOrgans_VHM_pelvis',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Pelvis.glb',
      entityOverrides: {
        '@id': '#VHMPelvis',
        label: 'Visual Human Male Pelvis',
        sex: 'Male',
        rui_rank: 110
      }
    },
    {
      source: '#VHMaleOrgans_VHM_thymus',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Thymus.glb',
      entityOverrides: {
        '@id': '#VHMThymus',
        label: 'Visual Human Male Thymus',
        sex: 'Male',
        rui_rank: 120
      }
    },
    {
      source: '#VHMaleOrgans_VHM_vasculature',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_M_Vasculature.glb',
      entityOverrides: {
        '@id': '#VHMVasculature',
        label: 'Visual Human Male Vasculature',
        sex: 'Male',
        rui_rank: 130
      }
    },

    {
      source: '#VHFemaleOrgans_VHF_skin',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Skin.glb',
      entityOverrides: {
        '@id': '#VHFSkin',
        label: 'Skin',
        sex: 'Female',
        rui_rank: 10
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_colon',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/SBU_F_Intestine_Large.glb',
      entityOverrides: {
        '@id': '#VHFColon',
        label: 'Visual Human Female Colon',
        sex: 'Female',
        rui_rank: 20
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_heart',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Heart.glb',
      entityOverrides: {
        '@id': '#VHFHeart',
        label: 'Visual Human Female Heart',
        sex: 'Female',
        rui_rank: 30
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_left_kidney',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Kidney_Left.glb',
      entityOverrides: {
        '@id': '#VHFLeftKidney',
        label: 'Visual Human Female Left Kidney',
        sex: 'Female',
        side: 'Left',
        rui_rank: 40
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_right_kidney',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Kidney_Right.glb',
      entityOverrides: {
        '@id': '#VHFRightKidney',
        label: 'Visual Human Female Right Kidney',
        sex: 'Female',
        side: 'Right',
        rui_rank: 50
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_spleen',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Spleen.glb',
      entityOverrides: {
        '@id': '#VHFSpleen',
        label: 'Visual Human Female Spleen',
        sex: 'Female',
        rui_rank: 60
      }
    },
    {
      source: '#VHFemaleOrgans_Allen_brain',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/Allen_F_Brain.glb',
      entityOverrides: {
        '@id': '#VHFAllenBrain',
        label: 'Visual Human Female Brain',
        sex: 'Female',
        rui_rank: 70
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_respiratory_system',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Lung.glb',
      entityOverrides: {
        '@id': '#VHFLung',
        label: 'Visual Human Female Lung',
        sex: 'Female',
        rui_rank: 80
      }
    },
    {
      source: '#VHFemaleOrgans_Yao_lymph_node_a',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/NIH_F_Lymph_Node_Left.glb',
      entityOverrides: {
        '@id': '#VHFLeftLymphNode',
        label: 'Visual Human Female Left Lymph Node',
        sex: 'Female',
        side: 'Left',
        rui_rank: 90
      }
    },
    {
      source: '#VHFemaleOrgans_Yao_lymph_node_b',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/NIH_F_Lymph_Node_Right.glb',
      entityOverrides: {
        '@id': '#VHFRightLymphNode',
        label: 'Visual Human Female Right Lymph Node',
        sex: 'Female',
        side: 'Right',
        rui_rank: 100
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_pelvis',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Pelvis.glb',
      entityOverrides: {
        '@id': '#VHFPelvis',
        label: 'Visual Human Female Pelvis',
        sex: 'Female',
        rui_rank: 110
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_thymus',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Thymus.glb',
      entityOverrides: {
        '@id': '#VHFThymus',
        label: 'Visual Human Female Thymus',
        sex: 'Female',
        rui_rank: 120
      }
    },
    {
      source: '#VHFemaleOrgans_VHF_vasculature',
      object: 'https://ccf-ontology.hubmapconsortium.org/objects/v1.0/VH_F_Vasculature.glb',
      entityOverrides: {
        '@id': '#VHFVasculature',
        label: 'Visual Human Female Vasculature',
        sex: 'Female',
        rui_rank: 130
      }
    }
  ]
};

export async function processReferenceData(refEntities: SpatialEntityJsonLd[], config = referenceDataConfig): Promise<JsonLdObj[]> {
  const entities: {[id: string]: SpatialEntityJsonLd} = refEntities.reduce((acc, e) => {acc[e['@id']] = e; return acc;}, {});
  const refOrganSources = new Set(config.referenceOrgans.map(s => s.source));

  const goodRefOrgans = new Set(config.referenceOrgans.map(s => s.entityOverrides['@id']));

  const spatialEntities = (await Promise.all(
    config.referenceOrgans.map(s =>
      processSpatialEntities(entities[s.source.split('_')[0]], s.object)
    )
  )).reduce((acc, e) => acc.concat(e), []);

  // const spatialEntities = (await Promise.all([
  //   processSpatialEntities(entities['#VHFemaleOrgans']),
  //   processSpatialEntities(entities['#VHMaleOrgans'])
  // ])).reduce((acc, e) => acc.concat(e), []);

  const jsonld = (await processExtractionSites(config.extractionSitesUrl,
    await processAnatomicalStructures(config.anatomicalStructuresUrl, spatialEntities)))
    .filter((entity: SpatialEntityJsonLd) =>
      (
        entity.reference_organ &&
        goodRefOrgans.has(entity.reference_organ)
      ) ||
      entity.extraction_set ||
      entity['@type'] === 'ExtractionSet' ||
      refOrganSources.has(entity['@id']
    ));
  const lookup = jsonld.reduce((acc, e) => {
    if (e['@id']) {
      acc[e['@id']] = e;
    }
    return acc;
  }, {} as Record<string, unknown>);

  for (const refOrgan of config.referenceOrgans) {
    const entity = (lookup[refOrgan.source] || {}) as SpatialEntityJsonLd;
    Object.assign(entity, refOrgan.entityOverrides);
    if (!entity.object) {
      console.log(refOrgan.source);
      continue;
    }
    entity.object.placement.target = entity['@id'];

    if (Array.isArray(entity.placement)) {
      const bodyPlacement = entity.placement.find(p => p.target === '#VHFemale' || p.target === '#VHMale');
      const ruiPlacement = {
        ...bodyPlacement,
        '@id': `${entity['@id']}_RUIPlacement`,
        x_rotation: 0,
        source: bodyPlacement?.target,
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

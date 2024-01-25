/* eslint-disable @typescript-eslint/naming-convention */
import { Matrix4 } from '@math.gl/core';
import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { processSceneNodes } from './process-scene-nodes';

export async function processSpatialEntities(
  parent: SpatialEntityJsonLd,
  gltfOverride?: string
): Promise<SpatialEntityJsonLd[]> {
  const parentPlacement = parent.object.placement;
  const gltfFile = gltfOverride ? gltfOverride : parent.object.file;
  const R = {
    x: parentPlacement.x_rotation,
    y: parentPlacement.y_rotation,
    z: parentPlacement.z_rotation,
  };
  const S = {
    x: parentPlacement.x_scaling,
    y: parentPlacement.y_scaling,
    z: parentPlacement.z_scaling,
  };
  const scalar = new Matrix4(Matrix4.IDENTITY).scale([
    S.x * 1000,
    S.y * 1000,
    S.z * 1000,
  ]);
  const nodes = await processSceneNodes(gltfFile, scalar);

  return Object.values(nodes)
    .filter((n) => n['@type'] !== 'GLTFNode')
    .map((node): Partial<SpatialEntityJsonLd> => {
      const id = `${parent['@id']}_${encodeURIComponent(node['@id'])}`;
      const creationDate = new Date().toISOString().split('T')[0];
      const T = {
        x: node.bbox.lowerBound.x,
        y: node.bbox.lowerBound.y,
        z: node.bbox.lowerBound.z,
      };

      return {
        '@context':
          'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
        '@id': id,
        '@type': 'SpatialEntity',
        label: `${parent.label} (${node['@id']})`,
        creator: parent.creator,
        creator_first_name: parent.creator_first_name,
        creator_last_name: parent.creator_last_name,
        creator_middle_name: parent.creator_middle_name,
        creator_orcid: parent.creator_orcid,
        creation_date: creationDate,
        x_dimension: node.size.x,
        y_dimension: node.size.y,
        z_dimension: node.size.z,
        dimension_units: 'millimeter',

        object: {
          '@id': `${id}Obj`,
          '@type': 'SpatialObjectReference',
          file: gltfFile,
          file_format: parent.object.file_format,
          file_subpath: node['@id'],

          placement: {
            '@id': `${id}ObjPlacement`,
            '@type': 'SpatialPlacement',
            target: id,
            placement_date: creationDate,

            x_scaling: S.x,
            y_scaling: S.y,
            z_scaling: S.z,
            scaling_units: parentPlacement.scaling_units,

            x_rotation: R.x,
            y_rotation: R.y,
            z_rotation: R.z,
            rotation_units: parentPlacement.rotation_units,

            x_translation: -T.x,
            y_translation: -T.y,
            z_translation: -T.z,
            translation_units: parentPlacement.translation_units, // Assumed 'millimeters'
          },
        },

        placement: (Array.isArray(parent.placement)
          ? parent.placement
          : [parent.placement]
        ).map((placement, i) => ({
          ...placement,
          '@id': `${id}GlobalPlacement${i + 1}`,
          placement_date: creationDate,

          x_translation: T.x,
          y_translation: T.y,
          z_translation: T.z,
          translation_units: placement.translation_units, // Assumed 'millimeters'
        })),
      };
    }) as SpatialEntityJsonLd[];
}

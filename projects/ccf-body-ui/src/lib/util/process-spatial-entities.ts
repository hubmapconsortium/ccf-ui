import { SpatialEntityJsonLd } from '../shared/ccf-spatial-jsonld';
import { processSceneNodes } from './process-scene-nodes';


export async function processSpatialEntities(parent: SpatialEntityJsonLd): Promise<SpatialEntityJsonLd[]> {
  const nodes = await processSceneNodes(parent.object.file);
  return Object.values(nodes).filter(n => n['@type'] !== 'GLTFNode').map((node) => {
    const id = `${parent['@id']}_${encodeURIComponent(node['@id'])}`;
    const creationDate = new Date().toISOString().split('T')[0];
    return {
      '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
      '@id': id,
      '@type': 'SpatialEntity',
      label: `${parent.label} (${node['@id']})`,
      creator: parent.creator,
      creator_first_name: parent.creator_first_name,
      creator_last_name: parent.creator_last_name,
      creation_date: creationDate,
      x_dimension: node.size.x * 1000,
      y_dimension: node.size.y * 1000,
      z_dimension: node.size.z * 1000,
      dimension_units: 'millimeter',

      object: {
        '@id': `${id}Obj`,
        '@type': 'SpatialObjectReference',
        file: parent.object.file,
        file_format: parent.object.file_format,
        file_subpath: node['@id'],

        placement: {
          '@id': `${id}ObjPlacement`,
          '@type': 'SpatialPlacement',
          target: id,
          placement_date: creationDate,

          x_scaling: parent.object.placement.x_scaling,
          y_scaling: parent.object.placement.y_scaling,
          z_scaling: parent.object.placement.z_scaling,
          scaling_units: parent.object.placement.scaling_units,

          x_rotation: parent.object.placement.x_rotation,
          y_rotation: parent.object.placement.y_rotation,
          z_rotation: parent.object.placement.z_rotation,
          rotation_units: parent.object.placement.rotation_units,

          x_translation: (node.center.x * -1000) + parent.object.placement.x_translation,
          y_translation: (node.center.y * -1000) + parent.object.placement.y_translation,
          z_translation: (node.center.z * -1000) + parent.object.placement.z_translation,
          translation_units: parent.object.placement.translation_units // Assumed 'millimeters'
        }
      },

      placement: (Array.isArray(parent.placement) ? parent.placement : [parent.placement]).map((placement, i) => ({
        ...placement,
        '@id': `${id}GlobalPlacement${i+1}`,
        placement_date: creationDate,

        x_translation: (node.center.x * 1000) + placement.x_translation,
        y_translation: (node.center.y * 1000) + placement.y_translation,
        z_translation: (node.center.z * 1000) + placement.z_translation,
        translation_units: placement.translation_units
      }))
    } as Partial<SpatialEntityJsonLd>;
  }) as SpatialEntityJsonLd[];
}

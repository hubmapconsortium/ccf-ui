// DON'T RUN THIS CODE ANYMORE, we are now generating JSONLD file by hand //

/* jshint esversion: 6 */
const fs = require('fs');

function fixOldRuiKidneyData(data) {
  return Object.assign({}, data,
    {
      tissue_position_mass_point: {
        x: data.tissue_position_mass_point.x - 60 / 2,
        y: data.tissue_position_mass_point.y - 100 / 2,
        z: data.tissue_position_mass_point.z - 60 / 2
      }
    });
}

function convertOldRuiToJsonLd(data, label) {
  const placementTarget = 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney';
  data = fixOldRuiKidneyData(data);

  const D = data.tissue_object_size;
  const R = data.tissue_object_rotation;
  const T = data.tissue_position_mass_point;

  return {
    '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id,
    '@type': 'SpatialEntity',
    label: label || undefined,
    creator: `${data.alignment_operator_first_name} ${data.alignment_operator_last_name}`,
    creator_first_name: data.alignment_operator_first_name,
    creator_last_name: data.alignment_operator_last_name,
    // creator_orcid: data.alignment_operator_orcid,
    creation_date: data.alignment_datetime,
    ccf_annotations: [],
    x_dimension: D.x, y_dimension: D.y, z_dimension: D.z, dimension_units: 'millimeter',

    placement: {
      '@context': 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
      '@id': 'http://purl.org/ccf/0.5/' + data.alignment_id + '_placement',
      '@type': 'SpatialPlacement',
      target: placementTarget,
      placement_date: data.alignment_datetime,

      x_scaling: 1, y_scaling: 1, z_scaling: 1, scaling_units: 'ratio',
      x_rotation: R.x, y_rotation: R.y, z_rotation: R.z, rotation_order: 'XYZ', rotation_units: 'degree',
      x_translation: T.x, y_translation: T.y, z_translation: T.z, translation_units: 'millimeter'
    }
  };
}

function updateJsonLD(data) {
  data['@graph'].forEach((obj) => {
    if (obj.rui_location) {
      obj.spatialEntity = convertOldRuiToJsonLd(obj.rui_location, obj.label);
      delete obj.rui_location;
    }
  });
}

let locations = JSON.parse(fs.readFileSync('kpmp-data/oct-2020/rui_locations.json'));
updateJsonLD(locations);
fs.writeFileSync('projects/ccf-eui/src/assets/kpmp/data/rui_locations.jsonld', JSON.stringify(locations, null, 2));

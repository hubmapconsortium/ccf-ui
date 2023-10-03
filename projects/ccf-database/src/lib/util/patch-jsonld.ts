
import { Context, JsonLd } from 'jsonld/jsonld-spec';

/* eslint-disable @typescript-eslint/naming-convention */
/** CCF v2.0 JSON-LD Context */
const CCF_CONTEXT: JsonLd = {
  '@context': {
    '@base': 'http://purl.org/ccf/',
    '@vocab': 'http://purl.org/ccf/',
    'ccf': 'http://purl.org/ccf/',
    'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
    'dcterms': 'http://purl.org/dc/terms/',
    'label': 'rdfs:label',
    'description': 'rdfs:comment',
    'link': 'ccf:url',
    'sex': 'ccf:sex',
    'age': 'ccf:age',
    'bmi': 'ccf:bmi',
    'consortium_name': 'ccf:consortium_name',
    'provider_name': 'ccf:tissue_provider_name',
    'provider_uuid': 'ccf:tissue_provider_uuid',
    'donor': {
      '@id': 'ccf:comes_from',
      '@type': '@id'
    },
    'samples': {
      '@reverse': 'donor'
    },
    'sections': {
      '@id': 'ccf:subdivided_into_sections',
      '@type': '@id'
    },
    'datasets': {
      '@id': 'ccf:generates_dataset',
      '@type': '@id'
    },
    'sample_type': 'ccf:sample_type',
    'section_count': 'ccf:section_count',
    'section_size': 'ccf:section_size',
    'section_units': 'ccf:section_size_unit',
    'section_number': 'ccf:section_number',
    'rui_location': {
      '@id': 'ccf:has_registration_location',
      '@type': '@id'
    },
    'ccf_annotations': {
      '@id': 'ccf:collides_with',
      '@type': '@id',
      '@container': '@set'
    },
    'representation_of': {
      '@id': 'ccf:representation_of',
      '@type': '@id'
    },
    'reference_organ': {
      '@id': 'ccf:has_reference_organ',
      '@type': '@id'
    },
    'extraction_set_for': {
      '@id': 'ccf:extraction_set_for',
      '@type': '@id'
    },
    'extraction_set': {
      '@id': 'ccf:has_extraction_set',
      '@type': '@id'
    },
    'organ_owner_sex': 'ccf:organ_owner_sex',
    'side': 'ccf:organ_side',
    'rui_rank': 'ccf:rui_rank',
    'slice_thickness': 'ccf:slice_thickness',
    'slice_count': 'ccf:slice_count',
    'object': {
      '@id': 'ccf:has_object_reference',
      '@type': '@id'
    },
    'creation_date': 'dcterms:created',
    'updated_date': 'ccf:updated_date',
    'creator': 'dcterms:creator',
    'creator_first_name': 'ccf:creator_first_name',
    'creator_last_name': 'ccf:creator_last_name',
    'placement': {
      '@reverse': 'ccf:placement_for'
    },
    'placement_date': 'dcterms:created',
    'rotation_order': 'ccf:rotation_order',
    'dimension_units': 'ccf:dimension_unit',
    'rotation_units': 'ccf:rotation_unit',
    'scaling_units': 'ccf:scaling_unit',
    'translation_units': 'ccf:translation_unit',
    'source': {
      '@id': 'ccf:placement_for',
      '@type': '@id'
    },
    'target': {
      '@id': 'ccf:placement_relative_to',
      '@type': '@id'
    },
    'x_rotation': 'ccf:x_rotation',
    'y_rotation': 'ccf:y_rotation',
    'z_rotation': 'ccf:z_rotation',
    'x_scaling': 'ccf:x_scaling',
    'y_scaling': 'ccf:y_scaling',
    'z_scaling': 'ccf:z_scaling',
    'x_translation': 'ccf:x_translation',
    'y_translation': 'ccf:y_translation',
    'z_translation': 'ccf:z_translation',
    'x_dimension': 'ccf:x_dimension',
    'y_dimension': 'ccf:y_dimension',
    'z_dimension': 'ccf:z_dimension',
    'ontology_terms': {
      '@id': 'ccf:has_ontology_term',
      '@type': '@id'
    },
    'technology': 'ccf:technology',
    'thumbnail': 'ccf:thumbnail',
    'file': 'ccf:file_url',
    'file_format': 'ccf:file_format',
    'file_subpath': 'ccf:file_subpath'
  }
};
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Function which takes JSON-LD data and makes patches to update from CCF v1.x to v2.0 automatically
 *
 * @param jsonLdString the input JSON-LD as a string
 * @returns A JSON-LD object derived from the given string with updated data to be compatible with CCF v2.0
 */
export function patchJsonLd(jsonLdString: string, context: string | JsonLd = CCF_CONTEXT): JsonLd {
  return JSON.parse(jsonLdString, (key, value) => {
    if (key === 'ccf_annotations' && Array.isArray(value)) {
      return value.map((iri: string) => {
        if (iri?.startsWith('http://purl.obolibrary.org/obo/FMA_')) {
          return iri.replace(
            'http://purl.obolibrary.org/obo/FMA_',
            'http://purl.org/sig/ont/fma/fma'
          );
        } else {
          return iri;
        }
      });
    } else if (key === '@context' && value && (
      value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-entity-context.jsonld'
        || value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld'
        || value === 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld'
        || (value as Context)['@base'] === 'http://purl.org/ccf/latest/ccf-entity.owl#'
    )) {
      return context;
    }
    return value;
  });
}

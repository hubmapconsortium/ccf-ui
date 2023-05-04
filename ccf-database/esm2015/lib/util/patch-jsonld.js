/* eslint-disable @typescript-eslint/naming-convention */
/** CCF v2.0 JSON-LD Context */
const CCF_CONTEXT = {
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
export function patchJsonLd(jsonLdString) {
    return JSON.parse(jsonLdString, (key, value) => {
        if (key === 'ccf_annotations' && Array.isArray(value)) {
            return value.map((iri) => {
                if (iri === null || iri === void 0 ? void 0 : iri.startsWith('http://purl.obolibrary.org/obo/FMA_')) {
                    return iri.replace('http://purl.obolibrary.org/obo/FMA_', 'http://purl.org/sig/ont/fma/fma');
                }
                else {
                    return iri;
                }
            });
        }
        else if (key === '@context' && value && (value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-entity-context.jsonld'
            || value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld'
            || value === 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld'
            || value['@base'] === 'http://purl.org/ccf/latest/ccf-entity.owl#')) {
            return CCF_CONTEXT;
        }
        return value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0Y2gtanNvbmxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWRhdGFiYXNlL3NyYy9saWIvdXRpbC9wYXRjaC1qc29ubGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EseURBQXlEO0FBQ3pELCtCQUErQjtBQUMvQixNQUFNLFdBQVcsR0FBRztJQUNsQixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsS0FBSyxFQUFFLHNCQUFzQjtRQUM3QixNQUFNLEVBQUUsdUNBQXVDO1FBQy9DLFNBQVMsRUFBRSwyQkFBMkI7UUFDdEMsT0FBTyxFQUFFLFlBQVk7UUFDckIsYUFBYSxFQUFFLGNBQWM7UUFDN0IsTUFBTSxFQUFFLFNBQVM7UUFDakIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLGVBQWUsRUFBRSwwQkFBMEI7UUFDM0MsZUFBZSxFQUFFLDBCQUEwQjtRQUMzQyxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxVQUFVLEVBQUUsT0FBTztTQUNwQjtRQUNELFVBQVUsRUFBRTtZQUNWLEtBQUssRUFBRSw4QkFBOEI7WUFDckMsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELGFBQWEsRUFBRSxpQkFBaUI7UUFDaEMsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQyxjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLGVBQWUsRUFBRSx1QkFBdUI7UUFDeEMsZ0JBQWdCLEVBQUUsb0JBQW9CO1FBQ3RDLGNBQWMsRUFBRTtZQUNkLEtB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R0FBRyxDQUFDLE9BQU8sQ0FDaEIscUNBQXFDLEVBQ3JDLGlDQUFpQyxDQUNsQyxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxDQUFDO2lCQUNaO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksR0FBRyxLQUFLLFVBQVUsSUFBSSxLQUFLLElBQUksQ0FDeEMsS0FBSyxLQUFLLDhFQUE4RTtlQUNuRixLQUFLLEtBQUssdUVBQXVFO2VBQ2pGLEtBQUssS0FBSyxvRUFBb0U7ZUFDN0UsS0FBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyw0Q0FBNEMsQ0FDbEYsRUFBRTtZQUNELE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbnRleHQsIEpzb25MZCB9IGZyb20gJ2pzb25sZC9qc29ubGQtc3BlYyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuLyoqIENDRiB2Mi4wIEpTT04tTEQgQ29udGV4dCAqL1xuY29uc3QgQ0NGX0NPTlRFWFQgPSB7XG4gICdAY29udGV4dCc6IHtcbiAgICAnQGJhc2UnOiAnaHR0cDovL3B1cmwub3JnL2NjZi8nLFxuICAgICdAdm9jYWInOiAnaHR0cDovL3B1cmwub3JnL2NjZi8nLFxuICAgICdjY2YnOiAnaHR0cDovL3B1cmwub3JnL2NjZi8nLFxuICAgICdyZGZzJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSMnLFxuICAgICdkY3Rlcm1zJzogJ2h0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy8nLFxuICAgICdsYWJlbCc6ICdyZGZzOmxhYmVsJyxcbiAgICAnZGVzY3JpcHRpb24nOiAncmRmczpjb21tZW50JyxcbiAgICAnbGluayc6ICdjY2Y6dXJsJyxcbiAgICAnc2V4JzogJ2NjZjpzZXgnLFxuICAgICdhZ2UnOiAnY2NmOmFnZScsXG4gICAgJ2JtaSc6ICdjY2Y6Ym1pJyxcbiAgICAnY29uc29ydGl1bV9uYW1lJzogJ2NjZjpjb25zb3J0aXVtX25hbWUnLFxuICAgICdwcm92aWRlcl9uYW1lJzogJ2NjZjp0aXNzdWVfcHJvdmlkZXJfbmFtZScsXG4gICAgJ3Byb3ZpZGVyX3V1aWQnOiAnY2NmOnRpc3N1ZV9wcm92aWRlcl91dWlkJyxcbiAgICAnZG9ub3InOiB7XG4gICAgICAnQGlkJzogJ2NjZjpjb21lc19mcm9tJyxcbiAgICAgICdAdHlwZSc6ICdAaWQnXG4gICAgfSxcbiAgICAnc2FtcGxlcyc6IHtcbiAgICAgICdAcmV2ZXJzZSc6ICdkb25vcidcbiAgICB9LFxuICAgICdzZWN0aW9ucyc6IHtcbiAgICAgICdAaWQnOiAnY2NmOnN1YmRpdmlkZWRfaW50b19zZWN0aW9ucycsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ2RhdGFzZXRzJzoge1xuICAgICAgJ0BpZCc6ICdjY2Y6Z2VuZXJhdGVzX2RhdGFzZXQnLFxuICAgICAgJ0B0eXBlJzogJ0BpZCdcbiAgICB9LFxuICAgICdzYW1wbGVfdHlwZSc6ICdjY2Y6c2FtcGxlX3R5cGUnLFxuICAgICdzZWN0aW9uX2NvdW50JzogJ2NjZjpzZWN0aW9uX2NvdW50JyxcbiAgICAnc2VjdGlvbl9zaXplJzogJ2NjZjpzZWN0aW9uX3NpemUnLFxuICAgICdzZWN0aW9uX3VuaXRzJzogJ2NjZjpzZWN0aW9uX3NpemVfdW5pdCcsXG4gICAgJ3NlY3Rpb25fbnVtYmVyJzogJ2NjZjpzZWN0aW9uX251bWJlcicsXG4gICAgJ3J1aV9sb2NhdGlvbic6IHtcbiAgICAgICdAaWQnOiAnY2NmOmhhc19yZWdpc3RyYXRpb25fbG9jYXRpb24nLFxuICAgICAgJ0B0eXBlJzogJ0BpZCdcbiAgICB9LFxuICAgICdjY2ZfYW5ub3RhdGlvbnMnOiB7XG4gICAgICAnQGlkJzogJ2NjZjpjb2xsaWRlc193aXRoJyxcbiAgICAgICdAdHlwZSc6ICdAaWQnLFxuICAgICAgJ0Bjb250YWluZXInOiAnQHNldCdcbiAgICB9LFxuICAgICdyZXByZXNlbnRhdGlvbl9vZic6IHtcbiAgICAgICdAaWQnOiAnY2NmOnJlcHJlc2VudGF0aW9uX29mJyxcbiAgICAgICdAdHlwZSc6ICdAaWQnXG4gICAgfSxcbiAgICAncmVmZXJlbmNlX29yZ2FuJzoge1xuICAgICAgJ0BpZCc6ICdjY2Y6aGFzX3JlZmVyZW5jZV9vcmdhbicsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ2V4dHJhY3Rpb25fc2V0X2Zvcic6IHtcbiAgICAgICdAaWQnOiAnY2NmOmV4dHJhY3Rpb25fc2V0X2ZvcicsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ2V4dHJhY3Rpb25fc2V0Jzoge1xuICAgICAgJ0BpZCc6ICdjY2Y6aGFzX2V4dHJhY3Rpb25fc2V0JyxcbiAgICAgICdAdHlwZSc6ICdAaWQnXG4gICAgfSxcbiAgICAnb3JnYW5fb3duZXJfc2V4JzogJ2NjZjpvcmdhbl9vd25lcl9zZXgnLFxuICAgICdzaWRlJzogJ2NjZjpvcmdhbl9zaWRlJyxcbiAgICAncnVpX3JhbmsnOiAnY2NmOnJ1aV9yYW5rJyxcbiAgICAnc2xpY2VfdGhpY2tuZXNzJzogJ2NjZjpzbGljZV90aGlja25lc3MnLFxuICAgICdzbGljZV9jb3VudCc6ICdjY2Y6c2xpY2VfY291bnQnLFxuICAgICdvYmplY3QnOiB7XG4gICAgICAnQGlkJzogJ2NjZjpoYXNfb2JqZWN0X3JlZmVyZW5jZScsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ2NyZWF0aW9uX2RhdGUnOiAnZGN0ZXJtczpjcmVhdGVkJyxcbiAgICAndXBkYXRlZF9kYXRlJzogJ2NjZjp1cGRhdGVkX2RhdGUnLFxuICAgICdjcmVhdG9yJzogJ2RjdGVybXM6Y3JlYXRvcicsXG4gICAgJ2NyZWF0b3JfZmlyc3RfbmFtZSc6ICdjY2Y6Y3JlYXRvcl9maXJzdF9uYW1lJyxcbiAgICAnY3JlYXRvcl9sYXN0X25hbWUnOiAnY2NmOmNyZWF0b3JfbGFzdF9uYW1lJyxcbiAgICAncGxhY2VtZW50Jzoge1xuICAgICAgJ0ByZXZlcnNlJzogJ2NjZjpwbGFjZW1lbnRfZm9yJ1xuICAgIH0sXG4gICAgJ3BsYWNlbWVudF9kYXRlJzogJ2RjdGVybXM6Y3JlYXRlZCcsXG4gICAgJ3JvdGF0aW9uX29yZGVyJzogJ2NjZjpyb3RhdGlvbl9vcmRlcicsXG4gICAgJ2RpbWVuc2lvbl91bml0cyc6ICdjY2Y6ZGltZW5zaW9uX3VuaXQnLFxuICAgICdyb3RhdGlvbl91bml0cyc6ICdjY2Y6cm90YXRpb25fdW5pdCcsXG4gICAgJ3NjYWxpbmdfdW5pdHMnOiAnY2NmOnNjYWxpbmdfdW5pdCcsXG4gICAgJ3RyYW5zbGF0aW9uX3VuaXRzJzogJ2NjZjp0cmFuc2xhdGlvbl91bml0JyxcbiAgICAnc291cmNlJzoge1xuICAgICAgJ0BpZCc6ICdjY2Y6cGxhY2VtZW50X2ZvcicsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ3RhcmdldCc6IHtcbiAgICAgICdAaWQnOiAnY2NmOnBsYWNlbWVudF9yZWxhdGl2ZV90bycsXG4gICAgICAnQHR5cGUnOiAnQGlkJ1xuICAgIH0sXG4gICAgJ3hfcm90YXRpb24nOiAnY2NmOnhfcm90YXRpb24nLFxuICAgICd5X3JvdGF0aW9uJzogJ2NjZjp5X3JvdGF0aW9uJyxcbiAgICAnel9yb3RhdGlvbic6ICdjY2Y6el9yb3RhdGlvbicsXG4gICAgJ3hfc2NhbGluZyc6ICdjY2Y6eF9zY2FsaW5nJyxcbiAgICAneV9zY2FsaW5nJzogJ2NjZjp5X3NjYWxpbmcnLFxuICAgICd6X3NjYWxpbmcnOiAnY2NmOnpfc2NhbGluZycsXG4gICAgJ3hfdHJhbnNsYXRpb24nOiAnY2NmOnhfdHJhbnNsYXRpb24nLFxuICAgICd5X3RyYW5zbGF0aW9uJzogJ2NjZjp5X3RyYW5zbGF0aW9uJyxcbiAgICAnel90cmFuc2xhdGlvbic6ICdjY2Y6el90cmFuc2xhdGlvbicsXG4gICAgJ3hfZGltZW5zaW9uJzogJ2NjZjp4X2RpbWVuc2lvbicsXG4gICAgJ3lfZGltZW5zaW9uJzogJ2NjZjp5X2RpbWVuc2lvbicsXG4gICAgJ3pfZGltZW5zaW9uJzogJ2NjZjp6X2RpbWVuc2lvbicsXG4gICAgJ29udG9sb2d5X3Rlcm1zJzoge1xuICAgICAgJ0BpZCc6ICdjY2Y6aGFzX29udG9sb2d5X3Rlcm0nLFxuICAgICAgJ0B0eXBlJzogJ0BpZCdcbiAgICB9LFxuICAgICd0ZWNobm9sb2d5JzogJ2NjZjp0ZWNobm9sb2d5JyxcbiAgICAndGh1bWJuYWlsJzogJ2NjZjp0aHVtYm5haWwnLFxuICAgICdmaWxlJzogJ2NjZjpmaWxlX3VybCcsXG4gICAgJ2ZpbGVfZm9ybWF0JzogJ2NjZjpmaWxlX2Zvcm1hdCcsXG4gICAgJ2ZpbGVfc3VicGF0aCc6ICdjY2Y6ZmlsZV9zdWJwYXRoJ1xuICB9XG59O1xuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBGdW5jdGlvbiB3aGljaCB0YWtlcyBKU09OLUxEIGRhdGEgYW5kIG1ha2VzIHBhdGNoZXMgdG8gdXBkYXRlIGZyb20gQ0NGIHYxLnggdG8gdjIuMCBhdXRvbWF0aWNhbGx5XG4gKlxuICogQHBhcmFtIGpzb25MZFN0cmluZyB0aGUgaW5wdXQgSlNPTi1MRCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMgQSBKU09OLUxEIG9iamVjdCBkZXJpdmVkIGZyb20gdGhlIGdpdmVuIHN0cmluZyB3aXRoIHVwZGF0ZWQgZGF0YSB0byBiZSBjb21wYXRpYmxlIHdpdGggQ0NGIHYyLjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoSnNvbkxkKGpzb25MZFN0cmluZzogc3RyaW5nKTogSnNvbkxkIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoanNvbkxkU3RyaW5nLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIGlmIChrZXkgPT09ICdjY2ZfYW5ub3RhdGlvbnMnICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUubWFwKChpcmk6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoaXJpPy5zdGFydHNXaXRoKCdodHRwOi8vcHVybC5vYm9saWJyYXJ5Lm9yZy9vYm8vRk1BXycpKSB7XG4gICAgICAgICAgcmV0dXJuIGlyaS5yZXBsYWNlKFxuICAgICAgICAgICAgJ2h0dHA6Ly9wdXJsLm9ib2xpYnJhcnkub3JnL29iby9GTUFfJyxcbiAgICAgICAgICAgICdodHRwOi8vcHVybC5vcmcvc2lnL29udC9mbWEvZm1hJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGlyaTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdAY29udGV4dCcgJiYgdmFsdWUgJiYgKFxuICAgICAgdmFsdWUgPT09ICdodHRwczovL2h1Ym1hcGNvbnNvcnRpdW0uZ2l0aHViLmlvL2h1Ym1hcC1vbnRvbG9neS9jY2YtZW50aXR5LWNvbnRleHQuanNvbmxkJ1xuICAgICAgICB8fCB2YWx1ZSA9PT0gJ2h0dHBzOi8vaHVibWFwY29uc29ydGl1bS5naXRodWIuaW8vaHVibWFwLW9udG9sb2d5L2NjZi1jb250ZXh0Lmpzb25sZCdcbiAgICAgICAgfHwgdmFsdWUgPT09ICdodHRwczovL2h1Ym1hcGNvbnNvcnRpdW0uZ2l0aHViLmlvL2NjZi1vbnRvbG9neS9jY2YtY29udGV4dC5qc29ubGQnXG4gICAgICAgIHx8ICh2YWx1ZSBhcyBDb250ZXh0KVsnQGJhc2UnXSA9PT0gJ2h0dHA6Ly9wdXJsLm9yZy9jY2YvbGF0ZXN0L2NjZi1lbnRpdHkub3dsIydcbiAgICApKSB7XG4gICAgICByZXR1cm4gQ0NGX0NPTlRFWFQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSk7XG59XG4iXX0=
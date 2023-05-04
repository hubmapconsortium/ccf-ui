import { JsonLd } from 'jsonld/jsonld-spec';
/**
 * Function which takes JSON-LD data and makes patches to update from CCF v1.x to v2.0 automatically
 *
 * @param jsonLdString the input JSON-LD as a string
 * @returns A JSON-LD object derived from the given string with updated data to be compatible with CCF v2.0
 */
export declare function patchJsonLd(jsonLdString: string): JsonLd;

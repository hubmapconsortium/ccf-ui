import { CCFDatabaseOptions } from 'ccf-database';
import { RequestHandler } from 'express';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';

import { AutoPruneLRUCache } from '../../../utils/auto-prune-lru-cache';
import { RequestCache } from '../../../utils/request-cache';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { get } from '../../../environment';

export interface GtexTissue {
  colorHex: string;
  colorRgb: string;
  datasetId: string;
  eGeneCount: number;
  expressedGeneCount: number;
  hasEGenes: true;
  hasSGenes: true;
  mappedInHubmap: true;
  rnaSeqAgeMaxFemale: number;
  rnaSeqAgeMaxMale: number;
  rnaSeqAgeMeanFemale: number;
  rnaSeqAgeMeanMale: number;
  rnaSeqAgeMinFemale: number;
  rnaSeqAgeMinMale: number;
  rnaSeqAndGenotypeSampleCount: number;
  rnaSeqSampleCount: number;
  rnaSeqSampleCountFemale: number;
  rnaSeqSampleCountMale: number;
  sGeneCount: number;
  samplingSite: string;
  tissueSite: string;
  tissueSiteDetail: string;
  tissueSiteDetailAbbr: string;
  tissueSiteDetailId: string;
  uberonId: string;
}

const DEFAULT_GTEX_RUI_LOCATIONS = 'projects/ccf-eui/src/assets/gtex/data/rui_locations.jsonld';
const GTEX_API_URL = 'https://gtexportal.org/rest/v1/dataset/tissueInfo?datasetId=gtex_v8&format=json';

async function getLocations(): Promise<unknown> {
  try {
    const source = get('GTEX_RUI_LOCATIONS', DEFAULT_GTEX_RUI_LOCATIONS);
    // Attempt to load the source url as a local file
    const data = readFileSync(source, { encoding: 'utf-8' });
    const jsonld = JSON.parse(data) as JsonLdObj
    const results = jsonld['@graph'] as JsonLdObj[];

    const response: { tissueInfo: GtexTissue[] } = await fetch(GTEX_API_URL).then(r => r.json());
    const mappedEntries = response.tissueInfo.filter(entry => entry.mappedInHubmap);
    for (const tissue of mappedEntries) {
      updateEntry(results, tissue, 'Female');
      updateEntry(results, tissue, 'Male');
    }

    return jsonld;
  } catch (_error) {
    throw new Error('No data available');
  }
}

export function updateEntry(resultsList: JsonLdObj[], tissueInfo: GtexTissue, sex: 'Male' | 'Female'): void {
  const matchingEntry = resultsList.find(entry => entry['@id']?.includes(tissueInfo.tissueSiteDetailId) && (entry.label as string).includes(sex));
  let newLabel = '';
  if (matchingEntry) {
    const index = resultsList.indexOf(matchingEntry);
    newLabel = sex === 'Male' ?
      `Males (n=${tissueInfo.rnaSeqSampleCountMale}), Mean Age ${tissueInfo.rnaSeqAgeMeanMale} (range ${tissueInfo.rnaSeqAgeMinMale}-${tissueInfo.rnaSeqAgeMaxMale})` :
      `Females (n=${tissueInfo.rnaSeqSampleCountFemale}), Mean Age ${tissueInfo.rnaSeqAgeMeanFemale} (range ${tissueInfo.rnaSeqAgeMinFemale}-${tissueInfo.rnaSeqAgeMaxFemale})`;
    resultsList[index].label = newLabel;
    resultsList[index].sex = sex;
  }
}

export function ruiLocations(): RequestHandler {
  const cache = new RequestCache<string, unknown>(
    new AutoPruneLRUCache({
      max: 10,
      maxAge: 60 * 60 * 1000
    }),
    getLocations
  );

  return async (req, res, _next) => {
    const options: CCFDatabaseOptions = req.app.get('database-options');
    const rawToken = req.query.token;
    const token = typeof rawToken === 'string' ? rawToken : '';
    const result = await cache.get(token, options);

    res.json(result);
  };
}

import { CCFDatabaseOptions } from 'ccf-database';
import { RequestHandler } from 'express';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';

import { AutoPruneLRUCache } from '../../../utils/auto-prune-lru-cache';
import { RequestCache } from '../../../utils/request-cache';
import { JsonLdObj } from 'jsonld/jsonld-spec';

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

async function getLocations(): Promise<unknown> {
  try {
    // TODO get path fom environment
    const source = 'projects/ccf-eui/src/assets/gtex/data/rui_locations.jsonld';
    // Attempt to load the source url as a local file
    const data = readFileSync(source, { encoding: 'utf-8' });
    const results = (JSON.parse(data) as JsonLdObj)['@graph'] as JsonLdObj[];

    // TODO call the cool api to get new numbers
    const response: { tissueInfo: GtexTissue[] } = await (await fetch('https://gtexportal.org/rest/v1/dataset/tissueInfo?datasetId=gtex_v8&format=json')).json();
    const mappedEntries = response.tissueInfo.filter(entry => entry.mappedInHubmap);
    for (const tissue of mappedEntries) {
      updateEntry(results, tissue, 'Female');
      updateEntry(results, tissue, 'Male');
    }

    return results;
  } catch (_error) {
    throw new Error('No data available');
  }
}

export function updateEntry(resultsList: JsonLdObj[], tissueInfo: GtexTissue, sex: string): void {
  const matchingEntry = resultsList.find(entry => entry['@id']?.includes(tissueInfo.tissueSiteDetailId) && (entry.label as string).includes(sex));
  if (matchingEntry) {
    const index = resultsList.indexOf(matchingEntry);
    const newLabel = `${sex}s (n=${tissueInfo[`rnaSeqSampleCount${sex}`]}), Mean Age ${tissueInfo[`rnaSeqAgeMean${sex}`]} (range ${tissueInfo[`rnaSeqAgeMin${sex}`]}-${tissueInfo[`rnaSeqAgeMax${sex}`]})`;
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

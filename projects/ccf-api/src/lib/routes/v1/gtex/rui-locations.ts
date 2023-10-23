import { CCFDatabaseOptions } from 'ccf-database';
import { RequestHandler } from 'express';
import { readFileSync } from 'fs';

import { AutoPruneLRUCache } from '../../../utils/auto-prune-lru-cache';
import { RequestCache } from '../../../utils/request-cache';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { get } from '../../../environment';

export interface GtexTissue {
  // NOTE: The API response includes more fields, but we only map the ones we actually use here
  tissueSiteDetailId: string;
  mappedInHubmap: boolean;
  rnaSeqSampleSummary: {
    totalCount: number;
    female: {
      ageMax: number;
      ageMin: number;
      ageMean: number;
      count: number;
    };
    male: {
      ageMax: number;
      ageMin: number;
      ageMean: number;
      count: number;
    };
  };
}

const DEFAULT_GTEX_RUI_LOCATIONS = 'https://hubmapconsortium.github.io/hra-registrations/gtex-pan-eraslan-2022/rui_locations.jsonld';
const GTEX_API_URL = 'https://gtexportal.org/api/v2/dataset/tissueSiteDetail';

async function getLocations(): Promise<unknown> {
  try {
    const source = get('GTEX_RUI_LOCATIONS', DEFAULT_GTEX_RUI_LOCATIONS);
    let data;
    if (source.startsWith('http')) {
      data = await fetch(source).then(r => r.text());
    } else {
      // Attempt to load the source url as a local file
      data = readFileSync(source, { encoding: 'utf-8' });
    }
    const jsonld: JsonLdObj = JSON.parse(data);
    const results = jsonld['@graph'] as JsonLdObj[];

    const response: { data: GtexTissue[] } = await fetch(GTEX_API_URL).then(r => r.json()) as { data: GtexTissue[] };
    const mappedEntries = response?.data?.filter(entry => entry.mappedInHubmap) ?? [];
    for (const tissue of mappedEntries) {
      updateEntry(results, tissue, 'Female');
      updateEntry(results, tissue, 'Male');
    }

    return jsonld;
  } catch (_error) {
    return undefined;
  }
}

export function updateEntry(resultsList: JsonLdObj[], tissueInfo: GtexTissue, sex: 'Male' | 'Female'): void {
  const matchingEntry = resultsList.find(entry => entry['@id']?.includes(tissueInfo.tissueSiteDetailId) && (entry.label as string).includes(sex));
  if (matchingEntry) {
    const index = resultsList.indexOf(matchingEntry);
    const sexStats = sex === 'Male' ? tissueInfo.rnaSeqSampleSummary.male : tissueInfo.rnaSeqSampleSummary.female;
    resultsList[index].label = `${sex}s (n=${sexStats.count}) Mean Age ${sexStats.ageMean} (range ${sexStats.ageMin} - ${sexStats.ageMax})`;
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

    if (result) {
      res.json(result);
    } else {
      res.status(500).json([]);
    }
  };
}

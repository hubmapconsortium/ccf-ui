import { writeFileSync } from 'fs';
import { argv } from 'process';
import { serializeN3Store } from 'triple-store-utils';
import { CCFDatabase } from './public-api';


if (!(global as { fetch: unknown }).fetch) {
  (global as { fetch: unknown }).fetch = fetch;
}

async function main(outputFile?: string): Promise<void> {
  const db = new CCFDatabase({
    ccfOwlUrl: 'https://raw.githubusercontent.com/hubmapconsortium/ccf-ontology/develop/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    dataSources: []
  });
  await db.connect();
  const storeString = serializeN3Store(db.store);

  if (outputFile) {
    writeFileSync(outputFile, storeString);
  } else {
    console.log(storeString);
  }
}
main(argv.length >= 2 ? argv[2] : undefined);

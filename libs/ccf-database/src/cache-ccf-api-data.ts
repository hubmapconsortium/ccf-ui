import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { argv } from 'process';
import { CCFDatabase } from './public-api';


if (!(global as { fetch: unknown }).fetch) {
  (global as { fetch: unknown }).fetch = fetch;
}

async function main(inputCCF: string, outputDir: string): Promise<void> {
  const storeString = readFileSync(inputCCF).toString();
  const db = new CCFDatabase({
    ccfOwlUrl: storeString,
    ccfContextUrl: 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    dataSources: []
  });
  await db.connect();

  writeFileSync(resolve(outputDir, 'ccf.owl.n3store.json'), storeString);

  const asModel = await db.getOntologyTreeModel();
  writeFileSync(resolve(outputDir, 'ontology-tree-model.json'), JSON.stringify(asModel));

  const ctModel = await db.getCellTypeTreeModel();
  writeFileSync(resolve(outputDir, 'cell-type-tree-model.json'), JSON.stringify(ctModel));

  const bmModel = await db.getBiomarkerTreeModel();
  writeFileSync(resolve(outputDir, 'biomarker-tree-model.json'), JSON.stringify(bmModel));

  const refOrgans = await db.getReferenceOrgans();
  writeFileSync(resolve(outputDir, 'reference-organs.json'), JSON.stringify(refOrgans));
}

if (argv.length >= 3) {
  main(argv[2], argv[3]);
}

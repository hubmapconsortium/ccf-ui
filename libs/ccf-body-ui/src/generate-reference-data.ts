// Must be imported first!
import './global-fixes';

import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process';

import { SpatialEntityJsonLd } from './lib/shared/ccf-spatial-jsonld';
import { processReferenceData } from './lib/util/process-reference-data';


async function main(refEntitiesPath: string, ouputPath?: string): Promise<void> {
  const refEntities = JSON.parse(readFileSync(refEntitiesPath, { encoding: 'utf-8' })) as SpatialEntityJsonLd[];
  const jsonld = await processReferenceData(refEntities);
  if (ouputPath) {
    writeFileSync(argv[3], JSON.stringify(jsonld, null, 2));
  } else {
    console.log(jsonld);
  }
}
if (argv.length >= 2) {
  main(argv[2], argv.length > 3 ? argv[3] : undefined);
} else {
  const msg = (
    'ts-node --project projects/ccf-body-ui/tsconfig.cli.json' +
    'projects/ccf-body-ui/src/generate-reference-data.ts <input jsonld> <output jsonld>'
  );
  console.log(msg);
}

import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'process';
import { hubmapResponseAsJsonLd } from './lib/hubmap/hubmap-data';


if (argv.length === 4) {
  const [inFile, outFile] = argv.slice(2);
  const response = JSON.parse(readFileSync(inFile) as unknown as string) as Record<string, unknown>;
  const jsonld = hubmapResponseAsJsonLd(response);
  writeFileSync(outFile, JSON.stringify(jsonld, null, 2));
} else {
  console.log('ts-node process-hubmap-data.ts <HuBMAP Search API Response in JSON format> <Processed response as CCF-compatible JSON-LD>');
}

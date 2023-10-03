#!/bin/bash

DIST=dist/server
rm -rf $DIST

npx tsc -p projects/ccf-api/tsconfig.server.json --outDir $DIST/node_modules/ccf-api
npx tsc -p projects/ccf-database/tsconfig.server.json --outDir $DIST/node_modules/ccf-database
npx tsc -p projects/triple-store-utils/tsconfig.server.json --outDir $DIST/node_modules/triple-store-utils

mv $DIST/node_modules/ccf-database $DIST/node_modules/ccf-database.weird
mv $DIST/node_modules/ccf-database.weird/ccf-database/src $DIST/node_modules/ccf-database
rm -r $DIST/node_modules/ccf-database.weird

cp projects/ccf-api/package.server.json $DIST/node_modules/ccf-api/package.json
cp projects/ccf-database/package.server.json $DIST/node_modules/ccf-database/package.json
cp projects/triple-store-utils/package.server.json $DIST/node_modules/triple-store-utils/package.json
cp projects/ccf-api/ccf-database.worker.js $DIST
cp projects/ccf-api/start-server.js $DIST

echo '{ "name": "ccf-api-runner", "type": "module" }' > $DIST/package.json

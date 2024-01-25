import { CCFDatabaseOptions } from 'ccf-database';
import { Express } from 'express';
import { readFileSync } from 'fs';

import { createApp } from './app';
import { get, getNumber, isDebug, THROW_IF_NOT_FOUND } from './environment';
import { DatabaseCacheOptions } from './middleware/database-loader';


// ---------------------
// Utilities
// ---------------------

function tryJsonParse(text: string): unknown | undefined {
  try {
    return JSON.parse(text);
  } catch (_error) {
    return undefined;
  }
}


type DatabaseSource = CCFDatabaseOptions['dataSources'][number];
type DatabaseSources = CCFDatabaseOptions['dataSources'];

function loadDatabaseSource(source: DatabaseSource): DatabaseSource {
  if (typeof source !== 'string') {
    return source;
  }

  try {
    // Attempt to load the source url as a local file
    const data = readFileSync(source, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (_error) {
    return source;
  }
}

function parseDatabaseSources(text: string): DatabaseSources {
  const rawItems = /^\s*\[/.test(text) ?
    (tryJsonParse(text) ?? []) as DatabaseSources :
    text.split(/\s/);
  const nonEmptyItems = rawItems.filter(item => !!item);

  return nonEmptyItems.map(loadDatabaseSource);
}

// ---------------------
// Options Api
// ---------------------

export function getPort(): number {
  return getNumber('PORT', 5000);
}

export function getDatabaseOptions(): CCFDatabaseOptions {
  type ServiceT = CCFDatabaseOptions['hubmapDataService'];

  return {
    ccfOwlUrl: get('DB_OWL_URL', THROW_IF_NOT_FOUND),
    ccfContextUrl: get('DB_CONTEXT_URL', 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld'),
    dataSources: parseDatabaseSources(get('DB_DATA_SOURCES', '')),
    hubmapDataService: get('DB_DATA_SERVICE', 'search-api') as ServiceT,
    hubmapPortalUrl: get('DB_PORTAL_URL', 'https://portal.hubmapconsortium.org/'),
    hubmapDataUrl: get('DB_DATA_URL', 'https://search.api.hubmapconsortium.org/v3/entities/search'),
    hubmapAssetsUrl: get('DB_ASSETS_URL', 'https://assets.hubmapconsortium.org'),
    hubmapQuery: get('DB_QUERY'),
    hubmapToken: get('DB_TOKEN')
  };
}

export function getCacheOptions(): DatabaseCacheOptions {
  return {
    max: getNumber('DB_CACHE_MAX_SIZE'),
    maxAge: getNumber('DB_CACHE_MAX_AGE')
  };
}


// ---------------------
// Server Api
// ---------------------

export function startServer(): Express {
  const port = getPort();
  const dbOpts = getDatabaseOptions();
  const cacheOpts = getCacheOptions();
  const app = createApp({
    database: dbOpts,
    cache: cacheOpts
  });

  app.listen(port, () => {
    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.log(`Started server on port ${port}`);
    }
  });

  return app;
}

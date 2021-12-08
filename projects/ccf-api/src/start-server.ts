// Must be imported first!
import './global-fixes';

import { CCFDatabaseOptions } from 'ccf-database';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { JsonLd } from 'jsonld/jsonld-spec';
import { resolve } from 'path';
import { env } from 'process';

import { createApp } from './lib/app';
import { DatabaseCacheOptions } from './lib/middleware/database-loader';


type DataSourceItem = CCFDatabaseOptions['dataSources'][number];
type DataSources = CCFDatabaseOptions['dataSources'];


const THROW_IF_NOT_FOUND = Symbol('Indicator to throw for `get`');


// -------------------------------
// Utilities
// -------------------------------

function maybeCastNumber(value: string | undefined): number | undefined {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const num = Number(value || 'NaN');
  return isNaN(num) ? undefined : num;
}

function tryRelativeDataSourceLoad(source: string): JsonLd | undefined {
  try {
    const path = resolve(__dirname, '../../../', source);
    const data = readFileSync(path, { encoding: 'utf-8' });

    return JSON.parse(data);
  } catch (_error) {
    return undefined;
  }
}

function parseDataSources(value: string): DataSources {
  const tryLoad = (item: DataSourceItem) =>
    typeof item === 'string' && tryRelativeDataSourceLoad(item) || item;
  const items: DataSources = value.startsWith('[') ?
    JSON.parse(value) : value.split(' ');

  return items.map(tryLoad);
}

// -------------------------------
// Environment parsing
// -------------------------------

function get(key: string, defaultValue: string | typeof THROW_IF_NOT_FOUND = ''): string {
  const value = env[key];
  if (!value && defaultValue === THROW_IF_NOT_FOUND) {
    throw new Error(`Missing required value for environment variable ${key}`);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return value || defaultValue as string;
}

function isDebug(): boolean {
  return env.NODE_ENV !== 'production';
}

function getPort(): number {
  return maybeCastNumber(get('PORT')) ?? 5000;
}

function getDatabaseOptions(): CCFDatabaseOptions {
  return {
    ccfOwlUrl: get('DB_OWL_URL'),
    ccfContextUrl: get('DB_CONTEXT_URL'),
    dataSources: parseDataSources(get('DB_DATA_SOURCES', THROW_IF_NOT_FOUND)),
    hubmapDataService: get('DB_DATA_SERVICE', 'search-api') as CCFDatabaseOptions['hubmapDataService'],
    hubmapPortalUrl: get('DB_PORTAL_URL'),
    hubmapDataUrl: get('DB_DATA_URL'),
    hubmapAssetsUrl: get('DB_ASSETS_URL'),
    hubmapQuery: get('DB_QUERY'),
    hubmapToken: get('DB_TOKEN')
  };
}

function getDatabaseCacheOptions(): DatabaseCacheOptions {
  return {
    max: maybeCastNumber(get('DB_CACHE_MAX_SIZE')),
    maxAge: maybeCastNumber(get('DB_CACHE_MAX_AGE'))
  };
}


// -------------------------------
// Main function
// -------------------------------

function start(): void {
  const app = createApp({
    database: getDatabaseOptions(),
    cache: getDatabaseCacheOptions()
  });

  app.listen(getPort(), () => {
    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.log(`Started server on port ${getPort()}`);
    }
  });
}


// -------------------------------
// Start server
// -------------------------------

config();
start();

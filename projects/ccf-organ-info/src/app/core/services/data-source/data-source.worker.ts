/// <reference lib="webworker" />
import { CCFDatabase } from 'ccf-database';
import { expose } from 'comlink';

/** Worker thread database. */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const database = new CCFDatabase();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
expose(database);

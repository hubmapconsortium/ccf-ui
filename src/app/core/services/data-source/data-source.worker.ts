/// <reference lib="webworker" />
import { CCFDatabase } from 'ccf-database';
import { expose } from 'comlink';

/** Worker thread database. */
const database = new CCFDatabase();
expose(database);

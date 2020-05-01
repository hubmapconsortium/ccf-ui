/// <reference lib="webworker" />
import { CCFDatabase } from 'ccf-database';
import { expose } from 'comlink';

const database = new CCFDatabase();
expose(database);

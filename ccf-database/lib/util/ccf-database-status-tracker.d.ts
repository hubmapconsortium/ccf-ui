import { DatabaseStatus } from '../interfaces';
import { CCFDatabase } from '../ccf-database';
export declare class CCFDatabaseStatusTracker {
    database: CCFDatabase;
    status: 'Ready' | 'Loading' | 'Error';
    message?: string;
    loadTime?: number;
    constructor(database: CCFDatabase);
    toJson(): DatabaseStatus;
    private connect;
}

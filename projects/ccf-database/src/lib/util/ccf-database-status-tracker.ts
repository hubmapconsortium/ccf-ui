import { DatabaseStatus } from '../interfaces';
import { CCFDatabase } from '../ccf-database';


export class CCFDatabaseStatusTracker {
  status: 'Ready' | 'Loading' | 'Error';
  message?: string;
  loadTime?: number;

  constructor(public database: CCFDatabase) {
    this.connect();
  }

  toJson(): DatabaseStatus {
    return {
      status: this.status,
      message: this.message,
      checkback: this.status === 'Ready' || this.status === 'Error' ? 60 * 60 * 1000 : 2000,
      loadTime: this.loadTime
    };
  }

  private connect(): Promise<void> {
    this.status = 'Loading';
    this.message = 'Loading database';

    const startTime = Date.now();
    return this.database.connect()
      .then(async (loaded) => {
        if (loaded) {
          // Warm up the database
          this.message = 'Building scene';
          await this.database.getScene();
          this.message = 'Building tissue block results';
          await this.database.getTissueBlockResults();
          this.message = 'Aggregating results';
          await this.database.getAggregateResults();
          this.status = 'Ready';
          this.message = 'Database successfully loaded';
        } else {
          this.status = 'Error';
          this.message = 'Unknown error while loading database';
        }
      })
      .catch((error: { message?: string }) => {
        this.status = 'Error';
        this.message = error?.message ?? 'Unknown error while loading database';
      })
      .finally(() => {
        this.loadTime = Date.now() - startTime;
      });
  }
}

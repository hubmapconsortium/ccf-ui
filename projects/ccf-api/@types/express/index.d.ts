import { CCFDatabase } from 'ccf-database';

// Use declaration merging to add properties to
// Express interfaces that are set by our custom middleware

declare global {
  namespace Express {
    interface Request {
      database: CCFDatabase;
    }
  }
}

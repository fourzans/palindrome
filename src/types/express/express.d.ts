import 'express';
import type { Logger } from 'pino';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      requestId?: string;
      correlationId?: string;
      log?: Logger;
    }

    interface Response {
      locals: {
        requestId?: string;
        correlationId?: string;
        [key: string]: unknown;
      };
    }
  }
}

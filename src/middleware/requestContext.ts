import { RequestHandler } from 'express';
import pinoHttp from 'pino-http';
import { randomUUID } from 'crypto';
import { logger } from '../logging/logger';

export const requestContext: RequestHandler = pinoHttp({
  logger,
  genReqId: (req) => {
    const existing = req.headers['x-request-id'];
    return typeof existing === 'string' ? existing : randomUUID();
  },
  autoLogging: { ignore: (req) => req.url === '/health/live' },
  customProps: (req) => ({
    correlationId:
      typeof req.headers['x-correlation-id'] === 'string'
        ? req.headers['x-correlation-id']
        : typeof req.headers['x-request-id'] === 'string'
          ? req.headers['x-request-id']
          : ''
  }),
  customLogLevel: (_req, res, err) => {
    if (err) return 'error';
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});

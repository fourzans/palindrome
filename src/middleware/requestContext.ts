import { NextFunction, Request, Response } from 'express';
import pinoHttp from 'pino-http';
import { logger } from '../logging/logger';
import { randomUUID } from 'crypto';

export const requestContext = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id']?.toString() || randomUUID(),
  autoLogging: { ignore: (req) => req.url === '/health/live' },
  customProps: (req) => {
    const corr = (req.headers['x-correlation-id'] || req.headers['x-request-id'])?.toString();
    return { correlationId: corr };
  },
  customLogLevel: (_req, res, err) => {
    if (err) return 'error';
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});

export function idAndTiming(req: Request, res: Response, next: NextFunction) {
  const requestId = (req as any).id || req.headers['x-request-id'] || randomUUID();
  res.setHeader('X-Request-Id', String(requestId));
  const corr = req.headers['x-correlation-id'] || requestId;
  res.setHeader('X-Correlation-Id', String(corr));

  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const durMs = Number((process.hrtime.bigint() - start) / 1_000_000n);
    (req as any).log?.info({ durMs }, 'request complete');
  });

  next();
}

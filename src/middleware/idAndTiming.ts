import { RequestHandler } from 'express';
import { randomUUID } from 'crypto';

export const idAndTiming: RequestHandler = (req, res, next) => {
  const reqId: string = typeof req.id === 'string' ? req.id : randomUUID();
  req.id = reqId;
  res.setHeader('X-Request-Id', reqId);

  const corr: string =
    typeof req.headers['x-correlation-id'] === 'string' ? req.headers['x-correlation-id'] : reqId;
  res.setHeader('X-Correlation-Id', corr);

  const start = process.hrtime.bigint();
  res.once('finish', () => {
    const durMs = Number((process.hrtime.bigint() - start) / 1_000_000n);
    req.log?.info({ durMs, reqId, corr }, 'request complete');
  });

  next();
};

import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

function hasStatus(e: unknown): e is { status: number } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'status' in e &&
    typeof (e as { status: unknown }).status === 'number'
  );
}

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const requestId = req.id;

  if (err instanceof ZodError) {
    req.log?.warn({ err, requestId }, 'validation error');
    return res.status(400).json({
      error: 'Bad Request',
      details: err.errors,
      requestId
    });
  }

  if (err instanceof SyntaxError && hasStatus(err) && err.status === 400) {
    req.log?.warn({ err, requestId }, 'malformed JSON');
    return res.status(400).json({ error: 'Malformed JSON', requestId });
  }

  req.log?.error({ err, requestId }, 'unhandled error');
  return res.status(500).json({ error: 'Internal Server Error', requestId });
};

export default errorHandler;

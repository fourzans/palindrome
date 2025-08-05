import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export default function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
    const rid = (req as any).id;

    if (err instanceof ZodError) {
        (req as any).log?.warn({ err, rid }, 'validation error');
        return res.status(400).json({ error: err.errors.map(e => e.message)});
    }

    (req as any).log?.error({ err, rid }, 'unhandled error');
    res.status(500).json({ error: 'Internal Server Error'}); 
}
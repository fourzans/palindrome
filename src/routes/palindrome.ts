import { Request, Response, NextFunction, Router } from 'express';
import { z } from 'zod';
import { isPalindrome } from '../utils/palindrome';
import { requireFlag } from '../flags/flags';

const router = Router();

const querySchema = z.object({
  q: z.string().min(1).max(2048),
  strict: z.coerce.boolean().optional().default(true)
});

router.get(
  '/palindrome',
  requireFlag('PALINDROME_ENABLED'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, strict } = querySchema.parse(req.query);
      const result = isPalindrome(q, strict);

      res.json({
        query: q,
        strict,
        isPalindrome: result
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

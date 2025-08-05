import { Router } from 'express';

const router = Router();

router.get('/live', (_, res) => res.status(200).send('OK'));
router.get('/ready', (_, res) => res.status(200).json({ status: 'ready' }));

export default router;

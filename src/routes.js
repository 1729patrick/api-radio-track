import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => {
  res.json({ success: true });
});

export default router;

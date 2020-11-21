import { Router } from 'express';

import ImportController from './app/controllers/ImportController';

const router = Router();

router.get('/import', ImportController.formatStation);

export default router;

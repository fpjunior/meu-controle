import { Router } from 'express';
import { createDaily, getAllDailys, updateDaily, deleteDaily } from '../controllers/daily.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createDaily);
router.get('/', getAllDailys);
router.put('/:id', updateDaily);
router.delete('/:id', deleteDaily);

export default router;

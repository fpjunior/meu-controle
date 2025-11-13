import { Router } from 'express';
import { createRM, getAllRMs, getRM, updateRM, deleteRM } from '../controllers/rm.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createRM);
router.get('/', getAllRMs);
router.get('/:id', getRM);
router.put('/:id', updateRM);
router.delete('/:id', deleteRM);

export default router;

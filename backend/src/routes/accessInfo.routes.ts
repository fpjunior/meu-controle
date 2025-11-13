import { Router } from 'express';
import { createAccessInfo, getAllAccessInfo, updateAccessInfo, deleteAccessInfo } from '../controllers/accessInfo.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createAccessInfo);
router.get('/', getAllAccessInfo);
router.put('/:id', updateAccessInfo);
router.delete('/:id', deleteAccessInfo);

export default router;

import { Router } from 'express';
import { createBranch, getAllBranches, updateBranch, deleteBranch } from '../controllers/branch.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createBranch);
router.get('/', getAllBranches);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router;

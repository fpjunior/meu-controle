import { Router } from 'express';
import { createImportantLink, getAllImportantLinks, updateImportantLink, deleteImportantLink } from '../controllers/importantLink.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createImportantLink);
router.get('/', getAllImportantLinks);
router.put('/:id', updateImportantLink);
router.delete('/:id', deleteImportantLink);

export default router;

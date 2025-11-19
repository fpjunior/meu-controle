import { Router } from 'express';
import { createTeamMember, getTeamMembers } from '../controllers/teamMember.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createTeamMember);
router.get('/', getTeamMembers);

export default router;

import { Router } from 'express';
import { createTeam, getAllTeams, updateTeam, deleteTeam } from '../controllers/team.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createTeam);
router.get('/', getAllTeams);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;

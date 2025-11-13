import { Router } from 'express';
import { createTeamsMessage, getAllTeamsMessages, updateTeamsMessage, deleteTeamsMessage } from '../controllers/teamsMessage.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createTeamsMessage);
router.get('/', getAllTeamsMessages);
router.put('/:id', updateTeamsMessage);
router.delete('/:id', deleteTeamsMessage);

export default router;

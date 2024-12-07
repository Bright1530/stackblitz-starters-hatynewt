import express from 'express';
import { getModules, getModuleById, submitQuizAnswer } from '../controllers/moduleController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getModules);
router.get('/:id', auth, getModuleById);
router.post('/:id/submit', auth, submitQuizAnswer);

export default router;
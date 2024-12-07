import express from 'express';
import { getUserProgress, updateBadges } from '../controllers/progressController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getUserProgress);
router.post('/badges', auth, updateBadges);

export default router;
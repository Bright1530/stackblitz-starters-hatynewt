import express from 'express';
import { getGlobalLeaderboard, getMonthlyLeaderboard } from '../controllers/leaderboardController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/global', auth, getGlobalLeaderboard);
router.get('/monthly', auth, getMonthlyLeaderboard);

export default router;
import express from 'express';
import { getQuestionsByAgeGroup, submitResponse } from '../controllers/questionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getQuestionsByAgeGroup);
router.post('/:questionId/response', auth, submitResponse);

export default router;
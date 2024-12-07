import express from 'express';
import { createModule, updateModule, deleteModule } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/modules', [auth, isAdmin], createModule);
router.put('/modules/:id', [auth, isAdmin], updateModule);
router.delete('/modules/:id', [auth, isAdmin], deleteModule);

export default router;
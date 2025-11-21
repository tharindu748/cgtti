import express from 'express';
import { generateLetters, getGeneratedLetters, getTemplates, createTemplate } from './letter.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/templates', getTemplates);
router.post('/templates', createTemplate);
router.post('/generate', generateLetters);
router.get('/generated', getGeneratedLetters);

export default router;
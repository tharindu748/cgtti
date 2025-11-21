import express from 'express';
import { login, register, getProfile } from './auth.controller.js';
import { authMiddleware } from './auth.middleware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authMiddleware, getProfile);

export default router;
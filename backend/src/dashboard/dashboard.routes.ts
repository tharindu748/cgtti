import { Router } from 'express';
import { getDashboardStats } from './dashboard.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js'; // මෙතන authMiddleware විතරයි

const router = Router();

// authMiddleware විතරක් දාන්න. authorize කියලා එකක් නෑ.
router.get('/stats', authMiddleware, getDashboardStats);

export default router;
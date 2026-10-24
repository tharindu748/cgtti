import { Router } from 'express';
import { getDashboardStats } from './dashboard.controller.js';
import { authenticate, authorize } from '../auth/auth.middleware.js';

const router = Router();

router.get('/stats', authenticate, authorize(['ADMIN']), getDashboardStats);

export default router;
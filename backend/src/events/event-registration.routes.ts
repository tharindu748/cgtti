import express from 'express';
import {
  getEventRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistrationStatus,
  deleteRegistration,
  getRegistrationStatistics,
  bulkUpdateRegistrations,
  exportRegistrations
} from './event-registration.controller';
import { authMiddleware } from '@auth/auth.middleware';

const router = express.Router();

// Public routes
router.get('/statistics/:eventId', getRegistrationStatistics);
router.get('/export/:eventId', exportRegistrations);

// Protected routes
router.use(authMiddleware);

router.get('/', getEventRegistrations);
router.get('/:id', getRegistrationById);
router.post('/', createRegistration);
router.put('/:id', updateRegistrationStatus);
router.delete('/:id', deleteRegistration);
router.post('/bulk-update', bulkUpdateRegistrations);

export default router;
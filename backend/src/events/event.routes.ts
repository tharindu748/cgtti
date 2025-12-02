// import express from 'express';
// import {
//   getEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   publishEvent,
//   cancelEvent,
//   getEventRegistrations,
//   registerForEvent,
//   updateRegistrationStatus,
//   getEventStatistics,
//   exportRegistrations
// } from './event.controller';
// import { authMiddleware } from '@auth/auth.middleware';

// const router = express.Router();

// // Public routes
// router.get('/', getEvents);
// router.get('/:id', getEventById);
// router.post('/:eventId/register', registerForEvent);

// // Protected routes (require authentication)
// router.use(authMiddleware);

// // Event management
// router.post('/', createEvent);
// router.put('/:id', updateEvent);
// router.delete('/:id', deleteEvent);
// router.post('/:id/publish', publishEvent);
// router.post('/:id/cancel', cancelEvent);

// // Registration management
// router.get('/:id/registrations', getEventRegistrations);
// router.put('/registrations/:registrationId', updateRegistrationStatus);

// // Statistics and exports
// router.get('/:id/statistics', getEventStatistics);
// router.get('/:id/export', exportRegistrations);

// export default router;


import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  duplicateEvent,
  getEventCategories,
  getEventTypes,
  uploadEventImage,
  publishEvent,
  cancelEvent
} from './event-create.controller';
import { authMiddleware } from '@auth/auth.middleware';

const router = express.Router();

// Public routes
router.get('/categories', getEventCategories);
router.get('/types', getEventTypes);

// Protected routes (require authentication)
router.use(authMiddleware);

// Event CRUD operations
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/duplicate', duplicateEvent);
router.post('/:id/publish', publishEvent);
router.post('/:id/cancel', cancelEvent);

// Image upload
router.post('/upload-image', uploadEventImage);

// Existing routes (keep these)
router.get('/', getEvents);
router.get('/:id', getEventById);

export default router;
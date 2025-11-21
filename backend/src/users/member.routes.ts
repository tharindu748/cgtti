import express from 'express';
import { getMembers, createMember, updateMember, deleteMember, bulkCreateMembers  } from './member.controller.js';
import { authMiddleware } from '@auth/auth.middleware';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', getMembers);
router.post('/', createMember);
router.post('/bulk', bulkCreateMembers); 
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
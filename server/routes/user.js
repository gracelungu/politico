import express from 'express';
import { createUser, loginUser, createCandidate } from '../controllers/user';

const router = express.Router();

// Create a user
router.route('/api/v1/auth/signup')
  .post(createUser);

// Login the user
router.route('/api/v1/auth/login')
  .post(loginUser);

// Register a candidate
router.route('/api/v1/office/:id/register')
  .post(createCandidate);

export default router;

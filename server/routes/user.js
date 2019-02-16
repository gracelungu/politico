import express from 'express';
import { createUser, loginUser } from '../controllers/user';

const router = express.Router();

// Create a user
router.route('/api/v1/auth/signup')
  .post(createUser);

// Login the user
router.route('/api/v1/auth/login')
  .post(loginUser);

export default router;

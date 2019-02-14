import express from 'express';
import createUser from '../controllers/user';

const router = express.Router();

// Create a user
router.route('/api/v1/user')
  .post(createUser);

export default router;

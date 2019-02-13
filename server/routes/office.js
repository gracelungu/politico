import express from 'express';
import { getOffice, getOffices, createOffice } from '../controllers/office';

const router = express.Router();

// Get a specific office
router.route('/api/v1/offices/:id')
  .get(getOffice);

// Get all offices && Create an office
router.route('/api/v1/offices')
  .get(getOffices)
  .post(createOffice);


export default router;

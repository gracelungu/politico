import express from 'express';
import {
  deleteParty, getParty, editParty, getParties, createParty,
} from '../controllers/party';

const router = express.Router();

// Delete a specific party && Get a specific party
router.route('/api/v1/parties/:id')
  .delete(deleteParty)
  .get(getParty);

// Edit a specific party name
router.route('/api/v1/parties/:id/name')
  .patch(editParty);

// Get all parties && Create a new party
router.route('/api/v1/parties')
  .get(getParties)
  .post(createParty);

export default router;

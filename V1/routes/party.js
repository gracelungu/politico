import express from 'express';
import schema from '../utils/schema';

const router = express.Router();

const Parties = [{
  id: 3,
  name: 'AFDC',
  hqAdress: 'adress',
  logoUrl: 'logourl',
},
{
  id: 4,
  name: 'AFDC',
  hqAdress: 'adress',
  logoUrl: 'logourl',
}];

// Delete a specific party
router.delete('/api/v1/parties/:id', (req, res) => {
  const index = Parties.findIndex(item => item.id === parseInt(req.params.id, 10));

  if (index >= 0) {
    Parties.splice(index, 1);

    res.status(200).json({
      status: 200,
      data: [{
        message: 'The party was successfully deleted',
      }],
    });
    return;
  }

  res.status(404).json({
    status: 404,
    error: 'Party not found',
  });
});

// Edit a specific party name
router.patch('/api/v1/parties/:id/name', (req, res) => {
  const nameSchema = schema({
    name: 'string',
  }, req.body);

  if (nameSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: nameSchema.message,
    });
    return;
  }

  const item = Parties.find(el => el.id === parseInt(req.params.id, 10));

  if (item) {
    item.name = req.body.name;

    res.status(200).json({
      status: 200,
      data: [{
        id: item.id,
        name: item.name,
      }],
    });
    return;
  }

  res.status(404).json({
    status: 404,
    error: 'Party not found',
  });
});

// Get all parties
router.get('/api/v1/parties', (req, res) => {
  res.status(200).json({
    status: 200,
    data: Parties,
  });
});

// Get a specific party
router.get('/api/v1/parties/:id', (req, res) => {
  const item = Parties.find(el => el.id === parseInt(req.params.id, 10));

  if (!item) {
    res.status(404).json({
      status: 404,
      error: 'Party not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: [item],
  });
});

// Create a new party
router.post('/api/v1/parties', (req, res) => {
  // Validate the request
  const partySchema = schema({
    id: 'integer',
    name: 'string',
    hqAdress: 'string',
    logoUrl: 'string',
  }, req.body);

  if (partySchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: partySchema.message,
    });
    return;
  }

  // Add new party
  Parties.push(req.body);

  res.status(200).json({
    status: 200,
    data: [{
      id: req.body.id,
      name: req.body.name,
    }],
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();

const schema = require('../utils/schema');

const Offices = [];

// Get a specific office
router.get('/api/v1/offices/:id', (req, res) => {
  let office;

  Offices.forEach((o) => {
    if (o.id === req.params.id) {
      office = o;
    }
  });

  if (office === undefined) {
    res.status(404).json({
      status: 404,
      error: 'office not found',
    });
  }
});

// Get all offices
router.get('/api/v1/offices', (req, res) => {
  res.status(200).json({
    status: 200,
    data: Offices,
  });
});

// Create an office
router.post('/api/v1/offices', (req, res) => {
  const officeSchema = schema({
    id: 'integer',
    type: 'string',
    name: 'string',
  }, req.body);

  if (officeSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: officeSchema.message,
    });
    return;
  }

  Offices.push(req.body);

  res.status(200).json({
    status: 200,
    data: [req.body],
  });
});

module.exports = router;

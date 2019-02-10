import express from 'express';
import schema from '../utils/schema';

const router = express.Router();

const Offices = [{
  id: 1,
  type: 'federal',
  name: 'Minister',
}];

// Get a specific office
router.get('/api/v1/offices/:id', (req, res) => {
  const item = Offices.find(el => el.id === parseInt(req.params.id, 10));

  if (!item) {
    res.status(404).json({
      status: 404,
      error: 'office not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: [item],
  });
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

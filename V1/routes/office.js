import express from 'express';
import schema from '../helpers/schema';

const router = express.Router();

const Offices = [];

// Get a specific office
router.get('/api/v1/offices/:id', (req, res) => {
  const idSchema = schema({
    id: 'number',
  }, { id: parseInt(req.params.id, 10) });

  if (idSchema.passed === false) {
    res.status(404).json({
      status: 404,
      error: idSchema.message,
    });
    return;
  }

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

  let office = officeSchema.obj;

  office = Object.assign({ id: Offices.length + 1 }, office);

  Offices.push(office);

  res.status(200).json({
    status: 201,
    data: [office],
  });
});

export default router;

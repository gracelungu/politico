import jwt from 'jsonwebtoken';
import schema from '../helpers/schema';
import { secret } from '../config/config';
import officeQueries from '../models/office';

const getOffice = async (req, res) => {
  const idSchema = schema({
    id: 'integer',
  }, { id: parseInt(req.params.id, 10) });

  if (idSchema.passed === false) {
    res.status(404).json({
      status: 404,
      error: idSchema.message,
    });
    return;
  }

  const values = [parseInt(req.params.id, 10)];

  const result = await officeQueries.getOffice(values);

  if (result.error) {
    res.status(result.error.status).json({
      status: result.error.status,
      error: result.error.message,
    });
    return;
  }

  if (result.rowCount <= 0) {
    res.status(404).json({
      status: 404,
      error: 'office not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: result.rows,
  });
};

const getOffices = async (req, res) => {
  const result = await officeQueries.getOffices();

  if (result.error) {
    res.status(result.error.status).json({
      status: result.error.status,
      error: result.error.message,
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: result.rows,
  });
};

const createOffice = async (req, res) => {
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

  // Getting the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).json({
      status: 403,
      error: 'The authorization token is required',
    });
    return;
  }

  try {
    // Verify the token
    const verified = await jwt.verify(token, secret);

    if (!verified.isadmin) {
      res.status(403).json({
        status: 403,
        error: 'Only the admin is authorized to create an office',
      });
      return;
    }

    const values = [
      req.body.name,
      req.body.type,
    ];

    const result = await officeQueries.create(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    const { id } = result.rows[0];
    const { name, type } = req.body;

    const office = { id, name, type };

    res.status(201).json({
      status: 201,
      data: [office],
    });
  } catch (e) {
    res.status(403).json({
      status: 403,
      error: 'The authorization token is invalid',
    });
  }
};

const getResults = async (req, res) => {
  const idSchema = schema({
    id: 'integer',
  }, { id: parseInt(req.params.id, 10) });

  if (idSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: idSchema.message,
    });
    return;
  }

  const values = [parseInt(req.params.id, 10)];

  const result = await officeQueries.getResults(values);

  if (result.error) {
    res.status(result.error.status).json({
      status: result.error.status,
      error: result.error.message,
    });
    return;
  }

  if (result.length <= 0) {
    res.status(404).json({
      status: 404,
      error: 'Office not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: result,
  });
};

export {
  getOffice, getOffices, createOffice, getResults,
};

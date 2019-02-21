import jwt from 'jsonwebtoken';
import schema from '../helpers/schema';
import { secret } from '../config/config';
import partyQueries from '../models/party';

const deleteParty = async (req, res) => {
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

  // Getting the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is required',
    });
    return;
  }

  try {
    // Verify the token
    const verified = await jwt.verify(token, secret);

    if (!verified.isadmin) {
      res.status(401).json({
        status: 401,
        error: 'Only the admin is authorized to delete a party',
      });
      return;
    }

    const values = [parseInt(req.params.id, 10)];

    const result = await partyQueries.deleteParty(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    if (result.rowCount !== 0) {
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
  } catch (e) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is invalid',
    });
  }
};

const getParty = async (req, res) => {
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

  const result = await partyQueries.getParty(values);

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
      error: 'Party not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: result.rows,
  });
};

const editParty = async (req, res) => {
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

  // Getting the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is required',
    });
    return;
  }

  try {
    // Verify the token
    const verified = await jwt.verify(token, secret);

    if (!verified.isadmin) {
      res.status(401).json({
        status: 401,
        error: 'Only the admin is authorized to edit a party',
      });
      return;
    }

    const values = [
      req.body.name,
      parseInt(req.params.id, 10),
    ];

    const result = await partyQueries.editParty(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
      });
      return;
    }

    res.status(404).json({
      status: 404,
      error: 'Party not found',
    });
  } catch (e) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is invalid',
    });
  }
};

const getParties = async (req, res) => {
  const result = await partyQueries.getParties();

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

const createParty = async (req, res) => {
  // Validate the request
  const partySchema = schema({
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

  // Getting the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is required',
    });
    return;
  }

  try {
    // Verify the token
    const verified = await jwt.verify(token, secret);

    if (!verified.isadmin) {
      res.status(401).json({
        status: 401,
        error: 'Only the admin is authorized to create a party',
      });
      return;
    }

    const values = [
      req.body.name,
      req.body.hqAdress,
      req.body.logoUrl,
    ];

    const result = await partyQueries.create(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    res.status(200).json({
      status: 201,
      data: result.rows,
    });
  } catch (e) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is invalid',
    });
  }
};

export {
  deleteParty, getParty, editParty, getParties, createParty,
};

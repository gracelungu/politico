import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import schema from '../helpers/schema';
import userQueries from '../models/user';
import secret from '../config/env';

const saltRound = 10;

const createUser = async (req, res) => {
  const userSchema = schema({
    firstname: 'string',
    lastname: 'string',
    othername: 'string',
    email: 'email',
    password: 'password',
    phoneNumber: 'number',
    passportUrl: 'string',
    isAdmin: 'boolean',
  }, req.body);

  if (!userSchema.passed) {
    res.status(400).json({
      status: 400,
      error: userSchema.message,
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, saltRound);

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.othername,
    req.body.email,
    hashedPassword,
    req.body.phoneNumber,
    req.body.passportUrl,
    req.body.isAdmin,
  ];

  // Save the user into the database
  const result = await userQueries.create(values);

  if (result.error) {
    res.status(result.error.status).json({
      status: result.error.status,
      error: result.error.message,
    });
    return;
  }

  // Return the new id
  const { id } = result.rows[0];
  req.body = Object.assign({ id }, req.body);

  // Remove the password
  delete req.body.password;

  // Siging the token
  const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '24h' });

  res.status(201).json({
    status: 201,
    data: [{
      token,
      user: req.body,
    }],
  });
};

const loginUser = async (req, res) => {
  const userSchema = schema({
    email: 'email',
    password: 'password',
  }, req.body);

  if (!userSchema.passed) {
    res.status(400).json({
      status: 400,
      error: userSchema.message,
    });
    return;
  }

  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({
      status: 400,
      error: 'The authorization token is required',
    });
    return;
  }

  try {
    // Verify the token
    const verified = await jwt.verify(token, secret);
    if (!verified) {
      res.status(403).json({
        status: 403,
        error: 'The authorization token is invalid',
      });
      return;
    }

    const values = [
      req.body.email,
    ];

    const result = await userQueries.loginUser(values);

    if (result.error) {
      res.status(403).json({
        status: 403,
        error: result.error.message,
      });
      return;
    }

    if (result.rowCount <= 0) {
      res.status(404).json({
        status: 404,
        error: 'The user does not exist',
      });
      return;
    }

    bcrypt.compare(req.body.password, result.rows[0].password, (error, data) => {
      if (error) {
        res.status(500).json({
          status: 500,
          error: 'A bcrypt error has occured',
        });
        return;
      }

      if (!data) {
        res.status(403).json({
          status: 403,
          error: 'The token does not match with the user credentials',
        });
        return;
      }

      // Remove the password from the data
      delete result.rows[0].password;

      // The authentification has succeeded
      res.status(200).json({
        status: 200,
        data: [{
          token,
          user: result.rows[0],
        }],
      });
    });
  } catch (e) {
    res.status(403).json({
      status: 403,
      error: 'The authorization token is invalid',
    });
  }
};

export { createUser, loginUser };

import jwt from 'jsonwebtoken';
import schema from '../helpers/schema';
import userQueries from '../models/user';
import secret from '../config/env';

const createUser = async (req, res) => {
  const userSchema = schema({
    firstname: 'string',
    lastname: 'string',
    othername: 'string',
    email: 'email',
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

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.othername,
    req.body.email,
    req.body.phoneNumber,
    req.body.passportUrl,
    req.body.isAdmin,
  ];

  const result = await userQueries.create(values);

  if (result.error) {
    res.status(result.error.status).json({
      status: result.error.status,
      error: result.error.message,
    });
    return;
  }

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

export default createUser;

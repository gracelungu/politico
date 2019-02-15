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

export default createUser;

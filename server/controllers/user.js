import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import schema from '../helpers/schema';
import userQueries from '../models/user';
import { secret } from '../config/config';

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
  const { id, isadmin } = result.rows[0];
  req.body = Object.assign({ id }, req.body);

  // Remove the password
  delete req.body.password;

  // Siging the token
  const token = jwt.sign({ id, email: req.body.email, isadmin }, secret, { expiresIn: '24h' });

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
      res.status(401).json({
        status: 401,
        error: 'The token does not match with the user credentials',
      });
      return;
    }

    // Remove the password from the data
    delete result.rows[0].password;

    const { id, email, isadmin } = result.rows[0];

    // Sign the token
    const token = jwt.sign({ id, email, isadmin }, secret, { expiresIn: '24h' });

    // The authentification has succeeded
    res.status(200).json({
      status: 200,
      data: [{
        token,
        user: result.rows[0],
      }],
    });
  });
};

const resetPassword = async (req, res) => {
  const emailSchema = schema({
    email: 'email',
  }, req.body);

  if (emailSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: emailSchema.message,
    });
    return;
  }

  const emailExist = await userQueries.emailExist([req.body.email]);

  if (!emailExist) {
    res.status(404).json({
      status: 404,
      error: 'No user is registered with this email',
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stepslack.grace@gmail.com',
      pass: 'yourpassword',
    },
  });

  // Generating the token for reseting the password
  const { email } = req.body;
  const token = await jwt.sign({ email }, secret, { expiresIn: '24h' });

  const mailOptions = {
    from: 'admin@politico.com',
    to: req.body.email,
    subject: 'Politico reset password',
    html: `
      <p>User this link to reset your password <a href='https://politico-api-service.herokuapp.com/api/v1/auth/${token}'>Reset link</a> </p>
    `,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(500).json({
        status: 500,
        error: 'An error has occured while sending the reset password link',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      data: [{
        message: 'Check your email for password reset link',
        email,
      }],
    });
  });
};

const createCandidate = async (req, res) => {
  // Check if the id is valid
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
        error: 'Only the admin is authorized to create a candidate',
      });
      return;
    }

    const candidateSchema = schema({
      candidate: 'integer',
    }, req.body);

    if (candidateSchema.passed === false) {
      res.status(400).json({
        status: 400,
        error: candidateSchema.message,
      });
      return;
    }

    const values = [
      parseInt(req.body.candidate, 10),
      parseInt(req.params.id, 10),
    ];

    const result = await userQueries.registerCandidate(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    res.status(201).json({
      status: 201,
      data: [{
        office: req.body.candidate,
        user: parseInt(req.params.id, 10),
      }],
    });
  } catch (e) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is invalid',
    });
  }
};

const vote = async (req, res) => {
  const voteSchema = schema({
    office: 'integer',
    candidate: 'integer',
    voter: 'integer',
  }, req.body);

  if (voteSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: voteSchema.message,
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
    await jwt.verify(token, secret);

    const values = [
      req.body.office,
      req.body.candidate,
      req.body.voter,
    ];

    const result = await userQueries.vote(values);
    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      data: [req.body],
    });
  } catch (e) {
    res.status(401).json({
      status: 401,
      error: 'The authorization token is invalid',
    });
  }
};

export {
  createUser, loginUser, createCandidate, vote, resetPassword,
};

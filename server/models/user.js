import { pool, initialize } from '.';

// Save the user
const userQueries = {
  create: async (values) => {
    try {
      const definition = await initialize.defineUser();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      // Check if the email adress exist
      const exist = await pool.query('SELECT * FROM users WHERE email = $1', [values[3]]);
      if (exist.rowCount > 0) {
        return {
          error: {
            status: 403,
            message: 'The email adress already exist',
          },
        };
      }

      const res = await pool.query(`INSERT INTO users (
        firstname,
        lastname,
        othername,
        email,
        password,
        phoneNumber,
        passportUrl,
        isAdmin,
        date,
        active) VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), true) RETURNING id, isAdmin `, values);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to insert data into the users table',
        },
      };
    }
  },
  loginUser: async (values) => {
    try {
      const definition = await initialize.defineUser();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('SELECT * FROM users WHERE email= $1 ', values);
      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select data from the users table',
        },
      };
    }
  },
  registerCandidate: async (values) => {
    try {
      const definition = await initialize.defineCandidates();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      // Check if the candidate is not already registered for that office
      const exist = await pool.query('SELECT * FROM candidates where candidate = $1 AND office = $2;', values);
      if (exist.rowCount > 0) {
        return {
          error: {
            status: 403,
            message: 'The candidate is already registered for this office',
          },
        };
      }

      const res = await pool.query('INSERT INTO candidates (candidate, office, date) VALUES ($1, $2, NOW()) ;', values);
      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to insert data into the candidate table',
        },
      };
    }
  },
  vote: async (values) => {
    try {
      const definition = await initialize.defineVotes();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      // Check if the user did not vote for this candidate on this office
      const exist = await pool.query('SELECT * FROM votes where office = $1 AND candidate = $2 AND voter = $3 ', values);
      if (exist.rowCount > 0) {
        return {
          error: {
            status: 403,
            message: 'The user has voted for this candidate on this office',
          },
        };
      }

      const res = await pool.query('INSERT INTO votes (office, candidate, voter, date) VALUES ($1, $2, $3, NOW()) ;', values);
      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to insert data into the votes table',
        },
      };
    }
  },
};

export default userQueries;

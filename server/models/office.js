/* eslint no-restricted-syntax: 0 */
/* eslint no-await-in-loop: 0 */
import { pool, initialize } from '.';

// Save the user
const officeQueries = {
  create: async (values) => {
    try {
      const definition = await initialize.defineOffices();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      // Check if office name already exist
      const exist = await pool.query('SELECT * FROM offices WHERE name = $1', [values[0]]);
      if (exist.rowCount > 0) {
        return {
          error: {
            status: 403,
            message: 'An office with the same name already exist',
          },
        };
      }

      const res = await pool.query(`INSERT INTO offices (
            name,
            type,
            date) VALUES($1, $2, NOW()) RETURNING id `, values);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to insert data into the offices table',
        },
      };
    }
  },
  getOffice: async (values) => {
    try {
      const definition = await initialize.defineOffices();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('SELECT * FROM offices where id = $1', [values[0]]);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select data from the offices table',
        },
      };
    }
  },
  getOffices: async () => {
    try {
      const definition = await initialize.defineOffices();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('SELECT * FROM offices ');

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select all data from the offices table',
        },
      };
    }
  },
  getResults: async (values) => {
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

      const offices = await pool.query('SELECT * FROM votes WHERE office = $1 ', [values[0]]);
      let data = [];

      for (const office of offices.rows) {
        const totalResult = await pool.query('SELECT * FROM votes WHERE office = $1 AND candidate = $2;', [values[0], office.candidate]);

        data.push({
          office: office.office,
          candidate: office.candidate,
          result: totalResult.rows.length,
        });
      }

      // Filtering duplicated objects
      data = data.filter((item, index, self) => index === self.findIndex(office => (
        office.office === item.office && office.candidate === item.candidate
      )));

      return data;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select office votes',
        },
      };
    }
  },
};

export default officeQueries;

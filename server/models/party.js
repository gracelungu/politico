import { pool, initialize } from '.';

// Save the user
const partyQueries = {
  create: async (values) => {
    try {
      const definition = await initialize.defineParties();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      // Check if party name already exist
      const exist = await pool.query('SELECT * FROM parties WHERE name = $1', [values[0]]);
      if (exist.rowCount > 0) {
        return {
          error: {
            status: 403,
            message: 'A party with the same name already exist',
          },
        };
      }

      const res = await pool.query(`INSERT INTO parties (
                name,
                hqAdress,
                logoUrl,
                date) VALUES($1, $2, $3, NOW()) RETURNING id, name, hqAdress, logoUrl, date `, values);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to insert data into the parties table',
        },
      };
    }
  },
  getParty: async (values) => {
    try {
      const definition = await initialize.defineParties();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('SELECT * FROM parties where id = $1', [values[0]]);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select data from the parties table',
        },
      };
    }
  },
  getParties: async () => {
    try {
      const definition = await initialize.defineParties();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('SELECT * FROM parties ');

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to select all data from the parties table',
        },
      };
    }
  },
  editParty: async (values) => {
    try {
      const definition = await initialize.defineParties();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('UPDATE parties SET name = $1 WHERE id = $2 RETURNING id, name, hqAdress, logoUrl, date ', values);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to update the name from the parties table',
        },
      };
    }
  },
  deleteParty: async (values) => {
    try {
      const definition = await initialize.defineParties();
      if (definition.error) {
        return {
          error: {
            status: 500,
            message: definition.res,
          },
        };
      }

      const res = await pool.query('DELETE FROM parties WHERE id = $1 ', [values[0]]);

      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Failed to delete the party from the parties table',
        },
      };
    }
  },
};

export default partyQueries;

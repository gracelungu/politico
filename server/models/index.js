import pg from 'pg';
import db from '../config/db';

// Making a connection to the db
const pool = new pg.Pool(db.test);

// Initialize the db with default tables
const initialize = {

  // Create the user table definition
  defineUser: async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL ,
            firstname varchar(30),
            lastname varchar(30),
            othername varchar(30),
            email varchar(50),
            password text,
            phoneNumber varchar(25),
            passportUrl text,
            isAdmin boolean,
            date date,
            active boolean);`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      console.log(e);
      return {
        error: true,
        res: 'Failed to create the users table',
      };
    }
  },

};

export { pool, initialize };

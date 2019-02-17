import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Making a connection to the db
const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

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
      return {
        error: true,
        res: 'Failed to create the users table',
      };
    }
  },
  defineOffices: async () => {
    const query = `CREATE TABLE IF NOT EXISTS offices (id SERIAL PRIMARY KEY NOT NULL ,
          name varchar(100),
          type varchar(100),
          date date);`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      return {
        error: true,
        res: 'Failed to create the offices table',
      };
    }
  },
  defineParties: async () => {
    const query = `CREATE TABLE IF NOT EXISTS parties (id SERIAL PRIMARY KEY NOT NULL ,
          name varchar(100),
          hqadress varchar(100),
          logourl text,
          date date);`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      return {
        error: true,
        res: 'Failed to create the parties table',
      };
    }
  },
  defineCandidates: async () => {
    const query = `CREATE TABLE IF NOT EXISTS candidates (id SERIAL PRIMARY KEY NOT NULL ,
          candidate int,
          office int,
          date date);`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      return {
        error: true,
        res: 'Failed to create the candidates table',
      };
    }
  },
  defineVotes: async () => {
    const query = `CREATE TABLE IF NOT EXISTS votes (id SERIAL PRIMARY KEY NOT NULL ,
          office int,
          candidate int,
          voter int,
          date date);`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      return {
        error: true,
        res: 'Failed to create the votes table',
      };
    }
  },
};

export { pool, initialize };

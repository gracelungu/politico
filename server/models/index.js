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
            firstname varchar(30) NOT NULL,
            lastname varchar(30) NOT NULL,
            othername varchar(30) NOT NULL,
            email varchar(50) NOT NULL,
            password text NOT NULL,
            phoneNumber varchar(25) NOT NULL,
            passportUrl text NOT NULL,
            isAdmin boolean DEFAULT false,
            date date DEFAULT NOW(),
            active boolean DEFAULT true);`;

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
    const query = `CREATE TABLE IF NOT EXISTS offices 
          (id SERIAL PRIMARY KEY NOT NULL ,
          name varchar(100) NOT NULL,
          type varchar(100) NOT NULL,
          date date DEFAULT NOW());`;

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
    const query = `CREATE TABLE IF NOT EXISTS parties 
          (id SERIAL PRIMARY KEY NOT NULL ,
          name varchar(100) NOT NULL,
          hqadress varchar(100) NOT NULL,
          logourl text NOT NULL,
          date date DEFAULT NOW());`;

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
    const query = `CREATE TABLE IF NOT EXISTS candidates 
          (id SERIAL PRIMARY KEY NOT NULL ,
          candidate int NOT NULL,
          office int NOT NULL,
          date date DEFAULT NOW());`;

    try {
      const res = await pool.query(query);
      return res;
    } catch (e) {
      console.log(e);
      return {
        error: true,
        res: 'Failed to create the candidates table',
      };
    }
  },
  defineVotes: async () => {
    const query = `CREATE TABLE IF NOT EXISTS votes 
          (id SERIAL PRIMARY KEY NOT NULL ,
          office int NOT NULL,
          candidate int NOT NULL,
          voter int NOT NULL,
          date date DEFAULT NOW());`;

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

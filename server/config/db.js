const db = {
  prod: {
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'politico',
  },
  test: {
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'politico',
  },
  travis: {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'politico',
  },
};


export default db;

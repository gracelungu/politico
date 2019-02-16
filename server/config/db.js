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
    user: 'travis',
    host: '127.0.0.1',
    port: 5432,
    database: 'travis'
  },
};


export default db;

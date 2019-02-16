const db = {
  prod: {
    user: 'hshzkynyvusbll',
    host: 'ec2-54-83-50-174.compute-1.amazonaws.com',
    password: 'e66f42dab9692b41aeaf26e73ce7c0cd7e95761a53748e8dac4f493fcbfcedff',
    port: 5432,
    database: 'd5rff5kr0uut53',
    ssl: true,
  },
  test: {
    user: 'travis',
    host: 'localhost',
    port: 5432,
    database: 'travis',
  },
};


export default db;

import Request from 'request';

const baseUrl = 'http://localhost:3003/api/v1';

describe('User ', () => {
  beforeEach(() => {
    jasmine.addMatchers({

      toBeJsonString: () => ({
        compare: (actual) => {
          try {
            JSON.parse(actual);
          } catch (e) {
            return { pass: false, message: 'Expects the body to be a json string' };
          }
          return { pass: true };
        },
      }),

    });
  });

  describe('POST', () => {
    xit('Should create a new user', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `grace${Math.floor(Math.random() * 1000) + 1}@gmail.com`,
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(201);
        expect(JSON.parse(body).data).toBeDefined();
        expect(JSON.parse(body).data[0].token).toBeDefined();
        expect(JSON.parse(body).data[0].user).toBeDefined();
        done();
      });
    });
  });

  xit('Should return 403 if the email already exist', (done) => {
    Request({
      headers: { 'content-type': 'application/json' },
      url: `${baseUrl}/auth/signup`,
      method: 'POST',
      body: JSON.stringify({
        firstname: 'grace',
        lastname: 'lungu',
        othername: 'birindwa',
        email: 'grace@gmail.com',
        phoneNumber: 878623545,
        passportUrl: 'url',
        isAdmin: false,
      }),
    }, (error, response, body) => {
      expect(JSON.parse(body).status).toBe(403);
      expect(JSON.parse(body).error).toBeDefined();
      done();
    });
  });
});

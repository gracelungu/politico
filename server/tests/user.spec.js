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

  let authToken;

  describe('POST', () => {
    it('Should create a new user', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `grace${Math.floor(Math.random() * 1000) + 1}@gmail.com`,
          password: 'password',
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

  it('Should return 403 if the email already exist', (done) => {
    Request({
      headers: { 'content-type': 'application/json' },
      url: `${baseUrl}/auth/signup`,
      method: 'POST',
      body: JSON.stringify({
        firstname: 'grace',
        lastname: 'lungu',
        othername: 'birindwa',
        email: 'grace@gmail.com',
        password: 'password',
        phoneNumber: 878623545,
        passportUrl: 'url',
        isAdmin: false,
      }),
    }, (err, res, bdy) => {
      if (JSON.parse(bdy).data) {
        authToken = JSON.parse(bdy).data[0].token;
      }

      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: 'grace@gmail.com',
          password: 'password',
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

  describe('POST', () => {
    it('Should login the user', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: 'grace@gmail.com',
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (err, res, bdy) => {
        if (JSON.parse(bdy).data) {
          authToken = JSON.parse(bdy).data[0].token;
        }

        if (authToken) {
          Request({
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/auth/login`,
            method: 'POST',
            body: JSON.stringify({
              email: 'grace@gmail.com',
              password: 'password',
            }),
          }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(200);
            expect(JSON.parse(body).data).toBeDefined();
            done();
          });
        }

        done();
      });
    });

    it('Should return 403 when the token is invalid', (done) => {
      Request({
        headers: { 'content-type': 'application/json', authorization: 'wrongtoken' },
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        body: JSON.stringify({
          email: 'grace@gmail.com',
          password: 'password',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(403);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });

    it('Should return 400 when the token is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        body: JSON.stringify({
          email: 'grace@gmail.com',
          password: 'password',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });

    it('Should return 404 when the user does not exist', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        body: JSON.stringify({
          email: 'notexist@gmail.com',
          password: 'password',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });

    it('Should return 400 when the password length is less than 6', (done) => {
      Request({
        headers: { 'content-type': 'application/json', authorization: 'token' },
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        body: JSON.stringify({
          email: 'notexist@gmail.com',
          password: 'pass',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });
  });
});

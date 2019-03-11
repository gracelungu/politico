import Request from 'request';
import { baseUrl } from '../config/config';

describe('User ', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

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
    it('Should create a new user', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `grace${Math.floor(Math.random() * 10000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(201);
        expect(JSON.parse(body).data).toBeDefined();
        expect(JSON.parse(body).data[0].token).toBeDefined();
        expect(JSON.parse(body).data[0].user.firstname).toEqual(jasmine.any(String));
        done();
      });
    });

    it('Should return 400 when the firstname is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          lastname: 'lungu',
          othername: 'birindwa',
          email: `grace${Math.floor(Math.random() * 1000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toEqual('The firstname should be a valid string ');
        done();
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
      }, () => {
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
          expect(JSON.parse(body).error).toEqual('The email adress already exist');
          done();
        });
      });
    });
  });

  describe('POST', () => {
    it('Should login the user', (done) => {
      const email = `name${Math.floor(Math.random() * 1000000) + 1}@gmail.com`;
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, () => {
        Request({
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/auth/login`,
          method: 'POST',
          body: JSON.stringify({
            email,
            password: 'password',
          }),
        }, (error, response, body) => {
          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body).data[0].user.firstname).toEqual(jasmine.any(String));
          done();
        });
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
        expect(JSON.parse(body).status).toBe(404);
        expect(JSON.parse(body).error).toEqual('The user does not exist');
        done();
      });
    });

    it('Should return 400 when the password length is less than 6', (done) => {
      Request({
        headers: { 'content-type': 'application/json', authorization: 'token' },
        url: `${baseUrl}/auth/login`,
        method: 'POST',
        body: JSON.stringify({
          email: 'grace@gmail.com',
          password: 'pass',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toEqual('The password length is less than 6 characters');
        done();
      });
    });
  });

  describe('POST /', () => {
    it('Should register a candidate', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: true,
        }),
      }, (err, res, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        const randomId = Math.floor(Math.random() * 1000000) + 1;

        Request({
          headers: { 'content-type': 'application/json', authorization: authToken },
          url: `${baseUrl}/office/${randomId}/register`,
          method: 'POST',
          body: JSON.stringify({
            candidate: randomId,
          }),
        }, (error, response, body) => {
          expect(JSON.parse(body).status).toBe(201);
          expect(JSON.parse(body).data[0].office).toEqual(jasmine.any(Number));
          done();
        });
      });
    });

    it('Should return 400 when the user id is not a number', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/office/id/register`,
        method: 'POST',
        body: JSON.stringify({
          office: 1,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toEqual('The id should be an integer ');
        done();
      });
    });

    it('Should return 400 when the office id is not an integer', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: true,
        }),
      }, (err, res, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        Request({
          headers: { 'content-type': 'application/json', authorization: authToken },
          url: `${baseUrl}/office/1/register`,
          method: 'POST',
          body: JSON.stringify({
            office: '1',
          }),
        }, (error, response, body) => {
          expect(JSON.parse(body).status).toBe(400);
          expect(JSON.parse(body).error).toEqual('The candidate should be an integer ');
          done();
        });
      });
    });


    it('Should return 401 when the authorization token is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/office/1/register`,
        method: 'POST',
        body: JSON.stringify({
          office: '1',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(401);
        expect(JSON.parse(body).error).toEqual('The authorization token is required');
        done();
      });
    });

    it('Should return 401 when the authorization token is invalid', (done) => {
      Request({
        headers: { 'content-type': 'application/json', authorization: 'invalidTtoken' },
        url: `${baseUrl}/office/1/register`,
        method: 'POST',
        body: JSON.stringify({
          office: '1',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(401);
        expect(JSON.parse(body).error).toEqual('The authorization token is invalid');
        done();
      });
    });


    it('Should return 401 when the user is not an admin', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (err, res, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        const randomId = Math.floor(Math.random() * 1000) + 1;

        Request({
          headers: { 'content-type': 'application/json', authorization: authToken },
          url: `${baseUrl}/office/${randomId}/register`,
          method: 'POST',
          body: JSON.stringify({
            office: randomId,
          }),
        }, (error, response, body) => {
          expect(JSON.parse(body).status).toBe(401);
          expect(JSON.parse(body).error).toEqual('Only the admin is authorized to create a candidate');
          done();
        });
      });
    });
  });

  describe('POST', () => {
    it('Should vote for a particular user', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: false,
        }),
      }, (err, res, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        const randomId = Math.floor(Math.random() * 1000) + 1;

        Request({
          headers: { 'content-type': 'application/json', authorization: authToken },
          url: `${baseUrl}/votes`,
          method: 'POST',
          body: JSON.stringify({
            office: randomId + 1,
            candidate: randomId,
            voter: randomId,
          }),
        }, (error, response, body) => {
          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body).data[0].office).toEqual(jasmine.any(Number));
          done();
        });
      });
    });

    it('Should return 403 when the office is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/votes`,
        method: 'POST',
        body: JSON.stringify({
          candidate: 1,
          voter: 1,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toEqual('The office should be an integer ');
        done();
      });
    });

    it('Should return 401 when the authorization token is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/votes`,
        method: 'POST',
        body: JSON.stringify({
          office: 1,
          candidate: 1,
          voter: 1,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(401);
        expect(JSON.parse(body).error).toEqual('The authorization token is required');
        done();
      });
    });

    it('Should return 401 when the authorization token is invalid', (done) => {
      Request({
        headers: { 'content-type': 'application/json', authorization: 'invalidToken' },
        url: `${baseUrl}/votes`,
        method: 'POST',
        body: JSON.stringify({
          office: 1,
          candidate: 1,
          voter: 1,
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(401);
        expect(JSON.parse(body).error).toEqual('The authorization token is invalid');
        done();
      });
    });
  });

  describe('POST', () => {
    xit('Should send the reset password link', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/reset`,
        method: 'POST',
        body: JSON.stringify({
          email: 'grace@gmail.com',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(200);
        expect(JSON.parse(body).data[0].message).toEqual('Check your email for password reset link');
        done();
      });
    });
    it('Should return 400 when the email is invalid', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/reset`,
        method: 'POST',
        body: JSON.stringify({
          email: 'invalidmail.com',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toEqual('The email adress is invalid');
        done();
      });
    });
    it('Should return 400 when the email does not exist', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/reset`,
        method: 'POST',
        body: JSON.stringify({
          email: 'idontexist@gmail.com',
        }),
      }, (error, response, body) => {
        expect(JSON.parse(body).status).toBe(404);
        expect(JSON.parse(body).error).toEqual('No user is registered with this email');
        done();
      });
    });
  });

  describe('Documentation', () => {
    it('Should return the documentation page', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/doc`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeDefined();
        done();
      });
    });
  });
});

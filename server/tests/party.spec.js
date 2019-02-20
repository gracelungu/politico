import Request from 'request';
import { baseUrl } from '../config/config';

describe('PARTY', () => {
  beforeEach(() => {
    jasmine.addMatchers({
      toBeJsonString: () => ({
        compare: (actual) => {
          try {
            JSON.parse(actual);
          } catch (e) {
            return { pass: false, message: 'Expectes the body to be a json string' };
          }
          return { pass: true };
        },
      }),
    });
  });

  const createParty = (done, authToken) => {
    const randName = `AFDC${Math.floor(Math.random() * 1000000)}${1}`;
    Request(
      {
        headers: { 'content-type': 'application/json', authorization: authToken },
        url: `${baseUrl}/parties`,
        method: 'POST',
        body: JSON.stringify({
          name: randName,
          hqAdress: 'adress',
          logoUrl: 'logourl',
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString(body);
        expect(JSON.parse(body).status).toBe(201);
        expect(JSON.parse(body).data[0].name).toEqual(jasmine.any(String));

        Request( // Returns 403 if the name already exist
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties`,
            method: 'POST',
            body: JSON.stringify({
              name: randName,
              hqAdress: 'adress',
              logoUrl: 'logourl',
            }),
          }, (err, rep, bdy) => {
            expect(bdy).toBeJsonString(bdy);

            expect(JSON.parse(bdy).status).toBe(403);
            expect(JSON.parse(bdy).error).toEqual('A party with the same name already exist');
            done();
          },
        );
      },
    );
  };

  describe('POST', () => {
    it('Should create a party', (done) => {
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
      }, (error, response, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        createParty(done, authToken);
      });
    });

    it('Should retun 400 when the name is not a string', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties`,
          method: 'POST',
          body: JSON.stringify({
            name: 2,
            hqAdress: 'adress',
            logoUrl: 'logourl',
          }),
        }, (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(400);
          expect(JSON.parse(body).error).toEqual('The name should be a valid string ');
          done();
        },
      );
    });
  });

  const getParty = (done, authToken) => {
    Request(
      {
        headers: { 'content-type': 'application/json', authorization: authToken },
        url: `${baseUrl}/parties`,
        method: 'POST',
        body: JSON.stringify({
          name: `AFDD${Math.floor(Math.random() * 1000) + 1}`,
          hqAdress: 'adress',
          logoUrl: 'logourl',
        }),
      }, (err, res, bdy) => {
        const { id } = JSON.parse(bdy).data[0];

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/${id}`,
            method: 'GET',
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);
            expect(JSON.parse(body).status).toBe(200);
            expect(JSON.parse(body).data[0].name).toEqual(jasmine.any(String));
            done();
          },
        );
      },
    );
  };

  describe('GET ', () => {
    it(' Should get a specific party', (done) => {
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
      }, (error, response, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        getParty(done, authToken);
      });
    });

    it(' Should return 404 when the party is not found', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/9000`,
            method: 'GET',
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);
            expect(JSON.parse(body).status).toBe(404);
            expect(JSON.parse(body).error).toEqual('Party not found');
            done();
          },
        );
      });
    });
  });

  describe('GET ', () => {
    it('Gets all parties', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties`,
          method: 'GET',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);
          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body).data[0].name).toEqual(jasmine.any(String));
          done();
        },
      );
    });
  });

  const editParty = (done, authToken) => {
    Request(
      {
        headers: { 'content-type': 'application/json', authorization: authToken },
        url: `${baseUrl}/parties`,
        method: 'POST',
        body: JSON.stringify({
          name: 'DFCE',
          hqAdress: 'adress',
          logoUrl: 'logourl',
        }),
      }, () => {
        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/1/name`,
            method: 'PATCH',
            body: JSON.stringify({
              name: 'newName',
            }),
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);
            expect(JSON.parse(body).status).toBe(200);
            expect(JSON.parse(body).data[0].name).toEqual(jasmine.any(String));
            done();
          },
        );
      },
    );
  };

  describe('PATCH /', () => {
    it('Should edit a party', (done) => {
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
      }, (error, response, bdy) => {
        const authToken = JSON.parse(bdy).data[0].token;

        editParty(done, authToken);
      });
    });

    it('Should return 404 when the party is not found', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/9000/name`,
            method: 'PATCH',
            body: JSON.stringify({
              name: 'newName',
            }),
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);

            expect(JSON.parse(body).status).toBe(404);
            expect(JSON.parse(body).error).toEqual('Party not found');
            done();
          },
        );
      });
    });

    it('Should return 404 when the id is not a number', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/id/name`,
            method: 'PATCH',
            body: JSON.stringify({
              name: 'newName',
            }),
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);

            expect(JSON.parse(body).status).toBe(404);
            expect(JSON.parse(body).error).toEqual('The id should be an integer ');
            done();
          },
        );
      });
    });
  });

  const deleteParty = (done, authToken, id) => {
    Request(
      {
        headers: { 'content-type': 'application/json', authorization: authToken },
        url: `${baseUrl}/parties/${id}`,
        method: 'DELETE',
      },
      (error, response, body) => {
        expect(body).toBeJsonString(body);
        expect(JSON.parse(body).status).toBe(200);
        expect(JSON.parse(body).data[0].message).toEqual('The party was successfully deleted');
        done();
      },
    );
  };

  describe('DELETE ', () => {
    it('Should delete a party', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties`,
            method: 'POST',
            body: JSON.stringify({
              name: `FERS${Math.floor(Math.random() * 1000000) + 1}`,
              hqAdress: 'adress',
              logoUrl: 'logourl',
            }),
          }, () => {
            Request(
              {
                headers: { 'content-type': 'application/json', authorization: authToken },
                url: `${baseUrl}/parties`,
                method: 'POST',
                body: JSON.stringify({
                  name: `FERS${Math.floor(Math.random() * 1000000) + 1}`,
                  hqAdress: 'adress',
                  logoUrl: 'logourl',
                }),
              }, (error, response, body) => {
                const { id } = JSON.parse(body).data[0];
                deleteParty(done, authToken, id);
              },
            );
          },
        );
      });
    });

    it('Should return 403 when the user is not an admin', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/1`,
            method: 'DELETE',
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);

            expect(JSON.parse(body).status).toBe(403);
            expect(JSON.parse(body).error).toEqual('Only the admin is authorized to delete a party');
            done();
          },
        );
      });
    });

    it('Should return 404 when the party is not found', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/9000`,
            method: 'DELETE',
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);

            expect(JSON.parse(body).status).toBe(404);
            expect(JSON.parse(body).error).toEqual('Party not found');
            done();
          },
        );
      });
    });

    it('Should return 403 when the authorization token is missing', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/1`,
          method: 'DELETE',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(403);
          expect(JSON.parse(body).error).toEqual('The authorization token is required');
          done();
        },
      );
    });

    it('Should return 404 when the id is not a number', (done) => {
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

        Request(
          {
            headers: { 'content-type': 'application/json', authorization: authToken },
            url: `${baseUrl}/parties/id`,
            method: 'DELETE',
          },
          (error, response, body) => {
            expect(body).toBeJsonString(body);

            expect(JSON.parse(body).status).toBe(404);
            expect(JSON.parse(body).error).toEqual('The id should be an integer ');
            done();
          },
        );
      });
    });
  });
});

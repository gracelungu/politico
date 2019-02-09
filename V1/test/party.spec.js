const Request = require('request');

const baseUrl = 'http://localhost:3003/api/v1';
const schema = require('../utils/schema');

describe('PARTY', () => {
  beforeEach(() => {
    jasmine.addMatchers({
      toBeJsonString: () => ({
        compare: (actual) => {
          try {
            JSON.parse(actual);
          } catch (e) {
            return { pass: false, message: 'Expected body to be a json string' };
          }
          return { pass: true };
        },
      }),
      validateParty: () => ({
        compare: (actual) => {
          const partySchema = schema({
            status: 'integer',
            data: 'array',
          }, actual);
          if (partySchema.passed === false) {
            return { pass: false, message: partySchema.message };
          }
          return { pass: true };
        },
      }),
      validateGetParty: () => ({
        compare: (actual) => {
          const partySchema = schema({
            status: 'integer',
            data: 'array',
          }, actual);
          if (partySchema.passed === false) {
            const partySchemaData = schema({
              id: 'integer',
              name: 'string',
              logoUrl: 'string',
            }, actual.data);
            if (partySchemaData.passed === false) {
              return { pass: false, message: partySchema.message };
            }
            return { pass: false, message: partySchema.message };
          }
          return { pass: true };
        },
      }),
      validateDeleteParty: () => ({
        compare: (actual) => {
          const partySchema = schema({
            status: 'integer',
            data: 'array',
          }, actual);
          if (partySchema.passed === false) {
            const partySchemaData = schema({
              message: 'string',
            }, actual.data);
            if (partySchemaData.passed === false) {
              return { pass: false, message: partySchema.message };
            }
            return { pass: false, message: partySchema.message };
          }
          return { pass: true };
        },
      }),
    });
  });

  describe('POST', () => {
    it('Should create a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties`,
          method: 'POST',
          body: JSON.stringify({
            id: 1,
            name: 'AFDC',
            hqAdress: 'adress',
            logoUrl: 'logourl',
          }),
        }, (error, response, body) => {
          expect(body).toBeJsonString(body);


          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body)).validateParty();
          done();
        },
      );
    });

    it('Should retun 400 for a bad request', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties`,
          method: 'POST',
          body: JSON.stringify({ // The id is a string
            id: '1',
            name: 'AFDC',
            hqAdress: 'adress',
            logoUrl: 'logourl',
          }),
        }, (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(400);
          expect(JSON.parse(body).error).toBeDefined();
          done();
        },
      );
    });
  });

  describe('GET ', () => {
    it(' Should get a specific party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/3`,
          method: 'GET',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);
          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body)).validateGetParty();
          done();
        },
      );
    });

    it(' Should should return 404 ', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/2`,
          method: 'GET',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(404);
          expect(JSON.parse(body).error).toBeDefined();
          done();
        },
      );
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
          expect(JSON.parse(body)).validateParty();
          done();
        },
      );
    });
  });

  describe('PATCH /', () => {
    it('Should edit a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/3/name`,
          method: 'PATCH',
          body: JSON.stringify({
            name: 'newName',
          }),
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);


          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body)).validateParty();


          done();
        },
      );
    });

    it('Should return 404 ', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/2/name`,
          method: 'PATCH',
          body: JSON.stringify({
            name: 'newName',
          }),
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(404);
          expect(JSON.parse(body).error).toBeDefined();
          done();
        },
      );
    });
  });

  describe('DELETE ', () => {
    it('Should delete a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/4`,
          method: 'DELETE',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);


          expect(JSON.parse(body).status).toBe(200);
          expect(JSON.parse(body)).validateDeleteParty();


          done();
        },
      );
    });

    it('Should return 404', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/2`,
          method: 'DELETE',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);

          expect(JSON.parse(body).status).toBe(404);
          expect(JSON.parse(body).error).toBeDefined();
          done();
        },
      );
    });
  });
});

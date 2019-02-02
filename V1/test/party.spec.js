const Request = require('request');

const baseUrl = 'http://localhost:3000/api/v1';
const schema = require('../utils/schema');

describe('Server', () => {
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
      validateCreateParty: () => ({
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
    it('Creates a party', (done) => {
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
          expect(JSON.parse(body)).validateCreateParty();
          done();
        },
      );
    });
  });

  describe('GET ', () => {
    it(' Gets a specific party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/1`,
          method: 'GET',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);


          if (body.status === 200) {
            expect(JSON.parse(body)).validateGetParty();
          }

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
          expect(JSON.parse(body)).validateCreateParty();
          done();
        },
      );
    });
  });

  describe('PATCH /', () => {
    it('Edit a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/1/name`,
          method: 'PATCH',
          body: JSON.stringify({
            name: 'newName',
          }),
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);


          if (body.status === 200) {
            expect(JSON.parse(body)).validateCreateParty();
          }

          done();
        },
      );
    });
  });

  describe('DELETE ', () => {
    xit('Delete a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/1`,
          method: 'DELETE',
        },
        (error, response, body) => {
          expect(body).toBeJsonString(body);


          if (body.status === 200) {
            expect(JSON.parse(body)).validateDeleteParty();
          }

          done();
        },
      );
    });
  });
});

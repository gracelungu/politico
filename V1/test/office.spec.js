const Request = require('request');

const baseUrl = 'http://localhost:3000/api/v1';
const schema = require('../utils/schema');

// Starts the server
require('../../app');

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
      validateCreateOffice: () => ({
        compare(actual) {
          const officeSchema = schema({
            status: 'integer',
            data: 'array',
          }, actual);
          if (officeSchema.passed === false) {
            const officeSchemaData = schema({
              id: 'integer',
              type: 'string',
              name: 'string',
            }, actual.data);
            if (officeSchemaData.passed === false) {
              return { pass: false, message: officeSchema.message };
            }
            return { pass: false, message: officeSchema.message };
          }
          return { pass: true };
        },
      }),
      validateGetOffices: () => ({
        compare(actual) {
          const officeSchema = schema({
            status: 'integer',
            data: 'array',
          }, actual);
          if (officeSchema.passed === false) {
            return { pass: false, message: officeSchema.message };
          }
          return { pass: true };
        },
      }),

    });
  });

  describe('POST /', () => {
    it('Creates an office', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices`,
        method: 'POST',
        body: JSON.stringify({
          id: 1,
          type: 'federal',
          name: 'Minister',
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(200);
        expect(JSON.parse(body)).validateCreateOffice();
        done();
      });
    });
  });

  describe('GET /', () => {
    it('Gets political offices', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();

        expect(JSON.parse(body).status).toBe(200);
        expect(JSON.parse(body)).validateGetOffices();
        done();
      });
    });
  });

  describe('GET /', () => {
    it('Gets specific office', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices/1`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();

        if (body.status === 200) {
          expect(JSON.parse(body)).validateCreateOffice();
        }

        done();
      });
    });
  });
});

import Request from 'request';
import schema from '../helpers/schema';

const baseUrl = 'http://localhost:3003/api/v1';

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
            return { pass: false, message: 'Expects the body to be a json string' };
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
    it('Should create an office', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices`,
        method: 'POST',
        body: JSON.stringify({
          type: 'federal',
          name: 'Minister',
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(201);
        expect(JSON.parse(body)).validateCreateOffice();
        done();
      });
    });

    it('Should return 400 when the type is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices`,
        method: 'POST',
        body: JSON.stringify({
          name: 'Minister',
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
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
    it('Should get a specific office', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices/2`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();

        if (body.status === 200) {
          expect(JSON.parse(body)).validateCreateOffice();
        }

        done();
      });
    });

    it('Should return 404 when the office does not exist', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices/9`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(404);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });
  });
});

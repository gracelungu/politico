import Request from 'request';
import schema from '../helpers/schema';
import { baseUrl } from '../config/config';

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
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: true,
        }),
      }, (error, response, bdy) => {

        const authToken = JSON.parse(bdy).data[0].token;

        Request({
          headers: { 'content-type': 'application/json', 'authorization': authToken },
          url: `${baseUrl}/offices`,
          method: 'POST',
          body: JSON.stringify({
            name: 'Minister',
            type: 'federal'
          }),
        }, (error, response, body) => {
          expect(body).toBeJsonString();
          expect(JSON.parse(body).status).toBe(201);
          expect(JSON.parse(body).data).toBeDefined();
          done();
        });
        
      });
      
    });

    it('Should return 403 when the token is missing', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices`,
        method: 'POST',
        body: JSON.stringify({
          name: 'Minister1',
          type: 'federal'
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(403);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });

    it('Should return 403 when the token is invalid', (done) => {
      Request({
        headers: { 'content-type': 'application/json', 'authorization':'invalidtoken' },
        url: `${baseUrl}/offices`,
        method: 'POST',
        body: JSON.stringify({
          name: 'Minister2',
          type: 'federal'
        }),
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(403);
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

  const getOffice = (done)=>{
    Request({
      headers: { 'content-type': 'application/json' },
      url: `${baseUrl}/offices/1`,
      method: 'GET',
    }, (error, response, body) => {
      expect(body).toBeJsonString();
      expect(JSON.parse(body).status).toBe(200);
      expect(JSON.parse(body)).validateCreateOffice();
      done();
    });
  }

  describe('GET /', () => {
    it('Should get a specific office', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/auth/signup`,
        method: 'POST',
        body: JSON.stringify({
          firstname: 'grace',
          lastname: 'lungu',
          othername: 'birindwa',
          email: `admin${Math.floor(Math.random() * 1000) + 1}@gmail.com`,
          password: 'password',
          phoneNumber: 878623545,
          passportUrl: 'url',
          isAdmin: true,
        }),
      }, (error, response, bdy) => {

        const authToken = JSON.parse(bdy).data[0].token;
      
        Request({
          headers: { 'content-type': 'application/json', 'authorization':authToken },
          url: `${baseUrl}/offices`,
          method: 'POST',
          body: JSON.stringify({
            name: 'Ministers',
            type: 'federal',
          }),
        }, () => { 
          
          getOffice(done);
  
        });

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

    it('Should return 404 when the id is not a number', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/offices/id`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(404);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });
  });

  describe('Wrong request', () => {
    it('Should return "wrong http request" when the request is wrong', (done) => {
      Request({
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/office`,
        method: 'GET',
      }, (error, response, body) => {
        expect(body).toBeJsonString();
        expect(JSON.parse(body).status).toBe(400);
        expect(JSON.parse(body).error).toBeDefined();
        done();
      });
    });
  });
});

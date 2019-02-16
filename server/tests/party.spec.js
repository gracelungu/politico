import Request from 'request';
import schema from '../helpers/schema';
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
      const randName = `AFDC${Math.floor(Math.random() * 1000)}${1}`;
      Request(
        {
          headers: { 'content-type': 'application/json' },
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
          expect(JSON.parse(body)).validateParty();

          Request(
            {
              headers: { 'content-type': 'application/json' },
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
              expect(JSON.parse(bdy).error).toBeDefined();
              done();
            },
          );
        },
      );
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
          url: `${baseUrl}/parties`,
          method: 'POST',
          body: JSON.stringify({
            name: 'AFDD',
            hqAdress: 'adress',
            logoUrl: 'logourl',
          }),
        }, () => {
          Request(
            {
              headers: { 'content-type': 'application/json' },
              url: `${baseUrl}/parties/1`,
              method: 'GET',
            },
            (error, response, body) => {
              expect(body).toBeJsonString(body);
              expect(JSON.parse(body).status).toBe(200);
              expect(JSON.parse(body)).validateGetParty();
              done();
            },
          );
        },
      );
    });

    it(' Should return 404 when the party is not found', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/9`,
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
              headers: { 'content-type': 'application/json' },
              url: `${baseUrl}/parties/1/name`,
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
        },
      );
    });

    it('Should return 404 when the party is not found', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/9/name`,
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

    it('Should return 404 when the id is not a number', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/id/name`,
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

  const deleteParty = (done) => {
    Request(
      {
        headers: { 'content-type': 'application/json' },
        url: `${baseUrl}/parties/2`,
        method: 'DELETE',
      },
      (error, response, body) => {
        expect(body).toBeJsonString(body);


        expect(JSON.parse(body).status).toBe(200);
        expect(JSON.parse(body)).validateDeleteParty();


        done();
      },
    );
  };

  describe('DELETE ', () => {
    it('Should delete a party', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties`,
          method: 'POST',
          body: JSON.stringify({
            name: 'FERS',
            hqAdress: 'adress',
            logoUrl: 'logourl',
          }),
        }, () => {
          Request(
            {
              headers: { 'content-type': 'application/json' },
              url: `${baseUrl}/parties`,
              method: 'POST',
              body: JSON.stringify({
                name: 'AFDC',
                hqAdress: 'adress',
                logoUrl: 'logourl',
              }),
            }, () => {
              deleteParty(done);
            },
          );
        },
      );
    });

    it('Should return 404 when the party is not found', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/9`,
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

    it('Should return 404 when the id is not a number', (done) => {
      Request(
        {
          headers: { 'content-type': 'application/json' },
          url: `${baseUrl}/parties/id`,
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

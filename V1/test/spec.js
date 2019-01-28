const Request = require('request');
const base_url = "http://localhost:3000/";

describe('Server', ()=>{

    var server;

    beforeAll(()=>{
        server = require('../app'); 
    });

    afterAll(()=>{
        server.close();
    });

    describe('GET /', ()=>{

        it('Status 200', (done)=>{

            Request.get(base_url, (error, response, body)=>{ 
                expect(response.statusCode).toBe(200);
                done();
            });
            
        });

        it('Body', (done)=>{

            Request.get(base_url, (error, response, body)=>{ 
                expect(body).toBe("hello");
                done();
            });
            
        });

    });

});
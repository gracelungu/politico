const Request = require('request');
const base_url = "http://localhost:3000/api/v1";
const schema = require('../utils/schema');

describe('Server', ()=>{

    var server;

    beforeAll(()=>{
        server = require('../app'); 
    });

    afterAll(()=>{
        server.close();
    });

    beforeEach(()=>{

        jasmine.addMatchers({
            validateCreateParty : ()=>{
                return {
                    compare : (actual, expected) => { 
                        var partySchema = schema({
                            status:'integer',
                            data:'array'
                        },actual);
                        if(partySchema.passed == false){
                            return {pass:false,message:partySchema.message};
                        }
                        return {pass:true}
                    }
                }
            },
            validateGetParty : ()=>{
                return {
                    compare : (actual, expected) => { 
                        var partySchema = schema({
                            status:'integer',
                            data:'array'
                        },actual);
                        if(partySchema.passed == false){
                            return {pass:false,message:partySchema.message};
                        }
                        var partySchemaData = schema({
                            id:"integer",
                            name:"string",
                            logoUrl:"string"
                        },actual.data);
                        if(partySchemaData.passed == false){
                            return {pass:false,message:partySchema.message};
                        }
                        return {pass:true}
                    }
                }
            }
        })

    });

    describe('POST / CREATE A PARTY', ()=>{

        var raw_data = {
            id:1,
            name:"AFDC",
            hqAdress:"adress",
            logoUrl:"logourl"
        };

        it('Status 200', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties',
                    method:"POST",
                    body:JSON.stringify(raw_data)
                }, 
                (error, response, body)=>{ 
                expect(response.statusCode).toBe(200);
                done();
            });
            
        });

        it('Body status 200', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties',
                    method:"POST",
                    body:JSON.stringify(raw_data)
                },
                 (error, response, body)=>{ console.log(body);
                expect(JSON.parse(body)).validateCreateParty();
                done();
            });
            
        });


    });

    describe('GET A SPECIFIC PARTY', ()=>{

        it('Status 200', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties/1',
                    method:"GET"
                }, 
                (error, response, body)=>{ 
                expect(response.statusCode).toBe(200);
                done();
            });
            
        });

        it('Body status 200', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties/1',
                    method:"GET"
                },
                 (error, response, body)=>{ console.log(body);
                //expect(JSON.parse(body)).validateGetParty();
                done();
            });

        });

    });

});

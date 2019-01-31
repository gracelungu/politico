const Request = require('request');
const base_url = "http://localhost:3000/api/v1";
const schema = require('../utils/schema');

describe('Server', ()=>{

    var server;
    var originalTimeout;

    beforeAll(()=>{
        server = require('../app');
        console.log("server started");
    });

    afterAll(()=>{
        // server.close();
        // console.log("server closed");
    });

    beforeEach(()=>{

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

        jasmine.addMatchers({
            toBeJsonString: ()=>{
                return{
                    compare: (actual,expected)=>{
                        try{
                            JSON.parse(actual);
                        }catch(e){
                            return {pass:false,message:"Expected body to be a json string"};
                        }
                        return {pass:true};
                    }
                }
            },
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
                            var partySchemaData = schema({
                                id:"integer",
                                name:"string",
                                logoUrl:"string"
                            },actual.data);
                            if(partySchemaData.passed == false){
                                return {pass:false,message:partySchema.message};
                            }
                            return {pass:false,message:partySchema.message};
                        }
                        return {pass:true}
                    }
                }
            },
            validateDeleteParty: ()=> {
                return{
                    compare: (actual, expected)=>{
                        var partySchema = schema({
                            status:'integer',
                            data:'array'
                        },actual);
                        if(partySchema.passed == false){
                            var partySchemaData = schema({
                                message:"string"
                            },actual.data);
                            if(partySchemaData.passed == false){
                                return {pass:false,message:partySchema.message};
                            }
                            return {pass:false,message:partySchema.message};
                        }
                        return {pass:true}
                    }
                }
            }
        });

    });

    afterEach(()=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe('POST', ()=>{

        it('Creates and gets an office', (done)=>{

            Request(
                    {
                        headers: {'content-type' : 'application/json'},
                        url:base_url+'/parties',
                        method:"POST",
                        body:JSON.stringify({
                            id:1,
                            name:"AFDC",
                            hqAdress:"adress",
                            logoUrl:"logourl"
                        })
                    },(error, response, body)=>{console.log('POST ', body)
                    
                    expect(body).toBeJsonString(body);
                    
                    body = JSON.parse(body);
    
                    expect(body.status).toBe(200);
                    expect(body).validateCreateParty();
                    done();

                });

        });

    });

    describe('GET ', ()=>{

        it(' A specific office', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties/1',
                    method:"GET"
                },
                (error, response, body)=>{ console.log("GET office",body);

                expect(body).toBeJsonString(body);
                
                body = JSON.parse(body);

                if(body.status == 200){
                    expect(body).validateGetParty();
                }

                done();

            });

        });

    });

    describe('GET ', ()=>{

        it('All parties', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties',
                    method:"GET"
                },
                (error, response, body)=>{ console.log("GET ALL", body);

                expect(body).toBeJsonString(body);
                
                body = JSON.parse(body);

                expect(body.status).toBe(200);
                expect(body).validateCreateParty();
                done();

            });

        });

    });

    describe('PATCH /',()=>{

        xit('Edit a party', (done)=>{

            let raw_data = {
                name: "newName"
            }

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties/1/name',
                    method:"PATCH",
                    body:JSON.stringify(raw_data)
                },
                (error, response, body)=>{ console.log("EDIT", body);

                expect(body).toBeJsonString(body);
                
                body = JSON.parse(body);

                if(body.status == 200){
                    expect(body).validateCreateParty();
                }    

                done();

            });

        });

    });

    describe('DELETE A PARTY', ()=>{

        xit('Body status 200', (done)=>{

            Request(
                {
                    headers: {'content-type' : 'application/json'},
                    url:base_url+'/parties/1',
                    method:"DELETE"
                },
                (error, response, body)=>{ console.log("DELETE", body);
    
                expect(body).toBeJsonString(body);
                
                body = JSON.parse(body);
    
                if(body.status == 200){
                    expect(body).validateDeleteParty();
                } 

                done();
    
            });
    
        });

    });
    

});



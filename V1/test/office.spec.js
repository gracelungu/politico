const Request = require('request');
const base_url = "http://localhost:3000/api/v1";
const schema = require('../utils/schema');

describe('Server', ()=>{

    var server;

    beforeAll(()=>{
        server = require('../app');
        console.log("server started");
    });

    afterAll(()=>{
    });

    beforeEach(()=>{

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
            validateCreateOffice : ()=>{
                return{
                    compare(actual,expected){
                        var officeSchema = schema({
                            status:'integer',
                            data:'array'
                        },actual);
                        if(officeSchema.passed == false){
                            var officeSchemaData = schema({
                                id:'integer',
                                type:'string',
                                name:'string'
                            },actual.data);
                            if(officeSchemaData.passed == false){
                                return {pass:false,message:officeSchema.message};
                            }
                            return {pass:false,message:officeSchema.message};
                        }
                        return {pass:true}
                    }
                }
            },
            validateGetOffices: ()=>{
                return{
                    compare(actual,expected){
                        var officeSchema = schema({
                            status:'integer',
                            data:'array'
                        },actual);
                        if(officeSchema.passed == false){
                            return {pass:false,message:officeSchema.message};
                        }
                        return {pass:true} 
                    }
                }
            }

        });

    });

    describe('POST /',()=>{

        it('Creates an office', (done)=>{

            var req = Request({
                headers: {'content-type' : 'application/json'},
                url:base_url+'/offices',
                method:"POST",
                body:JSON.stringify({
                    id:1,
                    type:'federal',
                    name: 'Minister'
                })
            },(error, response, body)=>{ console.log("POST office ",body)
    
                body = JSON.parse(body);

                expect(body.status).toBeJsonString();
                expect(body.status).toBe(200);
                expect(body).validateCreateOffice();
                done();
    
            }); 

        });

    });

    describe('GET /',()=>{

        it('All political offices', (done)=>{

            var req = Request({
                headers: {'content-type' : 'application/json'},
                url:base_url+'/offices',
                method:"GET"
            },(error, response, body)=>{ console.log("GET offices ",body)
    
                body = JSON.parse(body);

                expect(body.status).toBeJsonString();

                expect(body.status).toBe(200);
                expect(body).validateGetOffices();
                done();
    
            }); 

        });

    });

    describe('GET /',()=>{

        it('A specific office', (done)=>{

            var req = Request({
                headers: {'content-type' : 'application/json'},
                url:base_url+'/offices/1',
                method:"GET"
            },(error, response, body)=>{ console.log("GET office ",body)

                body = JSON.parse(body);

                expect(body.status).toBeJsonString();

                if(body.status == 200){
                    expect(body).validateCreateOffice();
                }
                
                done();
    
            }); 

        });

    });


});
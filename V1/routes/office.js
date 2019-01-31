const express = require('express');
const router = express.Router();

const schema = require('../utils/schema');

var Offices = [];

//Get a specific office
router.get('/api/v1/offices/:id', (req, res) => {

    let office ; 
  
    for(o of Offices){
      if(o.id == req.params.id){
        office = o;
        delete office.hqAdress;
      }
    }
  
    if(office == undefined){
      res.status(404).json({
        status:404,
        error: "office not found"
      });
      return;
    }
  
    res.status(200).json({
      status:200,
      data:[office]
    })
  
  });

//Get all offices
router.get('/api/v1/offices', (req, res) => {

    res.status(200).json({
      status:200,
      data: Offices
    })
  
  });

//Create an office
router.post('/api/v1/offices',(req, res)=>{

    var officeSchema = schema({
        id:'integer',
        type:'string',
        name:'string'
    },req.body);

    if(officeSchema.passed == false){
        res.status(400).json({
            status:400,
            error:officeSchema.message
        });
        return;
    }

    Offices.push(req.body);

    res.status(200).json({
        status:200,
        data:[req.body]
    });

});

module.exports = router;
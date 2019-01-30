const express = require('express');
const router = express.Router();

const schema = require('../utils/schema');

var Parties = [];

//Delete a specific party
router.delete('/api/v1/parties/:id', (req, res) => {

  for(p in Parties){
    if(Parties[p].id == req.params.id){

      Parties.splice(p,1);

      res.status(200).json({
        status:200,
        data: [{
          message: "The party was successfully deleted"
        }]
      });

    }
  }

});

//Edit a specific party
router.patch('/api/v1/parties/:id/name', (req, res) => {

  var name = schema({
    name:"string"
  },req.body);

  if(name.passed == false){
    res.status(400).json({
      status:400,
      error:name.message
    });
    return;
  }

  for(p of Parties){
    if(p.id == req.params.id){

      p.name = req.body.name;

      res.status(200).json({
        status:200,
        data: [{
          id: p.id,
          name: p.name
        }]
      });

      return;

    }
  }

  

});

//Get all parties
router.get('/api/v1/parties', (req, res) => {

  res.status(200).json({
    status:200,
    data: Parties
  })

});

//Get a specific party
router.get('/api/v1/parties/:id', (req, res) => {

  let party ; 

  for(p of Parties){
    if(p.id == req.params.id){
      party = p;
      delete party.hqAdress;
    }
  }

  if(party == undefined){
    res.status(404).json({
      status:404,
      error: "Party not found"
    });
    return;
  }

  res.status(200).json({
    status:200,
    data:[party]
  })

});

//Create a new party 
router.post('/api/v1/parties', (req, res) => {

  //Validate the request
  var partySchema = schema({
    id:'integer',
    name:'string',
    hqAdress:'string',
    logoUrl:'string'
  },req.body);

  if(partySchema.passed == false){
    res.status(400).json({
      status:400,
      error:partySchema.message
    });
    return;
  }

  //Add new party
  Parties.push(req.body);

  res.status(200).json({
    status : 200,
    data : [{
      id:req.body.id,
      name:req.body.name
    }]
  });

});

module.exports = router;
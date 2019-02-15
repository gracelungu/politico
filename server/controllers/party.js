import schema from '../helpers/schema';

const Parties = [];

const deleteParty = (req, res) => {
  const idSchema = schema({
    id: 'number',
  }, { id: parseInt(req.params.id, 10) });

  if (idSchema.passed === false) {
    res.status(404).json({
      status: 404,
      error: idSchema.message,
    });
    return;
  }

  const index = Parties.findIndex(item => item.id === parseInt(req.params.id, 10));

  if (index >= 0) {
    Parties.splice(index, 1);

    res.status(200).json({
      status: 200,
      data: [{
        message: 'The party was successfully deleted',
      }],
    });
    return;
  }

  res.status(404).json({
    status: 404,
    error: 'Party not found',
  });
};

const getParty = (req, res) => {
  const item = Parties.find(element => element.id === parseInt(req.params.id, 10));

  if (!item) {
    res.status(404).json({
      status: 404,
      error: 'Party not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: [item],
  });
};

const editParty = (req, res) => {
  const nameSchema = schema({
    name: 'string',
  }, req.body);

  if (nameSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: nameSchema.message,
    });
    return;
  }

  const item = Parties.find(element => element.id === parseInt(req.params.id, 10));

  if (item) {
    item.name = req.body.name;

    res.status(200).json({
      status: 200,
      data: [{
        id: item.id,
        name: item.name,
      }],
    });
    return;
  }

  res.status(404).json({
    status: 404,
    error: 'Party not found',
  });
};

const getParties = (req, res) => {
  res.status(200).json({
    status: 200,
    data: Parties,
  });
};

const createParty = (req, res) => {
  // Validate the request
  const partySchema = schema({
    name: 'string',
    hqAdress: 'string',
    logoUrl: 'string',
  }, req.body);

  if (partySchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: partySchema.message,
    });
    return;
  }

  const index = Parties.findIndex(item => item.name === req.body.name);

  if (index >= 0) {
    res.status(403).json({
      status: 403,
      error: 'A Party with the same name already exist',
    });
    return;
  }

  // Add new party
  let party = partySchema.obj;

  party = Object.assign({ id: Parties.length + 1 }, party);

  Parties.push(party);

  res.status(200).json({
    status: 201,
    data: [party],
  });
};

export {
  deleteParty, getParty, editParty, getParties, createParty,
};

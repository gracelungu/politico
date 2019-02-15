import schema from '../helpers/schema';

const Offices = [];

const getOffice = (req, res) => {
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

  const item = Offices.find(element => element.id === parseInt(req.params.id, 10));

  if (!item) {
    res.status(404).json({
      status: 404,
      error: 'office not found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    data: [item],
  });
};

const getOffices = (req, res) => {
  res.status(200).json({
    status: 200,
    data: Offices,
  });
};

const createOffice = (req, res) => {
  const officeSchema = schema({
    type: 'string',
    name: 'string',
  }, req.body);

  if (officeSchema.passed === false) {
    res.status(400).json({
      status: 400,
      error: officeSchema.message,
    });
    return;
  }

  const index = Offices.findIndex(item => item.name === req.body.name);

  if (index >= 0) {
    res.status(403).json({
      status: 403,
      error: 'An office with the same name already exist',
    });
    return;
  }

  let office = officeSchema.obj;

  office = Object.assign({ id: Offices.length + 1 }, office);

  Offices.push(office);

  res.status(201).json({
    status: 201,
    data: [office],
  });
};

export { getOffice, getOffices, createOffice };

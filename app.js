// External modules
import express from 'express';
import bodyParser from 'body-parser';

// Internal modules
import partyController from './V1/routes/party';
import officeController from './V1/routes/office';

// Express setup
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express routing
app.use('/', partyController);
app.use('/', officeController);

app.use('*',(req, res)=>{
    res.status(404).json({
        status:404,
        error: 'Endpoint not found'
    });
});

const port = process.env.PORT || 3003;
const server = app.listen(port);

export default server ;

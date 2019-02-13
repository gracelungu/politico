// External modules
import express from 'express';
import bodyParser from 'body-parser';

// Internal modules
import partyController from './server/routes/party';
import officeController from './server/routes/office';

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
        error: 'Wrong http request'
    });
});

const port = process.env.PORT || 3003;
const server = app.listen(port);

export default server ;

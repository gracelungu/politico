// External modules
import express from 'express';
import bodyParser from 'body-parser';

// Internal modules
import party from './server/routes/party';
import office from './server/routes/office';
import user from './server/routes/user';

// Express setup
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express routing
app.use('/', party);
app.use('/', office);
app.use('/', user);

app.use('*',(req, res)=>{
    res.status(404).json({
        status:404,
        error: 'Wrong http request'
    });
});

const port = process.env.PORT || 3003;
const server = app.listen(port);

export default server ;

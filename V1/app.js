const express = require('express');
const app = express();

app.get('/', (req,res)=>{
   res.status(200).send("hello");
});

const port = process.env.PORT || 3000;
var server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
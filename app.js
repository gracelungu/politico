// External modules
import express from "express";
import bodyParser from "body-parser";

// Internal modules
import party from "./server/routes/party";
import office from "./server/routes/office";
import user from "./server/routes/user";

// Express setup
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow origins with cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Express routing
app.use("/", party);
app.use("/", office);
app.use("/", user);

// Rendering the Documentation
app.use("/api/v1/doc", (req, res) => {
  res.sendFile(`${__dirname}/doc.html`);
});

app.use("*", (req, res) => {
  res.status(400).json({
    status: 400,
    error: "Wrong http request"
  });
});

const port = process.env.PORT || 3003;
const server = app.listen(port);

export default server;

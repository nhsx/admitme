const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const Handler = require("../src/api/Handler").Handler;
const QrcodeService = require("../src/api/service/QrcodeService").QrcodeService;
const handler = new Handler(new QrcodeService());

//express setup
let app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const route = "/qrcodedata";

app.route(route).get(function (req, res) {
  async function handleQrcodeDetails() {
    let event = {};
    event.queryStringParameters = {
      userid: req.query["userid"]
    };
    const result = await handler.handleQrcodeDetails(event);
    res.status(result.statusCode).send(result.body);
  }
  handleQrcodeDetails();
});

var server = http.createServer(app);
const port = 5002;
server.listen(port);
console.log(`Server is listening at http://localhost:${port}${route}`);

module.exports = app;

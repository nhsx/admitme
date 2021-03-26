const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
var cors = require("cors");

const Handler = require("../src/api/handler").Handler;
const UserInfoService = require("../src/api/service/userInfoService").UserInfoService;
const handler = new Handler(new UserInfoService());

//express setup
let app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const route = "/userinfo";

app.route(route).post(function (req, res) {
  async function handleUserInfo(req) {
	  console.log(req.body);
    const { code, redirectUri } = req.body;
    let event = {};
    event.body = {
      code: code,
      redirectUri: redirectUri,
    };
    const result = await handler.handleUserInfoService(event);
    res.status(result.statusCode).send(result.body);
  }
  handleUserInfo(req);
});

var server = http.createServer(app);
const port = 5002;
server.listen(port);
console.log(`Server is listening at http://localhost:${port}${route}`);

module.exports = app;

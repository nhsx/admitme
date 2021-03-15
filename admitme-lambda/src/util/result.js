const headers = { "Content-type": "application/json" };

class OK_200 {
  constructor(message) {
    this.statusCode = 200;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

class BadRequest_400 {
  constructor(message) {
    this.statusCode = 400;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

class UnAuthorized_401 {
  constructor(message) {
    this.statusCode = 401;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

class Forbidden_403 {
  constructor(message) {
    this.statusCode = 403;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

class Not_Found_404 {
  constructor(message) {
    this.statusCode = 404;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

class InternalServerError_500 {
  constructor(message) {
    this.statusCode = 500;
    this.headers = headers;
    this.body = JSON.stringify({ result: message });
    this.isBase64Encoded = false;
  }
}

module.exports.OK_200 = OK_200;
module.exports.BadRequest_400 = BadRequest_400;
module.exports.UnAuthorized_401 = UnAuthorized_401;
module.exports.Forbidden_403 = Forbidden_403;
module.exports.Not_Found_404 = Not_Found_404;
module.exports.InternalServerError_500 = InternalServerError_500;

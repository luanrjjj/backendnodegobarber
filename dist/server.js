"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./shared/infra/http/routes"));

var _upload = _interopRequireDefault(require("./config/upload"));

var _celebrate = require("celebrate");

var _AppError = _interopRequireDefault(require("./shared/errors/AppError"));

var _rateLimiter = _interopRequireDefault(require("./shared/infra/http/midleware/rateLimiter"));

require("./shared/infra/typeorm");

require("./shared/container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_rateLimiter.default);

var cors = require('cors');

app.use(cors()); // Use this after the variable declaration

app.get('/', (request, response) => {
  return response.json({
    message: 'Hello Gold;'
  });
});
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    messsage: 'Internal Server Error'
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333');
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _UsersRepository = _interopRequireDefault(require("../../../infra/typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index, show, create, update, delete
class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const usersRepository = new _UsersRepository.default();

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password
    }); // Com a atualização do TypeScript, isso se faz necessário

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    return response.json(userWithoutPassword);
  }

}

exports.default = UsersController;
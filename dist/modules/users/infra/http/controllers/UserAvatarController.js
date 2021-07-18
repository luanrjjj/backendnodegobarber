"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _updateUserAvatarService = _interopRequireDefault(require("../../../services/updateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index, show, create, update, delete
class UsersAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_updateUserAvatarService.default);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersAvatarController;
"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers/index");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

require("../providers");

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', (0, _tsyringe.delay)(() => _AppointmentsRepository.default));

_tsyringe.container.registerSingleton('UsersRepository', (0, _tsyringe.delay)(() => _UsersRepository.default));

_tsyringe.container.registerSingleton('UserTokensRepository', (0, _tsyringe.delay)(() => _UserTokensRepository.default));

_tsyringe.container.registerSingleton('NotificationsRepository', (0, _tsyringe.delay)(() => _NotificationsRepository.default));
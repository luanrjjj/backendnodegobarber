"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

var _AppointmentsRepository = _interopRequireDefault(require("../../typeorm/repositories/AppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    const user_id = request.user.id; // GErador no Middleware

    const appointmentsRepository = new _AppointmentsRepository.default();
    const {
      provider_id,
      date
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;
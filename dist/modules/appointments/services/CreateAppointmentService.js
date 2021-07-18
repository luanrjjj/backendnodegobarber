"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _tsyringe = require("tsyringe");

var _INotificationsRepositories = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepositories"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepositories.default === "undefined" ? Object : _INotificationsRepositories.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentService {
  constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    date,
    provider_id,
    user_id
  }) {
    var _this$notificationsRe, _this$cacheProvider;

    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default("You can't create a Appointment in past date");
    }

    if (user_id === provider_id) {
      throw new _AppError.default("You can't create appointment with yourself");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default("You can only create appointment between 8am and 5pm");
    }

    const findAppointmentInSameData = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentInSameData) {
      throw new _AppError.default('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
      user_id
    });
    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await ((_this$notificationsRe = this.notificationsRepository) === null || _this$notificationsRe === void 0 ? void 0 : _this$notificationsRe.create({
      recipient_id: provider_id,
      content: `'Novo Agendamento para dia ${dateFormatted}`
    }));
    await ((_this$cacheProvider = this.cacheProvider) === null || _this$cacheProvider === void 0 ? void 0 : _this$cacheProvider.invalidate(`
        provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`));
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;
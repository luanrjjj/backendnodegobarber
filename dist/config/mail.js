"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'mecz@mecz.com.br',
      name: 'Luan Alfredo da Mecz'
    }
  }
};
exports.default = _default;
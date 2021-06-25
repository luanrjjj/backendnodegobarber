import { container,delay } from 'tsyringe';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '../../modules/users/repositories/IUsersRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',delay(()=>AppointmentsRepository))



container.registerSingleton<IUsersRepository>('UsersRepository',delay(()=>UsersRepository))



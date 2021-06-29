import { container,delay } from 'tsyringe';
import '../../modules/users/providers/index';
import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '../../modules/users/repositories/IUsersRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'
import '../providers'

 import IUserTokensRepository from '../../modules/users/repositories/IUsersRepository'
 import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'


container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',delay(()=>AppointmentsRepository))



container.registerSingleton<IUsersRepository>('UsersRepository',delay(()=>UsersRepository))

container.registerSingleton<IUserTokensRepository>('UsersTokensRepository',delay(()=>UserTokensRepository))

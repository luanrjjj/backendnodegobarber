import { container,delay } from 'tsyringe';
import '../../modules/users/providers/index';
import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '../../modules/users/repositories/IUsersRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'
import '../providers'

 import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository'
 import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository'


 import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepositories'

 import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',delay(()=>AppointmentsRepository))


container.registerSingleton<IUsersRepository>('UsersRepository',delay(()=>UsersRepository))

container.registerSingleton<IUserTokensRepository>('UserTokensRepository',delay(()=>UserTokensRepository))


container.registerSingleton<INotificationsRepository>('NotificationsRepository',delay(()=>NotificationsRepository))


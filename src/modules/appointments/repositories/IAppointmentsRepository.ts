import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO'
import IFindAllFromUserDTO from '../dtos/IFindAllFromUserDTO';

interface IAppointmentsRepository {
    create(date:ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date:Date,provider_id:string):Promise<Appointment|undefined>
    findAllInMonthFromProvider(data:IFindAllInMonthFromProvider):Promise<Appointment[]>
    findAllInDayFromProvider(data:IFindAllInDayFromProvider):Promise<Appointment[]>
    findAllFromUser(data:IFindAllFromUserDTO):Promise<Appointment[]>

}

export default IAppointmentsRepository
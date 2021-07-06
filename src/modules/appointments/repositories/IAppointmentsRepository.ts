import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO'

interface IAppointmentsRepository {
    create(date:ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date:Date):Promise<Appointment|undefined>
    findAllInMonthFromProvider(data:IFindAllInMonthFromProvider):Promise<Appointment[]>
    findAllInDayFromProvider(data:IFindAllInDayFromProvider):Promise<Appointment[]>


}

export default IAppointmentsRepository
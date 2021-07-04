import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '../dtos/IFindInAllMonthFromProviderDTO'
import IFindAllInDayFromProvider from '../dtos/IFindInAllDayFromProviderDTO'

interface IAppointmentsRepository {
    create(date:ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date:Date):Promise<Appointment|undefined>
    findAllInMonthFromProvider(data:IFindAllInMonthFromProvider):Promise<Appointment[]>
    findAllInDayFromProvider(data:IFindAllInDayFromProvider):Promise<Appointment[]>


}

export default IAppointmentsRepository
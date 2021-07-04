import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '../dtos/IFindInAllMonthFromProviderDTO'

interface IAppointmentsRepository {
    create(date:ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date:Date):Promise<Appointment|undefined>
    findAllInMonthFromProvider(data:IFindAllInMonthFromProvider):Promise<Appointment[]>


}

export default IAppointmentsRepository
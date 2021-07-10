
import {v4} from 'uuid'
import { isEqual,getMonth,getDate,getYear } from 'date-fns'
import Appointment from '../../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../../../appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '../../../../modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '../../../../modules/appointments/dtos/IFindAllInDayFromProviderDTO';





class AppointmentsRepository implements IAppointmentsRepository {
   private appointments: Appointment [] = []


    
    public async findByDate(date:Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date,date))

        return findAppointment;
    }


    public async findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthFromProvider): Promise<Appointment []> {
        const appointments = this.appointments.filter(appointment => appointment.provider_id===provider_id 
            && getMonth(appointment.date)+1===month
            && getYear(appointment.date)===year );

        return appointments
    }

    public async findAllInDayFromProvider({provider_id,day,month,year}:IFindAllInDayFromProvider): Promise<Appointment []> {
        const appointments = this.appointments.filter(appointment => appointment.provider_id===provider_id 
            && getDate(appointment.date)=== day
            && getMonth(appointment.date)+1===month
            && getYear(appointment.date)===year );
            

        return appointments
    }
    
    public async create({user_id,provider_id,date}:ICreateAppointmentDTO):Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {id:v4(),date,provider_id,user_id})

        appointment.id = v4()
        appointment.date = date = date
        appointment.provider_id = provider_id;


        this.appointments.push(appointment)


        return appointment;
       
}
}
export default AppointmentsRepository;
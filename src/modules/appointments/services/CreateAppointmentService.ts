import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../../appointments/infra/typeorm/repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

/**
 * 1 - Recebimento das Informações
 * 2 - Tratativa de Erros e Exceções
 * 3 - Acesso ao repositório
 */




interface IRequest {
    date : Date;
    provider_id:string
}



class CreateAppointmentService {
  
    constructor (private appointmentsRepository:IAppointmentsRepository) {


        }
    
    
    public async execute({date,provider_id}: IRequest):Promise<Appointment> {  // 1- Resolvido aqui

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date)


        const findAppointmentInSameData = await this.appointmentsRepository.findByDate(appointmentDate)
    
    
        
    
        if (findAppointmentInSameData) {
            throw Error('This appointment is already booked');
        }
    
        const appointment =  await this.appointmentsRepository.create({
            
            date: appointmentDate,
            provider_id,
            
            
        });

        

        return  appointment;
    }

}
export default CreateAppointmentService;
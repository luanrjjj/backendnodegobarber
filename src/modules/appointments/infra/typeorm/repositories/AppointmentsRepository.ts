import { getRepository,Raw,Repository } from 'typeorm';
import Appointment from '../entities/Appointment';


import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindInAllMonthFromProviderDTO';





class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
    
    public async findByDate(date:Date): Promise<Appointment | undefined> {
         const findAppointment = await this.ormRepository.findOne({where: {date},})

         return findAppointment 
    }
    
    public async create({provider_id,date}:ICreateAppointmentDTO):Promise<Appointment> {
        const appointment = this.ormRepository.create({provider_id,date})

        await this.ormRepository.save(appointment)
        return appointment
    }



    public async findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthFromProvider): Promise<Appointment []> {
        const parsedMonth = String(month).padStart(2,'')
        const appointments = await this.ormRepository.find({
            where:{
                provider_id,
                date:Raw(dateFieldName=>
                    `to_char(${dateFieldName},'MM-YYYY)='${month}-${year}'`),
            }
        })
        return appointments;
    }


}

export default AppointmentsRepository;
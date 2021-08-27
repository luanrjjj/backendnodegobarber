import { getRepository,Raw,Repository } from 'typeorm';
import Appointment from '../entities/Appointment';


import IAppointmentsRepository from '../../../../appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../../appointments/dtos/ICreateAppointmentDTO';

import IFindAllInDayFromProvider from '../../../dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';


import IFindAllFromUser from '../../../dtos/IFindAllFromUserDTO';




class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
    
    public async findByDate(date:Date,provider_id:string): Promise<Appointment | undefined> {
         const findAppointment = await this.ormRepository.findOne({where: {date,provider_id},})

         return findAppointment 
    }
    
    public async create({provider_id,date,user_id}:ICreateAppointmentDTO):Promise<Appointment> {
        const appointment = this.ormRepository.create({provider_id,date,user_id})

        await this.ormRepository.save(appointment)
        return appointment
    }



    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
      }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
          
        const parsedMonth = String(month).padStart(2, '0');
        
        const appointments = await this.ormRepository.find({
          where: {
            provider_id,
            date: Raw(
              dateFieldName =>
              `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
            ),
          },
         
          
        });
    
        
    
        return appointments;
      }


    public async findAllInDayFromProvider({provider_id,day,month,year}:IFindAllInDayFromProvider): Promise<Appointment []> {
        const parsedMonth = String(month).padStart(2,'0')
        const parsedDay = String(day).padStart(2,'0')
        const appointments = await this.ormRepository.find({
            where:{
                provider_id,
                date:Raw(dateFieldName=>
                    `to_char(${dateFieldName},'DD-MM-YYYY')='${parsedDay}-${parsedMonth}-${year}'`),
            },
            relations:['user'],
        })

        
        return appointments;
    }



    public async findAllFromUser({user_id}:IFindAllFromUser): Promise<Appointment []> {
    
      const appointments = await this.ormRepository.find({
          where:{
              user_id,
          },
          relations:['provider']
      })

      
      return appointments;
  }



}

export default AppointmentsRepository;
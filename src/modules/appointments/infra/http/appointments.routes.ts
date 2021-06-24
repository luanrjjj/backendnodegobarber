import {Router} from 'express';
import {parseISO} from 'date-fns';
import CreateAppointmentService from '../../services/CreateAppointmentService';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';

import {container} from 'tsyringe'

import ensureAuthenticated from '../../../users/infra/http/middlewares/ensureAuthenticated';

 
const appointmentsRouter = Router();



appointmentsRouter.use(ensureAuthenticated); // Será aplicado em todas as rotas de Agendamento


//  appointmentsRouter.get('/',async (request,response)=>{
//   console.log(request.user)

//     const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//      const appointments = await appointmentsRepository.find();

//      return response.json(appointments);

//  })

appointmentsRouter.post('/',async (request,response)=>{
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService)

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  console.log(100,appointment)
  return response.json(appointment);

   
});


export default appointmentsRouter;
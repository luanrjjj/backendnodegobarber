import {Router} from 'express';


import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController'
 import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();


appointmentsRouter.use(ensureAuthenticated); // Será aplicado em todas as rotas de Agendamento


//  appointmentsRouter.get('/',async (request,response)=>{
//   console.log(request.user)

//     const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//      const appointments = await appointmentsRepository.find();

//      return response.json(appointments);

//  })

appointmentsRouter.post('/',appointmentsController.create)
appointmentsRouter.get('/me',providerAppointmentsController.index)

export default appointmentsRouter;
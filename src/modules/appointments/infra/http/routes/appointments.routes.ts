import {Router} from 'express';


import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController'
 


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()


appointmentsRouter.use(ensureAuthenticated); // Será aplicado em todas as rotas de Agendamento


//  appointmentsRouter.get('/',async (request,response)=>{
//   console.log(request.user)

//     const appointmentsRepository = getCustomRepository(AppointmentsRepository)
//      const appointments = await appointmentsRepository.find();

//      return response.json(appointments);

//  })

appointmentsRouter.post('/',appointmentsController.create)


export default appointmentsRouter;
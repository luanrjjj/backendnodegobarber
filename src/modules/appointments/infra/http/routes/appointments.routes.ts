import {Router} from 'express';
import { celebrate, Joi,Segments } from 'celebrate';

import {Root as joi,ValidationOptions,ValidationError,ValidationResult} from '@hapi/joi'


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

appointmentsRouter.post('/',celebrate({
    [Segments.BODY] : {
        provider_id:Joi.string().uuid().required(),
        date:Joi.date()
    }
}),appointmentsController.create,

)
appointmentsRouter.get('/me',providerAppointmentsController.index)

export default appointmentsRouter;
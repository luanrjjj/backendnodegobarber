import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAppointmentsService from '../../../../appointments/services/ListUserAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    
  

    const listUserAppointmentsService = container.resolve(
      ListUserAppointmentsService,
    );

    const appointments = await listUserAppointmentsService.execute({user_id});

   


    return response.json(classToClass((appointments))
    )
  }
}
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';


export default class AppointmentsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id  // GErador no Middleware
    const appointmentsRepository = new AppointmentsRepository();
    const { provider_id, date } = request.body;

    

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id
    });

    console.log(appointment)
    return response.json(appointment);
  }
}
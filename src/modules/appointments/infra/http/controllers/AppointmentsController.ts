import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';


export default class AppointmentsController {

  public async create(request: Request, response: Response): Promise<Response> {

    const appointmentsRepository = new AppointmentsRepository();
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    console.log(100, appointment)
    return response.json(appointment);
  }
}
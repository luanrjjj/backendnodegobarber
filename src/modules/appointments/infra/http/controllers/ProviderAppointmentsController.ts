import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../../../../appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    console.log('provider_id',provider_id)
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    console.log('teste,appointments')


    return response.json(appointments);
  }
}
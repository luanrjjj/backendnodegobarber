import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../../../appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    console.log('3',provider_id)

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    console.log('3.1',listProviderMonthAvailability)
    const availability = await listProviderMonthAvailability.execute({
   
      provider_id,
      month,
      year,
    });
    

    return response.json(availability);
  }
}
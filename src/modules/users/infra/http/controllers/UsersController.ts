// index, show, create, update, delete
import {Request,Response} from 'express';
import {container} from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService'
import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository'

export default class UsersController {
    public async create (request: Request,response:Response): Promise<Response> {
        const { name, email, password } = request.body;
        const usersRepository = new UsersRepository()
    

        const createUser = container.resolve(CreateUserService)
      
        const user = await createUser.execute({
          name,
          email,
          password,
        });
      
        // Com a atualização do TypeScript, isso se faz necessário
        const userWithoutPassword = {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
      
        return response.json(userWithoutPassword);
    } 
}
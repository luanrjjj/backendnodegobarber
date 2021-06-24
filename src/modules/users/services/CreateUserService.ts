
import { getRepository,Repository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import {hash} from 'bcryptjs'

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe';

interface Request {
 
 
    name:string;
    email:string;
    password: string;

}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository:IUsersRepository) {

    }
    public async execute({name,email,password}:Request) : Promise<User> {
       

      
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new AppError ('Email adress alredy used');

        }

        const hashedPassword = await hash(password,8);

        const user = await this.usersRepository.create({
            name,
            email,
            password:hashedPassword     
        })


        

        return user;
    }
}


export default CreateUserService
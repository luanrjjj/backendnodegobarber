
import { getRepository,Repository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import {hash} from 'bcryptjs';

import AppError from '../../../shared/errors/AppError';



import IUsersRepository from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe';



import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import HashProvider from'../providers/HashProvider/implementations/BCryptHashProvider';
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';


interface Request {
 
 
    name:string;
    email:string;
    password: string;

}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository:IUsersRepository,

        @inject('HashProvider')
        private hashProvider:IHashProvider,
        
        @inject ('CacheProvider')
        private cacheProvider :ICacheProvider,
        ) {}
    public async execute({name,email,password}:Request) : Promise<User> {
       

      
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new AppError ('Email adress alredy used');

        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password:hashedPassword,
            avatar_url:"https://meczbarber.s3.us-east-2.amazonaws.com/e7b7a9d81da5aa094f6b-avatarYellow.png"
            
        })

        await this.cacheProvider.invalidatePrefix('providers-list');


        

        return user;
    }
}


export default CreateUserService
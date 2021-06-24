
import { getRepository } from 'typeorm';

import {sign} from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';

import {compare} from 'bcryptjs'

import authConfig from '../../../config/auth'

import IUsersRepository from '../repositories/IUsersRepository'




interface Request {
    email:string;
    password:string;
}


interface Response {
    user: User;
    token:string;
}
class AuthenticateUserService {
    constructor(private usersRepository:IUsersRepository) {

    }

    public async execute({email,password}:Request):Promise<Response> {
        

        const user = await this.usersRepository.findByEmail(email);


        
        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        //user.password - Senha criptografada
        //password - Senha não-criptografada
    
        const passwordMatched = await compare(password,user.password);


        if(!passwordMatched) {
            throw new Error('Incorrect Email/password combination');

        }

        const {secret,expiresIn} = authConfig.jwt;


        const token = sign({},secret,{
            subject:user.id,
            expiresIn,
        });


        return {
            user,
            token
        };

    }


}

export default AuthenticateUserService

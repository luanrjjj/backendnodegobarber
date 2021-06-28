import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '../../../shared/providers/MailProvider/models/IMailProvider'
import { inject, injectable } from 'tsyringe';

interface IRequest {
    email:string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository:IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ){}


    public async execute({email}:IRequest): Promise<void> {
        this.mailProvider.sendMail( email,'Pedido de Recuperação de Senha recebido.',)

       
    }
}


export default SendForgotPasswordEmailService
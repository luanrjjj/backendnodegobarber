// index, show, create, update, delete
import { classToClass } from 'class-transformer';
import {Request,Response} from 'express';
import {container} from 'tsyringe';
import updateUserAvatarService from '../../../services/updateUserAvatarService'

export default class UsersAvatarController {
    public async update (request: Request,response:Response): Promise<Response> {
        
    const updateUserAvatar = container.resolve(updateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    

    return response.json(classToClass(user));
    } 
}
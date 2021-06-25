// index, show, create, update, delete
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
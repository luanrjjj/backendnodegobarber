import {Router} from 'express';
import multer from 'multer';
import CreateUserService from '../../../services/CreateUserService'
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import updateUserAvatarService from '../../../services/updateUserAvatarService'
import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository'
import {container} from 'tsyringe';


const usersRouter = Router();
const upload = multer(uploadConfig)




usersRouter.post('/',async (request,response)=>{
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

});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'), async (request,response)=> {
    
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
    
})
export default usersRouter;
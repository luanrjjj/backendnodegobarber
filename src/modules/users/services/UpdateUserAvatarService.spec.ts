import AppError from '../../../shared/errors/AppError';


import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import CreateUserService from './CreateUserService';
import FakeStorageProvider from '../../../shared/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './updateUserAvatarService';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';

let fakeUsersRepository:FakeUsersRepository;

let fakeStorageProvider:FakeStorageProvider
let updateUserAvatar:UpdateUserAvatarService

describe('UpdateUserAvatar',() => {
  beforeEach(()=> {
    fakeUsersRepository = new FakeUsersRepository();
    
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider)
  })
   it('should be able to update the user avatar', async() => {
      const user = await fakeUsersRepository.create({
          name:'John Doe',
          email:"johndoe@example.com",
          password:'123456'
      })

      await updateUserAvatar.execute({
          user_id:user.id,
          avatarFilename:'avatar.jpg',

      });


      expect(user.avatar).toBe('avatar.jpg');
      });

     



      it('should  not be able to update the avatar from non existing user', async() => {
  
        await expect(
            updateUserAvatar.execute({
            user_id:'non-existing-user',
            avatarFilename:'avatar.jpg',
  
        })).rejects.toBeInstanceOf(AppError);
        });

        it('should delete old avatar when updating new one', async () => {
      
            const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        
         
            const user = await fakeUsersRepository.create({
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: '123456',
            });
        
            await updateUserAvatar.execute({
              user_id: user.id,
              avatarFilename: 'avatar.jpg',
            });
        
            await updateUserAvatar.execute({
              user_id: user.id,
              avatarFilename: 'avatar2.jpg',
            });
        
            expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
            expect(user.avatar).toBe('avatar2.jpg');
          });
        




})




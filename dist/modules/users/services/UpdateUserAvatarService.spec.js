"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/providers/StorageProvider/fakes/FakeStorageProvider"));

var _updateUserAvatarService = _interopRequireDefault(require("./updateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _updateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able to update the user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should  not be able to update the avatar from non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
import IStorageProvider from './StorageProvider/models/IStorageProvider'

import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'



container.registerSingleton<IStorageProvider> (
    'StorageProvider',
    DiskStorageProvider
);




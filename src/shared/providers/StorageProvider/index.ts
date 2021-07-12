import { container } from 'tsyringe';
import uploadConfig from '../../../config/upload'

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

import S3StorageProviders from './implementations/S3StorageProviders'

const providers = {
  disk: DiskStorageProvider,
  s3:S3StorageProviders
};



container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
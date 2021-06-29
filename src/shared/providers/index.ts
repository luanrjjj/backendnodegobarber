import IStorageProvider from './StorageProvider/models/IStorageProvider'

import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider'


container.registerSingleton<IStorageProvider> (
    'StorageProvider',
    DiskStorageProvider
);



container.registerInstance<IMailProvider> (
    'MailProvider',
    new EtherealMailProvider
);



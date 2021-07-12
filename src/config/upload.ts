import multer, {StorageEngine} from 'multer';
import crypto from 'crypto'
import path from 'path';


const tmpFolder = path.resolve(__dirname,'..','..','tmp');


interface IUploadConfig {
    driver: 'disk' | 's3';
  
    tmpFolder: string;
    uploadsFolder: string;
  
    multer: {
      storage: StorageEngine;
    };
  
    config: {
      disk: {};
  
      aws: {
        bucket: string;
      };
    };
  }

 export default {
    driver:`${process.env.STORAGE_DRIVER}`,
    tmpFolder:tmpFolder,
    uploadsFolder:path.resolve(tmpFolder),


    multer: {
        storage: multer.diskStorage({
          destination: tmpFolder,
          filename(request, file, callback) {
            const filehash = crypto.randomBytes(10).toString('hex');
            const fileName = `${filehash}-${file.originalname}`;
    
            return callback(null, fileName);
          },
        }),
      },
      config: {
        disk: {},
        aws: {
          bucket: 'meczbarber',
  
}
      }
    } as IUploadConfig

   
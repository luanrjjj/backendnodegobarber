import "reflect-metadata";
import 'dotenv/config';
import express,{Request , Response, NextFunction, response} from 'express';
import routes from './shared/infra/http/routes';
import uploadConfig from './config/upload'
import { errors } from 'celebrate' 
import AppError from './shared/errors/AppError';
import rateLimiter from './shared/infra/http/midleware/rateLimiter'

import './shared/infra/typeorm';
import './shared/container'


var cors = require('cors')
var app =express ();




app.use(cors()) // Use this after the variable declaration
app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-type');
    next();
  });

app.use(rateLimiter);
app.get('/',(request,response)=> {
    return response.json({message:'Hello Gold;'});
})
app.use(express.json());
app.use('/files',express.static(uploadConfig.uploadsFolder))

app.use(routes)

app.use(errors())

app.use((err:Error,request: Request, response:Response ,next: NextFunction)=> {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err,
        });
    } 
    console.error(err);

    return response.status(500).json({
        status: 'error',
        messsage: 'Internal Server Error',
    })
}); 

app.listen(3333,()=>{
    console.log('Server started on port 3333')
});

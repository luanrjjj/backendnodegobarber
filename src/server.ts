import "reflect-metadata";
import express,{Request , Response, NextFunction, response} from 'express';
import routes from './shared/infra/http/routes';
import uploadConfig from './config/upload'
import AppError from './shared/errors/AppError'

import './shared/infra/typeorm';
import './shared/container'

const app =express ();

app.get('/',(request,response)=> {
    return response.json({message:'Hello Gold;'});
})

app.use(express.json());


app.use(routes);

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

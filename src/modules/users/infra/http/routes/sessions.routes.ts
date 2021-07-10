import {Router} from 'express';
import SessionsController from '../controllers/SessionsController'



const sessionsRouter = Router();
const sessionsController = new SessionsController()


import {container} from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';


sessionsRouter.post('/',celebrate({[Segments.BODY]:{
    email:Joi.string().email().required(),
    password:Joi.string().required(),
}}),sessionsController.create);


export default sessionsRouter;
import {Router} from 'express';
import SessionsController from '../controllers/SessionsController'



const sessionsRouter = Router();
const sessionsController = new SessionsController()


import {container} from 'tsyringe';


sessionsRouter.post('/',sessionsController.create);


export default sessionsRouter;
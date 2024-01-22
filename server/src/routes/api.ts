import * as express from 'express';
import { planetsRouter } from './planets/planets.router';
import { lauchesRouter } from './launches/launches.router';




const api = express.Router();

api.use('/planets',planetsRouter);
api.use('/launches',lauchesRouter);                                                                                                 
export{
  api
}
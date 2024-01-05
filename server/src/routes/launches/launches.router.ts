import * as express from 'express';
import { httpAddNewLaunch, httpGetAllLaunches , httpAbortLaunch} from './launches.controller';


const lauchesRouter = express.Router()

//URL: hhtp://localhost:8000/launches
lauchesRouter.get('/', httpGetAllLaunches);

//URL: hhtp://localhost:8000/planets
lauchesRouter.post('/', httpAddNewLaunch);

//URL: hhtp://localhost:8000/planets/id
lauchesRouter.delete('/:id' , httpAbortLaunch);

export{
  lauchesRouter
}
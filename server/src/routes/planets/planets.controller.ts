import * as express from 'express';
import { getAllPlanets } from '../../models/planets.model';


async function httpGetAllplanets(req:express.Request, res:express.Response){
  return res.status(200).json(await getAllPlanets());
}


export{
  httpGetAllplanets
}
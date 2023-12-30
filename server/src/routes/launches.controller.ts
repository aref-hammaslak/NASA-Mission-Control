import {Response , Request} from 'express';
import { launches , Launch, addNewLaunch, existsLaunchWithID, abortLaunch, getAllLaunches } from '../models/launches.model';

async function httpGetAllLaunches(req:Request,res:Response){
  res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req:Request, res:Response){
  const launch:Launch = req.body;
  if(!launch.mission || !launch.mission || !launch.target ){
    return res.status(400).json({
      error : 'missing required launch property'
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if(launch.launchDate.toString() === 'Inavalid Date'){
    return res.status(400).json({
      error: 'Invalid lauch date',
    })
  }

  await addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req:Request , res:Response){
  const launchID = +req.params.id;
  if(!existsLaunchWithID(launchID)){
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const aborted = abortLaunch(launchID);
  return res.status(200).json(aborted);
}

export{
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}

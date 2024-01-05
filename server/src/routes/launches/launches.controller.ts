import { Response, Request } from "express";
import {
  launches,
  Launch,
  addNewLaunch,
  existsLaunchWithID,
  abortLaunch,
  getAllLaunches,
} from "../../models/launches.model";

async function httpGetAllLaunches(req: Request, res: Response) {
  res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req: Request, res: Response) {
  const launch: Launch = req.body;
  if (!launch.mission || !launch.mission || !launch.target) {
    return res.status(400).json({
      error: "missing required launch property",
    });
  }
  
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  console.log(launch.launchDate.toString());
  try {
    await addNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error:any) {
    
    return res.status(400).json({error: error.message});
  }
}

async function httpAbortLaunch(req: Request, res: Response) {
  const launchID = +req.params.id;
  const existLaunch= await existsLaunchWithID(launchID); 
  if (!existLaunch ) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  

  const aborted = await abortLaunch(launchID);
  return res.status(200).json(aborted);
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };

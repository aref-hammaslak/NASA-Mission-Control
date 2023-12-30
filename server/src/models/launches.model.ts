import { launches } from "./launches.mongo";
import * as mongoose from "mongoose";
import { planets } from "./planets.mongo";
import { parse } from 'csv-parse';

const DEFAULT_FLIGHT_NUMBER= 100;

type Launch = {
  flightNumber?: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: string;
  custumer?: Array<string>;
  upcoming?: boolean;
  success?: boolean;
};

const launch: Launch = {
  flightNumber:  100,
  mission: "Kepler Exploration X",
  rocket: "Explor IS1",
  launchDate: new Date("December 27 2030"),
  target: "Kepler-442 b",
  custumer: ["Aref", "NASA"],
  upcoming: true,
  success: true,
};

(async () => {
  await saveLaunch(launch);
})();

async function saveLaunch(launch: Launch) {
  const planet= await planets.findOne({
    keplerName: launch.target,
  })

  if(!planet) throw new Error('No matchin planet found');
  
  try {
    await launches.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function getLatestFlightNumber():Promise<number> {

  const latestLaunch= await launches
    .findOne()
    .sort('-flightNumber');
    
  return latestLaunch ?  latestLaunch.flightNumber as number :  DEFAULT_FLIGHT_NUMBER;
}

async function existsLaunchWithID(id: number) {
  return (
    (await launches.findOne({
      flightNumber: id,
    })) && true
  );
}

async function addNewLaunch(newLaunch: Launch) {
  const nextFlightNumber: number = +await getLatestFlightNumber() + 1;
 
  await saveLaunch(
    Object.assign(newLaunch, {
      success: true,
      upcoming: true,
      customers: ["Aref", "NASA"],
      flightNumber: nextFlightNumber,
    })
  );
}

async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function abortLaunch(id: number) {
  let aborted: Launch;
  try {
    aborted = (await launches.findOne({
      flightNumber: id,
    })) as Launch;

    const updateRes = await launches.updateMany(
      {
        flightNumber: id,
      },
      {
        $set: {
          upcoming: false,
          success: false,
        },
      }
    );
    console.log(updateRes);
  } catch (error) {
    throw error
  }
 
  return aborted;
}

export {
  Launch,
  launches,
  addNewLaunch,
  abortLaunch,
  existsLaunchWithID,
  getAllLaunches,
};

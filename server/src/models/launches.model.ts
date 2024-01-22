import { launches } from "./launches.mongo";
import { planets } from "./planets.mongo";
import axios from "axios";

const DEFAULT_FLIGHT_NUMBER = 100;

type Launch = {
  flightNumber?: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target?: string;
  customers?: Array<string>;
  upcoming?: boolean;
  success?: boolean;
};

async function saveLaunch(launch: Launch) {
  
  try {
    await launches.findOneAndUpdate(
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

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunch() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  const launchDocs: Array<any> = response.data.docs;
  launchDocs.forEach(async (launchDoc) => {
    const payloads: Array<any> = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => payload["customers"]);
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: new Date(launchDoc["date_local"]),
      customers,
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch);
  });
}

async function loadLaunchesData() {
  const alreadyLoaded = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon",
    mission: "FalconSat",
  });
  if (alreadyLoaded) {
    console.log(
      "Launches data already loaded. Skipping the process."
    )
    return;
  };
  await populateLaunch();
}

async function getLatestFlightNumber(): Promise<number> {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  return latestLaunch
    ? (latestLaunch.flightNumber as number)
    : DEFAULT_FLIGHT_NUMBER;
}

async function findLaunch(filter: any) {
  return launches.findOne(filter);
}

async function existsLaunchWithID(id: number) {
  return await findLaunch({
    flightNumber: id,
  });
}

async function addNewLaunch(newLaunch: Launch) {

  const planet = await planets.findOne({
    keplerName: newLaunch.target,
  });

  if (!planet) throw new Error("No match in planets found");

  try {
    const nextFlightNumber: number = +(await getLatestFlightNumber()) + 1;

    await saveLaunch(
      Object.assign(newLaunch, {
        success: true,
        upcoming: true,
        customers: ["Aref", "NASA"],
        flightNumber: nextFlightNumber,
      })
    );
  } catch (error) {
    throw error;
  }
}

async function getAllLaunches(skip: number, limit: number) {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
  .sort('flightNumber')
  .skip(skip)
  .limit(limit);
}

async function abortLaunch(id: number) {
  let aborted: Launch;
  try {
    aborted = (await launches.findOne(
      {
        flightNumber: id,
      },
      {
        _id: 0,
        __v: 0,
      }
    )) as Launch;

    const updateRes = await launches.updateOne(
      {
        flightNumber: id,
      },
      {
        upcoming: false,
        success: false,
      }
    );
  } catch (error) {
    throw error;
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
  loadLaunchesData,
};

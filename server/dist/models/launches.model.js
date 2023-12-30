"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLaunches = exports.existsLaunchWithID = exports.abortLaunch = exports.addNewLaunch = exports.launches = void 0;
const launches_mongo_1 = require("./launches.mongo");
Object.defineProperty(exports, "launches", { enumerable: true, get: function () { return launches_mongo_1.launches; } });
const planets_mongo_1 = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
    flightNumber: 100,
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
async function saveLaunch(launch) {
    const planet = await planets_mongo_1.planets.findOne({
        keplerName: launch.target,
    });
    if (!planet)
        throw new Error('No matchin planet found');
    try {
        await launches_mongo_1.launches.updateOne({
            flightNumber: launch.flightNumber,
        }, launch, {
            upsert: true,
        });
    }
    catch (error) {
        console.error(error);
    }
}
async function getLatestFlightNumber() {
    const latestLaunch = await launches_mongo_1.launches
        .findOne()
        .sort('-flightNumber');
    return latestLaunch ? latestLaunch.flightNumber : DEFAULT_FLIGHT_NUMBER;
}
async function existsLaunchWithID(id) {
    return ((await launches_mongo_1.launches.findOne({
        flightNumber: id,
    })) && true);
}
exports.existsLaunchWithID = existsLaunchWithID;
async function addNewLaunch(newLaunch) {
    const nextFlightNumber = +await getLatestFlightNumber() + 1;
    await saveLaunch(Object.assign(newLaunch, {
        success: true,
        upcoming: true,
        customers: ["Aref", "NASA"],
        flightNumber: nextFlightNumber,
    }));
}
exports.addNewLaunch = addNewLaunch;
async function getAllLaunches() {
    return await launches_mongo_1.launches.find({}, {
        _id: 0,
        __v: 0,
    });
}
exports.getAllLaunches = getAllLaunches;
async function abortLaunch(id) {
    let aborted;
    try {
        aborted = (await launches_mongo_1.launches.findOne({
            flightNumber: id,
        }));
        const updateRes = await launches_mongo_1.launches.updateMany({
            flightNumber: id,
        }, {
            $set: {
                upcoming: false,
                success: false,
            },
        });
        console.log(updateRes);
    }
    catch (error) {
        throw error;
    }
    return aborted;
}
exports.abortLaunch = abortLaunch;

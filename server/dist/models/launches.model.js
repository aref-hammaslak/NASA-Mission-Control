"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsLaunchWithID = exports.abortLaunch = exports.addNewLaunch = exports.launches = void 0;
const launches = new Map();
exports.launches = launches;
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explor IS1',
    launchDate: new Date('December 27 2030'),
    target: 'Kepler-442 b',
    custumer: ['Aref', 'NASA'],
    upcoming: true,
    success: true
};
launches.set(launch.flightNumber, launch);
function existsLaunchWithID(id) {
    return launches.has(id);
}
exports.existsLaunchWithID = existsLaunchWithID;
function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Aref', 'NASA'],
        flightNumber: latestFlightNumber
    }));
}
exports.addNewLaunch = addNewLaunch;
function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
exports.abortLaunch = abortLaunch;

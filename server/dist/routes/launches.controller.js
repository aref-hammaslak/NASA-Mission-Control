"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../models/launches.model");
function httpGetAllLaunches(req, res) {
    res.status(200).json(Array.from(launches_model_1.launches.values()));
}
exports.httpGetAllLaunches = httpGetAllLaunches;
function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.mission || !launch.target) {
        return res.status(400).json({
            error: 'missing required launch property'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (launch.launchDate.toString() === 'Inavalid Date') {
        return res.status(400).json({
            error: 'Invalid lauch date',
        });
    }
    (0, launches_model_1.addNewLaunch)(launch);
    return res.status(201).json(launch);
}
exports.httpAddNewLaunch = httpAddNewLaunch;
function httpAbortLaunch(req, res) {
    const launchID = +req.params.id;
    if (!(0, launches_model_1.existsLaunchWithID)(launchID)) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    const aborted = (0, launches_model_1.abortLaunch)(launchID);
    return res.status(200).json(aborted);
}
exports.httpAbortLaunch = httpAbortLaunch;

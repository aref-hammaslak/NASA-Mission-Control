"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
async function httpGetAllLaunches(req, res) {
    res.status(200).json(await (0, launches_model_1.getAllLaunches)());
}
exports.httpGetAllLaunches = httpGetAllLaunches;
async function httpAddNewLaunch(req, res) {
    const launch = req.body;
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
        await (0, launches_model_1.addNewLaunch)(launch);
        return res.status(201).json(launch);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.httpAddNewLaunch = httpAddNewLaunch;
async function httpAbortLaunch(req, res) {
    const launchID = +req.params.id;
    const existLaunch = await (0, launches_model_1.existsLaunchWithID)(launchID);
    if (!existLaunch) {
        return res.status(404).json({
            error: "Launch not found",
        });
    }
    const aborted = await (0, launches_model_1.abortLaunch)(launchID);
    return res.status(200).json(aborted);
}
exports.httpAbortLaunch = httpAbortLaunch;

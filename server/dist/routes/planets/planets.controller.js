"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllplanets = void 0;
const planets_model_1 = require("../../models/planets.model");
async function httpGetAllplanets(req, res) {
    return res.status(200).json(await (0, planets_model_1.getAllPlanets)());
}
exports.httpGetAllplanets = httpGetAllplanets;

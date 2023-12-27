"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllplanets = void 0;
const planets_model_1 = require("../models/planets.model");
function getAllplanets(req, res) {
    return res.status(200).json(planets_model_1.planets);
}
exports.getAllplanets = getAllplanets;

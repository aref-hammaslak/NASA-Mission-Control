"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = exports.planets = void 0;
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const habitablePlanets = [];
exports.planets = habitablePlanets;
function isHabitablePlanet(planet) {
    return (planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6);
}
function loadPlanetsData() {
    return new Promise((res, reg) => {
        fs_1.default.createReadStream("./data/kepler_data.csv")
            .pipe((0, csv_parse_1.parse)({
            comment: "#",
            columns: true,
        }))
            .on("data", (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
            .on("error", (err) => {
            console.log(err);
            reg(err);
        })
            .on("end", () => {
            res();
        });
    });
}
exports.loadPlanetsData = loadPlanetsData;

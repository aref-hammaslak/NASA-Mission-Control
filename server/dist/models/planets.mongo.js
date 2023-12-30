"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planets = void 0;
const mongoose_1 = require("mongoose");
const planetsSchema = new mongoose_1.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});
exports.planets = (0, mongoose_1.model)('Planet', planetsSchema);

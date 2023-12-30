"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launches = void 0;
const mongoose_1 = require("mongoose");
const lauchSchema = new mongoose_1.Schema({
    flightNumber: { type: Number, required: true },
    custumer: { type: (Array), required: true },
    mission: { type: String, required: true },
    rocket: { type: String, required: true },
    launchDate: { type: Date, required: true },
    target: { type: String, required: true },
    upcoming: { type: Boolean, required: true },
    success: { type: Boolean, required: true, default: true },
});
exports.launches = (0, mongoose_1.model)('Launch', lauchSchema);

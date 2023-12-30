"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const planets_model_1 = require("./models/planets.model");
require("inspector").close();
const PORT = process.env.PORT || 8000;
const MONGO_PASS = "Vg8Wz8vEdhzNy6KS";
const MONGO_URL = `mongodb+srv://arefhammaslak:${MONGO_PASS}@nasacluster.wx2xgbj.mongodb.net/?retryWrites=true&w=majority`;
const server = http.createServer(app_1.app);
mongoose_1.default.connection.on("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
(async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
    }
    catch (error) {
        console.log(error);
    }
    await (0, planets_model_1.loadPlanetsData)();
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
})();

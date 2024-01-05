"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_PASS = "Vg8Wz8vEdhzNy6KS";
const MONGO_URL = `mongodb+srv://arefhammaslak:${MONGO_PASS}@nasacluster.wx2xgbj.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connection.on("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
async function mongoConnect() {
    try {
        await mongoose_1.default.connect(MONGO_URL);
    }
    catch (error) {
        throw error;
    }
}
exports.mongoConnect = mongoConnect;
async function mongoDisconnect() {
    await mongoose_1.default.disconnect();
}
exports.mongoDisconnect = mongoDisconnect;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const mongo_1 = require("../../services/mongo");
describe("Launches API", () => {
    beforeAll(async () => {
        await (0, mongo_1.mongoConnect)();
    });
    afterAll(async () => {
        await (0, mongo_1.mongoDisconnect)();
    });
    describe("Test GET /launches", () => {
        test("It should rspond with 200 success", async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .get("/launches")
                .expect("Content-Type", /json/)
                .expect(200);
        });
    });
    describe("Test POST /launch", () => {
        const completLaunchDataWithoutDate = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
        };
        const completeLaunchData = Object.assign(Object.assign({}, completLaunchDataWithoutDate), { launchDate: "January 4, 2028" });
        const launchInavalidPlanetData = Object.assign(Object.assign({}, completeLaunchData), { target: "Kepler-62" });
        test("it should respond with 201 created", async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post("/launches")
                .send(completeLaunchData)
                .expect("Content-Type", /json/)
                .expect(201);
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(completLaunchDataWithoutDate);
        });
        test("it should catch missing required properties", async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post("/launches")
                .send({ completLaunchDataWithoutDate })
                .expect("Content-Type", /json/)
                .expect(400);
            expect(response.body).toMatchObject({
                error: "missing required launch property",
            });
        });
        test("it should catch no match found in planets", async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post("/launches")
                .send(launchInavalidPlanetData)
                .expect("Content-Type", /json/)
                .expect(400);
            expect(response.body).toMatchObject({
                error: "No match in planets found",
            });
        });
        test("it should catch invalid launch date", async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post("/launches")
                .send(Object.assign(Object.assign({}, completLaunchDataWithoutDate), { launchDate: "iorqhjkf" }))
                .expect("Content-Type", /json/)
                .expect(400);
            expect(response.body).toMatchObject({
                error: "Invalid launch date",
            });
        });
    });
});

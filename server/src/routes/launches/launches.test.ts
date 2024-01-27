import request from "supertest";
import { app } from "../../app";
import { loadLaunchesData } from "../../models/launches.model";
import { loadPlanetsData } from "../../models/planets.model";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should rspond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
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

    const completeLaunchData = {
      ...completLaunchDataWithoutDate,
      launchDate: "January 4, 2028",
    };

    const launchInavalidPlanetData = {
      ...completeLaunchData,
      target: "Kepler-62",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(completLaunchDataWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ completLaunchDataWithoutDate })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject({
        error: "missing required launch property",
      });
    });

    test("it should catch no match found in planets", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchInavalidPlanetData)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject({
        error: "No match in planets found",
      });
    });

    test("it should catch invalid launch date", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          ...completLaunchDataWithoutDate,
           launchDate: 'iorqhjkf',
 
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject({
        error: "Invalid launch date",

      });
    });
  });
});

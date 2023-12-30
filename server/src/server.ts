import * as http from "http";
import { app } from "./app";
import mongoose from 'mongoose' ;
import { loadPlanetsData } from "./models/planets.model";

require("inspector").close();

const PORT = process.env.PORT || 8000;
const MONGO_PASS = "Vg8Wz8vEdhzNy6KS";
const MONGO_URL = `mongodb+srv://arefhammaslak:${MONGO_PASS}@nasacluster.wx2xgbj.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);


mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(error);
  }
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();

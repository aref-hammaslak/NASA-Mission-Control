import * as http from "http";
import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
import { mongoConnect } from "./services/mongo";

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);




(async () => {
  try {
    await mongoConnect();
  } catch (error) {
    console.error(error);
  }
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);

  });
})(); 


import * as http from "http";
import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
import * as mongoose from "mongoose"

require('inspector').close();

const PORT = process.env.PORT || 8000;
const MONGO_PASS = 'Vg8Wz8vEdhzNy6KS';
const MONGO_URL = `Cmongodb+srv://arefhammaslak:${MONGO_PASS}@nasacluster.wx2xgbj.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
} );

(async () => {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  
})();
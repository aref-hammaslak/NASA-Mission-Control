import mongoose from "mongoose";


const MONGO_PASS = "Vg8Wz8vEdhzNy6KS";
const MONGO_URL = `mongodb+srv://arefhammaslak:${MONGO_PASS}@nasacluster.wx2xgbj.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

async function mongoConnect(){
  try {

    await mongoose.connect(MONGO_URL);
    
  } catch (error) {

    throw error;
    
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export{
  mongoConnect,
mongoDisconnect,

}
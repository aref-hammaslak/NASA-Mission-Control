import mongoose from "mongoose";
require('dotenv').config();


const MONGO_URL = process.env.MONGO_URL as string;


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
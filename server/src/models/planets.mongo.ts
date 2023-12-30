import { model, Schema } from "mongoose";


const planetsSchema = new Schema({
  keplerName:{
    type: String,
    required: true,
  }
});

export const planets = model('Planet', planetsSchema);
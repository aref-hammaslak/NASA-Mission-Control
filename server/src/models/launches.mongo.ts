import { model, Schema } from "mongoose";
import { Launch } from "./launches.model";


const launchSchema = new Schema<Launch>({

  flightNumber: { type: Number, required: true },
  customers: { type: Array<String>, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: { type: String , required: false},
  upcoming: { type: Boolean, required: true},
  success: { type: Boolean, required: true, default: true},

});

export const launches = model('Launches', launchSchema);

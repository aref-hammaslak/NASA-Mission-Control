import { model, Schema } from "mongoose";
import { Launch } from "./launches.model";


const launchSchema = new Schema<Launch>({

  flightNumber: { type: Number, required: true },
  customers: { type: Array<String>, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: { type: String , required: false},
  upcoming: { type: Boolean, default: true},
  success: { type: Boolean,},

});

export const launches = model('Launches', launchSchema);

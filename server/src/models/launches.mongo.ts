import { model, Schema } from "mongoose";
import { Launch } from "./launches.model";


const lauchSchema = new Schema<Launch>({

  flightNumber: { type: String, required: true },
  custumer: { type: Array<String>, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: { type: String , required: true},
  upcoming: { type: String, required: true},
  success: { type: String, required: true, default: true},

});

export const launches = model('Launch', lauchSchema);

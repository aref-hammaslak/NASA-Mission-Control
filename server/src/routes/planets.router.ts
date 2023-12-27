import * as express from "express";
import { httpGetAllplanets } from "./planets.controller";


const planetsRouter = express.Router();

//URL: hhtp://localhost:8000/planets
planetsRouter.get('/' , httpGetAllplanets )

export{
  planetsRouter
}
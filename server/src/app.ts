import * as express from 'express';
import { planetsRouter } from './routes/planets.router';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import { lauchesRouter } from './routes/launches.router';

const app = express.default();

//coross origin when client is running on its own server
app.use(cors({
  origin: 'http://localhost:3000'
}));

//middleware for logging requstes
//app.use(morgan('combined'));

app.use(express.json());

// serving front-end with url: 'http://localhost:8000
app.use(express.static(path.join(__dirname,'..','public')))


app.use('/planets',planetsRouter);
app.use('/launches' , lauchesRouter);
app.get('/*',(req, res ) => {
  res.sendFile(path.resolve('./public/index.html'));
})
 


export{
  app
} 
import * as express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import { api } from './routes/api';

const app = express.default();

//coross origin when client is running on its own server
app.use(cors({
  origin: 'http://localhost:3000'
}));

//middleware for logging requstes
//app.use(morgan('combined'));

app.use(express.json());

// serving front-end with url: 'http://localhost:8000
app.use(express.static(path.join(__dirname, '..', 'plc')))

app.use('/v1', api);


app.get('/*',(req, res ) => {
  // const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  const indexPath = path.resolve('./plc/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error sending file: ${indexPath}`);
      console.error(err);
      
    }
  });
})
 


export{
  app
} 
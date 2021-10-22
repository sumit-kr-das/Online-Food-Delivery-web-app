import express from 'express';
const app = express();
import { port_no } from './config';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';
import connection from './database/connection';
import path from 'path';


connection();

global.appRoot = path.resolve(__dirname);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',routes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);
app.listen(port_no, ()=>console.log(`Listening on port no ${port_no}`));
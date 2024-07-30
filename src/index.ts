import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import connectDB from './config/db';
import { startScheduler } from './services/schedulerService';
import domainRoutes from './routes/domainRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/domain', domainRoutes);

startScheduler();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

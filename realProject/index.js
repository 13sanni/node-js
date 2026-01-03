import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import connectDb from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import { configDotenv } from 'dotenv';


const app = express();
const port = 3000;
configDotenv();

app.use(express.json());

app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});
connectDb();
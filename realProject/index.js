import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import connectDb from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import { configDotenv } from 'dotenv';
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors"
import helmet from "helmet"
import xss from "xss-clean";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};





const app = express();
const port = 3000;
configDotenv();

app.use(helmet())

app.use(cors(corsOptions));

app.use(express.json());

app.use(xss());

app.use(mongoSanitize());

app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});
connectDb();
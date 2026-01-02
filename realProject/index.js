import express from 'express';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
import userRoutes from './routes/userRoutes.js';
const port = 3000;
 app.use(express.json());

 app.use('/user', userRoutes);


app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
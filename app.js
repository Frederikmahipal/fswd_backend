// app.js
import express from 'express';
import userRoutes from './routes/user_routes.js';
import cors from 'cors';
import errorHandler from './middleware/error_handler.js';
import { connectDB } from './db.js';

const app = express();
const port = 8000;


connectDB();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

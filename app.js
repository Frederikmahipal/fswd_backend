import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';
import errorHandler from './middleware/error_handler.js';
import userRoutes from './routes/user_routes.js';
import compayRoutes from './routes/company_routes.js';
import authRoutes from './routes/auth_routes.js';


const app = express();
const port = 8000;

connectDB();

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // replace with your frontend's URL
app.use(express.json());
app.use(errorHandler);
app.use('/users', userRoutes);
app.use('/companies', compayRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

export default app;